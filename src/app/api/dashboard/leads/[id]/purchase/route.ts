import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import { dashboardApiLimiter, applyRateLimit } from '@/lib/rate-limit'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = await params

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
      .select('id, name, contact_email, stripe_customer_id')
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

    // Use service client for the transactional operations
    const serviceClient = createServiceClient()

    // Validate lead exists and is available
    const { data: lead, error: leadError } = await serviceClient
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single()

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      )
    }

    if (lead.status !== 'available') {
      return NextResponse.json(
        { error: 'Lead is not available for purchase' },
        { status: 400 }
      )
    }

    if (lead.sold_count >= lead.max_sales) {
      return NextResponse.json(
        { error: 'Lead has reached maximum sales' },
        { status: 400 }
      )
    }

    // Check if vendor has already purchased this lead
    const { data: existingPurchase } = await serviceClient
      .from('lead_purchases')
      .select('id')
      .eq('lead_id', leadId)
      .eq('vendor_id', vendor.id)
      .single()

    if (existingPurchase) {
      return NextResponse.json(
        { error: 'You have already purchased this lead' },
        { status: 409 }
      )
    }

    const leadPrice = lead.lead_price || 0

    // ─── Stripe Checkout Flow ───
    if (stripe && leadPrice > 0) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

      // Get or create Stripe customer
      let customerId = vendor.stripe_customer_id
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: vendor.contact_email,
          name: vendor.name,
          metadata: { vendor_id: vendor.id },
        })
        customerId = customer.id

        await serviceClient
          .from('vendors')
          .update({ stripe_customer_id: customerId })
          .eq('id', vendor.id)
      }

      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: Math.round(leadPrice * 100),
              product_data: {
                name: `Lead: ${(lead.job_type || 'lead').replace(/_/g, ' ')}`,
                description: `${lead.origin_state || 'Unknown'} — ${lead.lead_tier || 'standard'} tier`,
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          lead_id: leadId,
          vendor_id: vendor.id,
        },
        success_url: `${siteUrl}/dashboard/my-leads?purchased=true`,
        cancel_url: `${siteUrl}/dashboard/leads`,
      })

      // Create pending purchase record
      const { error: purchaseError } = await serviceClient
        .from('lead_purchases')
        .insert({
          lead_id: leadId,
          vendor_id: vendor.id,
          price_paid: leadPrice,
          status: 'pending',
          outcome: 'pending',
          stripe_payment_intent_id: session.payment_intent as string || session.id,
        })

      if (purchaseError) {
        console.error('Purchase creation error:', purchaseError)
        return NextResponse.json(
          { error: 'Failed to create purchase' },
          { status: 500 }
        )
      }

      return NextResponse.json({ checkoutUrl: session.url }, { status: 201 })
    }

    // ─── Fallback: immediate completion (Stripe not configured or free lead) ───
    const { data: purchase, error: purchaseError } = await serviceClient
      .from('lead_purchases')
      .insert({
        lead_id: leadId,
        vendor_id: vendor.id,
        price_paid: leadPrice,
        status: 'completed',
        outcome: 'pending',
      })
      .select()
      .single()

    if (purchaseError) {
      console.error('Purchase creation error:', purchaseError)
      return NextResponse.json(
        { error: 'Failed to create purchase' },
        { status: 500 }
      )
    }

    // Atomically increment sold_count (prevents race conditions)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: updatedLead, error: incrementError } = await (serviceClient as any)
      .rpc('increment_lead_sold_count', { p_lead_id: leadId })

    if (incrementError) {
      console.error('Failed to increment sold_count:', incrementError)
    }

    if (!updatedLead || (Array.isArray(updatedLead) && updatedLead.length === 0)) {
      // Lead reached max_sales between check and purchase — rare but possible
      console.warn('Lead sold_count increment returned empty — may have reached max_sales')
    }

    // Atomically increment vendor's leads_purchased count
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (serviceClient as any).rpc('increment_vendor_leads_purchased', { p_vendor_id: vendor.id })

    return NextResponse.json({ purchase }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
