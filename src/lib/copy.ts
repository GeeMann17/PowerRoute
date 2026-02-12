// =============================================================================
// Copy Persona System
// =============================================================================
// Three audience-specific copy sets: Enterprise, Mid-Market, Fast-Track.
// Mid-Market is the default (widest audience). Enterprise and Fast-Track are
// activated via URL path, query param, UTM, or localStorage persistence.
//
// See docs/COPY_STRATEGY.md for the full strategy document.
// =============================================================================

export type CopyPersona = 'enterprise' | 'midmarket' | 'fast'

export const COPY_PERSONA_STORAGE_KEY = 'powerroute-copy-persona'

export const PERSONA_LABELS: Record<CopyPersona, string> = {
  enterprise: 'Enterprise',
  midmarket: 'Mid-Market',
  fast: 'Fast-Track',
}

export const DEFAULT_PERSONA: CopyPersona = 'midmarket'

// =============================================================================
// Copy Set Type
// =============================================================================

export interface CopySet {
  // Hero
  heroBadge: string
  heroHeadline: string
  heroHighlight: string
  heroDescription: string
  heroBullets: string[]
  heroPrimaryCta: string
  heroSecondaryCta: string

  // Stats bar
  statsBar: { value: string; label: string }[]

  // Risk / trust section
  riskHeadline: string
  riskDescription: string
  riskFollowUp: string
  riskCta: string

  // How it works
  howItWorksHeadline: string
  howItWorksDescription: string
  howItWorksSteps: { title: string; description: string }[]

  // Testimonials framing
  testimonialsHeadline: string
  testimonialsDescription: string
  testimonialOutcomes: string[] // reframed outcome labels for the 3 testimonials

  // FAQ
  faqHeadline: string
  faqDescription: string
  faqs: { question: string; answer: string }[]

  // Mini calculator
  calculatorHeadline: string
  calculatorSubheadline: string

  // Final CTA
  finalCtaHeadline: string
  finalCtaDescription: string
  finalCtaUrgency: string
  finalCtaPrimary: string
  finalCtaSecondary: string
  finalCtaFooterItems: string[]

  // Page-specific CTAs
  pageCtas: {
    homepage: string
    dcRelocation: string
    itad: string
    assetRecovery: string
    officeDecommission: string
    whiteGloveDelivery: string
    about: string
    quoteForm: string
    blog: string
  }
  secondaryCta: string

  // Service page headlines (5 services)
  serviceHeadlines: {
    dcRelocation: { h1: string; riskFocus: string }
    itad: { h1: string; riskFocus: string }
    assetRecovery: { h1: string; riskFocus: string }
    officeDecommission: { h1: string; riskFocus: string }
    whiteGloveDelivery: { h1: string; riskFocus: string }
  }

  // Quote form
  quoteFormHeadline: string
  quoteFormDescription: string
  quoteFormSubmitButton: string

  // Blog
  blogDescription: string
  blogCta: string
  blogInArticleCta: string
}

// =============================================================================
// Enterprise Copy Set
// =============================================================================

