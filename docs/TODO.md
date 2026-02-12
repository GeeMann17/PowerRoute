# PowerRoute - Rebrand & Overhaul TODO

> **Last Updated**: 2026-02-05
> **Brand**: PowerRoute (formerly WhiteGloveLeads / WhiteGloveLeadsCommercial)
> **Purpose**: IT logistics directory & lead generation matching platform

---

## Phase 0: Foundation — Types & Database Schema ✅ COMPLETE

### 0A: `src/types/leads.ts` — Full Rewrite ✅
- [x] Replace `moveType` with `jobType` (5 IT job types)
- [x] Remove all residential/moving options (property sizes, special items, etc.)
- [x] Add `equipmentTypeOptions` (12 types: server racks, UPS, switches, storage arrays, etc.)
- [x] Add `handlingRequirementOptions` (10 types: climate-controlled, anti-static, shock pallets, etc.)
- [x] Add `facilityTypeOptions` (6 types: colocation DC, enterprise DC, office, warehouse, edge/MDF, government)
- [x] Add `weightEstimateOptions`, `securityRequirementOptions`, `loadingDockOptions`
- [x] Add `JOB_TYPE_FIELD_CONFIG` — per-job-type field visibility (required/optional/hidden)
- [x] Rewrite `miniQuoteSchema` (jobType + assetCount + originZip + destinationZip)
- [x] Rewrite `quoteFormSchema` (full form with all new fields)

### 0B: `src/types/database.ts` — Full Rewrite ✅
- [x] `LeadStatus`: 7 pipeline stages (new → vetted → sent_to_vendor → vendor_accepted → quoted → won → lost)
- [x] `JobType`: 5 IT job types
- [x] `PricingRuleType`: 6 rule types
- [x] Updated `leads` table types with all new fields
- [x] New `vendors` table type (name, contact, job_types[], certifications[], performance_score, etc.)

### 0C: `supabase/migrations/003_powerroute_rebrand.sql` — New File ✅
- [x] Additive migration (new columns added, old columns kept temporarily)
- [x] New status CHECK constraint with data migration
- [x] `vendors` table with GIN indexes
- [x] FK from leads.vendor_id to vendors.id
- [x] Renamed pricing_rules.move_type → job_type
- [x] Seeded new pricing rules

---

## Phase 1: Pricing Engine ✅ COMPLETE

### 1A: `src/lib/pricing.ts` — Full Rewrite ✅
- [x] Per-job-type labor base rates ($1,500–$5,000)
- [x] Rack cost ($500/rack) + loose asset cost ($25/asset)
- [x] Handling costs (10 types), compliance costs (4 types)
- [x] Distance tiers
- [x] `computeQuote()`, `calculateQuoteAsync()`, `calculateQuickEstimate()`

### 1B: `src/lib/pricing-service.ts` — Significant Modification ✅
- [x] DB-driven pricing with fallback to hardcoded rates
- [x] New rule types: labor_rate, material_cost, compliance_surcharge, etc.
- [x] Cache mechanism preserved (5-min TTL)

### 1C: `src/lib/distance.ts` — No Changes Needed ✅

---

## Phase 2: API Routes & Email ✅ COMPLETE

### 2A: `src/app/api/leads/route.ts` — Full Rewrite ✅
- [x] POST: New schema validation, vendor auto-matching, 3 email types
- [x] PATCH: Updated to 7 pipeline statuses
- [x] `autoMatchVendor()` function

### 2B: `src/app/api/leads/[id]/status/route.ts` — Modified ✅
- [x] Updated Zod status enum to 7 pipeline values

### 2C: `src/app/api/pricing-rules/route.ts` — Modified ✅
- [x] Changed MoveType → JobType imports and field names

### 2D: `src/app/api/vendors/route.ts` — New File ✅
- [x] Full CRUD: GET (with filters), POST, PATCH, DELETE (soft-delete)

