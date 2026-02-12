'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
  Server,
  Recycle,
  PackageSearch,
  Building2,
  Truck,
  MapPin,
  Package,
  ShieldCheck,
  Calendar,
  User,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Check,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import {
  quoteFormSchema,
  type QuoteFormData,
  jobTypeOptions,
  equipmentTypeOptions,
  handlingRequirementOptions,
  facilityTypeOptions,
  weightEstimateOptions,
  securityRequirementOptions,
  loadingDockOptions,
  JOB_TYPE_FIELD_CONFIG,
} from '@/types/leads'
import type { JobType } from '@/types/database'

// ============================================================
// Icon Map
// ============================================================

const JOB_TYPE_ICONS: Record<string, React.ElementType> = {
  Server,
  Recycle,
  PackageSearch,
  Building2,
  Truck,
}

// ============================================================
// Wizard Step Definitions
// ============================================================

interface WizardStep {
  id: string
  label: string
  icon: React.ElementType
  description: string
}

const ALL_STEPS: WizardStep[] = [
  { id: 'job-type', label: 'Job Type', icon: Package, description: 'Select your service' },
  { id: 'facilities', label: 'Facilities', icon: MapPin, description: 'Origin & destination' },
  { id: 'assets', label: 'Assets', icon: Server, description: 'Equipment details' },
  { id: 'compliance', label: 'Compliance', icon: ShieldCheck, description: 'Security & data' },
  { id: 'schedule', label: 'Schedule', icon: Calendar, description: 'Service date' },
  { id: 'contact', label: 'Contact', icon: User, description: 'Your information' },
]

function getVisibleSteps(jobType: JobType | undefined): WizardStep[] {
  if (!jobType) return ALL_STEPS
  const config = JOB_TYPE_FIELD_CONFIG[jobType]
  return ALL_STEPS.filter((step) => {
    if (step.id === 'compliance') return config.showComplianceStep
    return true
  })
}

// ============================================================
// Progress Bar
// ============================================================