const enterpriseCopy: CopySet = {
  // Hero
  heroBadge: 'Trusted by 500+ Enterprise IT Teams',
  heroHeadline: 'Mission-Critical Deployments Demand',
  heroHighlight: 'Mission-Critical Logistics.',
  heroDescription:
    'Your infrastructure is too valuable for unvetted crews. PowerRoute matches you with pre-certified IT logistics providers in minutes — not weeks. Free to use. Zero obligation.',
  heroBullets: [
    '14,200+ racks relocated — zero lost assets',
    'Every provider R2 & NAID AAA certified',
    'Matched in under 10 minutes',
  ],
  heroPrimaryCta: 'Get Matched Now',
  heroSecondaryCta: 'Talk to a Human',

  // Stats bar
  statsBar: [
    { value: '14,200+', label: 'Racks Relocated' },
    { value: '99.7%', label: 'Destruction Rate' },
    { value: '100%', label: 'Chain of Custody' },
    { value: 'SOC 2', label: 'Verified Providers' },
  ],

  // Risk
  riskHeadline: 'The Cost of an Unqualified Crew: $142,000.',
  riskDescription:
    'Broken chain of custody. Drives wiped by an uncertified crew. Laborers without clearances in your secure facility. A single compliance failure triggers audits, fines, and client trust that takes years to rebuild.',
  riskFollowUp:
    'Enterprise IT teams rarely have weeks to vet logistics vendors. PowerRoute has already rejected 60% of applicants and certified the remaining 340+ providers — so your team can focus on what matters.',
  riskCta: 'Eliminate the Risk — Get Matched Free',

  // How it works
  howItWorksHeadline: 'Matched in Minutes. Not Weeks.',
  howItWorksDescription:
    'No RFPs. No vendor spreadsheets. No 3-week evaluation cycles. You describe the job. We find the certified crew.',
  howItWorksSteps: [
    {
      title: 'Scope Your Project',
      description:
        'Equipment type, facility access requirements, compliance needs. Three minutes is all it takes.',
    },
    {
      title: 'We Deploy the Right Team',
      description:
        'Our specialists review your scope and match you with 1-3 pre-vetted providers who specialize in your exact job type and region.',
    },
    {
      title: 'Your Provider Engages Directly',
      description:
        'Detailed scope review, transparent pricing, and full chain of custody documentation before a single asset moves.',
    },
  ],

  // Testimonials
  testimonialsHeadline: 'Results.',
  testimonialsDescription:
    'What happens when enterprise IT teams work with pre-vetted providers.',
  testimonialOutcomes: [
    '120 racks moved — 0 downtime, 0 lost assets',
    '3,000 assets retired — $47K recovered',
    '8 racks delivered — cleared facility, 6 hours',
  ],

  // FAQ
  faqHeadline: 'Common Questions',
  faqDescription: 'What enterprise IT teams ask before every engagement.',
  faqs: [
    {
      question: 'Why not hire a logistics company directly?',
      answer:
        "You can — if you have 3-4 weeks to evaluate vendors, verify certifications, check insurance, confirm clearances, and negotiate pricing. Most enterprise IT teams don't. PowerRoute maintains a pre-vetted network of 340+ certified providers and matches your project to the right specialist based on job type, geography, and compliance requirements. You skip the entire RFP process.",
    },
    {
      question: 'What certifications do your providers hold?',
      answer:
        'Every provider in our network maintains current R2, e-Stewards, NAID AAA, and SOC 2 Type II certifications — verified annually, not just claimed. For government and secure facility work, we match providers with appropriate security clearances and full DOT compliance. We reject roughly 60% of providers who apply to join our network.',
    },
    {
      question: 'How is chain of custody guaranteed?',
      answer:
        'Every provider follows our standardized chain of custody protocol: serial number inventory at pickup, tamper-evident seals on every container, live GPS tracking in transit, and verified handoff with timestamps and signatures at delivery. If a seal is broken or a scan is missed, our system flags it immediately. 100% compliance rate across 14,200+ rack moves.',
    },
    {
      question:
        'Can your providers access classified or high-security facilities?',
      answer:
        'Yes. All providers carry background-checked laborers with valid government IDs as baseline. For classified environments, we match providers whose crews hold TS/SCI or other required clearances and who comply with your specific facility access protocols. We handle SCIF environments, government data centers, and financial institutions regularly.',
    },
    {
      question: 'How fast will I hear from a matched provider?',
      answer:
        'We review your project scope and match you with qualified providers in under 10 minutes. Most customers receive their first provider contact within hours of submitting. For emergency projects, we expedite matching immediately.',
    },
    {
      question: 'What does this cost?',
      answer:
        "Using PowerRoute is completely free. We're compensated by the providers in our network, not by you. There's no commitment, no credit card required, and no obligation to accept a match. You receive competitive, transparent pricing directly from the matched provider.",
    },
  ],

  // Mini calculator
  calculatorHeadline: 'What Will This Cost?',
  calculatorSubheadline: '30-second estimate. No email required. No strings.',

  // Final CTA
  finalCtaHeadline: 'Your Infrastructure Deserves Better Than a Guess.',
  finalCtaDescription:
    'Three minutes to scope your project. Matched with a certified provider in minutes. Zero cost. Zero obligation.',
  finalCtaUrgency: "We'll contact you in 10 minutes or less.",
  finalCtaPrimary: 'Get Matched Now',
  finalCtaSecondary: 'Talk to a Human',
  finalCtaFooterItems: [
    '340+ Vetted Providers',
    'No Credit Card',
    '100% Chain of Custody',
  ],

  // Page CTAs
  pageCtas: {
    homepage: 'Get Matched Now',
    dcRelocation: 'Get Matched with a DC Relocation Provider',
    itad: 'Get Matched with a Certified ITAD Provider',
    assetRecovery: 'Get Matched with a Recovery Provider',
    officeDecommission: 'Get Matched with a Decommission Provider',
    whiteGloveDelivery: 'Get Matched with a White Glove Provider',
    about: 'Get Your Free Provider Match',
    quoteForm: 'Get My Free Quote',
    blog: 'Get Your Free Match',
  },
  secondaryCta: 'Talk to a Human',

  // Service headlines
  serviceHeadlines: {
    dcRelocation: {
      h1: "A 120-Rack Migration With Zero Downtime Isn't Luck. It's Vetting.",
      riskFocus:
        '$9,000/min downtime, chain of custody gaps, uncertified crews',
    },
    itad: {
      h1: "'We Wiped the Drives' Doesn't Survive an Audit.",
      riskFocus: 'Audit failure, data breach, HIPAA/PCI violations',
    },
    assetRecovery: {
      h1: 'Your Assets Are Sitting in a Building You No Longer Control.',
      riskFocus:
        'Compliance gaps, untracked assets, security exposure across sites',
    },
    officeDecommission: {
      h1: 'Your Lease Expires in 30 Days. 200 Workstations Need to Disappear.',
      riskFocus:
        'Holdover rent, data left behind on drives, regulatory exposure',
    },
    whiteGloveDelivery: {
      h1: "Your Servers Aren't Furniture. Stop Shipping Them Like It.",
      riskFocus:
        '$200K equipment damage, unclearanced crews, temperature damage',
    },
  },

  // Quote form
  quoteFormHeadline: 'Get Matched with a Certified Provider in Under 2 Hours',
  quoteFormDescription:
    "Tell us about your project — takes about 3 minutes. You'll get an instant cost estimate and a matched provider who specializes in your exact job type.",
  quoteFormSubmitButton: 'Get My Free Quote',

  // Blog
  blogDescription:
    'Compliance resources from the team that vets 340+ IT logistics providers.',
  blogCta: 'Need a Provider, Not a Blog Post?',
  blogInArticleCta: 'Get Matched with a Certified Provider',
}

