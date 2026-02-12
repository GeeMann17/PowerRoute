'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Network,
  Loader2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Building2,
  User,
  MapPin,
  ShieldCheck,
  KeyRound,
  Check,
} from 'lucide-react'
import { US_STATE_CODES, CERTIFICATIONS, EQUIPMENT_OPTIONS } from '@/lib/constants'
import { jobTypeOptions } from '@/types/leads'

// ============================================================
// Zod Schema
// ============================================================

const signupSchema = z
  .object({
    // Step 1: Company Info
    company_name: z.string().min(2, 'Company name is required'),
    website: z.string().url('Enter a valid URL').optional().or(z.literal('')),
    years_in_business: z.coerce.number().min(0, 'Must be 0 or more').max(200).optional(),
    description: z.string().max(1000, 'Max 1000 characters').optional().or(z.literal('')),

    // Step 2: Contact Info
    contact_name: z.string().min(2, 'Contact name is required'),
    contact_email: z.string().email('Enter a valid email'),
    contact_phone: z
      .string()
      .regex(/^[\d\s\-\(\)\+]*$/, 'Enter a valid phone number')
      .optional()
      .or(z.literal('')),

    // Step 3: Services
    nationwide: z.boolean().default(false),
    geographic_coverage: z.array(z.string()).default([]),
    job_types: z.array(z.string()).min(1, 'Select at least one service type'),
    specialties: z.array(z.string()).default([]),

    // Step 4: Credentials
    certifications: z.array(z.string()).default([]),
    equipment: z.array(z.string()).default([]),
    insurance_coverage: z.string().optional().or(z.literal('')),

    // Step 5: Account
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

type SignupFormData = z.infer<typeof signupSchema>

// ============================================================
// Steps Configuration
// ============================================================

const STEPS = [
  { id: 1, label: 'Company', icon: Building2 },
  { id: 2, label: 'Contact', icon: User },
  { id: 3, label: 'Services', icon: MapPin },
  { id: 4, label: 'Credentials', icon: ShieldCheck },
  { id: 5, label: 'Account', icon: KeyRound },
] as const

// Fields per step for partial validation
const STEP_FIELDS: Record<number, (keyof SignupFormData)[]> = {
  1: ['company_name', 'website', 'years_in_business', 'description'],
  2: ['contact_name', 'contact_email', 'contact_phone'],
  3: ['nationwide', 'geographic_coverage', 'job_types', 'specialties'],
  4: ['certifications', 'equipment', 'insurance_coverage'],
  5: ['password', 'confirm_password'],
}

// ============================================================
// Component
// ============================================================

export function SignupForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(signupSchema) as any,
    defaultValues: {
      company_name: '',
      website: '',
      years_in_business: undefined,
      description: '',
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      nationwide: false,
      geographic_coverage: [],
      job_types: [],
      specialties: [],
      certifications: [],
      equipment: [],
      insurance_coverage: '',
      password: '',
      confirm_password: '',
    },
    mode: 'onTouched',
  })

  const nationwideValue = watch('nationwide')
  const selectedStates = watch('geographic_coverage')
  const selectedJobTypes = watch('job_types')
  const selectedCertifications = watch('certifications')
  const selectedEquipment = watch('equipment')

  // ----------------------------------------------------------
  // Navigation
  // ----------------------------------------------------------

  const goNext = async () => {
    const fields = STEP_FIELDS[currentStep]
    const isValid = await trigger(fields)
    if (isValid && currentStep < 5) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // ----------------------------------------------------------
  // Toggle helpers
  // ----------------------------------------------------------

  function toggleArrayValue(field: 'geographic_coverage' | 'job_types' | 'specialties' | 'certifications' | 'equipment', value: string) {
    const current = watch(field) as string[]
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    setValue(field, updated, { shouldValidate: true })
  }

  // ----------------------------------------------------------
  // Submit
  // ----------------------------------------------------------

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/providers/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setSubmitError(result.error || 'Something went wrong. Please try again.')
        setIsSubmitting(false)
        return
      }

      // Redirect to pending page
      router.push('/providers/pending')
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
      setIsSubmitting(false)
    }
  }

  // ----------------------------------------------------------
  // Shared Styles
  // ----------------------------------------------------------

  const inputClass =
    'w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50'
  const labelClass = 'block text-sm font-medium text-zinc-300 mb-1.5'
  const errorClass = 'text-xs text-red-400 mt-1'
  const checkboxLabelClass =
    'flex items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-sm text-zinc-300 cursor-pointer hover:border-zinc-600 transition-colors has-[:checked]:border-blue-600 has-[:checked]:bg-blue-950/30'

  // ----------------------------------------------------------
  // Render Steps
  // ----------------------------------------------------------

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Network className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold text-zinc-100">PowerRoute</span>
        </div>
        <h1 className="text-xl font-semibold text-zinc-100">Apply as a Provider</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Join our network of vetted IT logistics providers
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`flex items-center justify-center h-10 w-10 rounded-full border-2 transition-colors ${
                    isCompleted
                      ? 'border-blue-500 bg-blue-600 text-white'
                      : isActive
                        ? 'border-blue-500 bg-zinc-900 text-blue-400'
                        : 'border-zinc-700 bg-zinc-900 text-zinc-500'
                  }`}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span
                  className={`text-xs mt-1.5 font-medium ${
                    isActive ? 'text-blue-400' : isCompleted ? 'text-zinc-300' : 'text-zinc-600'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Global Error */}
          {submitError && (
            <div className="flex items-center gap-2 p-3 mb-6 text-sm text-red-400 bg-red-950/50 border border-red-900 rounded-lg">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* ============================== */}
          {/* Step 1: Company Info */}
          {/* ============================== */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-zinc-100 mb-1">Company Information</h2>
              <p className="text-sm text-zinc-400 mb-4">Tell us about your business.</p>

              <div>
                <label htmlFor="company_name" className={labelClass}>
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="company_name"
                  {...register('company_name')}
                  placeholder="Acme IT Logistics"
                  className={inputClass}
                />
                {errors.company_name && <p className={errorClass}>{errors.company_name.message}</p>}
              </div>

              <div>
                <label htmlFor="website" className={labelClass}>
                  Website
                </label>
                <input
                  id="website"
                  {...register('website')}
                  placeholder="https://www.yourcompany.com"
                  className={inputClass}
                />
                {errors.website && <p className={errorClass}>{errors.website.message}</p>}
              </div>

              <div>
                <label htmlFor="years_in_business" className={labelClass}>
                  Years in Business
                </label>
                <input
                  id="years_in_business"
                  type="number"
                  {...register('years_in_business')}
                  placeholder="10"
                  className={inputClass}
                />
                {errors.years_in_business && (
                  <p className={errorClass}>{errors.years_in_business.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className={labelClass}>
                  Company Description
                </label>
                <textarea
                  id="description"
                  {...register('description')}
                  rows={4}
                  placeholder="Brief overview of your services and experience..."
                  className={`${inputClass} resize-none`}
                />
                {errors.description && <p className={errorClass}>{errors.description.message}</p>}
              </div>
            </div>
          )}

          {/* ============================== */}
          {/* Step 2: Contact Info */}
          {/* ============================== */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-zinc-100 mb-1">Contact Information</h2>
              <p className="text-sm text-zinc-400 mb-4">Primary point of contact for your company.</p>

              <div>
                <label htmlFor="contact_name" className={labelClass}>
                  Contact Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact_name"
                  {...register('contact_name')}
                  placeholder="John Smith"
                  className={inputClass}
                />
                {errors.contact_name && <p className={errorClass}>{errors.contact_name.message}</p>}
              </div>

              <div>
                <label htmlFor="contact_email" className={labelClass}>
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact_email"
                  type="email"
                  {...register('contact_email')}
                  placeholder="john@yourcompany.com"
                  className={inputClass}
                />
                {errors.contact_email && (
                  <p className={errorClass}>{errors.contact_email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact_phone" className={labelClass}>
                  Phone Number
                </label>
                <input
                  id="contact_phone"
                  type="tel"
                  {...register('contact_phone')}
                  placeholder="(555) 123-4567"
                  className={inputClass}
                />
                {errors.contact_phone && (
                  <p className={errorClass}>{errors.contact_phone.message}</p>
                )}
              </div>
            </div>
          )}

          {/* ============================== */}
          {/* Step 3: Services */}
          {/* ============================== */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-zinc-100 mb-1">Services & Coverage</h2>
              <p className="text-sm text-zinc-400 mb-4">
                What services do you offer and where do you operate?
              </p>

              {/* Nationwide Toggle */}
              <div>
                <label className={checkboxLabelClass}>
                  <input
                    type="checkbox"
                    {...register('nationwide')}
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <div>
                    <span className="font-medium text-zinc-200">Nationwide Coverage</span>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      We service all 50 states
                    </p>
                  </div>
                </label>
              </div>

              {/* State Selection */}
              {!nationwideValue && (
                <div>
                  <label className={labelClass}>
                    States Served
                    <span className="text-zinc-500 font-normal ml-1">
                      ({selectedStates.length} selected)
                    </span>
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-60 overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-800/50 p-3">
                    {US_STATE_CODES.map((code) => (
                      <label
                        key={code}
                        className={`flex items-center justify-center rounded px-2 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                          selectedStates.includes(code)
                            ? 'bg-blue-600 text-white'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selectedStates.includes(code)}
                          onChange={() => toggleArrayValue('geographic_coverage', code)}
                        />
                        {code}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Job Types / Specialties */}
              <div>
                <label className={labelClass}>
                  Service Types <span className="text-red-400">*</span>
                </label>
                <div className="space-y-2">
                  {jobTypeOptions.map((jt) => (
                    <label
                      key={jt.value}
                      className={checkboxLabelClass}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        checked={selectedJobTypes.includes(jt.value)}
                        onChange={() => toggleArrayValue('job_types', jt.value)}
                      />
                      <div>
                        <span className="font-medium text-zinc-200">{jt.label}</span>
                        <p className="text-xs text-zinc-500 mt-0.5">{jt.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.job_types && <p className={errorClass}>{errors.job_types.message}</p>}
              </div>
            </div>
          )}

          {/* ============================== */}
          {/* Step 4: Credentials */}
          {/* ============================== */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-zinc-100 mb-1">Credentials & Equipment</h2>
              <p className="text-sm text-zinc-400 mb-4">
                Tell us about your certifications and available equipment.
              </p>

              {/* Certifications */}
              <div>
                <label className={labelClass}>
                  Certifications
                  <span className="text-zinc-500 font-normal ml-1">
                    ({selectedCertifications.length} selected)
                  </span>
                </label>
                <div className="space-y-2">
                  {CERTIFICATIONS.map((cert) => (
                    <label
                      key={cert.value}
                      className={checkboxLabelClass}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        checked={selectedCertifications.includes(cert.value)}
                        onChange={() => toggleArrayValue('certifications', cert.value)}
                      />
                      <div>
                        <span className="font-medium text-zinc-200">{cert.label}</span>
                        <p className="text-xs text-zinc-500 mt-0.5">{cert.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div>
                <label className={labelClass}>
                  Equipment
                  <span className="text-zinc-500 font-normal ml-1">
                    ({selectedEquipment.length} selected)
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EQUIPMENT_OPTIONS.map((eq) => (
                    <label
                      key={eq.value}
                      className={checkboxLabelClass}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        checked={selectedEquipment.includes(eq.value)}
                        onChange={() => toggleArrayValue('equipment', eq.value)}
                      />
                      <span className="font-medium text-zinc-200">{eq.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Insurance */}
              <div>
                <label htmlFor="insurance_coverage" className={labelClass}>
                  Insurance Coverage
                </label>
                <input
                  id="insurance_coverage"
                  {...register('insurance_coverage')}
                  placeholder="e.g. $2M general liability, $1M cargo"
                  className={inputClass}
                />
                {errors.insurance_coverage && (
                  <p className={errorClass}>{errors.insurance_coverage.message}</p>
                )}
              </div>
            </div>
          )}

          {/* ============================== */}
          {/* Step 5: Account */}
          {/* ============================== */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-zinc-100 mb-1">Create Your Account</h2>
              <p className="text-sm text-zinc-400 mb-4">
                Set a password to access your vendor portal once approved.
              </p>

              <div>
                <label htmlFor="password" className={labelClass}>
                  Password <span className="text-red-400">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="Minimum 8 characters"
                  className={inputClass}
                />
                {errors.password && <p className={errorClass}>{errors.password.message}</p>}
              </div>

              <div>
                <label htmlFor="confirm_password" className={labelClass}>
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <input
                  id="confirm_password"
                  type="password"
                  {...register('confirm_password')}
                  placeholder="Re-enter your password"
                  className={inputClass}
                />
                {errors.confirm_password && (
                  <p className={errorClass}>{errors.confirm_password.message}</p>
                )}
              </div>

              <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  By creating an account, you agree to PowerRoute&apos;s Terms of Service and
                  Privacy Policy. Your application will be reviewed by our admin team before your
                  account is activated.
                </p>
              </div>
            </div>
          )}

          {/* ============================== */}
          {/* Navigation Buttons */}
          {/* ============================== */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <Link
                href="/providers/login"
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Already have an account?
              </Link>
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={goNext}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
