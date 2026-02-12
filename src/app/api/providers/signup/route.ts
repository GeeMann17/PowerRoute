import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'
import { signupLimiter, applyRateLimit, getClientIp } from '@/lib/rate-limit'

// ============================================================
// Validation Schema
// ============================================================

const signupRequestSchema = z.object({
  // Company
  company_name: z.string().min(2),
  website: z.string().url().optional().or(z.literal('')),
  years_in_business: z.coerce.number().min(0).max(200).optional(),
  description: z.string().max(1000).optional().or(z.literal('')),

  // Contact
  contact_name: z.string().min(2),
  contact_email: z.string().email(),
  contact_phone: z.string().optional().or(z.literal('')),

  // Services
  nationwide: z.boolean().default(false),
  geographic_coverage: z.array(z.string()).default([]),
  job_types: z.array(z.string()).min(1),
  specialties: z.array(z.string()).default([]),

  // Credentials
  certifications: z.array(z.string()).default([]),
  equipment: z.array(z.string()).default([]),
  insurance_coverage: z.string().optional().or(z.literal('')),

  // Account
  password: z.string().min(8),
  confirm_password: z.string(),
})

// ============================================================
// POST Handler
// ============================================================

export async function POST(request: Request) {
  try {
    const rateLimitResult = await applyRateLimit(signupLimiter, getClientIp(request))
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()

    // Validate
    const data = signupRequestSchema.parse(body)

    if (data.password !== data.confirm_password) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    // Check if vendor with this email already exists
    const { data: existingVendor } = await supabase
      .from('vendors')
      .select('id')
      .eq('contact_email', data.contact_email)
      .single()

    if (existingVendor) {
      return NextResponse.json(
        { error: 'A vendor with this email already exists' },
        { status: 409 }
      )
    }

    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: data.contact_email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        role: 'vendor',
        company_name: data.company_name,
        contact_name: data.contact_name,
      },
    })

    if (authError || !authData.user) {
      console.error('Auth user creation failed:', authError)
      return NextResponse.json(
        { error: authError?.message || 'Failed to create user account' },
        { status: 500 }
      )
    }

    const userId = authData.user.id

    // 2. Create vendor record
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .insert({
        user_id: userId,
        name: data.company_name,
        company_name: data.company_name,
        website: data.website || null,
        years_in_business: data.years_in_business ?? null,
        description: data.description || null,
        contact_name: data.contact_name,
        contact_email: data.contact_email,
        contact_phone: data.contact_phone || null,
        nationwide: data.nationwide,
        geographic_coverage: data.geographic_coverage,
        regions_served: data.geographic_coverage,
        job_types: data.job_types,
        specialties: data.specialties,
        certifications: data.certifications,
        equipment: data.equipment,
        insurance_coverage: data.insurance_coverage || null,
        status: 'pending',
        is_active: false,
        performance_score: 50,
        win_rate: 0,
        trust_score: 0,
        verified: false,
      })
      .select()
      .single()

    if (vendorError || !vendor) {
      console.error('Vendor creation failed:', vendorError)

      // Rollback: delete the auth user
      const { error: deleteError } = await supabase.auth.admin.deleteUser(userId)
      if (deleteError) {
        console.error('Failed to rollback auth user:', deleteError)
      }

      return NextResponse.json(
        { error: 'Failed to create vendor profile. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: 'Application submitted successfully',
        vendor_id: vendor.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup API error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed. Please check your input.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
