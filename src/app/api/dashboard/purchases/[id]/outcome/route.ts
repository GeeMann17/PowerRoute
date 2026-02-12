import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { dashboardApiLimiter, applyRateLimit } from '@/lib/rate-limit'
import type { PurchaseOutcome } from '@/types/database'

const VALID_OUTCOMES: PurchaseOutcome[] = ['won', 'lost', 'no_response']

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: purchaseId } = await params

    const supabase = await createClient()

    // Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify user is an approved vendor
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .select('id, leads_closed')
      .eq('user_id', user.id)
      .eq('status', 'approved')
      .single()

    if (vendorError || !vendor) {
      return NextResponse.json(
        { error: 'Forbidden: approved vendor account required' },
        { status: 403 }
      )
    }

    // Rate limit by user ID
    const rateLimitResult = await applyRateLimit(dashboardApiLimiter, user.id)
    if (rateLimitResult) return rateLimitResult

    // Parse request body
    const body = await request.json()
    const { outcome, outcome_value, outcome_notes } = body as {
      outcome: PurchaseOutcome
      outcome_value?: number
      outcome_notes?: string
    }

    // Validate outcome
    if (!outcome || !VALID_OUTCOMES.includes(outcome)) {
      return NextResponse.json(
        { error: 'Invalid outcome. Must be one of: won, lost, no_response' },
        { status: 400 }
      )
    }

    // Validate outcome_value if provided
    if (outcome_value !== undefined && (typeof outcome_value !== 'number' || outcome_value < 0)) {
      return NextResponse.json(
        { error: 'outcome_value must be a non-negative number' },
        { status: 400 }
      )
    }

    const serviceClient = createServiceClient()

    // Verify the purchase belongs to this vendor
    const { data: purchase, error: purchaseError } = await serviceClient
      .from('lead_purchases')
      .select('*')
      .eq('id', purchaseId)
      .eq('vendor_id', vendor.id)
      .single()

    if (purchaseError || !purchase) {
      return NextResponse.json(
        { error: 'Purchase not found' },
        { status: 404 }
      )
    }

    // Update the purchase with outcome data
    const { data: updatedPurchase, error: updateError } = await serviceClient
      .from('lead_purchases')
      .update({
        outcome,
        outcome_value: outcome_value ?? null,
        outcome_notes: outcome_notes ?? null,
        outcome_updated_at: new Date().toISOString(),
      })
      .eq('id', purchaseId)
      .select()
      .single()

    if (updateError) {
      console.error('Purchase update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update purchase outcome' },
        { status: 500 }
      )
    }

    // If outcome is 'won', increment vendor's leads_closed count
    if (outcome === 'won') {
      const { error: vendorUpdateError } = await serviceClient
        .from('vendors')
        .update({ leads_closed: vendor.leads_closed + 1 })
        .eq('id', vendor.id)

      if (vendorUpdateError) {
        console.error('Vendor leads_closed update error:', vendorUpdateError)
        // Non-critical: purchase outcome was saved, log but don't fail
      }
    }

    return NextResponse.json({ purchase: updatedPurchase })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