### 2E: `src/lib/email.ts` — Full Rewrite ✅
- [x] PowerRoute branding with dark tech theme
- [x] `sendLeadConfirmationEmail()` — client-facing estimate email
- [x] `sendAdminNotificationEmail()` — internal admin alert
- [x] `sendVendorNotificationEmail()` — vendor assignment with 4-hour response deadline

---

## Phase 3: Forms (Multi-Step Wizard) ✅ COMPLETE

### 3A: `src/components/forms/quote-form.tsx` — Full Rewrite ✅
- [x] 6-step wizard with progress bar
- [x] Step 1: Job Type (5 cards with icons and descriptions)
- [x] Step 2: Facilities (origin + destination, conditional per job type, company info)
- [x] Step 3: Assets & Equipment (racks, loose assets, weight, equipment types, handling requirements)
- [x] Step 4: Compliance (data destruction, CoD, chain of custody, security clearance — conditional)
- [x] Step 5: Schedule (service date, flexibility toggle)
- [x] Step 6: Contact (name, email, phone, TCPA consent)
- [x] Per-step validation with react-hook-form `trigger()`
- [x] Back/Next navigation
- [x] URL params pre-fill from mini calculator (jobType, originZip, destinationZip)

### 3B: `src/components/forms/mini-calculator.tsx` — Full Rewrite ✅
- [x] Job type selector (5 icon buttons)
- [x] Asset count input
- [x] Origin ZIP + Destination ZIP
- [x] "Get Ballpark Estimate" with result display
- [x] "Get Detailed Quote" CTA → routes to /quote with params
- [x] Dark tech theme styling

---

## Phase 4: Marketing Pages & Theme ✅ COMPLETE

### 4A: `src/app/globals.css` ✅
- [x] Dark-mode-first theme: charcoal/slate backgrounds, electric blue/green accents
- [x] Update all CSS custom properties (--background, --foreground, --primary, --card, etc.)

### 4B: `src/app/layout.tsx` ✅
- [x] Title: "PowerRoute | IT Logistics & Asset Management"
- [x] Description & keywords for IT logistics
- [x] Update package.json name to "powerroute"

### 4C: `src/components/layout/header.tsx` ✅
- [x] Replace Truck icon → Network
- [x] Replace "WhiteGloveLeadsCommercial" → "PowerRoute"
- [x] Update nav items for IT logistics
- [x] Update brand colors to blue-600 / slate dark theme

### 4D: `src/components/layout/footer.tsx` ✅
- [x] PowerRoute branding
- [x] IT logistics service links
- [x] Certification badges (R2, e-Stewards, NAID AAA, SOC 2)
- [x] Dark theme styling

### 4E: `src/components/layout/mobile-nav.tsx` ✅
- [x] PowerRoute branding, Network icon
- [x] Dark theme styling

### 4F: Homepage ✅
- [x] Write new homepage directly in `src/app/(marketing)/page.tsx`
- [x] Hero: Risk mitigation + efficiency headline, mini calculator, trust badges
- [x] Stats bar: Racks relocated, enterprises served, data destruction rate, chain of custody %
- [x] 5 Service cards: DC Relocation, ITAD, Asset Recovery, Office Decommission, White Glove Delivery
- [x] How It Works: 3 trust-focused steps
- [x] Security/Risk section
- [x] Testimonials: Enterprise case studies
- [x] FAQ: Security/compliance, logistics/handling, process/timeline
- [x] CTA: "Get a Free Quote" + click-to-call
- [x] Dark tech aesthetic

### 4G-H: Page Cleanup ✅
- [x] Deleted `page-v1-original.tsx`
- [x] Deleted `page-v2-cashvertising.tsx`
- [x] Rewrite `page.tsx` (homepage fully rewritten)

### 4I: `src/app/(quote)/quote/page.tsx` ✅
- [x] Update heading/description to IT logistics
- [x] Update trust indicators to R2, chain of custody, etc.
- [x] Dark theme styling

