'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Network, Loader2, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { VendorStatus } from '@/types/database'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    errorParam === 'auth' ? 'Authentication failed. Please try again.' : null
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setIsLoading(false)
      return
    }

    // Check vendor status
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .select('status')
      .eq('user_id', authData.user.id)
      .single()

    if (vendorError || !vendor) {
      setError('No vendor account found for this user.')
      await supabase.auth.signOut()
      setIsLoading(false)
      return
    }

    const status = vendor.status as VendorStatus

    switch (status) {
      case 'pending':
        router.push('/providers/pending')
        break
      case 'rejected':
        setError('Your application has been rejected. Please contact support for more information.')
        await supabase.auth.signOut()
        setIsLoading(false)
        return
      case 'suspended':
        setError('Your account has been suspended. Please contact support for assistance.')
        await supabase.auth.signOut()
        setIsLoading(false)
        return
      case 'approved':
        router.push('/dashboard')
        break
      default:
        setError('Unknown account status. Please contact support.')
        await supabase.auth.signOut()
        setIsLoading(false)
        return
    }

    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-950/50 border border-red-900 rounded-lg">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in...
          </span>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  )
}

function LoginFormFallback() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="h-5 w-12 bg-zinc-700 rounded animate-pulse" />
        <div className="h-10 bg-zinc-700 rounded animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-5 w-16 bg-zinc-700 rounded animate-pulse" />
        <div className="h-10 bg-zinc-700 rounded animate-pulse" />
      </div>
      <div className="h-10 bg-zinc-700 rounded animate-pulse" />
    </div>
  )
}

export default function ProviderLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Network className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-zinc-100">PowerRoute</span>
            </div>
            <h1 className="text-xl font-semibold text-zinc-100">Provider Login</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Sign in to your vendor portal
            </p>
          </div>

          {/* Form */}
          <Suspense fallback={<LoginFormFallback />}>
            <LoginForm />
          </Suspense>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-500">
              Don&apos;t have an account?{' '}
              <Link
                href="/providers/signup"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Apply to join
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
