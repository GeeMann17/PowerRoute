import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { dashboardApiLimiter, applyRateLimit } from '@/lib/rate-limit'
import { parsePaginationParams, paginationRange } from '@/lib/pagination'

export async function GET(request: NextRequest) {
  try {
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
      .select('id')
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

    // Parse pagination params
    const paginationParams = parsePaginationParams(request.nextUrl.searchParams)
    const { from, to } = paginationRange(paginationParams)

    // Query completed purchases for this vendor, joined with lead data
    const { data: purchases, error: purchasesError, count } = await supabase
      .from('lead_purchases')
      .select('*, leads(*)', { count: 'exact' })
      .eq('vendor_id', vendor.id)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .range(from, to)

    if (purchasesError) {
      console.error('Supabase error:', purchasesError)
      return NextResponse.json(
        { error: 'Failed to fetch purchases' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      purchases: purchases || [],
      total: count || 0,
      page: paginationParams.page,
      pageSize: paginationParams.pageSize,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