### 4J: `src/app/(quote)/thank-you/page.tsx` ✅
- [x] Update all copy from moving → IT logistics
- [x] PowerRoute branding
- [x] Dark theme styling

### 4K: `src/app/(quote)/layout.tsx` ✅
- [x] Removed bg-gray-50 (will inherit dark theme)

---

## Phase 5: Admin Dashboard & Vendor Management ✅ COMPLETE

### 5A: `src/components/admin/sidebar.tsx` ✅
- [x] PowerRoute branding, Network icon
- [x] Add "Vendors" nav item
- [x] Replace hex colors with Tailwind classes

### 5B: `src/components/admin/leads-table.tsx` ✅
- [x] 7 new status colors/options for pipeline stages
- [x] Add Job Type column
- [x] Update CSV export headers with IT logistics fields
- [x] Replace hex colors with Tailwind classes

### 5C: `src/app/(admin)/admin/page.tsx` ✅
- [x] 7-stage pipeline funnel visualization
- [x] Active vendor count card
- [x] Win Rate metric
- [x] IT logistics terminology
- [x] Source attribution with icons

### 5D: `src/app/(admin)/admin/leads/page.tsx` ✅
- [x] 7 status filter tabs

### 5E: `src/app/(admin)/admin/leads/[id]/page.tsx` ✅
- [x] Replace "Move Details" → "Job Details" (service_date, job_type)
- [x] Replace "Property Details" → "Facility Details" (origin/destination with facility types, loading docks)
- [x] Replace "Special Items" → "Equipment & Handling" (racks, loose assets, weight, equipment types)
- [x] Add "Compliance Requirements" section (data destruction, CoD, chain of custody, clearance)
- [x] Add "Vendor Assignment" section
- [x] Company & title fields

### 5F: `src/app/(admin)/admin/pricing/page.tsx` ✅
- [x] New rule types (labor_rate, material_cost, trip_charge, weight_tier, compliance_surcharge, distance_tier)
- [x] Group by 5 job types instead of residential/commercial

### 5G: `src/app/(admin)/admin/vendors/page.tsx` ✅ — New File
- [x] Vendor card grid with performance metrics
- [x] Job type badges, certifications
- [x] Active/inactive status

### 5H: `src/app/(admin)/admin/vendors/[id]/page.tsx` ✅ — New File
- [x] Vendor profile with all details
- [x] Performance metrics (score, win rate, response time)
- [x] Assigned leads history
- [x] Geographic coverage, certifications, contact info

### 5 Misc: Other Admin Pages ✅
- [x] Login page: PowerRoute branding, Network icon, blue-600 colors
- [x] Settings page: PowerRoute defaults, updated colors
- [x] Users page: Updated mock email, Tailwind color classes
- [x] Reports page: 7-stage pipeline, job type distribution (replacing move type), win rate metric

---

## Phase 6: Cleanup & Final Verification ✅ COMPLETE

### 6A: Global Search & Replace ✅
- [x] "WhiteGloveLeads" / "WhiteGloveLeadsCommercial" → "PowerRoute"
- [x] "moving" / "mover" / "move type" → IT logistics equivalents
- [x] "residential" / "commercial" (as move types) — removed
- [x] Old moving-specific terms cleaned
- [x] "#1e3a5f" / "#162d4a" → blue-600 / blue-700 Tailwind classes
- [x] Phone numbers → PowerRoute format
- [x] Certification references updated

### 6B: Update Docs ✅
- [x] `docs/PROJECT_CONTEXT.md` — Full rewrite for PowerRoute
- [x] `docs/TODO.md` — Updated throughout
- [x] Removed 11 outdated docs (CASHVERTISING, PAGE_VERSIONING, MovingLeadGen-PRD, etc.)

### 6C: Final Checks ✅
- [x] `package.json` name → "powerroute"
- [x] `npm run build` passes (17 routes, no errors)
- [x] `npm run lint` passes (0 errors, 1 warning for intentionally unused param)
- [x] Unused imports cleaned across all files

