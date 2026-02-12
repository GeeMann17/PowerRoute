import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { adminApiLimiter, applyRateLimit, getClientIp } from '@/lib/rate-limit'

// GET - List vendors (public)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const jobType = searchParams.get('job_type')
    const activeOnly = searchParams.get('active') !== 'false'

    const supabase = createServiceClient()

    let query = supabase
      .from('vendors')
      .select('*')
      .order('performance_score', { ascending: false })

    if (activeOnly) {
      query = query.eq('is_active', true)
    }

    if (jobType) {
      query = query.contains('job_types', [jobType])
    }

    const { data: vendors, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch vendors' },
        { status: 500 }
      )
    }

    return NextResponse.json(vendors)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create a new vendor (admin only)
export async function POST(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const rateLimitResult = await applyRateLimit(adminApiLimiter, getClientIp(request))
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const {
      name,
      contact_name,
      contact_email,
      contact_phone,
      job_types,
      geographic_coverage,
      certifications,
      capacity,
      pricing_tier,
      notes,
    } = body

    if (!name || !contact_name || !contact_email) {
      return NextResponse.json(
        { error: 'Missing required fields: name, contact_name, contact_email' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    const { data: vendor, error } = await supabase
      .from('vendors')
      .insert({
        name,
        contact_name,
        contact_email,
        contact_phone: contact_phone || null,
        job_types: job_types || [],
        geographic_coverage: geographic_coverage || [],
        certifications: certifications || [],
        capacity: capacity || null,
        pricing_tier: pricing_tier || null,
        notes: notes || null,
        performance_score: 50,
        win_rate: 0,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create vendor' },
        { status: 500 }
      )
    }

    return NextResponse.json(vendor, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH - Update vendor details (admin only)
export async function PATCH(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const rateLimitResult = await applyRateLimit(adminApiLimiter, getClientIp(request))
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const { id, ...rawFields } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      )
    }

    // Whitelist allowed fields to prevent privilege escalation
    const ALLOWED_FIELDS = new Set([
      'name', 'company_name', 'contact_name', 'contact_email', 'contact_phone',
      'website', 'description', 'years_in_business', 'logo_url',
      'job_types', 'specialties', 'geographic_coverage', 'regions_served',
      'nationwide', 'certifications', 'equipment', 'capacity',
      'pricing_tier', 'notes', 'admin_notes', 'insurance_coverage',
      'is_active', 'status',
    ])

    const fields: Record<string, unknown> = {}
    for (const key of Object.keys(rawFields)) {
      if (ALLOWED_FIELDS.has(key)) {
        fields[key] = rawFields[key]
      }
    }

    if (Object.keys(fields).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    const { data: vendor, error } = await supabase
      .from('vendors')
      .update(fields)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update vendor' },
        { status: 500 }
      )
    }

    return NextResponse.json(vendor)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Soft-delete vendor (admin only)
export async function DELETE(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const rateLimitResult = await applyRateLimit(adminApiLimiter, getClientIp(request))
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    const { error } = await supabase
      .from('vendors')
      .update({ is_active: false })
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to deactivate vendor' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
