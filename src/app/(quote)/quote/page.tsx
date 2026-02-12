import { Suspense } from 'react'
import { ShieldCheck, Award, Clock } from 'lucide-react'
import { QuoteForm } from '@/components/forms/quote-form'

function QuoteFormWrapper() {
  return <QuoteForm />
}

export default function QuotePage() {
  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Get Matched with a Certified Provider in Under 2 Hours
            </h1>
            <p className="text-slate-400 mb-6">
              Tell us about your project — takes about 3 minutes. You&apos;ll get an instant cost
              estimate and a matched provider who specializes in your exact job type.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span>Every Provider Certified & Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-blue-400" />
                <span>14,200+ Racks Moved — Zero Lost</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>100% Free — No Credit Card</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <Suspense fallback={<div className="text-center py-8 text-slate-500">Loading form...</div>}>
            <QuoteFormWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