---

## Progress Summary

| Phase | Status | Files Done |
|-------|--------|-----------|
| 0 — Foundation (types, DB) | ✅ Complete | 3/3 |
| 1 — Pricing Engine | ✅ Complete | 2/2 |
| 2 — API Routes & Email | ✅ Complete | 5/5 |
| 3 — Forms (Wizard) | ✅ Complete | 2/2 |
| 4 — Marketing & Theme | ✅ Complete | 11/11 |
| 5 — Admin & Vendors | ✅ Complete | 11/11 |
| 6 — Cleanup & Verification | ✅ Complete | 3/3 |
| 7 — Theme System & Visual Overhaul | ✅ Complete (7A-7C) | 9/9 |
| 8 — Copywriting Revamp | ✅ Partial (8A done) | — |
| 9 — Vendor Marketplace & Auth | ✅ Complete | 15+ files |
| 10 — Rate Limiting, CSRF, Stripe, Pagination | ✅ Complete | 18+ files |
| 11 — Security Hardening & Blog | ✅ Complete | 21 files |

### Current State (2026-02-05)
All core platform features are implemented. Security audit complete (P0/P1 items resolved). Blog infrastructure ready for content. Lint: 0 errors, 1 unfixable library warning. TypeScript: 0 errors.

---

## Phase 7: Theme System & Visual Overhaul — IN PROGRESS

> **Session**: 2026-01-29. User feedback: site looked like "AI slop", wanted modern directory/marketplace feel, multiple switchable themes, authentic/human design inspired by M3 Commercial and TTR Shipping (both IT logistics service providers — PowerRoute is the directory layer above them).

### 7A: Theme Infrastructure ✅ COMPLETE
- [x] Built CSS variable-based theme system with `data-theme` attribute on `<html>`
- [x] 3 themes: Light/Clean (Stripe-like), Dark Premium (tech-forward), Corporate Navy (enterprise trust)
- [x] `src/lib/theme.ts` — theme definitions, localStorage persistence
- [x] `src/components/theme-provider.tsx` — React context with `useTheme()` hook
- [x] Inline FOUC prevention script in `<head>` (reads localStorage before paint)
- [x] Admin Settings page theme picker with visual previews and instant switching
- [x] Custom semantic tokens: `--hero-bg`, `--hero-fg`, `--section-alt`, `--success`, `--warning`

### 7B: Homepage Redesign ✅ COMPLETE
- [x] Full rewrite from hardcoded dark slate → semantic theme tokens
- [x] Repositioned as directory/marketplace (not service provider)
- [x] Hero: "Stop Googling for IT logistics vendors. We already vetted them."
- [x] Stats: "340+ Vetted Providers" replaces "2,800+ Enterprises Served"
- [x] How It Works: Tell Us → We Find → Get Matched (marketplace flow)
- [x] Risk section: "Hiring the Wrong Vendor Costs More Than the Move" (Cashvertising fear-of-loss)
- [x] FAQ: Added differentiation question first ("How does PowerRoute differ from hiring directly?")
- [x] CTAs: "Get Matched with a Provider" / "Start Your Match" (marketplace language)

### 7C: Component Theme Migration ✅ COMPLETE
- [x] Header — `bg-background`, `text-foreground`, `text-primary`, `border-border`
- [x] Footer — same semantic token migration
- [x] Mobile Nav — same semantic token migration
- [x] Mini Calculator — all form elements, buttons, labels use theme tokens
- [x] Admin layout — `bg-muted` instead of hardcoded `bg-gray-100`
- [x] Admin settings — all hardcoded gray colors → semantic tokens

### 7D: Remaining Polish (Next Session)
- [ ] Typography & spacing system — review font scale, line heights, section rhythm
- [ ] Quote form visual polish — step labels, helper text, theme consistency
- [ ] Quote form copy — Cashvertising principles for form flow
- [ ] Thank you page — update to semantic tokens
- [ ] Admin dashboard pages — migrate remaining hardcoded colors to theme tokens
- [ ] Admin sidebar — verify all 3 themes render correctly
- [ ] Test all 3 themes end-to-end across all pages
- [ ] User visual sign-off on each theme

