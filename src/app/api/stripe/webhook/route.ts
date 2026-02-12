import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
import type Stripe from 'stripe'

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 503 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  const supabase = createServiceClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const leadId = session.metadata?.lead_id
        const vendorId = session.metadata?.vendor_id

        if (!leadId || !vendorId) {
          console.error('Missing metadata in checkout session:', session.id)
          break
        }

        // Find the pending purchase
        const { data: purchase, error: purchaseError } = await supabase
          .from('lead_purchases')
          .select('*')
          .eq('lead_id', leadId)
          .eq('vendor_id', vendorId)
          .eq('status', 'pending')
          .single()

        if (purchaseError || !purchase) {
          console.error('Pending purchase not found for session:', session.id)
          break
        }

        // Mark purchase as completed (idempotent: only updates if still pending)
        const { data: updatedPurchase, error: updateError } = await supabase
          .from('lead_purchases')
          .update({
            status: 'completed',
            stripe_payment_intent_id: session.payment_intent as string || session.id,
          })
          .eq('id', purchase.id)
          .eq('status', 'pending')
          .select('id')

        // If no rows updated, this webhook was already processed (idempotent)
        if (updateError || !updatedPurchase || updatedPurchase.length === 0) {
          console.log('Purchase already completed or update failed, skipping:', session.id)
          break
        }

        // Atomically increment sold_count (prevents race conditions)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any).rpc('increment_lead_sold_count', { p_lead_id: leadId })

        // Atomically increment vendor's leads_purchased count
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any).rpc('increment_vendor_leads_purchased', { p_vendor_id: vendorId })

        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const paymentIntentId = charge.payment_intent as string

        if (paymentIntentId) {
          await supabase
            .from('lead_purchases')
            .update({ status: 'refunded' })
            .eq('stripe_payment_intent_id', paymentIntentId)
        }

        break
      }

      default:
        // Unhandled event type — acknowledge receipt
        break
    }
  } catch (error) {
    console.error('Webhook handler error:', error)
    // Return 200 to prevent Stripe from retrying
  }

  return NextResponse.json({ received: true })
}
