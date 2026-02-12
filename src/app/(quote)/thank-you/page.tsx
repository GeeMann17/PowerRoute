import { Suspense } from 'react'
import Link from 'next/link'
import { CheckCircle, Phone, Clock, FileText, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/pricing'
import { ThankYouMap } from './thank-you-map'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

interface ThankYouContentProps {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

async function ThankYouContent({ searchParams }: ThankYouContentProps) {
  const params = await searchParams
  const quoteLow = params.quoteLow ? parseInt(params.quoteLow) : 0
  const quoteHigh = params.quoteHigh ? parseInt(params.quoteHigh) : 0
  const distanceMiles = params.distanceMiles ? parseInt(params.distanceMiles) : null
  const originZip = params.originZip || ''
  const destinationZip = params.destinationZip || ''

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Quote Request is In
          </h1>
          <p className="text-slate-400 mb-8">
            A PowerRoute logistics coordinator will review your scope and match you with a certified vendor partner within 2 business hours.
          </p>

          {/* Quote Display */}
          {quoteLow > 0 && quoteHigh > 0 && (
            <Card className="bg-slate-900 border-blue-500/30 mb-8">
              <CardContent className="py-8">
                <p className="text-sm text-blue-400 font-medium mb-2">Your Estimated Project Cost</p>
                <p className="text-4xl md:text-5xl font-bold text-white">
                  {formatPrice(quoteLow)} &ndash; {formatPrice(quoteHigh)}
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Final pricing based on detailed scope review and vendor partner proposal
                </p>
              </CardContent>
            </Card>
          )}

          {/* Distance & Route Map Display */}
          {originZip && destinationZip && (
            <ThankYouMap
              originZip={originZip}
              destinationZip={destinationZip}
              distanceMiles={distanceMiles}
            />
          )}

          {/* What Happens Next */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold text-white mb-4">What Happens Next</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                  <ShieldCheck className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Scope Review & Vendor Match</h3>
                  <p className="text-sm text-slate-400">
                    A PowerRoute coordinator reviews your project requirements and matches you with a certified vendor partner within 2 business hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Detailed Proposal</h3>
                  <p className="text-sm text-slate-400">
                    Your matched vendor prepares a detailed proposal with full chain of custody documentation plan and compliance requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                  <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Schedule & Execute</h3>
                  <p className="text-sm text-slate-400">
                    Once you approve, we lock in your service date and your vendor executes with full GPS tracking and chain of custody.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <a href={`tel:${PHONE_NUMBER}`}>
                <Phone className="mr-2 h-5 w-5" />
                Call PowerRoute
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              <Link href="/">
                Return Home
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Confirmation note */}
          <p className="text-sm text-slate-500 mt-8">
            A confirmation email has been sent to your inbox with your estimate details and next steps.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-500">Loading...</div>}>
      <ThankYouContent searchParams={props.searchParams} />
    </Suspense>
  )
}
