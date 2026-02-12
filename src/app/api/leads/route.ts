import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { quoteFormSchema } from '@/types/leads'
import { calculateQuoteFromDB } from '@/lib/pricing-service'
import { calculateQuoteAsync } from '@/lib/pricing'
import { sendLeadConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email'
import { extractDomain, estimateCompanyTier, getStateFromZip } from '@/lib/constants'
import { requireAdmin } from '@/lib/auth'
import { adminApiLimiter, publicFormLimiter, applyRateLimit, getClientIp } from '@/lib/rate-limit'
import type { JobType, LeadStatus } from '@/types/database'

const VALID_STATUSES: LeadStatus[] = ['new', 'enriched', 'vetted', 'available', 'sent_to_vendor', 'vendor_accepted', 'quoted', 'sold', 'won', 'lost', 'expired', 'closed']

// Bulk update status (admin only)
export async function PATCH(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const rateLimitResult = await applyRateLimit(adminApiLimiter, getClientIp(request))
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const { ids, status } = body as { ids: string[]; status: LeadStatus }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'No lead IDs provided' },
        { status: 400 }
      )
    }

    if (ids.length > 100) {
      return NextResponse.json(
        { error: 'Maximum 100 leads per bulk operation' },
        { status: 400 }
      )
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    const { error } = await supabase
      .from('leads')
      .update({ status })
      .in('id', ids)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update leads' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, updated: ids.length })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Bulk soft-delete (admin only) — sets status to 'closed' instead of hard delete
export async function DELETE(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const rateLimitResult = await applyRateLimit(adminApiLimiter, getClientIp(request))
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const { ids } = body as { ids: string[] }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'No lead IDs provided' },
        { status: 400 }
      )
    }

    if (ids.length > 100) {
      return NextResponse.json(
        { error: 'Maximum 100 leads per bulk operation' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    const { error } = await supabase
      .from('leads')
      .update({ status: 'closed' })
      .in('id', ids)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to archive leads' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, archived: ids.length })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Auto-match a lead to the best vendor based on job type and geography
 */
async function autoMatchVendor(
  supabase: ReturnType<typeof createServiceClient>,
  jobType: JobType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _originZip: string
) {
  try {
    // Fetch active vendors that handle this job type
    const { data: vendors, error } = await supabase
      .from('vendors')
      .select('*')
      .eq('is_active', true)
      .contains('job_types', [jobType])
      .order('performance_score', { ascending: false })

    if (error || !vendors || vendors.length === 0) {
      return null
    }

    // For now, return the highest-scoring vendor that handles this job type
    // Future: add geographic matching, capacity checks, and full scoring
    return vendors[0]
  } catch {
    console.error('Vendor matching failed')
    return null
  }
}

export async function POST(request: Request) {
  try {
    const rateLimitResult = await applyRateLimit(publicFormLimiter, getClientIp(request))
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()

    // Validate the request body
    const validatedData = quoteFormSchema.parse(body)

    const jobType = validatedData.jobType as JobType

    // Calculate quote using database-driven pricing rules
    let quote
    try {
      quote = await calculateQuoteFromDB({
        jobType,
        originZip: validatedData.originZip,
        destinationZip: validatedData.destinationZip || validatedData.originZip,
        numberOfRacks: validatedData.numberOfRacks || 0,
        numberOfLooseAssets: validatedData.numberOfLooseAssets || 0,
        totalWeightEstimate: validatedData.totalWeightEstimate || undefined,
        handlingRequirements: validatedData.handlingRequirements || [],
        dataDestructionRequired: validatedData.dataDestructionRequired || false,
        certificateOfDestructionNeeded: validatedData.certificateOfDestructionNeeded || false,
        chainOfCustodyTracking: validatedData.chainOfCustodyTracking || false,
        securityClearanceRequired: validatedData.securityClearanceRequired || false,
      })
    } catch (dbError) {
      console.warn('Failed to use DB pricing, falling back to static:', dbError)
      quote = await calculateQuoteAsync({
        jobType,
        originZip: validatedData.originZip,
        destinationZip: validatedData.destinationZip || validatedData.originZip,
        numberOfRacks: validatedData.numberOfRacks || 0,
        numberOfLooseAssets: validatedData.numberOfLooseAssets || 0,
        handlingRequirements: validatedData.handlingRequirements || [],
        dataDestructionRequired: validatedData.dataDestructionRequired || false,
        certificateOfDestructionNeeded: validatedData.certificateOfDestructionNeeded || false,
        chainOfCustodyTracking: validatedData.chainOfCustodyTracking || false,
        securityClearanceRequired: validatedData.securityClearanceRequired || false,
      })
    }

    const supabase = createServiceClient()

    // Auto-match vendor
    const matchedVendor = await autoMatchVendor(supabase, jobType, validatedData.originZip)

    // Company enrichment: extract domain and estimate tier
    const companyDomain = extractDomain(validatedData.email)
    const companyTier = estimateCompanyTier(companyDomain)

    // Derive state from ZIP codes
    const originState = getStateFromZip(validatedData.originZip)
    const destinationState = validatedData.destinationZip
      ? getStateFromZip(validatedData.destinationZip)
      : null

    // Calculate lead marketplace price based on company tier
    let leadPrice: number | null = null
    let leadTier: 'premium' | 'standard' | 'basic' | null = null
    try {
      const { data: leadPricingRules } = await supabase
        .from('pricing_rules')
        .select('*')
        .eq('rule_type', 'lead_price')
        .eq('company_tier', companyTier)
        .eq('is_active', true)
        .order('priority', { ascending: false })
        .limit(1)

      if (leadPricingRules && leadPricingRules.length > 0) {
        const rule = leadPricingRules[0]
        leadPrice = (rule.base_price || 0) * (rule.multiplier || 1)
        // Determine lead tier from company tier
        if (companyTier === 'enterprise') leadTier = 'premium'
        else if (companyTier === 'mid_market') leadTier = 'standard'
        else leadTier = 'basic'
      }
    } catch (pricingError) {
      console.warn('Failed to calculate lead price:', pricingError)
    }

    // Estimate job value from quote
    const estimatedJobValue = quote.low && quote.high
      ? Math.round((quote.low + quote.high) / 2)
      : null

    // Insert lead into database
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        // Contact
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        company: validatedData.company || null,
        title: validatedData.title || null,
        contact_consent: Boolean(validatedData.contactConsent),
        consent_timestamp: new Date().toISOString(),

        // Job details
        job_type: jobType,
        service_date: validatedData.serviceDate,
        is_flexible: validatedData.isFlexible,

        // Origin facility
        origin_zip: validatedData.originZip,
        origin_address: validatedData.originAddress || null,
        origin_state: originState,
        origin_facility_type: validatedData.originFacilityType || null,
        origin_loading_dock: validatedData.originLoadingDock || null,
        origin_floor_level: validatedData.originFloorLevel || null,
        origin_freight_elevator: validatedData.originFreightElevator || null,
        origin_security_requirements: validatedData.originSecurityRequirements || null,

        // Destination facility
        destination_zip: validatedData.destinationZip || null,
        destination_address: validatedData.destinationAddress || null,
        destination_state: destinationState,
        destination_facility_type: validatedData.destinationFacilityType || null,
        destination_loading_dock: validatedData.destinationLoadingDock || null,
        destination_floor_level: validatedData.destinationFloorLevel || null,
        destination_freight_elevator: validatedData.destinationFreightElevator || null,
        destination_security_requirements: validatedData.destinationSecurityRequirements || null,

        // Asset details
        number_of_racks: validatedData.numberOfRacks || null,
        number_of_loose_assets: validatedData.numberOfLooseAssets || null,
        total_weight_estimate: validatedData.totalWeightEstimate || null,
        rack_unit_count: validatedData.rackUnitCount || null,
        equipment_types: validatedData.equipmentTypes || [],
        handling_requirements: validatedData.handlingRequirements || [],

        // Compliance
        data_destruction_required: validatedData.dataDestructionRequired || false,
        certificate_of_destruction_needed: validatedData.certificateOfDestructionNeeded || false,
        chain_of_custody_tracking: validatedData.chainOfCustodyTracking || false,
        security_clearance_required: validatedData.securityClearanceRequired || false,
        compliance_notes: validatedData.complianceNotes || null,

        // Quote
        quote_low: quote.low,
        quote_high: quote.high,
        quote_method: 'form',

        // Distance
        distance_miles: quote.distanceInfo?.miles || null,
        distance_source: quote.distanceInfo?.source || null,

        // Vendor
        vendor_id: matchedVendor?.id || null,
        vendor_assigned_at: matchedVendor ? new Date().toISOString() : null,

        // Company enrichment
        company_domain: companyDomain,
        company_tier: companyTier,
        estimated_job_value: estimatedJobValue,

        // Lead marketplace
        lead_tier: leadTier,
        lead_price: leadPrice,

        // Source / Status
        source: 'form' as const,
        status: 'new' as const,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save lead', message: error.message },
        { status: 500 }
      )
    }

    // Send emails (non-blocking)
    Promise.all([
      sendLeadConfirmationEmail({
        to: validatedData.email,
        name: validatedData.name,
        jobType,
        quoteLow: quote.low,
        quoteHigh: quote.high,
      }),
      sendAdminNotificationEmail({
        leadId: lead.id,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        jobType,
        quoteLow: quote.low,
        quoteHigh: quote.high,
        vendorMatched: matchedVendor?.name || null,
      }),
    ]).catch((emailError) => {
      console.error('Email error:', emailError)
    })

    return NextResponse.json({
      id: lead.id,
      quoteLow: quote.low,
      quoteHigh: quote.high,
      distanceMiles: quote.distanceInfo?.miles || null,
      originZip: validatedData.originZip,
      destinationZip: validatedData.destinationZip || null,
      vendorMatched: matchedVendor?.name || null,
    })
  } catch (error) {
    console.error('API error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', message: 'Please check your input' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error', message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