---

## Phase 8: Copywriting Revamp (Cashvertising Methods) — PARTIALLY COMPLETE

> **Goal**: Expert authority positioning + Cashvertising conversion principles. Platform voice: directory/marketplace that has "already done the vetting" so enterprises don't have to.

### 8A: Homepage Copy ✅ COMPLETE
- [x] Hero headline — Cashvertising fear-of-wasted-effort: "Stop Googling..."
- [x] Stats bar — specific social proof numbers (340+ providers, 99.7% destruction rate)
- [x] Service cards — benefit-driven, concise
- [x] How It Works — reduce friction, marketplace-first language
- [x] Testimonials — specific outcomes with metrics
- [x] FAQ — first question is differentiation/objection-handling
- [x] CTA sections — "Start Your Match" / "Get Matched with Certified Providers"

### 8B: Quote Form Copy (Next Session)
- [ ] Step titles and descriptions — guide with confidence
- [ ] Field labels and helper text — reduce cognitive load
- [ ] Job type card descriptions — sell the outcome
- [ ] Thank you page — reinforce decision, set expectations

### 8C: Admin-Facing Copy (Lower Priority)
- [ ] Dashboard labels and empty states
- [ ] Vendor pages — professional but human tone

---

## Phase 9: Vendor Marketplace & Auth ✅ COMPLETE

> **Session**: 2026-02-04. Built self-service vendor portal with Supabase Auth.

### 9A: Provider Authentication ✅
- [x] Provider signup (`/providers/signup`) with multi-step form (company, services, coverage, certifications)
- [x] Provider login (`/providers/login`) with magic link auth
- [x] Supabase Auth integration with email confirmation
- [x] Auth callback route with session exchange
- [x] Protected dashboard routes via middleware

### 9B: Vendor Dashboard ✅
- [x] Dashboard layout with sidebar navigation
- [x] Lead marketplace (`/dashboard/leads`) — browse available leads with filters
- [x] Lead purchase flow (`/dashboard/leads/[id]/purchase`)
- [x] My leads page (`/dashboard/my-leads`) — purchased leads with contact info
- [x] Billing page (`/dashboard/billing`) — payment history
- [x] Profile page (`/dashboard/profile`) — vendor details management
- [x] Lead detail modal with purchase CTA

### 9C: Admin Vendor Management ✅
- [x] Admin vendor status endpoint (`/api/admin/vendors/[id]/status`)
- [x] Vendor approval/rejection workflow
- [x] Purchase outcome tracking (`/api/dashboard/purchases/[id]/outcome`)

### 9D: Database ✅
- [x] `lead_purchases` table (migration 004)
- [x] Vendor `user_id`, `status`, `leads_purchased` columns (migration 005)
- [x] Service pages: About, individual service pages with IT logistics content

---

## Phase 10: Rate Limiting, CSRF, Stripe, Pagination ✅ COMPLETE

> **Session**: 2026-02-04. Security + payments + pagination.

### 10A: Rate Limiting ✅
- [x] `src/lib/rate-limit.ts` — Upstash Redis rate limiter with graceful degradation
- [x] Public form limiter (10 req/hr), signup limiter (5/hr), admin limiter (60/min), dashboard limiter (60/min)
- [x] Applied to all API endpoints (public, admin, dashboard)

### 10B: CSRF Protection ✅
- [x] Origin/Referer header validation in middleware for all API mutations
- [x] Stripe webhook endpoint excluded from CSRF checks
- [x] `sameSite: 'lax'` cookie config

