# PowerRoute - Project Context

## Project Overview
An IT logistics directory and lead generation matching platform. Positions as a marketplace that connects enterprises with pre-vetted, certified IT logistics providers. Captures leads through an instant quote calculator, stores them in Supabase, and manages a 7-stage vendor pipeline. Includes a full admin dashboard, a self-service vendor marketplace with Stripe payments, blog infrastructure, and comprehensive security hardening.

**Business Name:** PowerRoute
**Industry:** IT Asset Logistics (Data Center Relocation, ITAD, Asset Recovery, Office Decommission, Equipment Delivery)
**Admin Email:** shanematt2112@gmail.com

---

## Tech Stack
- **Framework:** Next.js 16.1.4 (App Router) + TypeScript 5
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Database:** Supabase (PostgreSQL) with RLS policies
- **Payments:** Stripe (Checkout Sessions + Webhooks)
- **Email:** Resend (transactional emails)
- **Rate Limiting:** @upstash/ratelimit + @upstash/redis (graceful degradation)
- **Forms:** React Hook Form + Zod v4
- **Icons:** Lucide React
- **Maps:** Google Maps Distance Matrix API + Embeds
- **Auth:** Supabase Auth (magic link + email)

---

## Current Implementation Status

> **Last Updated**: 2026-02-05

### Completed (All Phases 0-11)
- [x] Project setup with Next.js 16.1.4, TypeScript 5, Tailwind CSS v4
- [x] Supabase client configuration (browser + server + service)
- [x] Database schema: leads, vendors, pricing_rules, lead_purchases tables
- [x] Row-Level Security (RLS) policies
- [x] Theme system with 3 switchable themes (Light/Clean, Dark Premium, Corporate Navy)
- [x] Theme provider (React context), admin toggle in Settings, FOUC prevention
- [x] Layout components (Header, Footer, MobileNav) with semantic theme tokens
- [x] Homepage with marketplace/directory positioning, Cashvertising copy, theme-aware design
- [x] **Mini Calculator** — instant estimate on homepage inline
- [x] Full Quote Form (`/quote`) — multi-step wizard with IT logistics fields
- [x] Thank You page with quote display + interactive route map
- [x] **Blog infrastructure** — centralized post data store, listing page, post pages, 6 placeholder posts
- [x] **Legal pages** — Privacy policy (`/privacy`), Terms of service (`/terms`)
- [x] **Service pages** — About, DC Relocation, ITAD, Asset Recovery, Office Decommission, White Glove Delivery
- [x] API routes: leads CRUD (with soft-delete, bulk limits), pricing-rules CRUD, vendors CRUD (with field whitelist)
- [x] API routes: dashboard leads, purchases, purchase outcomes
- [x] API routes: provider signup, Stripe webhook (idempotent), admin vendor status
- [x] Admin Dashboard (`/admin`) — 7-stage pipeline funnel, win rate, vendor count, source attribution
- [x] Admin Leads List with pagination + 7 status filter tabs + CSV export
- [x] Admin Lead Detail — job details, facility details, equipment & handling, compliance, vendor assignment
- [x] Admin Vendors List with pagination + performance metrics
- [x] Admin Vendor Detail — profile, performance, assigned leads
- [x] Admin Settings — PowerRoute company info + theme switcher
- [x] Admin Users — team management with roles
- [x] Admin Reports — 7-stage pipeline, job type distribution, win rate
- [x] Admin Pricing — 6 rule types grouped by 5 job types
- [x] **Vendor Dashboard** (`/dashboard`) — lead marketplace, my leads, billing, profile (all with pagination)
- [x] **Provider Auth** — signup form, magic link login, auth callback, middleware protection
- [x] **Stripe Checkout** — session creation, webhook handling, refund support
- [x] **Rate limiting** — Upstash Redis with graceful degradation (4 tiers)
- [x] **CSRF protection** — Origin/Referer validation in middleware
- [x] **Atomic counters** — PostgreSQL RPC functions for sold_count + vendor leads_purchased
- [x] **Available leads view** — SQL view filtering sold_count < max_sales
- [x] Email integration with Resend (customer + admin + vendor notifications)
- [x] Google Maps Distance Matrix API integration with caching
- [x] Database-driven pricing with 5-minute cache
- [x] Supabase Auth with login, session management, protected routes
- [x] **Security audit complete** — P0/P1 items all resolved