// =============================================================================
// Mid-Market Copy Set (DEFAULT)
// =============================================================================

const midmarketCopy: CopySet = {
  // Hero
  heroBadge: '340+ Vetted Providers Nationwide',
  heroHeadline: 'The Right IT Logistics Provider.',
  heroHighlight: 'Found in Minutes, Not Weeks.',
  heroDescription:
    "Stop calling around. PowerRoute has already vetted 340+ IT logistics providers nationwide. Tell us what you need — we'll match you with the right one. Always free.",
  heroBullets: [
    '340+ vetted providers across all 50 states',
    'Matched in minutes, not weeks',
    "100% free — we're paid by providers, not you",
  ],
  heroPrimaryCta: 'Find My Provider',
  heroSecondaryCta: 'Call Us Instead',

  // Stats bar
  statsBar: [
    { value: '340+', label: 'Vetted Providers' },
    { value: '14,200+', label: 'Racks Moved' },
    { value: '< 2 Hr', label: 'Match Time' },
    { value: 'Free', label: 'Always' },
  ],

  // Risk
  riskHeadline: 'Hiring the Wrong Vendor Wastes More Than Money.',
  riskDescription:
    "It wastes your time vetting, your team's patience dealing with no-shows, and your reputation when the job goes sideways. We've already vetted 340+ providers so you don't have to start from scratch.",
  riskFollowUp:
    'Every provider in our network is certified, insured, and background-checked. We reject 60% of applicants so you get the ones who actually deliver.',
  riskCta: 'Find a Provider You Can Trust',

  // How it works
  howItWorksHeadline: 'How It Works',
  howItWorksDescription:
    'No vendor spreadsheets. No calling around. Just tell us what you need.',
  howItWorksSteps: [
    {
      title: 'Tell Us What You Need',
      description: 'Job type, location, timeline. Takes about 3 minutes.',
    },
    {
      title: 'We Find the Right Provider',
      description:
        'From our network of 340+ vetted providers, we match you with specialists in your exact job type and area.',
    },
    {
      title: 'They Reach Out to You',
      description:
        'Your matched provider contacts you directly with pricing and a plan. No middlemen, no markup.',
    },
  ],

  // Testimonials
  testimonialsHeadline: 'What Our Clients Say',
  testimonialsDescription:
    'Real projects. Real timelines. Real outcomes.',
  testimonialOutcomes: [
    '120 racks moved in a single weekend',
    '3,000 assets retired — $47K recovered',
    'Provider found in hours, job done in 6',
  ],

  // FAQ
  faqHeadline: 'Questions & Answers',
  faqDescription: "Everything you need to know before getting started.",
  faqs: [
    {
      question: 'How is this different from Googling for vendors?',
      answer:
        "Google gives you a list. We give you the right one. Every provider in our network has been vetted for certifications, insurance, track record, and crew quality. You skip the weeks of research and go straight to a qualified provider who specializes in your exact job type.",
    },
    {
      question: 'How do you vet your providers?',
      answer:
        "We verify current certifications (R2, NAID AAA, SOC 2), confirm insurance coverage, check crew backgrounds, and review track records. About 60% of applicants don't make the cut. The ones in our network are providers we'd trust with our own equipment.",
    },
    {
      question: "What if I'm not happy with the match?",
      answer:
        "Let us know and we'll rematch you — no cost, no hassle. Our goal is getting you the right provider, not just any provider. If the first match isn't the right fit, we'll find someone who is.",
    },
    {
      question: 'How fast can a provider start?',
      answer:
        'Most providers in our network can mobilize within 1-2 weeks for standard jobs. For urgent projects, many can start within days. When you submit your project, include your timeline and we\'ll prioritize providers who can meet it.',
    },
    {
      question: 'What does this cost me?',
      answer:
        "Nothing. PowerRoute is completely free for you. We're paid by the providers in our network — you never pay us a fee. The pricing you receive comes directly from the provider with no markup.",
    },
    {
      question: 'Do you handle small jobs or just enterprise?',
      answer:
        'We handle everything from a 4-rack move to a 500-rack data center migration. Our providers range from specialized local crews to national logistics companies. Whatever the size, we match you with someone who fits.',
    },
  ],

  // Mini calculator
  calculatorHeadline: 'Get a Quick Estimate',
  calculatorSubheadline: 'Ballpark pricing in 30 seconds. No signup needed.',

  // Final CTA
  finalCtaHeadline: 'Ready to Find the Right Provider?',
  finalCtaDescription:
    "Tell us what you need. We'll match you with a vetted specialist — usually within a couple hours. Always free.",
  finalCtaUrgency: "Most clients hear back within 2 hours.",
  finalCtaPrimary: 'Find My Provider',
  finalCtaSecondary: 'Call Us Instead',
  finalCtaFooterItems: [
    '340+ Vetted Providers',
    'No Credit Card',
    'Always Free',
  ],

  // Page CTAs
  pageCtas: {
    homepage: 'Find My Provider',
    dcRelocation: 'Find a DC Relocation Provider',
    itad: 'Find an ITAD Provider',
    assetRecovery: 'Find a Recovery Provider',
    officeDecommission: 'Find a Decommission Crew',
    whiteGloveDelivery: 'Find a White Glove Provider',
    about: 'Find Your Provider',
    quoteForm: 'Get My Quote',
    blog: 'Find a Provider',
  },
  secondaryCta: 'Call Us Instead',

  // Service headlines
  serviceHeadlines: {
    dcRelocation: {
      h1: "Data Center Migrations Done Right. Without the 3-Week Vendor Search.",
      riskFocus: 'Delays, budget overruns, unreliable vendors',
    },
    itad: {
      h1: 'Retire Your IT Assets Without the Compliance Headache.',
      riskFocus: 'Compliance paperwork, lost asset value, vendor uncertainty',
    },
    assetRecovery: {
      h1: "Scattered Assets? We'll Get Them Back — Documented.",
      riskFocus: 'Time wasted coordinating multi-site pickups',
    },
    officeDecommission: {
      h1: 'Closing an Office? Get the IT Stripped Out — On Schedule.',
      riskFocus: 'Missing the deadline, data security, coordination hassle',
    },
    whiteGloveDelivery: {
      h1: "IT Equipment Delivery That Doesn't End in an Insurance Claim.",
      riskFocus: 'Damaged equipment, unreliable delivery, surprise costs',
    },
  },

  // Quote form
  quoteFormHeadline: 'Find the Right Provider for Your Project',
  quoteFormDescription:
    "Tell us what you need and we'll match you with a vetted provider who specializes in your type of job.",
  quoteFormSubmitButton: 'Get My Quote',

  // Blog
  blogDescription:
    'Practical guides from the team behind 340+ vetted IT logistics providers.',
  blogCta: 'Ready to Find Your Provider?',
  blogInArticleCta: 'Find the Right Provider',
}