### 10C: Stripe Payment Integration ✅
- [x] `src/lib/stripe.ts` — Stripe server client
- [x] Checkout session creation in purchase route
- [x] Webhook handler (`/api/stripe/webhook`) with signature verification
- [x] Handles `checkout.session.completed` and `charge.refunded` events
- [x] Client-side redirect to Stripe Checkout

### 10D: Pagination ✅
- [x] `src/lib/pagination.ts` — reusable pagination utilities
- [x] `src/components/ui/pagination.tsx` — server + client pagination components
- [x] Applied to: admin leads, admin vendors, dashboard leads, dashboard my-leads, dashboard billing

---

## Phase 11: Security Hardening & Blog Infrastructure ✅ COMPLETE

> **Session**: 2026-02-05. Comprehensive security audit + blog + legal pages.

### 11A: P0 Security Fixes ✅
- [x] **Atomic sold_count** — PostgreSQL RPC `increment_lead_sold_count()` prevents race conditions
- [x] **Open redirect fix** — Auth callback validates `next` param (must start with `/`, not `//`)
- [x] **Vendor PATCH whitelist** — 22 allowed fields explicitly whitelisted
- [x] **Webhook idempotency** — `WHERE status = 'pending'` guard prevents double-processing

### 11B: P1 Fixes ✅
- [x] **Available leads SQL view** — `available_leads` view filters `sold_count < max_sales` at DB level
- [x] **Soft-delete for leads** — DELETE sets `status: 'closed'` instead of hard delete
- [x] **Bulk operation limits** — Max 100 IDs per PATCH/DELETE batch
- [x] **Consolidated purchase endpoint** — Removed duplicate Stripe checkout route

### 11C: Blog Infrastructure ✅
- [x] `src/lib/blog.ts` — centralized post data store with `BlogPost` interface
- [x] `getAllPosts()`, `getPostBySlug()`, `getPublishedPosts()` helpers
- [x] Blog listing page (`/blog`) with category badges, read time, "Coming soon" for unpublished
- [x] Blog post page (`/blog/[slug]`) with rich HTML content rendering
- [x] 6 placeholder posts defined (unpublished, ready for content)

### 11D: Legal Pages ✅
- [x] Privacy policy page (`/privacy`) — 7 sections
- [x] Terms of service page (`/terms`) — 9 sections

### 11E: Lint Cleanup ✅
- [x] Removed all unused imports across marketing pages, dashboard layout, profile page
- [x] Fixed theme provider `setState` in effect warning (requestAnimationFrame)
- [x] Fixed signup form `any` type error (eslint-disable)
- [x] Final: 0 errors, 1 unfixable library warning

### 11F: Database Migration ✅
- [x] `supabase/migrations/010_atomic_counters.sql` — atomic RPC functions + available_leads view

---

## Remaining Work (Next Sessions)

### High Priority
- [ ] 7D: Typography & spacing polish
- [ ] 7D: Quote form visual polish + theme consistency
- [ ] 7D: Thank you page — update to semantic tokens
- [ ] 7D: Test all 3 themes end-to-end
- [ ] 8B: Quote form copy — Cashvertising principles
- [ ] 8C: Admin-facing copy polish

### Medium Priority
- [ ] Error boundaries for API failures
- [ ] Skeleton loaders for dashboard pages
- [ ] Search functionality for admin leads/vendors
- [ ] Admin breadcrumb navigation
- [ ] Accessibility audit (keyboard nav, ARIA labels, focus rings)
- [ ] Blog content writing (6 posts ready for content)
- [ ] UI/UX polish — ensure site is beautiful and tailored to commercial moving/IT logistics niche

### Lower Priority
- [ ] SMS notifications via Twilio
- [ ] Customer portal for lead status
- [ ] SEO optimization (structured data, sitemap)
- [ ] Analytics integration (GA4, GTM)
- [ ] Production deployment checklist
- [ ] Real testimonials + imagery

---

## Key Files Changed (for reference)

### Phase 0-6 (Previous Sessions)

