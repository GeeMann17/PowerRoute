// Analytics utility functions for tracking events

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    gtag: (...args: unknown[]) => void
  }
}

// Push event to dataLayer (GTM)
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    })
  }
}

// Specific event trackers
export function trackQuoteStarted(jobType: string) {
  trackEvent('quote_started', {
    job_type: jobType,
  })
}

export function trackQuoteCompleted(params: {
  jobType: string
  quoteLow: number
  quoteHigh: number
}) {
  trackEvent('quote_completed', {
    job_type: params.jobType,
    quote_low: params.quoteLow,
    quote_high: params.quoteHigh,
  })
}

export function trackLeadSubmitted(params: {
  leadId: string
  jobType: string
  quoteLow: number
  quoteHigh: number
}) {
  trackEvent('lead_submitted', {
    lead_id: params.leadId,
    job_type: params.jobType,
    quote_low: params.quoteLow,
    quote_high: params.quoteHigh,
  })
}

export function trackFormStepCompleted(step: string) {
  trackEvent('form_step_completed', {
    step_name: step,
  })
}

export function trackPhoneClick(location: string) {
  trackEvent('phone_click', {
    click_location: location,
  })
}