// =============================================================================
// Fast-Track Copy Set
// =============================================================================

const fastCopy: CopySet = {
  // Hero
  heroBadge: 'Free. Fast. No BS.',
  heroHeadline: "Need Racks Moved?",
  heroHighlight: "We'll Find Your Crew Today.",
  heroDescription:
    "3 minutes to describe the job. We match you with a vetted provider. That's it. No RFPs, no spreadsheets, no BS.",
  heroBullets: [
    'Tell us what you need — takes 3 minutes',
    'We find the right crew — takes us 10 minutes',
    'Totally free — no catch',
  ],
  heroPrimaryCta: 'Start Now',
  heroSecondaryCta: 'Call Right Now',

  // Stats bar
  statsBar: [
    { value: '3 Min', label: 'To Submit' },
    { value: '10 Min', label: 'To Match' },
    { value: '340+', label: 'Providers' },
    { value: '$0', label: 'Cost to You' },
  ],

  // Risk
  riskHeadline: "You Don't Have Time to Call 10 Companies.",
  riskDescription:
    "You have a job that needs doing and a deadline that's already too close. We'll find you a vetted provider today — not next week.",
  riskFollowUp:
    "Every provider in our network is certified and insured. We've done the homework so you don't have to.",
  riskCta: "Let's Get You Matched",

  // How it works
  howItWorksHeadline: 'Three Steps. Done.',
  howItWorksDescription: "Here's literally the whole process.",
  howItWorksSteps: [
    {
      title: 'Describe the Job',
      description: 'What, where, when. 3 minutes.',
    },
    {
      title: 'We Match You',
      description: 'Right provider, right skills, your area. 10 minutes.',
    },
    {
      title: 'They Call You',
      description: 'Direct line. Real pricing. No runaround.',
    },
  ],

  // Testimonials
  testimonialsHeadline: "Don't Take Our Word for It",
  testimonialsDescription: 'Real jobs. Fast turnaround.',
  testimonialOutcomes: [
    'Found a provider in hours, racks moved by the weekend',
    '3,000 assets gone — $47K back in the budget',
    'Form at 10am, provider on the phone by lunch',
  ],

  // FAQ
  faqHeadline: 'Quick Answers',
  faqDescription: 'The stuff you actually want to know.',
  faqs: [
    {
      question: 'How fast can you match me?',
      answer:
        'Most matches happen within 10 minutes of submission. Your matched provider typically reaches out within a couple hours. For urgent jobs, let us know in the form and we prioritize you.',
    },
    {
      question: 'Is this actually free?',
      answer:
        "Yes, 100%. We're paid by the providers in our network. You never pay us a cent. The quote you receive comes directly from the provider — no markup, no hidden fees.",
    },
    {
      question: 'What if I need someone this week?',
      answer:
        "Many of our providers can mobilize within days. When you submit your project, mark it as urgent and we'll match you with providers who can meet your timeline.",
    },
    {
      question: 'How do I know the providers are legit?',
      answer:
        "We vet every provider for certifications, insurance, crew backgrounds, and track record. About 60% of applicants don't make it into our network. The ones we match you with are providers we'd trust with our own equipment.",
    },
    {
      question: 'What if the quote is too high?',
      answer:
        "You're never obligated to accept. If the pricing doesn't work, we can rematch you with another provider at no cost. Our goal is finding you the right fit, not just any fit.",
    },
    {
      question: 'Can I talk to a person right now?',
      answer:
        "Absolutely. Call us directly or hit the 'Call Right Now' button. A real person will answer — no phone trees, no hold music.",
    },
  ],

  // Mini calculator
  calculatorHeadline: 'How Much? Find Out Now.',
  calculatorSubheadline: '30 seconds. Free. Go.',

  // Final CTA
  finalCtaHeadline: "Let's Get This Done.",
  finalCtaDescription:
    '3 minutes. Free. No commitment. Just tell us what you need.',
  finalCtaUrgency: "Matched in 10 minutes or less.",
  finalCtaPrimary: 'Start Now',
  finalCtaSecondary: 'Call Right Now',
  finalCtaFooterItems: [
    '340+ Providers',
    'No Commitment',
    'Always Free',
  ],

  // Page CTAs
  pageCtas: {
    homepage: 'Start Now',
    dcRelocation: 'Get a DC Relocation Quote',
    itad: 'Get an ITAD Quote',
    assetRecovery: 'Get Started',
    officeDecommission: 'Get a Decommission Quote',
    whiteGloveDelivery: 'Get a Delivery Quote',
    about: 'Get Started Free',
    quoteForm: 'Get My Quote',
    blog: 'Get Started',
  },
  secondaryCta: 'Call Right Now',

  // Service headlines
  serviceHeadlines: {
    dcRelocation: {
      h1: "Moving Racks? We'll Find Your Crew.",
      riskFocus: 'Wasting time calling around, missed deadlines',
    },
    itad: {
      h1: 'Old Equipment? Get Rid of It the Right Way.',
      riskFocus: 'Just need it gone properly, fast',
    },
    assetRecovery: {
      h1: "Need Equipment Retrieved? We'll Handle It.",
      riskFocus: 'Need stuff picked up from a specific location, quickly',
    },
    officeDecommission: {
      h1: "Office Closing? We'll Clear the IT.",
      riskFocus: 'Everything needs to be gone by a specific date',
    },
    whiteGloveDelivery: {
      h1: 'Servers Need to Get There in One Piece? Done.',
      riskFocus: 'Need it delivered safely, on time',
    },
  },

  // Quote form
  quoteFormHeadline: 'Quick Quote — Takes 3 Minutes',
  quoteFormDescription:
    "Describe the job. Get an estimate. We'll find your crew.",
  quoteFormSubmitButton: 'Get My Quote',

  // Blog
  blogDescription:
    'Quick reads to help you move, retire, or recover IT equipment.',
  blogCta: "Done Reading? Let's Get You Matched.",
  blogInArticleCta: 'Get Started Free',
}