function ProgressBar({
  steps,
  currentIndex,
}: {
  steps: WizardStep[]
  currentIndex: number
}) {
  return (
    <div className="mb-8">
      {/* Mobile: simple text */}
      <div className="flex items-center justify-between mb-3 sm:hidden">
        <span className="text-sm font-medium text-slate-300">
          Step {currentIndex + 1} of {steps.length}
        </span>
        <span className="text-sm text-slate-500">{steps[currentIndex]?.label}</span>
      </div>

      {/* Progress bar track */}
      <div className="w-full bg-slate-800 rounded-full h-2 mb-4 sm:mb-6">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Desktop: step labels */}
      <div className="hidden sm:grid gap-1" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        {steps.map((step, i) => {
          const StepIcon = step.icon
          const isActive = i === currentIndex
          const isComplete = i < currentIndex
          return (
            <div
              key={step.id}
              className={`flex flex-col items-center text-center gap-1 ${
                isActive ? 'text-blue-400' : isComplete ? 'text-green-400' : 'text-slate-600'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : isComplete
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-800 text-slate-500'
                }`}
              >
                {isComplete ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
              </div>
              <span className="text-xs font-medium">{step.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================
// Main QuoteForm Component
// ============================================================

export function QuoteForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const initialJobType = searchParams.get('jobType') as JobType | null

  const form = useForm<QuoteFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(quoteFormSchema) as any,
    defaultValues: {
      jobType: initialJobType || (undefined as unknown as JobType),
      company: '',
      title: '',
      originZip: searchParams.get('originZip') || '',
      originAddress: '',
      originFacilityType: '',
      originLoadingDock: '',
      originFloorLevel: undefined,
      originFreightElevator: false,
      originSecurityRequirements: '',
      destinationZip: searchParams.get('destinationZip') || '',
      destinationAddress: '',
      destinationFacilityType: '',
      destinationLoadingDock: '',
      destinationFloorLevel: undefined,
      destinationFreightElevator: false,
      destinationSecurityRequirements: '',
      numberOfRacks: undefined,
      numberOfLooseAssets: undefined,
      totalWeightEstimate: '',
      rackUnitCount: undefined,
      equipmentTypes: [],
      handlingRequirements: [],
      dataDestructionRequired: false,
      certificateOfDestructionNeeded: false,
      chainOfCustodyTracking: false,
      securityClearanceRequired: false,
      complianceNotes: '',
      serviceDate: '',
      isFlexible: false,
      name: '',
      email: '',
      phone: '',
      contactConsent: false,
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form

  const jobType = watch('jobType')
  const visibleSteps = getVisibleSteps(jobType)
  const currentStep = visibleSteps[currentStepIndex]
  const config = jobType ? JOB_TYPE_FIELD_CONFIG[jobType] : null

  // ---- Step validation fields ----
  function getFieldsForStep(stepId: string): (keyof QuoteFormData)[] {
    switch (stepId) {
      case 'job-type':
        return ['jobType']
      case 'facilities':
        return ['originZip']
      case 'assets':
        return []
      case 'compliance':
        return []
      case 'schedule':
        return ['serviceDate']
      case 'contact':
        return ['name', 'email', 'contactConsent']
      default:
        return []
    }
  }

  const goNext = async () => {
    const fields = getFieldsForStep(currentStep.id)
    const valid = fields.length === 0 || (await trigger(fields))
    if (valid && currentStepIndex < visibleSteps.length - 1) {
      setCurrentStepIndex((i) => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // ---- Submit ----
  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to submit quote request')
      }

      const result = await response.json()
      const params = new URLSearchParams({
        leadId: result.id,
        quoteLow: result.quoteLow.toString(),
        quoteHigh: result.quoteHigh.toString(),
        distanceMiles: result.distanceMiles?.toString() || '',
        originZip: result.originZip || '',
        destinationZip: result.destinationZip || '',
      })
      router.push(`/thank-you?${params.toString()}`)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  // ---- Toggle helpers ----
  const toggleArrayItem = (field: 'equipmentTypes' | 'handlingRequirements', value: string) => {
    const current = watch(field) || []
    const updated = current.includes(value)
      ? current.filter((item: string) => item !== value)
      : [...current, value]
    setValue(field, updated)
  }

  // ============================================================
  // Step Renderers
  // ============================================================

  const renderJobTypeStep = () => (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">What do you need done?</h2>
        <p className="text-slate-400 text-sm mt-1">We&apos;ll match you with providers who specialize in this exact service.</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {jobTypeOptions.map((jt) => {
          const Icon = JOB_TYPE_ICONS[jt.icon] || Server
          const isSelected = jobType === jt.value
          return (
            <button
              key={jt.value}
              type="button"
              onClick={() => setValue('jobType', jt.value as JobType)}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500/30'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <div
                className={`p-2.5 rounded-lg flex-shrink-0 ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <span className={`font-semibold block ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {jt.label}
                </span>
                <span className="text-sm text-slate-400 mt-0.5 block">{jt.description}</span>
              </div>
              {isSelected && (
                <div className="ml-auto flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-blue-400" />
                </div>
              )}
            </button>
          )
        })}
      </div>
      {errors.jobType && <p className="text-red-400 text-sm">{errors.jobType.message}</p>}
    </div>
  )

  const renderFacilitiesStep = () => {
    const showOrigin = config?.showOriginFacility !== false
    const showDest = config?.showDestinationFacility !== false

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">Where Are We Working?</h2>
          <p className="text-slate-400 text-sm mt-1">
            Facility details help us match you with providers who serve your area and meet your access requirements.
          </p>
        </div>

        {/* Origin Facility */}
        {showOrigin && (
          <div className="space-y-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-400" />
              {config?.showDestinationFacility ? 'Origin Facility' : 'Facility Location'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">ZIP Code *</Label>
                <Input
                  {...register('originZip')}
                  placeholder="e.g. 10001"
                  maxLength={5}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
                {errors.originZip && <p className="text-red-400 text-sm">{errors.originZip.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Street Address</Label>
                <Input
                  {...register('originAddress')}
                  placeholder="123 Tech Park Dr"
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Facility Type</Label>
                <Select onValueChange={(v) => setValue('originFacilityType', v)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {facilityTypeOptions.map((ft) => (
                      <SelectItem key={ft.value} value={ft.value}>
                        {ft.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Loading Dock</Label>
                <Select onValueChange={(v) => setValue('originLoadingDock', v)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingDockOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Floor Level</Label>
                <Input
                  {...register('originFloorLevel', { valueAsNumber: true })}
                  type="number"
                  placeholder="e.g. 2"
                  min={0}
                  max={99}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="flex items-end pb-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="originFreightElevator"
                    checked={watch('originFreightElevator') || false}
                    onCheckedChange={(checked) => setValue('originFreightElevator', !!checked)}
                  />
                  <Label htmlFor="originFreightElevator" className="text-slate-300 text-sm font-normal">
                    Freight elevator available
                  </Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Security Requirements</Label>
              <Select onValueChange={(v) => setValue('originSecurityRequirements', v)}>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {securityRequirementOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Destination Facility */}
        {showDest && (
          <div className="space-y-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-400" />
              Destination Facility
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">ZIP Code</Label>
                <Input
                  {...register('destinationZip')}
                  placeholder="e.g. 90210"
                  maxLength={5}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
                {errors.destinationZip && <p className="text-red-400 text-sm">{errors.destinationZip.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Street Address</Label>
                <Input
                  {...register('destinationAddress')}
                  placeholder="456 Data Center Blvd"
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Facility Type</Label>
                <Select onValueChange={(v) => setValue('destinationFacilityType', v)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {facilityTypeOptions.map((ft) => (
                      <SelectItem key={ft.value} value={ft.value}>
                        {ft.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Loading Dock</Label>
                <Select onValueChange={(v) => setValue('destinationLoadingDock', v)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingDockOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Floor Level</Label>
                <Input
                  {...register('destinationFloorLevel', { valueAsNumber: true })}
                  type="number"
                  placeholder="e.g. 1"
                  min={0}
                  max={99}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="flex items-end pb-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="destinationFreightElevator"
                    checked={watch('destinationFreightElevator') || false}
                    onCheckedChange={(checked) => setValue('destinationFreightElevator', !!checked)}
                  />
                  <Label htmlFor="destinationFreightElevator" className="text-slate-300 text-sm font-normal">
                    Freight elevator available
                  </Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Security Requirements</Label>
              <Select onValueChange={(v) => setValue('destinationSecurityRequirements', v)}>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {securityRequirementOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Company info (fits naturally on this step) */}
        <div className="space-y-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Building2 className="h-4 w-4 text-slate-400" />
            Company Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Company Name</Label>
              <Input
                {...register('company')}
                placeholder="Acme Corp"
                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Your Title / Role</Label>
              <Input
                {...register('title')}
                placeholder="e.g. IT Director"
                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderAssetsStep = () => {
    if (!config) return null
    const f = config.fields

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">What Are We Moving?</h2>
          <p className="text-slate-400 text-sm mt-1">
            The more detail you give us, the more accurate your estimate — and the better your provider match.
          </p>
        </div>

        {/* Quantity fields */}
        <div className="space-y-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="font-semibold text-white">Quantities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {f.numberOfRacks !== 'hidden' && (
              <div className="space-y-2">
                <Label className="text-slate-300">
                  Number of Racks {f.numberOfRacks === 'required' && '*'}
                </Label>
                <Input
                  {...register('numberOfRacks', { valueAsNumber: true })}
                  type="number"
                  placeholder="e.g. 4"
                  min={0}
                  max={500}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
                {errors.numberOfRacks && <p className="text-red-400 text-sm">{errors.numberOfRacks.message}</p>}
              </div>
            )}
            {f.numberOfLooseAssets !== 'hidden' && (
              <div className="space-y-2">
                <Label className="text-slate-300">
                  Loose Assets (units) {f.numberOfLooseAssets === 'required' && '*'}
                </Label>
                <Input
                  {...register('numberOfLooseAssets', { valueAsNumber: true })}
                  type="number"
                  placeholder="e.g. 25"
                  min={0}
                  max={10000}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {f.totalWeightEstimate !== 'hidden' && (
              <div className="space-y-2">
                <Label className="text-slate-300">
                  Estimated Weight {f.totalWeightEstimate === 'required' && '*'}
                </Label>
                <Select onValueChange={(v) => setValue('totalWeightEstimate', v)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    {weightEstimateOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {f.rackUnitCount !== 'hidden' && (
              <div className="space-y-2">
                <Label className="text-slate-300">
                  Total Rack Units (U) {f.rackUnitCount === 'required' && '*'}
                </Label>
                <Input
                  {...register('rackUnitCount', { valueAsNumber: true })}
                  type="number"
                  placeholder="e.g. 168"
                  min={0}
                  max={5000}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Equipment Types */}
        {f.equipmentTypes !== 'hidden' && (
          <div className="space-y-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="font-semibold text-white">
              Equipment Types {f.equipmentTypes === 'required' && '*'}
            </h3>
            <p className="text-sm text-slate-400">Select all that apply:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {equipmentTypeOptions.map((eq) => {
                const selected = (watch('equipmentTypes') || []).includes(eq.value)
                return (
                  <button
                    key={eq.value}
                    type="button"
                    onClick={() => toggleArrayItem('equipmentTypes', eq.value)}
                    className={`p-3 rounded-lg border text-sm font-medium text-left transition-all ${
                      selected
                        ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                        : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                    }`}
                  >
                    {eq.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Handling Requirements */}
        {f.handlingRequirements !== 'hidden' && (
          <div className="space-y-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <h3 className="font-semibold text-white">
              Handling Requirements {f.handlingRequirements === 'required' && '*'}
            </h3>
            <p className="text-sm text-slate-400">Select any special handling needs:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {handlingRequirementOptions.map((hr) => {
                const selected = (watch('handlingRequirements') || []).includes(hr.value)
                return (
                  <button
                    key={hr.value}
                    type="button"
                    onClick={() => toggleArrayItem('handlingRequirements', hr.value)}
                    className={`p-3 rounded-lg border text-sm font-medium text-left transition-all ${
                      selected
                        ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                        : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                    }`}
                  >
                    {hr.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderComplianceStep = () => {
    if (!config) return null
    const f = config.fields

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">Compliance & Security Needs</h2>
          <p className="text-slate-400 text-sm mt-1">
            These requirements determine which certified providers qualify for your project. Check everything that applies.
          </p>
        </div>

        <div className="space-y-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
          {f.dataDestructionRequired !== 'hidden' && (
            <div className="flex items-start gap-3 py-3 border-b border-slate-700 last:border-0">
              <Checkbox
                id="dataDestructionRequired"
                checked={watch('dataDestructionRequired') || false}
                onCheckedChange={(c) => setValue('dataDestructionRequired', !!c)}
              />
              <div>
                <Label htmlFor="dataDestructionRequired" className="text-white font-medium">
                  Data Destruction Required {f.dataDestructionRequired === 'required' && '*'}
                </Label>
                <p className="text-sm text-slate-400 mt-0.5">
                  On-site or certified data wiping / degaussing / shredding per NIST 800-88
                </p>
              </div>
            </div>
          )}

          {f.certificateOfDestructionNeeded !== 'hidden' && (
            <div className="flex items-start gap-3 py-3 border-b border-slate-700 last:border-0">
              <Checkbox
                id="certificateOfDestructionNeeded"
                checked={watch('certificateOfDestructionNeeded') || false}
                onCheckedChange={(c) => setValue('certificateOfDestructionNeeded', !!c)}
              />
              <div>
                <Label htmlFor="certificateOfDestructionNeeded" className="text-white font-medium">
                  Certificate of Destruction Needed {f.certificateOfDestructionNeeded === 'required' && '*'}
                </Label>
                <p className="text-sm text-slate-400 mt-0.5">
                  Serialized CoD with audit trail for each asset
                </p>
              </div>
            </div>
          )}

          {f.chainOfCustodyTracking !== 'hidden' && (
            <div className="flex items-start gap-3 py-3 border-b border-slate-700 last:border-0">
              <Checkbox
                id="chainOfCustodyTracking"
                checked={watch('chainOfCustodyTracking') || false}
                onCheckedChange={(c) => setValue('chainOfCustodyTracking', !!c)}
              />
              <div>
                <Label htmlFor="chainOfCustodyTracking" className="text-white font-medium">
                  Chain of Custody Tracking {f.chainOfCustodyTracking === 'required' && '*'}
                </Label>
                <p className="text-sm text-slate-400 mt-0.5">
                  Full chain of custody documentation from pickup to final disposition
                </p>
              </div>
            </div>
          )}

          {f.securityClearanceRequired !== 'hidden' && (
            <div className="flex items-start gap-3 py-3 border-b border-slate-700 last:border-0">
              <Checkbox
                id="securityClearanceRequired"
                checked={watch('securityClearanceRequired') || false}
                onCheckedChange={(c) => setValue('securityClearanceRequired', !!c)}
              />
              <div>
                <Label htmlFor="securityClearanceRequired" className="text-white font-medium">
                  Security Clearance Required {f.securityClearanceRequired === 'required' && '*'}
                </Label>
                <p className="text-sm text-slate-400 mt-0.5">
                  Background-checked laborers with valid IDs for secure facility access
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Compliance Notes */}
        <div className="space-y-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
          <Label className="text-white font-medium">Additional Compliance Notes</Label>
          <textarea
            {...register('complianceNotes')}
            placeholder="Any specific regulatory requirements, certifications needed, or special instructions..."
            rows={3}
            className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>
    )
  }

  const renderScheduleStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">When Do You Need This Done?</h2>
        <p className="text-slate-400 text-sm mt-1">Most projects are scheduled within 5-10 business days of matching. Emergency timelines available.</p>
      </div>

      <div className="space-y-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
        <div className="space-y-2">
          <Label className="text-white font-medium">Preferred Service Date *</Label>
          <Input
            type="date"
            {...register('serviceDate')}
            min={format(new Date(), 'yyyy-MM-dd')}
            className="bg-slate-900 border-slate-700 text-white h-12"
          />
          {errors.serviceDate && <p className="text-red-400 text-sm">{errors.serviceDate.message}</p>}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Checkbox
            id="isFlexible"
            checked={watch('isFlexible') || false}
            onCheckedChange={(c) => setValue('isFlexible', !!c)}
          />
          <Label htmlFor="isFlexible" className="text-slate-300 text-sm font-normal">
            My dates are flexible (+/- a few days)
          </Label>
        </div>
      </div>
    </div>
  )

  const renderContactStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Almost Done — Where Should We Send Your Match?</h2>
        <p className="text-slate-400 text-sm mt-1">
          Your matched provider will contact you directly with a detailed scope and pricing.
        </p>
      </div>

      <div className="space-y-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white font-medium">Full Name *</Label>
            <Input
              {...register('name')}
              placeholder="John Smith"
              className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-white font-medium">Phone Number</Label>
            <Input
              {...register('phone')}
              placeholder="(555) 123-4567"
              type="tel"
              className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            />
            {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-white font-medium">Email Address *</Label>
          <Input
            {...register('email')}
            placeholder="john@company.com"
            type="email"
            className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
        </div>
      </div>

      {/* TCPA Consent */}
      <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
        <div className="flex items-start gap-3">
          <Checkbox
            id="contactConsent"
            checked={watch('contactConsent') === true}
            onCheckedChange={(c) => setValue('contactConsent', c === true)}
          />
          <div className="space-y-1">
            <Label htmlFor="contactConsent" className="text-sm text-slate-300 font-normal leading-relaxed">
              I agree to be contacted by PowerRoute and its certified vendor partners via phone, email, or SMS
              regarding my IT logistics quote. I understand that I can opt out at any time. *
            </Label>
            {errors.contactConsent && <p className="text-red-400 text-sm">{errors.contactConsent.message}</p>}
          </div>
        </div>
      </div>
    </div>
  )

  // ---- Step Router ----
  const renderStep = () => {
    switch (currentStep?.id) {
      case 'job-type':
        return renderJobTypeStep()
      case 'facilities':
        return renderFacilitiesStep()
      case 'assets':
        return renderAssetsStep()
      case 'compliance':
        return renderComplianceStep()
      case 'schedule':
        return renderScheduleStep()
      case 'contact':
        return renderContactStep()
      default:
        return null
    }
  }

  const isLastStep = currentStepIndex === visibleSteps.length - 1

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ProgressBar steps={visibleSteps} currentIndex={currentStepIndex} />

      {/* Current Step Content */}
      <div className="min-h-[400px]">{renderStep()}</div>

      {/* Navigation */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            disabled={currentStepIndex === 0}
            className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>

          {isLastStep ? (
            <Button
              type="submit"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Getting Your Quote...
                </>
              ) : (
                <>
                  Get My Free Quote
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              size="lg"
              onClick={goNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8"
            >
              Continue
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>

      <p className="text-center text-sm text-slate-500">
        100% free. No credit card. No obligation. Your info is never sold.
      </p>
    </form>
  )
}
