import Link from 'next/link'
import { Network, Clock, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Application Pending | PowerRoute',
  description: 'Your provider application is under review.',
}

export default function ProviderPendingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-lg">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Network className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-zinc-100">PowerRoute</span>
          </div>

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-950/50 border border-amber-800">
            <Clock className="h-8 w-8 text-amber-400" />
          </div>

          {/* Content */}
          <h1 className="text-xl font-semibold text-zinc-100 mb-3">
            Your Account is Pending Review
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed mb-2">
            Thank you for applying to join the PowerRoute provider network.
            Our admin team is reviewing your application and will get back to
            you within 1-2 business days.
          </p>
          <p className="text-sm text-zinc-500 mb-8">
            You&apos;ll receive an email notification once your account has
            been approved.
          </p>

          {/* Back link */}
          <Link
            href="/providers/login"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
