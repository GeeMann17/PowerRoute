# MovingLeadGen - Comprehensive Implementation Plan

## Project Status Summary
A Next.js lead generation platform for moving companies with:
- ✅ Marketing homepage (2 versions for A/B testing)
- ✅ Quote form with Zod validation
- ✅ Supabase database with leads table
- ✅ Admin dashboard (stats, leads list, lead detail with maps)
- ✅ Email notifications via Resend
- ✅ Authentication (Supabase Auth with login/logout)
- ✅ Branding updated (WhiteGloveLeads)
- ✅ Google Maps Distance API integration
- ✅ Database-driven pricing rules
- ✅ Interactive route maps on thank-you page and admin lead detail

---

## Required API Keys & Accounts Setup

### Configured ✅
| Service | Purpose | Env Variable |
|---------|---------|--------------|
| Supabase | Database & Auth | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| Resend | Transactional email | `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_NOTIFICATION_EMAIL` |
| Google Maps | Distance calculation & embeds | `GOOGLE_MAPS_API_KEY`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` |

### Optional (Not Yet Configured)
| Service | Purpose | Setup URL | Env Variable |
|---------|---------|-----------|--------------|
| Google Analytics | Traffic analytics | https://analytics.google.com | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| GTM | Tag management | https://tagmanager.google.com | `NEXT_PUBLIC_GTM_ID` |
| Twilio | SMS notifications | https://twilio.com | `TWILIO_*` vars |

---

## Phase 1: Quick Wins ✅ COMPLETE
**Status: All tasks completed**

### 1.1 Branding Updates ✅
- [x] Replace "MoveQuote" → "WhiteGloveLeads" across all files
- [x] Update placeholder phone number
- [x] Update page metadata

### 1.2 Quote Form Enhancements ✅
- [x] Add "Data Center" to commercial property types
- [x] Add commercial-specific special items (IT Assets, Server Racks, etc.)
- [x] Update pricing engine for new items

---

## Phase 2: Admin Dashboard Enhancements ✅ COMPLETE
**Status: All tasks completed**

### 2.1 New Metrics Cards ✅
- [x] Conversion funnel widget (% at each stage)
- [x] Total quoted value (sum of `quote_high`)
- [x] Average quote size calculation
- [x] Conversion rate (converted ÷ total)

### 2.2 Source Attribution Section ✅
- [x] Leads by source breakdown
- [x] Leads by UTM campaign table
- [x] Chart visualization with Recharts

---

## Phase 3: Leads Table Enhancements ✅ COMPLETE
**Status: All tasks completed**

### 3.1 Quick Actions ✅
- [x] Inline status dropdown in table row
- [x] Call button (phone icon → `tel:` link)
- [x] Email button (mail icon → `mailto:` link)

### 3.2 Bulk Actions ✅
- [x] Checkbox column for row selection
- [x] "Select All" checkbox in header
- [x] Bulk action bar (change status, export CSV, delete)
- [x] `DELETE /api/leads` endpoint for bulk delete

---

## Phase 4: Admin Pages & Navigation ✅ COMPLETE
**Status: All tasks completed**

### 4.1 New Pages Structure ✅
```
/admin/settings     → Company settings & configuration
/admin/users        → Team management
/admin/reports      → Analytics & exports
/admin/pricing      → Pricing rules configuration
```

### 4.2 Settings Page ✅
- [x] Company info form
- [x] Email template preview
- [x] Settings stored in Supabase

### 4.3 Users Page ✅
- [x] Team member list
- [x] Add/invite user functionality
- [x] Role management (Admin, Manager, Viewer)

### 4.4 Reports Page ✅
- [x] Date range picker component
- [x] Leads over time chart
- [x] Conversion funnel visualization
- [x] Export functionality (CSV)

### 4.5 Sidebar Updates ✅
- [x] Added: Dashboard, Leads, Reports, Team, Pricing, Settings
- [x] Sign out button with auth

---

## Phase 5: Technical Improvements ✅ COMPLETE
**Status: All tasks completed**

### 5.1 Authentication ✅
- [x] Supabase Auth enabled
- [x] Login page at `/admin/login`
- [x] Auth middleware for `/admin/*` routes
- [x] Session management
- [x] Sign out functionality

### 5.2 Google Maps Distance API ✅
- [x] API key configured
- [x] Distance Matrix API enabled
- [x] Created `src/lib/distance.ts` utility
- [x] Updated pricing to use real mileage
- [x] Results cached to minimize API costs
- [x] Distance displayed on thank-you page
- [x] Distance displayed on admin lead detail page
- [x] Interactive embedded Google Maps on both pages
- [x] Expandable map modal

### 5.3 Custom Pricing Rules ✅
- [x] Created `pricing_rules` table (migration: `002_add_pricing_rules.sql`)
- [x] Created Admin UI at `/admin/pricing`
- [x] Created `src/lib/pricing-service.ts`
- [x] Pricing engine loads rules from database with caching

---

## Phase 6: Cashvertising Copy Optimization - IN PROGRESS
**Applying psychology-based copy improvements from Cashvertising Implementation Guide**

### 6.1 Week 1: High-Impact Quick Wins ✅ PARTIAL
- [x] Homepage V2 created with Cashvertising-optimized copy
- [x] Version switching system (V1/V2) implemented
- [x] Fraud protection section added (fear-relief tactic)
- [x] Specific numbers throughout ($847, 12,487, 94%, 4.9/5)
- [x] Reason-why FAQ answers
- [x] Specific testimonials with outcomes
- [x] Switch default homepage to V2 (env var toggle: `NEXT_PUBLIC_HOMEPAGE_VERSION`)
- [ ] Run A/B test comparing V1 vs V2 conversion rates

### 6.2 Week 2: Trust Element Overhaul
- [ ] Create `/verification-process` page showing mover vetting process
- [ ] Add "$1M+ insurance minimum" callout to mini calculator section
- [ ] Update email templates with Cashvertising principles (specificity, reason-why)
- [ ] Add AI accuracy stat to quote form: "94% within 10% vs industry 40%"

### 6.3 Marketing Docs Update ✅
- [x] Update MARKETING_STRATEGY.md with Cashvertising-enhanced pillars
- [x] Update AD_CREATIVE_BRIEF.md with Cashvertising callouts & fraud exposure creative
- [x] Update TODO.md to reflect current state
- [x] Update PROJECT_CONTEXT.md with complete implementation status

### 6.4 Ad Creative Refresh
- [ ] Produce "3 Common Traps" carousel creative assets
- [ ] Create "Before AI / After AI" comparison visual
- [ ] Develop "Why 12,487 people..." social proof hooks
- [ ] Write reason-why email sequences for Resend
- [ ] Test fear-based vs benefit-based ad copy

---

## Phase 7: Vendor Marketplace & Auth ✅ COMPLETE
**Self-service vendor portal with Supabase Auth, Stripe payments, rate limiting, CSRF, pagination**

### Completed (Sessions: 2026-02-04 to 2026-02-05)
- [x] Provider signup/login with Supabase magic link auth
- [x] Vendor dashboard (lead marketplace, my leads, billing, profile)
- [x] Lead purchase flow with Stripe Checkout integration
- [x] Webhook handler with signature verification + idempotent processing
- [x] Rate limiting (4 tiers) with Upstash Redis + graceful degradation
- [x] CSRF protection via Origin/Referer validation in middleware
- [x] Server + client pagination across all list views
- [x] Admin vendor approval/rejection workflow
- [x] Purchase outcome tracking for vendor performance

---

## Phase 8: Security Hardening & Blog ✅ COMPLETE
**Comprehensive security audit + blog infrastructure + legal pages**

### Completed (Session: 2026-02-05)
- [x] P0: Atomic sold_count via PostgreSQL RPC (race condition fix)
- [x] P0: Open redirect prevention in auth callback
- [x] P0: Vendor PATCH field whitelist (22 fields)
- [x] P0: Webhook idempotency (WHERE status = 'pending')
- [x] P1: Available leads SQL view (server-side capacity filter)
- [x] P1: Soft-delete for leads (status: 'closed' instead of hard delete)
- [x] P1: Bulk operation limits (max 100 IDs)
- [x] P1: Consolidated purchase endpoint (removed duplicate)
- [x] Blog infrastructure with centralized post data store
- [x] Privacy policy + Terms of service pages
- [x] Full lint cleanup (0 errors)

---

## Phase 9: Future Enhancements (Lower Priority)

### 9.1 Communications
- [ ] SMS notifications via Twilio
- [ ] In-app notification system (Supabase Realtime)

### 9.2 Customer Experience
- [ ] AI-powered quote chat
- [ ] Customer portal for lead status
- [ ] Calendar integration for scheduling

### 9.3 Content & Polish
- [ ] Write blog content (6 posts ready for content)
- [ ] Real testimonials (or remove placeholder section)
- [ ] Professional photography / custom illustrations
- [ ] SEO optimization (structured data, sitemap)
- [ ] UI/UX polish — ensure site is beautiful and tailored to IT logistics niche

### 9.4 Technical
- [ ] Error boundaries for API failures
- [ ] Skeleton loaders for dashboard pages
- [ ] Search functionality for admin leads/vendors
- [ ] Accessibility audit (keyboard nav, ARIA labels, focus rings)

---

## Database Migrations

### Completed Migrations
1. **001_add_distance_columns.sql** — distance_miles, distance_source, origin/destination addresses
2. **002_add_pricing_rules.sql** — pricing_rules table
3. **003_powerroute_rebrand.sql** — IT logistics schema (job_type, facilities, compliance, vendors)
4. **004_lead_purchases.sql** — lead_purchases table
5. **005_vendor_user_auth.sql** — vendor user_id, status, leads_purchased
6. **006-009** — constants, indexes, service pages
7. **010_atomic_counters.sql** — atomic RPC functions + available_leads view

### To Run Migrations
Run all SQL files in `supabase/migrations/` in order via Supabase SQL Editor.

---

## Production Readiness Checklist

### Infrastructure
- [ ] Set up production Supabase project (separate from dev)
- [ ] Run all 10 migrations on production database
- [ ] Configure custom domain (DNS, SSL)
- [ ] Set up Vercel deployment (connect GitHub repo)
- [ ] Configure production environment variables in Vercel (including Stripe, Upstash)
- [ ] Enable and test RLS policies on production database

### Security
- [x] Rate limiting on all API endpoints (Upstash Redis)
- [x] CSRF protection (Origin/Referer validation)
- [x] Auth guards on all admin + dashboard endpoints
- [x] Open redirect prevention
- [x] Field whitelist on vendor PATCH
- [x] Atomic counters (no race conditions)
- [x] Webhook idempotency
- [ ] Configure production Google Maps API key with domain restrictions
- [ ] Restrict Supabase anon key to allowed origins
- [ ] Configure Stripe webhook endpoint in production

### Content & Branding
- [x] Privacy policy page (`/privacy`)
- [x] Terms of service page (`/terms`)
- [x] Blog infrastructure (ready for content)
- [ ] Add real phone number to all branding (header, footer, CTA sections)
- [ ] Replace placeholder testimonials with real ones (or remove)
- [ ] Update stats with real data
- [ ] Write blog content (6 posts defined)

### Analytics & Monitoring
- [ ] Set up Google Analytics 4 (GA_MEASUREMENT_ID)
- [ ] Set up Google Tag Manager (GTM_ID)
- [ ] Install Google Ads conversion pixel
- [ ] Install Meta Pixel
- [ ] Configure Vercel Analytics (built-in)
- [ ] Set up error monitoring (Sentry or similar)

### Performance
- [ ] Run Lighthouse audit (target 90+ scores)
- [ ] Optimize images (WebP, lazy loading)
- [ ] Verify Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Test mobile experience across devices

### Email
- [ ] Configure custom domain for Resend (not onboarding@resend.dev)
- [ ] Test email deliverability
- [ ] Set up email templates with proper branding

---

## Key Files Reference

| Area | Files |
|------|-------|
| Branding | `header.tsx`, `footer.tsx`, `mobile-nav.tsx`, `sidebar.tsx`, `email.ts`, `layout.tsx` |
| Quote Form | `src/types/leads.ts`, `src/lib/pricing.ts`, `src/components/forms/quote-form.tsx` |
| Admin Dashboard | `src/app/(admin)/admin/page.tsx` |
| Leads Table | `src/components/admin/leads-table.tsx`, `src/app/(admin)/admin/leads/page.tsx` |
| Lead Detail | `src/app/(admin)/admin/leads/[id]/page.tsx`, `route-map-section.tsx` |
| Thank You Page | `src/app/(quote)/thank-you/page.tsx`, `thank-you-map.tsx` |
| Pricing | `src/lib/pricing.ts`, `src/lib/pricing-service.ts`, `src/app/(admin)/admin/pricing/page.tsx` |
| Distance | `src/lib/distance.ts` |
| Auth | `src/app/(admin)/admin/login/page.tsx`, `src/middleware.ts` |
| API | `src/app/api/leads/route.ts`, `src/app/api/leads/[id]/status/route.ts`, `src/app/api/pricing-rules/route.ts` |
| Database | `supabase/schema.sql`, `supabase/migrations/` |
| Supabase | `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts` |

---

## Recent Changes

### Session: January 26, 2026 (Cashvertising & Documentation)
1. **Documentation Overhaul**
   - Updated TODO.md to reflect all Phase 1-5 items as completed
   - Updated PROJECT_CONTEXT.md with full current implementation status
   - Expanded IMPLEMENTATION_PLAN.md with detailed Phase 6-7 and production checklist
   - Updated MARKETING_STRATEGY.md with Cashvertising-enhanced copy pillars
   - Updated AD_CREATIVE_BRIEF.md with Cashvertising callouts and fraud exposure creative

2. **Cashvertising Copy Optimization**
   - Homepage V2 already contains most Week 1 Cashvertising principles
   - Marketing docs aligned with Cashvertising Implementation Guide recommendations
   - Phase 6 plan created for remaining copy optimization work

### Previous Session: Technical Improvements
1. **Google Maps Distance API Integration**
   - Created distance calculation service with caching
   - Updated leads API to calculate and store real distances
   - Added distance columns to leads table

2. **Database-Driven Pricing**
   - Created pricing_rules table and admin UI
   - Pricing service loads rules from DB with 5-minute cache

3. **Interactive Route Maps**
   - Thank-you page: Shows embedded Google Map by default with route
   - Admin lead detail: Shows distance info with expandable map
   - Both have "Open in Google Maps" external link
