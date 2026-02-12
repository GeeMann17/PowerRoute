import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const rawNext = searchParams.get('next') ?? '/dashboard'

  // Prevent open redirect — only allow relative paths starting with /
  const next = rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/dashboard'

  if (!code) {
    return NextResponse.redirect(`${origin}/providers/login?error=auth`)
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/providers/login?error=auth`)
    }

    return NextResponse.redirect(`${origin}${next}`)
  } catch (error) {
    console.error('Auth callback unexpected error:', error)
    return NextResponse.redirect(`${origin}/providers/login?error=auth`)
  }
}
