import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { dashboardApiLimiter, applyRateLimit } from '@/lib/rate-limit'
import { parsePaginationParams, paginationRange } from '@/lib/pagination'
import type { JobType } from '@/types/database'

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

    // Parse optional query params
    const searchParams = request.nextUrl.searchParams
    const jobType = searchParams.get('job_type') as JobType | null
    const originState = searchParams.get('origin_state')
    const paginationParams = parsePaginationParams(searchParams)
    const { from, to } = paginationRange(paginationParams)

    // Build query for available leads — use the available_leads view via service client
    // to filter sold_count < max_sales at the SQL level (avoids pagination gaps)
    const { createServiceClient } = await import('@/lib/supabase/server')
    const serviceClient = createServiceClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (serviceClient as any)
      .from('available_leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (jobType) {
      query = query.eq('job_type', jobType)
    }

    if (originState) {
      query = query.eq('origin_state', originState)
    }

    // Also filter by state param (used by client as 'state')
    const stateFilter = searchParams.get('state')
    if (stateFilter) {
      query = query.eq('origin_state', stateFilter)
    }

    query = query.range(from, to)

    const { data: leads, error: leadsError, count } = await query

    if (leadsError) {
      console.error('Supabase error:', leadsError)
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      )
    }

    // Strip contact info from response for marketplace browsing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanitizedLeads = (leads || []).map((lead: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name, email, phone, company, ...rest } = lead
      return rest
    })

    return NextResponse.json({
      leads: sanitizedLeads,
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
