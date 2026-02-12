import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { adminApiLimiter, applyRateLimit, getClientIp } from '@/lib/rate-limit'
import { z } from 'zod'

const statusSchema = z.object({
  status: z.enum(['new', 'vetted', 'sent_to_vendor', 'vendor_accepted', 'quoted', 'won', 'lost']),
})

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const rateLimitResult = await applyRateLimit(adminApiLimiter, getClientIp(request))
    if (rateLimitResult) return rateLimitResult

    const { id } = await params
    const body = await request.json()

    const { status } = statusSchema.parse(body)

    const supabase = createServiceClient()

    const { data, error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update status', message: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', message: 'Invalid status value' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error', message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