### Key Domain Concepts

**Lead Status Pipeline (7 stages):**
`new` → `vetted` → `sent_to_vendor` → `vendor_accepted` → `quoted` → `won` / `lost`

**Job Types (5):**
- Data Center Relocation
- IT Asset Disposition (ITAD)
- Asset Recovery
- Office IT Decommission
- White Glove Equipment Delivery

**Pricing Rule Types (6):**
`labor_rate`, `material_cost`, `trip_charge`, `weight_tier`, `compliance_surcharge`, `distance_tier`

**Vendor Status:** `pending` → `approved` / `rejected`

**Purchase Status:** `pending` → `completed` / `refunded`

---

## Configuration

### Environment Variables (`.env.local`)
```
# Supabase - CONFIGURED
NEXT_PUBLIC_SUPABASE_URL=https://pfoetcmxqzspgjlybkgf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[configured]
SUPABASE_SERVICE_ROLE_KEY=[configured]

# Resend - CONFIGURED
RESEND_API_KEY=[configured]
RESEND_FROM_EMAIL=onboarding@resend.dev
ADMIN_NOTIFICATION_EMAIL=shanematt2112@gmail.com

# Google Maps - CONFIGURED
GOOGLE_MAPS_API_KEY=[configured]
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=[configured]

# Stripe - CONFIGURED
STRIPE_SECRET_KEY=[configured]
STRIPE_WEBHOOK_SECRET=[configured]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[configured]

# Upstash Redis (optional - graceful degradation)
UPSTASH_REDIS_REST_URL=[optional]
UPSTASH_REDIS_REST_TOKEN=[optional]

# Admin
ADMIN_EMAILS=shanematt2112@gmail.com

# Analytics - NOT CONFIGURED (optional)
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Database
- **Project:** PowerRoute on Supabase
- **Tables:** leads, vendors, pricing_rules, lead_purchases
- **Views:** available_leads (marketplace filter)
- **RPC Functions:** increment_lead_sold_count, increment_vendor_leads_purchased
- **Migrations:**
  - `001_add_distance_columns.sql` — distance fields
  - `002_add_pricing_rules.sql` — pricing_rules table
  - `003_powerroute_rebrand.sql` — IT logistics schema
  - `004_lead_purchases.sql` — lead_purchases table
  - `005_vendor_user_auth.sql` — vendor auth columns
  - `006-009` — constants, indexes, service pages
  - `010_atomic_counters.sql` — atomic RPC functions + available_leads view

---

## File Structure
```
/src
  /app
    /(marketing)/
      page.tsx                    # IT logistics homepage (theme-aware, marketplace positioning)
      about/page.tsx              # About PowerRoute
      blog/page.tsx               # Blog listing
      blog/[slug]/page.tsx        # Blog post
      privacy/page.tsx            # Privacy policy
      terms/page.tsx              # Terms of service
      providers/
        signup/page.tsx           # Vendor signup
        login/page.tsx            # Vendor login
      services/
        data-center-relocation/   # Service pages
        itad/
        asset-recovery/
        office-decommission/
        white-glove-delivery/
    /(quote)/
      quote/page.tsx              # Multi-step quote wizard
      thank-you/page.tsx          # Confirmation + route map
    /(admin)/admin/
      page.tsx                    # Dashboard: pipeline funnel, win rate, vendors
      login/page.tsx              # Admin auth entry point
      leads/page.tsx              # Leads table with 7 status filters + pagination
      leads/[id]/page.tsx         # Lead detail
      vendors/page.tsx            # Vendor list with pagination
      vendors/[id]/page.tsx       # Vendor detail
      settings/page.tsx           # Company config + theme switcher
      users/page.tsx              # Team management
      reports/page.tsx            # Analytics
      pricing/page.tsx            # Pricing rules
    /(dashboard)/dashboard/
      leads/page.tsx              # Lead marketplace with pagination
      my-leads/page.tsx           # Purchased leads
      billing/page.tsx            # Payment history
      profile/page.tsx            # Vendor profile
    /api/
      leads/route.ts              # Create/read/update/soft-delete leads
      leads/[id]/status/route.ts  # Status updates
      pricing-rules/route.ts      # Pricing config CRUD
      vendors/route.ts            # Vendor CRUD (field whitelist on PATCH)
      auth/callback/route.ts      # Supabase auth callback (open-redirect safe)
      providers/signup/route.ts   # Vendor registration
      stripe/webhook/route.ts     # Stripe webhook (idempotent)
      dashboard/
        leads/route.ts            # Available leads for marketplace
        leads/[id]/purchase/route.ts  # Lead purchase + Stripe checkout
        purchases/route.ts        # Purchase history
        purchases/[id]/outcome/route.ts  # Purchase outcome tracking
      admin/
        vendors/[id]/status/route.ts  # Vendor approval/rejection
  /components
    /layout/header.tsx, footer.tsx, mobile-nav.tsx
    /forms/mini-calculator.tsx, quote-form.tsx
    /admin/sidebar.tsx, leads-table.tsx
    /dashboard/sidebar.tsx, header.tsx, lead-detail-modal.tsx
    /providers/signup-form.tsx
    /analytics/gtm.tsx
    /theme-provider.tsx           # Theme context + useTheme() hook
    /ui/                          # shadcn/ui components + pagination
  /lib
    /supabase/client.ts, server.ts
    /email.ts                     # Resend integration
    /pricing.ts                   # Base pricing logic
    /pricing-service.ts           # DB-driven pricing with cache
    /distance.ts                  # Google Maps distance API
    /analytics.ts                 # Event tracking
    /theme.ts                     # Theme definitions (3 themes), storage helpers
    /auth.ts                      # requireAdmin/requireVendor helpers
    /rate-limit.ts                # Upstash rate limiting
    /stripe.ts                    # Stripe server client
    /pagination.ts                # Pagination utilities
    /blog.ts                      # Blog post data store
    /constants.ts                 # US states, certifications, equipment options
    /utils.ts
  /types
    /database.ts                  # Supabase types (Lead, Vendor, PricingRule, etc.)
    /leads.ts                     # Zod validation schemas
  middleware.ts                   # Auth protection + CSRF
/supabase
  schema.sql                      # Initial database schema
  /migrations/
    001-010                       # 10 migration files
```

---

## Development

```bash
# Start dev server (requires Node.js >= 20.9.0)
nvm use 20  # if using nvm
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build
npm run build

# URLs
Homepage:           http://localhost:3000
Blog:               http://localhost:3000/blog
Quote Form:         http://localhost:3000/quote
Provider Signup:    http://localhost:3000/providers/signup
Provider Login:     http://localhost:3000/providers/login
Vendor Dashboard:   http://localhost:3000/dashboard
Admin:              http://localhost:3000/admin
Admin Login:        http://localhost:3000/admin/login
Privacy:            http://localhost:3000/privacy
Terms:              http://localhost:3000/terms
```

### Build Status (2026-02-05)
- `npx tsc --noEmit`: **0 errors**
- `npm run lint`: **0 errors**, 1 unfixable library warning (React Hook Form)

### Git
- **Remote:** https://github.com/sbgm6/WGLeadsRackRout3.git
- **Branch:** main
- **Latest commit:** `1ecd885` — Security fixes, blog infrastructure, and lint cleanup
