import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'

interface AdminResult {
  user: User
}

interface VendorResult {
  user: User
  vendor: { id: string }
}

/**
 * Require an authenticated admin user.
 * If ADMIN_EMAILS is set, the user's email must be in the list.
 * Returns the user on success or a NextResponse error on failure.
 */
export async function requireAdmin(): Promise<AdminResult | NextResponse> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const adminEmails = process.env.ADMIN_EMAILS
  if (adminEmails) {
    const allowed = adminEmails.split(',').map((e) => e.trim().toLowerCase())
    if (!user.email || !allowed.includes(user.email.toLowerCase())) {
      return NextResponse.json(
        { error: 'Forbidden: admin access required' },
        { status: 403 }
      )
    }
  }

  return { user }
}

/**
 * Require an authenticated, approved vendor.
 * Returns the user and vendor record on success or a NextResponse error on failure.
 */
export async function requireVendor(): Promise<VendorResult | NextResponse> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

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

  return { user, vendor }
}
