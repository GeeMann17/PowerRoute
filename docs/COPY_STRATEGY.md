# PowerRoute — Copy Strategy & Persona System

> **Last Updated**: 2026-02-07
> **Status**: Ready for implementation
> **Priority**: P0 — implement before go-live for ad campaign readiness

---

## Table of Contents

1. [The Problem](#the-problem)
2. [Current Copy Audit](#current-copy-audit)
3. [Three Copy Personas](#three-copy-personas)
4. [Copy Variations by Section](#copy-variations-by-section)
5. [CTA Variations by Page](#cta-variations-by-page)
6. [Technical Implementation](#technical-implementation)
7. [Testing Strategy](#testing-strategy)
8. [Implementation Checklist](#implementation-checklist)

---

## The Problem

The site currently has one copy voice — **Enterprise Compliance** — running at maximum intensity on every page. This works for a VP of Infrastructure sweating a SOC 2 audit. It does NOT work for:

- A facilities manager at a 50-person company closing an office
- A startup CTO who needs 4 racks moved across town
- An IT director at a mid-market company who just needs it done reliably

The current copy assumes every visitor cares deeply about NIST 800-88, chain of custody protocols, and serialized Certificates of Destruction. Many visitors just need a good vendor, fast.

### What's Strong (Keep)

| Strength | Examples |
|----------|---------|
| **Specific fear-based selling** | "$142,000 cost of an unqualified crew," "$9,000/min downtime" |
| **Concrete stats** | "14,200+ racks, 99.7% destruction rate, 60% rejection rate" |
| **Individual service pages** | Each has unique risks, processes, and CTAs |
| **Risk reversal** | "Free. No credit card. No obligation." everywhere |
| **Testimonials with outcomes** | "$47K recovered," "120 racks, 0 downtime" |
| **Process transparency** | Vetting stages with rejection rates, step-by-step execution |

### What's Weak (Fix)

| Weakness | Impact |
|----------|--------|
| **One voice for all audiences** | Alienates non-enterprise visitors (likely 60%+ of traffic) |
| **Tone is authoritative but cold** | No warmth, no humor, no humanity — reads like a compliance doc |
| **CTAs are identical everywhere** | "Get Your Free Match" / "Talk to a Human" on every single page |
| **No copy variation by traffic source** | Google Ads visitor gets same page as organic blog reader |
| **Blog is empty** | 6 titles, 0 content — hurts credibility more than no blog at all |
| **Testimonials feel fabricated** | "Marcus Chen, VP of Infrastructure, TechScale Systems" — reads AI-generated |
| **Jargon-heavy for non-specialists** | NAID AAA, e-Stewards, NIST 800-88 mean nothing to most IT managers |

---

## Three Copy Personas

Each persona is a complete copy system — headlines, descriptions, stats emphasis, CTA language, and FAQ focus. They share the same page structure and visual theme but speak to different people.

### Persona Definitions

| | Enterprise | Mid-Market | Fast-Track |
|---|-----------|-----------|-----------|
| **Who** | VP/Director/CISO at Fortune 500, government, financial services | IT Manager/Director at 100-1000 person company | Startup CTO, facilities manager, anyone with a deadline |
| **Company size** | 1,000+ employees | 100-1,000 employees | 10-100 employees |
| **What they care about** | Compliance, certifications, chain of custody, audit-readiness, zero tolerance for risk | Getting it done right, on time, without surprises. Budget-conscious but not cheap. | Speed, simplicity, "just find me someone good." Don't overthink it. |
| **Their fear** | Audit failure, data breach headline, career-ending compliance gap | Wasting time vetting bad vendors, project delays, hidden costs | Calling 10 companies, waiting days for quotes, overpaying |
| **Decision style** | Committee, RFP process, long evaluation | Manager approval, 1-2 decision makers, moderate evaluation | Solo decision, "can you do it this week?" |
| **Tone** | Formal, authoritative, stats-heavy, fear-of-failure | Direct, practical, reassuring, outcome-focused | Punchy, conversational, zero jargon, action-oriented |
| **Reading depth** | Will read everything — wants detail | Scans headlines, reads what's relevant | Skims to CTA, wants speed |

### When to Use Each

| Traffic Source | Default Persona | Why |
|----------------|----------------|-----|
| **Organic / Direct** | Mid-Market | Widest audience, balanced tone |
| **Google Ads: compliance keywords** | Enterprise | "ITAD compliance," "certified data destruction," "SOC 2 logistics" |
| **Google Ads: action keywords** | Fast-Track | "data center movers near me," "rack moving service," "IT equipment delivery" |
| **LinkedIn Ads** | Enterprise | B2B decision makers, enterprise focus |
| **Referral / Partner** | Mid-Market | General business context |
| **Blog / Content** | Mid-Market | Educational context, moderate expertise |

---

## Copy Variations by Section

### Homepage Hero

**Enterprise (current default):**
> **Mission-Critical Deployments Demand Mission-Critical Logistics.**
>
> Your infrastructure is too valuable for unvetted crews. PowerRoute matches you with pre-certified IT logistics providers in minutes — not weeks. Free to use. Zero obligation.
>
> Trust bullets:
> - 14,200+ racks relocated — zero lost assets
> - Every provider R2 & NAID AAA certified
> - Matched in under 10 minutes

**Mid-Market (recommended new default):**
> **The Right IT Logistics Provider. Found in Minutes, Not Weeks.**
>
> Stop calling around. PowerRoute has already vetted 340+ IT logistics providers nationwide. Tell us what you need — we'll match you with the right one. Always free.
>
> Trust bullets:
> - 340+ vetted providers across all 50 states
> - Matched in minutes, not weeks
> - 100% free — we're paid by providers, not you

**Fast-Track:**
> **Need Racks Moved? We'll Find Your Crew Today.**
>
> 3 minutes to describe the job. We match you with a vetted provider. That's it. No RFPs, no spreadsheets, no BS.
>
> Trust bullets:
> - Tell us what you need — takes 3 minutes
> - We find the right crew — takes us 10 minutes
> - Totally free — no catch

---

### Homepage Stats Bar

**Enterprise:**
| 14,200+ Racks Relocated | 99.7% Destruction Rate | 100% Chain of Custody | SOC 2 Verified Providers |

**Mid-Market:**
| 340+ Vetted Providers | 14,200+ Racks Moved | < 2 Hour Match Time | Always Free |

**Fast-Track:**
| 3 Min to Submit | 10 Min to Match | 340+ Providers | $0 Cost to You |

---

### Homepage Risk Section

**Enterprise:**
> **The Cost of an Unqualified Crew: $142,000.**
>
> Broken chain of custody. Drives wiped by an uncertified crew. Laborers without clearances in your secure facility. A single compliance failure triggers audits, fines, and client trust that takes years to rebuild.

**Mid-Market:**
> **Hiring the Wrong Vendor Wastes More Than Money.**
>
> It wastes your time vetting, your team's patience dealing with no-shows, and your reputation when the job goes sideways. We've already vetted 340+ providers so you don't have to start from scratch.

**Fast-Track:**
> **You Don't Have Time to Call 10 Companies.**
>
> You have a job that needs doing and a deadline that's already too close. We'll find you a vetted provider today — not next week.

---

### Homepage How It Works

**Enterprise:**
1. **Scope Your Project** — "Equipment type, facility access requirements, compliance needs. Three minutes is all it takes."
2. **We Deploy the Right Team** — "Our specialists review your scope and match you with 1-3 pre-vetted providers who specialize in your exact job type and region."
3. **Your Provider Engages Directly** — "Detailed scope review, transparent pricing, and full chain of custody documentation before a single asset moves."

**Mid-Market:**
1. **Tell Us What You Need** — "Job type, location, timeline. Takes about 3 minutes."
2. **We Find the Right Provider** — "From our network of 340+ vetted providers, we match you with specialists in your exact job type and area."
3. **They Reach Out to You** — "Your matched provider contacts you directly with pricing and a plan. No middlemen, no markup."

**Fast-Track:**
1. **Describe the Job** — "What, where, when. 3 minutes."
2. **We Match You** — "Right provider, right skills, your area. 10 minutes."
3. **They Call You** — "Direct line. Real pricing. No runaround."

---

### Homepage FAQ — Different Questions per Persona

**Enterprise FAQs:**
1. Why not hire a logistics company directly?
2. What certifications do your providers hold?
3. How is chain of custody guaranteed?
4. Can your providers access classified or high-security facilities?
5. How fast will I hear from a matched provider?
6. What does this cost?

**Mid-Market FAQs:**
1. How is this different from Googling for vendors?
2. How do you vet your providers?
3. What if I'm not happy with the match?
4. How fast can a provider start?
5. What does this cost me?
6. Do you handle small jobs or just enterprise?

**Fast-Track FAQs:**
1. How fast can you match me?
2. Is this actually free?
3. What if I need someone this week?
4. How do I know the providers are legit?
5. What if the quote is too high?
6. Can I talk to a person right now?

---

### Homepage Testimonials — Same Stories, Different Framing

**Enterprise (current):**
> "120 racks moved — 0 downtime, 0 lost assets"
> "The chain of custody docs passed our SOC 2 audit without a single finding."

**Mid-Market:**
> "120 racks moved in a single weekend"
> "We were quoted 3 weeks by another vendor. PowerRoute's match did it in 2 days."

**Fast-Track:**
> "Found a provider in hours, racks moved by the weekend"
> "I filled out the form at 10am. Had a provider on the phone by lunch."

---

### Mini Calculator Card

**Enterprise:**
> "What Will This Cost?" / "30-second estimate. No email required. No strings."

**Mid-Market:**
> "Get a Quick Estimate" / "Ballpark pricing in 30 seconds. No signup needed."

**Fast-Track:**
> "How Much? Find Out Now." / "30 seconds. Free. Go."

---

### Final CTA Section

**Enterprise:**
> **"Your Infrastructure Deserves Better Than a Guess."**
> Three minutes to scope your project. Matched with a certified provider in minutes. Zero cost. Zero obligation.
> Buttons: "Get Matched Now" | "Talk to a Human"

**Mid-Market:**
> **"Ready to Find the Right Provider?"**
> Tell us what you need. We'll match you with a vetted specialist — usually within a couple hours. Always free.
> Buttons: "Find My Provider" | "Call Us Instead"

**Fast-Track:**
> **"Let's Get This Done."**
> 3 minutes. Free. No commitment. Just tell us what you need.
> Buttons: "Start Now" | "Call Right Now"

---

## CTA Variations by Page

Stop using "Get Your Free Match" everywhere. Each page context deserves its own CTA:

| Page | Enterprise | Mid-Market | Fast-Track |
|------|-----------|-----------|-----------|
| **Homepage** | "Get Matched Now" | "Find My Provider" | "Start Now" |
| **DC Relocation** | "Get Matched with a DC Relocation Provider" | "Find a DC Relocation Provider" | "Get a DC Relocation Quote" |
| **ITAD** | "Get Matched with a Certified ITAD Provider" | "Find an ITAD Provider" | "Get an ITAD Quote" |
| **Asset Recovery** | "Get Matched with a Recovery Provider" | "Find a Recovery Provider" | "Get Started" |
| **Office Decommission** | "Get Matched with a Decommission Provider" | "Find a Decommission Crew" | "Get a Decommission Quote" |
| **White Glove Delivery** | "Get Matched with a White Glove Provider" | "Find a White Glove Provider" | "Get a Delivery Quote" |
| **About** | "Get Your Free Provider Match" | "Find Your Provider" | "Get Started Free" |
| **Quote Form** | "Get My Free Quote" | "Get My Quote" | "Get My Quote" |
| **Blog** | "Get Your Free Match" | "Find a Provider" | "Get Started" |
| **Secondary CTA** | "Talk to a Human" | "Call Us Instead" | "Call Right Now" |

---

## Technical Implementation

### Architecture: Copy Context Provider + URL/Query Detection

```
Traffic arrives
    ↓
Check URL path: /enterprise/*, /fast/*, or default
Check query param: ?persona=enterprise|midmarket|fast
Check localStorage: powerroute-copy-persona
    ↓
CopyProvider wraps app with selected persona
    ↓
Components call useCopy() to get persona-specific text
    ↓
All copy renders from centralized copy maps
```

### File Structure

```
src/
├── lib/
│   └── copy.ts              # Persona definitions, copy maps, detection logic
├── components/
│   └── copy-provider.tsx     # React context + useCopy() hook
└── app/
    ├── (marketing)/
    │   ├── page.tsx           # Uses useCopy() for hero, stats, FAQ, etc.
    │   └── enterprise/        # Route alias (optional)
    │       └── page.tsx       # Renders homepage with enterprise persona forced
    ├── (marketing-fast)/      # Route group for fast-track (optional)
    │   └── page.tsx
    └── layout.tsx             # CopyProvider wrapper
```

### Core Data Structure (`src/lib/copy.ts`)

```typescript
export type CopyPersona = 'enterprise' | 'midmarket' | 'fast'

export interface CopySet {
  // Homepage
  heroHeadline: string
  heroDescription: string
  heroBullets: string[]
  heroPrimaryCta: string
  heroSecondaryCta: string
  statsBar: { label: string; value: string }[]
  riskHeadline: string
  riskDescription: string
  howItWorksSteps: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
  finalCtaHeadline: string
  finalCtaDescription: string
  finalCtaPrimary: string
  finalCtaSecondary: string

  // Mini calculator
  calculatorHeadline: string
  calculatorSubheadline: string

  // Shared
  trustFooter: string
  secondaryCta: string
}

export const COPY_SETS: Record<CopyPersona, CopySet> = {
  enterprise: { ... },
  midmarket: { ... },
  fast: { ... },
}
```

### Persona Detection Priority

```typescript
export function detectPersona(request?: NextRequest): CopyPersona {
  // 1. URL path override (highest priority)
  //    /enterprise/* → enterprise
  //    /fast/* → fast

  // 2. Query param
  //    ?persona=enterprise → enterprise
  //    ?p=fast → fast

  // 3. UTM source mapping
  //    utm_campaign containing "compliance" or "enterprise" → enterprise
  //    utm_campaign containing "fast" or "quick" → fast

  // 4. localStorage (returning visitor)
  //    powerroute-copy-persona → stored persona

  // 5. Default
  //    → midmarket
}
```

### URL Routing Strategy

| URL | Persona | Use Case |
|-----|---------|----------|
| `powerroute.com` | Mid-Market (default) | Organic, direct, general traffic |
| `powerroute.com?persona=enterprise` | Enterprise | LinkedIn ads, compliance campaigns |
| `powerroute.com?persona=fast` | Fast-Track | Google Ads action keywords |
| `powerroute.com/enterprise` | Enterprise | Dedicated landing page (optional) |
| `powerroute.com/fast` | Fast-Track | Dedicated landing page (optional) |

### Persistence

When a visitor arrives with a persona set (via URL or query param), store it in localStorage so their experience stays consistent as they navigate:

```typescript
// On first detection
localStorage.setItem('powerroute-copy-persona', persona)

// On subsequent pages
const stored = localStorage.getItem('powerroute-copy-persona')
```

This means a visitor who lands on `?persona=fast` and then clicks to `/about` still sees fast-track copy.

---

## Testing Strategy

### Pre-Launch

1. **Build all 3 persona copy sets** in `src/lib/copy.ts`
2. **Wire homepage** to `useCopy()` — verify all 3 personas render correctly
3. **Wire service pages** to use persona-aware CTAs
4. **QA each persona** across all 5 themes (3 personas x 5 themes = 15 combinations)

### Launch Week

1. **Default to Mid-Market** for all organic traffic
2. **Create 2-3 Google Ads campaigns** pointing to `?persona=enterprise` and `?persona=fast`
3. **Track conversion rates** per persona via UTM params + GA4 events

### Post-Launch (Week 2-4)

1. **Compare conversion rates**: Which persona converts best from which traffic source?
2. **Refine copy** based on data — tighten winners, rework losers
3. **Consider making persona selection user-facing** (toggle in header or modal on first visit)
4. **A/B test within personas** — headline variations, CTA colors, stat emphasis

### Key Metrics to Track

| Metric | What It Tells You |
|--------|------------------|
| Quote form start rate (per persona) | Which persona drives initial interest |
| Quote form completion rate (per persona) | Which persona sustains engagement through 6 steps |
| Time on page (per persona) | Are people reading or bouncing |
| CTA click rate (per persona per page) | Which CTAs and framing work best |
| Mini calculator usage (per persona) | Does calculator engagement vary by tone |

---

## Implementation Checklist

### Phase 1: Foundation (Build the system)

- [ ] Create `src/lib/copy.ts` with all 3 persona copy sets
- [ ] Create `src/components/copy-provider.tsx` with CopyProvider + useCopy() hook
- [ ] Add persona detection (URL path, query param, localStorage, UTM)
- [ ] Wire CopyProvider into root layout
- [ ] Persist detected persona to localStorage

### Phase 2: Homepage Integration

- [ ] Refactor homepage to use `useCopy()` for hero section
- [ ] Refactor stats bar to use persona copy
- [ ] Refactor risk section to use persona copy
- [ ] Refactor How It Works to use persona copy
- [ ] Refactor FAQ section to use persona copy (different questions per persona)
- [ ] Refactor final CTA section to use persona copy
- [ ] Refactor mini calculator card text to use persona copy
- [ ] Refactor testimonial framing to use persona copy

### Phase 3: Service Pages + Global

- [ ] Update all 5 service page CTAs to be persona-aware
- [ ] Update about page CTA to be persona-aware
- [ ] Update blog page CTA to be persona-aware
- [ ] Update header CTA text to be persona-aware
- [ ] Update quote page intro text to be persona-aware

### Phase 4: Landing Page Routes (Optional)

- [ ] Create `/enterprise` route (homepage with enterprise persona forced)
- [ ] Create `/fast` route (homepage with fast-track persona forced)
- [ ] Test dedicated landing pages for ad campaigns

### Phase 5: Analytics & Testing

- [ ] Add GA4 event tracking for persona detection
- [ ] Add conversion tracking per persona (form start, form complete)
- [ ] Set up Google Ads campaigns pointing to persona URLs
- [ ] Monitor and compare conversion rates per persona
- [ ] Iterate copy based on data

---

## Service Page Copy Adjustments

The 5 service pages currently use Enterprise-only tone. Here's how each should adapt:

### Data Center Relocation

| Element | Enterprise | Mid-Market | Fast-Track |
|---------|-----------|-----------|-----------|
| Hero H1 | "A 120-Rack Migration With Zero Downtime Isn't Luck. It's Vetting." | "Data Center Migrations Done Right. Without the 3-Week Vendor Search." | "Moving Racks? We'll Find Your Crew." |
| Risk focus | $9,000/min downtime, chain of custody, uncertified crews | Delays, budget overruns, unreliable vendors | Wasting time calling around |

### ITAD

| Element | Enterprise | Mid-Market | Fast-Track |
|---------|-----------|-----------|-----------|
| Hero H1 | "'We Wiped the Drives' Doesn't Survive an Audit." | "Retire Your IT Assets Without the Compliance Headache." | "Old Equipment? Get Rid of It the Right Way." |
| Risk focus | Audit failure, data breach, HIPAA/PCI violations | Compliance paperwork, lost asset value | "I just need this stuff gone properly" |

### Asset Recovery

| Element | Enterprise | Mid-Market | Fast-Track |
|---------|-----------|-----------|-----------|
| Hero H1 | "Your Assets Are Sitting in a Building You No Longer Control." | "Scattered Assets? We'll Get Them Back — Documented." | "Need Equipment Retrieved? We'll Handle It." |
| Risk focus | Compliance gaps, untracked assets, security exposure | Time wasted coordinating multi-site pickups | "I need stuff picked up from X location" |

### Office Decommission

| Element | Enterprise | Mid-Market | Fast-Track |
|---------|-----------|-----------|-----------|
| Hero H1 | "Your Lease Expires in 30 Days. 200 Workstations Need to Disappear." | "Closing an Office? Get the IT Stripped Out — On Schedule." | "Office Closing? We'll Clear the IT." |
| Risk focus | Holdover rent, data left behind, regulatory exposure | Missing the deadline, data security, hassle | "I need everything gone by [date]" |

### White Glove Delivery

| Element | Enterprise | Mid-Market | Fast-Track |
|---------|-----------|-----------|-----------|
| Hero H1 | "Your Servers Aren't Furniture. Stop Shipping Them Like It." | "IT Equipment Delivery That Doesn't End in an Insurance Claim." | "Servers Need to Get There in One Piece? Done." |
| Risk focus | $200K equipment damage, unclearanced crews, temperature damage | Damaged equipment, unreliable delivery, surprise costs | "I need this delivered safely" |

---

## Quote Form Copy Adjustments

The quote form is shared across all personas but the framing text should adapt:

| Element | Enterprise | Mid-Market | Fast-Track |
|---------|-----------|-----------|-----------|
| Page H1 | "Get Matched with a Certified Provider in Under 2 Hours" | "Find the Right Provider for Your Project" | "Quick Quote — Takes 3 Minutes" |
| Page description | "Tell us about your project — takes about 3 minutes. You'll get an instant cost estimate and a matched provider who specializes in your exact job type." | "Tell us what you need and we'll match you with a vetted provider who specializes in your type of job." | "Describe the job. Get an estimate. We'll find your crew." |
| Submit button | "Get My Free Quote" | "Get My Quote" | "Get My Quote" |
| Footer | "100% free. No credit card. No obligation. Your info is never sold." | Same | Same |

---

## Vendor Signup — No Persona Variation Needed

The vendor signup flow is B2B provider-facing, not customer-facing. The current copy ("Apply as a Provider," "Join our network of vetted IT logistics providers") is appropriate for the professional tone vendors expect. No persona variation needed here.

---

## Blog Strategy Per Persona

Blog content itself doesn't change — an article about ITAD compliance is the same article regardless of who reads it. But the **blog page framing** and **in-article CTAs** should adapt:

| Element | Enterprise | Mid-Market | Fast-Track |
|---------|-----------|-----------|-----------|
| Blog page H1 | "IT Logistics Resources" | "IT Logistics Resources" | "IT Logistics Resources" |
| Blog page description | "Compliance resources from the team that vets 340+ IT logistics providers." | "Practical guides from the team behind 340+ vetted IT logistics providers." | "Quick reads to help you move, retire, or recover IT equipment." |
| In-article CTA | "Get Matched with a Certified Provider" | "Find the Right Provider" | "Get Started Free" |
| Blog page CTA | "Need a Provider, Not a Blog Post?" | "Ready to Find Your Provider?" | "Done Reading? Let's Get You Matched." |

---

*This document is the source of truth for all copy persona work. Update as copy is refined and tested.*
