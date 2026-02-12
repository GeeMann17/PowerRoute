'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight,
  Loader2,
  Calculator,
  Phone,
  RotateCcw,
  Server,
  Recycle,
  PackageSearch,
  Building2,
  Truck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { miniQuoteSchema, type MiniQuoteFormData, jobTypeOptions } from '@/types/leads'
import { calculateQuickEstimate, formatPrice } from '@/lib/pricing'
import type { JobType } from '@/types/database'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

const JOB_TYPE_ICONS: Record<string, React.ElementType> = {
  Server,
  Recycle,
  PackageSearch,
  Building2,
  Truck,
}

interface QuoteResult {
  low: number
  high: number
  jobType: JobType
  assetCount: number
  originZip: string
  destinationZip: string
}

export function MiniCalculator() {
  const router = useRouter()
  const [isCalculating, setIsCalculating] = useState(false)
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null)
  const [selectedJobType, setSelectedJobType] = useState<JobType | ''>('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<MiniQuoteFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(miniQuoteSchema) as any,
    defaultValues: {
      jobType: undefined as unknown as JobType,
      assetCount: undefined as unknown as number,
      originZip: '',
      destinationZip: '',
    },
  })

  const onSubmit = async (data: MiniQuoteFormData) => {
    setIsCalculating(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const estimate = calculateQuickEstimate(
      data.jobType,
      data.assetCount,
      data.originZip,
      data.destinationZip
    )

    setQuoteResult({
      ...estimate,
      jobType: data.jobType,
      assetCount: data.assetCount,
      originZip: data.originZip,
      destinationZip: data.destinationZip,
    })
    setIsCalculating(false)
  }

  const handleJobTypeChange = (jt: JobType) => {
    setSelectedJobType(jt)
    setValue('jobType', jt)
  }

  const handleContinueToForm = () => {
    if (quoteResult) {
      const params = new URLSearchParams({
        jobType: quoteResult.jobType,
        originZip: quoteResult.originZip,
        destinationZip: quoteResult.destinationZip,
      })
      router.push(`/quote?${params.toString()}`)
    }
  }

  const handleStartOver = () => {
    setQuoteResult(null)
    setSelectedJobType('')
    reset()
  }

  if (quoteResult) {
    const jobLabel = jobTypeOptions.find((jt) => jt.value === quoteResult.jobType)?.label || quoteResult.jobType

    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Estimated Project Cost</p>
          <div className="text-4xl md:text-5xl font-black text-foreground font-mono mb-2">
            {formatPrice(quoteResult.low)} &ndash; {formatPrice(quoteResult.high)}
          </div>
          <p className="text-muted-foreground text-sm font-medium">
            {jobLabel} &bull; {quoteResult.assetCount} asset{quoteResult.assetCount !== 1 ? 's' : ''} &bull;{' '}
            {quoteResult.originZip} &rarr; {quoteResult.destinationZip}
          </p>
        </div>

        <p className="text-muted-foreground/70 text-xs text-center">
          Ballpark based on job type and asset volume. Get a detailed quote for compliance and handling costs.
        </p>

        <div className="space-y-3">
          <Button
            onClick={handleContinueToForm}
            variant="accent"
            size="xl"
            className="w-full"
          >
            Get Detailed Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleStartOver}
              variant="outline"
              size="lg"
              className="h-12"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12"
            >
              <a href={`tel:${PHONE_NUMBER}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Job Type Selector */}
      <div className="space-y-2">
        <Label className="text-foreground text-sm font-bold uppercase tracking-wide">Job Type</Label>
        <div className="grid grid-cols-1 gap-2">
          {jobTypeOptions.map((jt) => {
            const Icon = JOB_TYPE_ICONS[jt.icon] || Server
            const isSelected = selectedJobType === jt.value
            return (
              <button
                key={jt.value}
                type="button"
                onClick={() => handleJobTypeChange(jt.value as JobType)}
                className={cn(
                  "flex items-center gap-3 py-3 px-4 text-left text-sm transition-all border-2 border-border font-bold",
                  isSelected
                    ? "bg-accent text-accent-foreground brutal-shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-accent/20"
                )}
              >
                <Icon className={cn("h-4 w-4 flex-shrink-0", isSelected ? 'text-accent-foreground' : 'text-muted-foreground')} />
                <span>{jt.label}</span>
              </button>
            )
          })}
        </div>
        {errors.jobType && <p className="text-destructive text-sm font-bold">{errors.jobType.message}</p>}
      </div>

      {/* Asset Count */}
      <div className="space-y-2">
        <Label htmlFor="assetCount" className="text-foreground text-sm font-bold uppercase tracking-wide">
          Number of Assets
        </Label>
        <Input
          {...register('assetCount', { valueAsNumber: true })}
          id="assetCount"
          type="number"
          placeholder="e.g. 4 racks"
          min={1}
          max={500}
          className="h-12 text-base"
        />
        {errors.assetCount && <p className="text-destructive text-sm font-bold">{errors.assetCount.message}</p>}
      </div>

      {/* ZIP Code Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="miniOriginZip" className="text-foreground text-sm font-bold uppercase tracking-wide">
            Origin ZIP
          </Label>
          <Input
            {...register('originZip')}
            id="miniOriginZip"
            placeholder="e.g. 10001"
            maxLength={5}
            className="h-12 text-base"
          />
          {errors.originZip && <p className="text-destructive text-sm font-bold">{errors.originZip.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="miniDestZip" className="text-foreground text-sm font-bold uppercase tracking-wide">
            Destination ZIP
          </Label>
          <Input
            {...register('destinationZip')}
            id="miniDestZip"
            placeholder="e.g. 90210"
            maxLength={5}
            className="h-12 text-base"
          />
          {errors.destinationZip && <p className="text-destructive text-sm font-bold">{errors.destinationZip.message}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="accent"
        size="xl"
        className="w-full"
        disabled={isCalculating}
      >
        {isCalculating ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Calculating...
          </>
        ) : (
          <>
            <Calculator className="mr-2 h-5 w-5" />
            Get Ballpark Estimate
          </>
        )}
      </Button>
    </form>
  )
}