// =============================================================================
// Copy Sets Map
// =============================================================================

export const COPY_SETS: Record<CopyPersona, CopySet> = {
  enterprise: enterpriseCopy,
  midmarket: midmarketCopy,
  fast: fastCopy,
}

// =============================================================================
// Persona Detection (client-side)
// =============================================================================

/**
 * Detect persona from the current browser URL + localStorage.
 * Priority: URL path > query param > UTM > localStorage > default
 */
export function detectPersona(): CopyPersona {
  if (typeof window === 'undefined') return DEFAULT_PERSONA

  const url = new URL(window.location.href)
  const pathname = url.pathname

  // 1. URL path override
  if (pathname.startsWith('/enterprise')) return 'enterprise'
  if (pathname.startsWith('/fast')) return 'fast'

  // 2. Query param: ?persona=enterprise|midmarket|fast  or  ?p=enterprise|fast
  const personaParam =
    url.searchParams.get('persona') || url.searchParams.get('p')
  if (personaParam) {
    const normalized = personaParam.toLowerCase().trim()
    if (normalized === 'enterprise') return 'enterprise'
    if (normalized === 'fast' || normalized === 'fasttrack' || normalized === 'fast-track') return 'fast'
    if (normalized === 'midmarket' || normalized === 'mid-market') return 'midmarket'
  }

  // 3. UTM campaign mapping
  const utmCampaign = url.searchParams.get('utm_campaign')?.toLowerCase() || ''
  if (
    utmCampaign.includes('compliance') ||
    utmCampaign.includes('enterprise') ||
    utmCampaign.includes('soc2') ||
    utmCampaign.includes('nist')
  ) {
    return 'enterprise'
  }
  if (
    utmCampaign.includes('fast') ||
    utmCampaign.includes('quick') ||
    utmCampaign.includes('urgent') ||
    utmCampaign.includes('action')
  ) {
    return 'fast'
  }

  // 4. localStorage (returning visitor)
  try {
    const stored = localStorage.getItem(COPY_PERSONA_STORAGE_KEY)
    if (stored && stored in COPY_SETS) return stored as CopyPersona
  } catch {
    // localStorage unavailable
  }

  // 5. Default
  return DEFAULT_PERSONA
}

/**
 * Persist persona to localStorage so it sticks across page navigations.
 */
export function persistPersona(persona: CopyPersona): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(COPY_PERSONA_STORAGE_KEY, persona)
  } catch {
    // localStorage unavailable
  }
}

/**
 * Get the copy set for a given persona.
 */
export function getCopySet(persona: CopyPersona): CopySet {
  return COPY_SETS[persona]
}
