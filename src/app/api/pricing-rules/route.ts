import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { adminApiLimiter, applyRateLimit, getClientIp } from '@/lib/rate-limit'
import type { PricingRuleType, JobType } from '@/types/database'

// GET - Fetch all pricing rules (public for client-side pricing)
export async function GET() {
  try {
    const supabase = createServiceClient()

    const { data: rules, error } = await supabase
      .from('pricing_rules')
      .select('*')
      .order('rule_type')
      .order('sort_order')

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch pricing rules' },
        { status: 500 }
      )
    }

    return NextResponse.json(rules)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create a new pricing rule (admin only)
export async function POST(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const rateLimitResult = await applyRateLimit(adminApiLimiter, getClientIp(request))
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const { rule_type, job_type, key, value, label, sort_order } = body as {
      rule_type: PricingRuleType
      job_type?: JobType | null
      key: string
      value: number
      label?: string
      sort_order?: number
    }

    if (!rule_type || !key || value === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: rule_type, key, value' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    const { data: rule, error } = await supabase
      .from('pricing_rules')
      .insert({
        rule_type,
        job_type: job_type || null,
        key,
        value,
        label: label || null,
        sort_order: sort_order || 0,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A rule with this type, job type, and key already exists' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to create pricing rule' },
        { status: 500 }
      )
    }

    return NextResponse.json(rule, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH - Update multiple pricing rules (admin only)
export async function PATCH(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const rateLimitResult = await applyRateLimit(adminApiLimiter, getClientIp(request))
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const { updates } = body as {
      updates: Array<{ id: string; value?: number; label?: string; is_active?: boolean; sort_order?: number }>
    }

    if (!updates || !Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json(
        { error: 'No updates provided' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    const results = await Promise.all(
      updates.map(async (update) => {
        const { id, ...fields } = update
        const { error } = await supabase
          .from('pricing_rules')
          .update(fields)
          .eq('id', id)

        return { id, success: !error, error }
      })
    )

    const failed = results.filter((r) => !r.success)
    if (failed.length > 0) {
      console.error('Some updates failed:', failed)
    }

    return NextResponse.json({
      success: true,
      updated: results.filter((r) => r.success).length,
      failed: failed.length,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a pricing rule (admin only)
export async function DELETE(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const rateLimitResult = await applyRateLimit(adminApiLimiter, getClientIp(request))
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const { id } = body as { id: string }

    if (!id) {
      return NextResponse.json(
        { error: 'No rule ID provided' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    const { error } = await supabase
      .from('pricing_rules')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to delete pricing rule' },
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