**Fully Rewritten:**
- `src/types/leads.ts`
- `src/types/database.ts`
- `src/lib/pricing.ts`
- `src/lib/email.ts`
- `src/app/api/leads/route.ts`
- `src/components/forms/quote-form.tsx`
- `src/components/forms/mini-calculator.tsx`
- `src/components/layout/footer.tsx`
- `src/components/layout/mobile-nav.tsx`

**New Files:**
- `supabase/migrations/003_powerroute_rebrand.sql`
- `src/app/api/vendors/route.ts`

### Phase 7 (2026-01-29 Session)

**New Files:**
- `src/lib/theme.ts` — theme definitions, storage helpers
- `src/components/theme-provider.tsx` — React context provider

**Fully Rewritten (theme migration + copy overhaul):**
- `src/app/globals.css` — 3 complete CSS variable theme sets
- `src/app/layout.tsx` — ThemeProvider wrapper + FOUC prevention script
- `src/app/(marketing)/page.tsx` — marketplace positioning + semantic tokens
- `src/components/layout/header.tsx` — semantic tokens
- `src/components/layout/footer.tsx` — semantic tokens
- `src/components/layout/mobile-nav.tsx` — semantic tokens
- `src/components/forms/mini-calculator.tsx` — semantic tokens
- `src/app/(admin)/admin/settings/page.tsx` — theme picker + semantic tokens
- `src/app/(admin)/admin/layout.tsx` — `bg-muted` instead of `bg-gray-100`

### Phase 9-10 (2026-02-04 Session)

**New Files (15+):**
- `src/lib/rate-limit.ts`, `src/lib/auth.ts`, `src/lib/stripe.ts`, `src/lib/pagination.ts`
- `src/components/ui/pagination.tsx`
- `src/app/api/stripe/webhook/route.ts`
- `src/app/api/admin/vendors/[id]/status/route.ts`
- `src/app/api/dashboard/leads/route.ts`, `src/app/api/dashboard/leads/[id]/purchase/route.ts`
- `src/app/api/dashboard/purchases/route.ts`, `src/app/api/dashboard/purchases/[id]/outcome/route.ts`
- `src/app/api/providers/signup/route.ts`
- `src/app/(dashboard)/` — full vendor dashboard (layout, sidebar, header, all pages)
- `src/app/(marketing)/providers/` — signup + login pages
- `src/components/providers/signup-form.tsx`
- `src/components/dashboard/` — sidebar, header, lead-detail-modal
- `supabase/migrations/004-009` — purchases, vendor auth, constants, indexes

**Modified (16+ files):**
- All existing API routes (auth + rate limiting added)
- `src/middleware.ts` (CSRF protection)
- Admin pages (pagination added)
- Dashboard pages (pagination added)

### Phase 11 (2026-02-05 Session)

**New Files:**
- `src/lib/blog.ts` — blog post data store
- `src/app/(marketing)/privacy/page.tsx` — privacy policy
- `src/app/(marketing)/terms/page.tsx` — terms of service
- `supabase/migrations/010_atomic_counters.sql` — atomic RPC functions + available_leads view

**Modified (17 files):**
- `src/app/api/dashboard/leads/[id]/purchase/route.ts` — atomic RPC for sold_count
- `src/app/api/stripe/webhook/route.ts` — idempotent processing + atomic RPC
- `src/app/api/auth/callback/route.ts` — open redirect prevention
- `src/app/api/vendors/route.ts` — PATCH field whitelist
- `src/app/api/dashboard/leads/route.ts` — available_leads view
- `src/app/api/leads/route.ts` — soft-delete + bulk limits
- `src/app/(marketing)/blog/page.tsx` — centralized blog data
- `src/app/(marketing)/blog/[slug]/page.tsx` — rich HTML rendering
- Multiple marketing pages — unused import cleanup
- `src/components/theme-provider.tsx` — setState fix
- `src/components/providers/signup-form.tsx` — lint fix

**Deleted:**
- `src/app/api/stripe/checkout/route.ts` — duplicate endpoint removed
