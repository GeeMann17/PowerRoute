# PowerRoute — Comprehensive Audit & Go-Live Gameplan

> **Last Updated**: 2026-02-07
> **Audit Scope**: Full codebase review — architecture, security, frontend, UX, SEO, operational readiness
> **Status**: Phases 0–11 complete. Pre-launch hardening required.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [What's Working Well](#whats-working-well)
4. [Critical Issues (P0 — Fix Before Go-Live)](#critical-issues-p0--fix-before-go-live)
5. [High Priority Issues (P1)](#high-priority-issues-p1)
6. [Medium Priority Issues (P2)](#medium-priority-issues-p2)
7. [Security Audit Findings](#security-audit-findings)
8. [Frontend & UX Audit](#frontend--ux-audit)
9. [SEO & Marketing Audit](#seo--marketing-audit)
10. [Accessibility Audit](#accessibility-audit)
11. [Copy Persona System](#copy-persona-system)
11. [Honest User Feedback](#honest-user-feedback)
12. [Go-Live Gameplan (Phases 12–16)](#go-live-gameplan-phases-1216)
13. [File Reference Index](#file-reference-index)

---

## Executive Summary

PowerRoute is a well-architected B2B lead generation marketplace for IT logistics (data center relocations, ITAD, asset recovery, office decommission, white glove delivery). After 11 phases of development across 9 commits, the core platform is **feature-complete** with strong security foundations.

**The app includes:**
- Public marketing site with 5 service pages, blog infrastructure, legal pages
- Multi-step quote wizard (6 steps) with inline mini calculator
- Admin dashboard: lead pipeline, vendor management, pricing rules, reports
- Vendor self-service portal: marketplace, lead purchasing via Stripe, profile management
- 5 switchable themes (Light/Brutalist, Dark, Corporate, Concrete, Whiteout)

**What's needed to go live:** Security hardening (P0 fixes), SEO essentials, mobile dashboard responsiveness, error boundaries, and operational tooling (monitoring, analytics, email domain).

**Overall Quality Score: 7.5/10** — Strong foundation, needs production polish.

---

## Architecture Overview

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.4 (App Router, Server Components) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 + shadcn/ui + 5 CSS variable themes |
| Database | Supabase (PostgreSQL) with Row-Level Security |
| Authentication | Supabase Auth (email/magic link) |
| Payments | Stripe (Checkout Sessions, Webhooks) |
| Email | Resend (transactional emails) |
| Rate Limiting | Upstash Redis (graceful degradation) |
| Forms | React Hook Form + Zod v4 validation |
| Distance API | Google Maps Distance Matrix (with 24hr cache + ZIP fallback) |
| Analytics | Google Tag Manager + GA4 (optional, not yet configured) |
| Icons | Lucide React |

### Route Structure

```
/ (Marketing)
├── /                        → Landing page (hero, mini calculator, services, testimonials, FAQ)
├── /about                   → About PowerRoute + vetting process
├── /blog                    → Blog listing (6 placeholder posts)
├── /blog/[slug]             → Individual blog post
├── /privacy                 → Privacy policy
├── /terms                   → Terms of service
├── /services/data-center-relocation
├── /services/itad
├── /services/asset-recovery
├── /services/office-decommission
└── /services/white-glove-delivery

/ (Quote Flow)
├── /quote                   → 6-step quote wizard
└── /thank-you               → Confirmation with route map

/ (Provider Auth)
├── /providers/signup        → Vendor registration (multi-step)
└── /providers/login         → Vendor login (magic link)

/admin (Admin Dashboard — protected)
├── /admin                   → Dashboard (pipeline funnel, metrics)
├── /admin/login             → Admin login
├── /admin/leads             → Lead table with 7-status filters + pagination
├── /admin/leads/[id]        → Lead detail (job, facility, equipment, compliance, vendor)
├── /admin/vendors           → Vendor grid with performance metrics
├── /admin/vendors/[id]      → Vendor detail page
├── /admin/pricing           → Pricing rules management (6 rule types x 5 job types)
├── /admin/reports           → Analytics (pipeline, job distribution, win rate)
├── /admin/settings          → Company info + theme switcher
└── /admin/users             → Team management

/dashboard (Vendor Portal — protected)
├── /dashboard               → Vendor home
├── /dashboard/leads         → Lead marketplace (browse + purchase)
├── /dashboard/my-leads      → Purchased leads with outcomes
├── /dashboard/billing       → Payment history
└── /dashboard/profile       → Vendor profile editor
```

### API Routes

| Route | Method | Purpose | Auth | Rate Limit |
|-------|--------|---------|------|------------|
| `/api/leads` | POST | Create lead (public form) | None | 10/hr |
| `/api/leads` | PATCH | Bulk update status | Admin | 60/min |
| `/api/leads` | DELETE | Bulk soft-delete | Admin | 60/min |
| `/api/leads/[id]/status` | POST | Update lead status | Admin | 60/min |
| `/api/vendors` | GET | List vendors | Public | — |
| `/api/vendors` | POST | Create vendor | Admin | 60/min |
| `/api/vendors` | PATCH | Update vendor (22-field whitelist) | Admin | 60/min |
| `/api/vendors` | DELETE | Delete vendor | Admin | 60/min |
| `/api/admin/vendors/[id]/status` | PATCH | Approve/reject vendor | Admin | 60/min |
| `/api/pricing-rules` | GET/POST/PATCH/DELETE | Pricing CRUD | Admin | 60/min |
| `/api/providers/signup` | POST | Vendor registration | None | 5/hr |
| `/api/auth/callback` | GET | Supabase auth callback | None | — |
| `/api/dashboard/leads` | GET | Available leads (marketplace) | Vendor | 60/min |
| `/api/dashboard/leads/[id]/purchase` | POST | Purchase lead (Stripe checkout) | Vendor | 60/min |
| `/api/dashboard/purchases` | GET | Purchase history | Vendor | 60/min |
| `/api/dashboard/purchases/[id]/outcome` | PATCH | Mark outcome (won/lost) | Vendor | 60/min |
| `/api/stripe/webhook` | POST | Stripe event handler | Stripe sig | Excluded |

### Database Schema (5 Tables + 1 View + 2 RPC Functions)

- **leads** — Core lead data (contact, job, facilities, assets, compliance, quote, distance, vendor assignment, enrichment, marketplace, attribution)
- **vendors** — Provider profiles (company, capabilities, performance, billing, trust)
- **pricing_rules** — Dynamic pricing config (6 rule types, per-job-type, company tier)
- **lead_purchases** — Marketplace transactions (lead, vendor, price, Stripe ID, outcome)
- **company_enrichments** — Cached company data (domain, size, revenue, industry)
- **available_leads** (VIEW) — Filters leads where `sold_count < max_sales`
- **increment_lead_sold_count()** (RPC) — Atomic counter increment
- **increment_vendor_leads_purchased()** (RPC) — Atomic counter increment

---

## What's Working Well

### Architecture & Code Quality
- Clean App Router structure with proper route groups and layouts
- Supabase with RLS policies, atomic RPC functions, and 10 sequential migrations
- Zod validation on every API endpoint and every form
- React Hook Form with multi-step wizard — comprehensive 6-step quote form
- Proper separation: service role client for admin ops, anon key for public
- TypeScript strict mode with 0 errors
- ESLint passing with 0 errors (1 unfixable library warning)

### Security Foundation
- CSRF protection via Origin/Referer validation in middleware
- Rate limiting with Upstash Redis and graceful degradation
- Stripe webhook signature verification + idempotent processing (`WHERE status = 'pending'`)
- Open redirect prevention on auth callback (validates `next` param)
- HTML escaping in all email templates via custom `escapeHtml()` function
- Atomic counters for `sold_count` preventing race conditions
- Soft-delete pattern for leads (sets status to 'closed')
- Bulk operation limits (max 100 IDs per batch)
- PATCH field whitelist on vendor updates (22 allowed fields)
- `.env*` properly gitignored — secrets are NOT in version control

### Business Logic
- Dynamic pricing engine with DB-driven rules + hardcoded fallbacks + 5-min cache
- Distance calculation: Google Maps API → 24hr cache → ZIP-based fallback
- 7-stage lead pipeline with proper status transitions
- Vendor marketplace with lead purchasing, Stripe checkout, outcome tracking
- Company enrichment data model (tier, revenue, industry)
- Auto-vendor matching on lead creation

### Design System
- 5 switchable themes with 50+ CSS semantic tokens per theme
- Neo-brutalist aesthetic is distinctive and memorable
- FOUC prevention with inline theme script in `<head>`
- Theme persistence in localStorage with React context API

---

## Critical Issues (P0 — Fix Before Go-Live)

### P0-1: Dev Theme Switcher Visible in Production
- **File**: `src/components/dev-theme-switcher.tsx`
- **Risk**: Any visitor can switch the site's theme via floating button
- **Fix**: Add `process.env.NODE_ENV === 'development'` guard in layout, or remove from production layouts entirely

### P0-2: Admin Access Fails Open Without ADMIN_EMAILS
- **File**: `src/lib/auth.ts` (lines 30-39)
- **Risk**: If `ADMIN_EMAILS` env var is not set, `requireAdmin()` may not properly reject unauthorized users
- **Fix**: Make function fail-closed — if `ADMIN_EMAILS` is empty/unset, deny all access

### P0-3: No Security Headers
- **Files**: `next.config.ts`, `src/middleware.ts`
- **Missing**: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, `Content-Security-Policy`, `Referrer-Policy`
- **Fix**: Add headers config in `next.config.ts` or set in middleware response

### P0-4: API Error Responses Leak Internal Details
- **Files**: `src/app/api/leads/[id]/status/route.ts:39`, `src/app/api/admin/vendors/[id]/status/route.ts:41`, and others
- **Risk**: Returns `error.message` from Supabase directly to client — could expose table names, constraint details
- **Fix**: Log error details server-side (`console.error`), return generic message to client (`"An error occurred"`)

### P0-5: No React Error Boundaries
- **Risk**: Any component crash = white screen of death for user
- **Fix**: Create `src/components/error-boundary.tsx` and wrap each layout group (`(marketing)`, `(admin)`, `(dashboard)`, `(quote)`)

### P0-6: Admin Settings Page Doesn't Persist
- **File**: `src/app/(admin)/admin/settings/page.tsx`
- **Issue**: "Save Changes" runs a `setTimeout` + toast but never calls an API. Company info and email settings are UI-only
- **Fix**: Create settings API endpoint, store in database or env config

---

## High Priority Issues (P1)

### P1-1: No robots.txt or sitemap.xml
- **Impact**: Search engines can't properly crawl/index the site
- **Fix**: Add `src/app/robots.ts` and `src/app/sitemap.ts` (Next.js built-in support)

### P1-2: No Open Graph / Twitter Card Meta Tags
- **Impact**: Links shared on social media show no preview image/description
- **Fix**: Add `openGraph` and `twitter` to metadata exports on all public pages

### P1-3: Dashboard Not Mobile-Friendly
- **Files**: `src/app/(dashboard)/dashboard/layout.tsx`, `src/app/(admin)/admin/layout.tsx`
- **Issue**: Fixed 256px sidebar with `pl-64` pushes content off-screen on mobile
- **Fix**: Hide sidebar on mobile, add hamburger menu drawer

### P1-4: Vendor Password Requirements Too Weak
- **File**: `src/app/api/providers/signup/route.ts:34`
- **Issue**: Only requires 8 characters, no complexity requirements
- **Fix**: Require 12+ chars with uppercase, lowercase, number, special character

### P1-5: Blog Content Empty
- **File**: `src/lib/blog.ts`
- **Issue**: 6 placeholder posts defined, all unpublished, no actual content
- **Impact**: Blog page exists but is effectively empty — hurts credibility
- **Fix**: Write and publish at least 3 articles before launch

### P1-6: Configure Production Services
- Upstash Redis for rate limiting (currently gracefully degraded = no rate limiting)
- Google Analytics / GTM for funnel tracking
- Stripe live mode (not test keys)
- Email domain setup (SPF, DKIM, DMARC for Resend)
- Error monitoring (Sentry or equivalent)

### P1-7: Production Deployment Checklist
- Vercel environment variables configured
- Custom domain + SSL
- Database backup strategy for Supabase
- Uptime monitoring (BetterUptime, Checkly, etc.)

---

## Medium Priority Issues (P2)

### P2-1: Hardcoded Pricing Values
- **File**: `src/lib/pricing-service.ts:218-219`
- **Issue**: Rack cost ($500/rack) and loose asset cost ($25/asset) hardcoded with TODO comments
- **Fix**: Add as `material_cost` pricing rules in database

### P2-2: No Form Progress Persistence
- **File**: `src/components/forms/quote-form.tsx`
- **Issue**: Refreshing the 6-step quote form loses all data
- **Fix**: Debounce-save form state to `localStorage`, restore on mount

### P2-3: No Loading Skeletons
- **Issue**: Dashboard pages use `useEffect` + spinner — no skeleton loaders for perceived performance
- **Fix**: Add skeleton components for lead cards, tables, and dashboard metrics

### P2-4: Admin Search Missing
- **Issue**: No search on leads or vendors — painful with 100+ records
- **Fix**: Add search inputs to admin leads and vendors pages

### P2-5: Quote Form Too Large (1,022 Lines)
- **File**: `src/components/forms/quote-form.tsx`
- **Fix**: Extract into step subcomponents: `quote-step-job-type.tsx`, `quote-step-facilities.tsx`, `quote-step-assets.tsx`, `quote-step-compliance.tsx`, `quote-step-schedule.tsx`, `quote-step-contact.tsx`

### P2-6: Reports Page Uses Mock Data
- **File**: `src/app/(admin)/admin/reports/page.tsx`
- **Issue**: Pipeline stages and metrics may not be querying real data
- **Fix**: Wire reports to actual Supabase aggregation queries

### P2-7: No Vendor Notifications for New Leads
- **Issue**: Vendors must manually check marketplace — no push/email when new leads match
- **Fix**: Trigger email notification to matching vendors when new lead created

### P2-8: `dangerouslySetInnerHTML` in Blog
- **File**: `src/app/(marketing)/blog/[slug]/page.tsx`
- **Issue**: Blog content rendered with `dangerouslySetInnerHTML` — safe only if content is trusted
- **Fix**: If content will ever be user-submitted, add DOMPurify sanitization

---

## Security Audit Findings

### Scorecard

| Category | Score | Status |
|----------|-------|--------|
| Authentication & Authorization | 8/10 | Admin email check should fail-closed |
| API Input Validation | 9/10 | Zod on everything, bulk limits |
| CSRF Protection | 9/10 | Origin/Referer validation, Stripe excluded |
| Rate Limiting | 7/10 | Implemented but no-op without Redis |
| SQL Injection Prevention | 10/10 | Supabase parameterized queries only |
| XSS Prevention | 9/10 | React escaping + custom `escapeHtml()` |
| Stripe Integration | 9/10 | Signature verification + idempotency |
| Error Handling | 6/10 | Internal details leaked to clients |
| Security Headers | 3/10 | None configured |
| Secrets Management | 8/10 | `.env*` gitignored, not in history |

### Detailed Findings

**Authentication (`src/middleware.ts`, `src/lib/auth.ts`)**
- Middleware protects `/admin` and `/dashboard` routes with auth redirects
- `requireAdmin()` checks `ADMIN_EMAILS` env var (email whitelist)
- `requireVendor()` checks vendor status is 'approved'
- Cookie config: `sameSite: 'lax'`, secure in production
- **Gap**: No role metadata in Supabase auth — relies entirely on email whitelist

**CSRF (`src/middleware.ts:5-35`)**
- Validates Origin header for POST/PATCH/PUT/DELETE on `/api/*`
- Falls back to Referer header if Origin missing
- Compares against `NEXT_PUBLIC_SITE_URL`
- Stripe webhook correctly exempted

**Rate Limiting (`src/lib/rate-limit.ts`)**
- 4 tiers: public form (10/hr), signup (5/hr), admin API (60/min), dashboard API (60/min)
- IP extraction from `x-forwarded-for` → `x-real-ip` → fallback `127.0.0.1`
- **Note**: Graceful degradation = allows all requests if Redis not configured

**Stripe (`src/app/api/stripe/webhook/route.ts`)**
- `stripe.webhooks.constructEvent()` with signature verification
- Idempotent: `WHERE status = 'pending'` prevents double-processing
- Handles `checkout.session.completed` and `charge.refunded`
- Atomic counter increments via RPC

**Database Security**
- RLS policies: service role has full access, public read on leads/vendors, vendors read own purchases
- Atomic RPC functions prevent race conditions on counters
- Foreign keys defined (leads → vendors, purchases → leads/vendors)
- **Gap**: Need to verify indexes exist on all foreign keys and frequently queried columns (`vendor_id`, `user_id`, `lead_id`, `is_active`)

---

## Frontend & UX Audit

### Component Quality

| Component | Lines | Quality | Notes |
|-----------|-------|---------|-------|
| Quote Form | 1,022 | High | Comprehensive but should decompose |
| Mini Calculator | ~200 | High | Clean, good UX flow |
| Landing Page | ~600 | Excellent | Strong copy, good conversion paths |
| Admin Leads Table | ~300 | Good | 7-status filters, CSV export, pagination |
| Vendor Dashboard | ~400 | Good | Marketplace browsing + purchase flow |
| Header | ~150 | Good | Responsive, but dropdown accessibility gap |
| Footer | ~200 | Good | Complete with certs, links, contact |
| Theme Provider | ~80 | Good | Clean context API implementation |

### Loading & Error States

| Pattern | Implemented | Quality |
|---------|-------------|---------|
| Form submission spinners | Yes | Good — disabled buttons + loading text |
| Dashboard data loading | Yes | Basic — spinner icon only |
| Skeleton loaders | No | Missing |
| Error boundaries | No | Missing — white screen on crash |
| Toast notifications | Yes | Good — Sonner for success/error |
| Network error handling | Partial | Try/catch + toast, no retry logic |
| Offline detection | No | Missing |

### Theme System

5 themes fully implemented with complete CSS variable coverage:

| Theme | Background | Accent | Border Radius | Character |
|-------|-----------|--------|---------------|-----------|
| Light (Default) | #FAFAF5 Off-white | #FFE600 Electric Yellow | 0px | Neo-brutalist |
| Dark | #0A0A0A Black | #39FF14 Neon Green | 0px | Terminal/hacker |
| Corporate | #1A1A2E Navy | #FF6B35 Orange | 2px | Enterprise |
| Concrete | #E8E4DF Warm gray | #C4542A Rust | 0px | Industrial |
| Whiteout | #FFFFFF Pure white | #0066FF Electric Blue | 0px | Minimalist |

---

## SEO & Marketing Audit

### Current State

| Element | Status | Notes |
|---------|--------|-------|
| Page titles | Partial | Root layout has title, some pages missing |
| Meta descriptions | Partial | Root + a few pages, not comprehensive |
| Keywords | Yes | Root layout only |
| Open Graph tags | Missing | No og:image, og:title, og:description |
| Twitter Cards | Missing | No twitter:card, twitter:image |
| robots.txt | Missing | Search engines may crawl unintended pages |
| sitemap.xml | Missing | Search engines can't discover all pages |
| Structured data (JSON-LD) | Missing | No Organization, Service, FAQ schema |
| Canonical URLs | Missing | Potential duplicate content issues |
| Blog content | Empty | 6 placeholders, 0 published |
| FAQ schema markup | Missing | FAQ section exists but no rich snippets |
| Image alt text | Partial | Hero has alt, others need verification |

### Marketing Page Quality

| Page | Quality | Notes |
|------|---------|-------|
| Landing page | Excellent | Strong value prop, mini calculator, social proof, FAQ |
| About | Good | Vetting process, credentials, certifications |
| Service pages (5) | Good | Dedicated pages for each service type |
| Blog | Empty | Infrastructure ready, no content |
| Privacy | Complete | 7-section policy, GDPR-like rights |
| Terms | Complete | 9-section terms of service |

### Content Gaps
- No case study pages (missed opportunity from testimonials)
- No "featured in" or press mentions section
- No trust badges (BBB, G2, Capterra if applicable)
- Calculator results don't explain pricing logic — users may think estimate is final
- No real company imagery or team photos — feels like a template

---

## Accessibility Audit

### Positive Findings
- Semantic HTML: `<header>`, `<footer>`, `<main>`, `<nav>`, `<section>` used properly
- Heading hierarchy: `<h1>` through `<h3>` in logical order
- Label associations: `<Label htmlFor="fieldId">` linked to inputs
- Button labels: `aria-label` on icon-only buttons (e.g., mobile menu)
- Color contrast: Black text on light backgrounds should meet WCAG AA

### Gaps

| Issue | Location | Fix |
|-------|----------|-----|
| Services dropdown missing ARIA | `header.tsx` | Add `role="menu"`, `aria-expanded`, `aria-haspopup` |
| No keyboard navigation on dropdown | `header.tsx` | Add arrow key handlers or use Radix Popover |
| Mobile nav backdrop | `mobile-nav.tsx` | Add `role="presentation"` to backdrop |
| Form step changes not announced | `quote-form.tsx` | Add `aria-live` region for step transitions |
| Job type selection not semantic | `quote-form.tsx` | Use `<fieldset>` + radio inputs instead of buttons |
| Equipment selection not semantic | `quote-form.tsx` | Use checkboxes instead of toggle buttons |
| Toast notifications | `sonner.tsx` | Verify `role="alert"` and `aria-live` |
| Tables missing labels | `leads-table.tsx` | Add `aria-label` on `<table>` |
| Focus management | Multiple | No focus trap in modals, no skip-to-content link |

---

## Honest User Feedback

### As a Potential Customer
- Landing page is strong — clear value prop, the mini calculator is a compelling hook
- The 6-step quote form is thorough but long — consider a shorter "quick quote" path (name, email, job type, zip) alongside the full form for higher conversion
- Blog being empty hurts credibility — even 2-3 real articles would help
- No real company imagery or team photos — the site feels like a template
- The 5-theme system is impressive engineering but probably overkill for v1 — pick one and ship, let users enjoy the default

### As a Vendor Signing Up
- Signup flow is solid with multi-step company/services/coverage
- Dashboard sidebar is broken on mobile — can't navigate on a phone
- Lead marketplace works but could use more filtering (budget range, distance, timeline urgency)
- No notification when new leads match my profile — have to check manually
- No way to see how many other vendors purchased the same lead

### As an Admin
- Settings page is broken (doesn't save anything)
- No search on leads or vendors — painful at scale
- Reports page may use mock data — needs real query integration
- Pipeline funnel visualization is useful, would love drill-down on each stage
- No admin notification when vendors sign up for approval
- CSV export is a nice touch

---

## Copy Persona System

> Full strategy doc: **[COPY_STRATEGY.md](./COPY_STRATEGY.md)**

### The Problem

The site has one copy voice — Enterprise Compliance — at maximum intensity on every page. This works for a Fortune 500 VP but alienates the facilities manager, startup CTO, and mid-market IT director who just need a reliable vendor fast.

### Three Copy Personas

| Persona | Audience | Tone | Default For |
|---------|----------|------|-------------|
| **Enterprise** | VP/CISO at Fortune 500, government, financial services | Formal, stats-heavy, compliance-focused, fear-of-failure | LinkedIn ads, compliance keyword campaigns |
| **Mid-Market** | IT Manager at 100-1000 person company | Direct, practical, reassuring, outcome-focused | Organic/direct traffic (recommended default) |
| **Fast-Track** | Startup CTO, facilities manager, deadline-driven | Punchy, conversational, zero jargon, action-oriented | Google Ads action keywords |

### How It Works

- **URL detection**: `/enterprise/*` or `/fast/*` forces persona
- **Query param**: `?persona=enterprise` or `?persona=fast` for ad campaigns
- **UTM mapping**: Compliance campaigns → Enterprise, action campaigns → Fast-Track
- **localStorage persistence**: First visit sets persona, subsequent pages maintain it
- **Default**: Mid-Market (widest audience, balanced tone)

### What Changes Per Persona

Every customer-facing text element adapts: hero headlines, stats emphasis, risk framing, FAQ questions, CTA button text, how-it-works steps, testimonial framing, and mini calculator copy. The page structure, visual theme, and form fields stay the same.

---

## Go-Live Gameplan (Phases 12–16)

### Phase 12A: Copy Persona System (TOP PRIORITY — Ad Campaign Readiness)

| # | Task | Priority | Est. Effort | Status |
|---|------|----------|-------------|--------|
| 12A.1 | Create `src/lib/copy.ts` — all 3 persona copy sets (Enterprise, Mid-Market, Fast-Track) | P0 | 2 hr | [ ] |
| 12A.2 | Create `src/components/copy-provider.tsx` — CopyProvider context + `useCopy()` hook | P0 | 1 hr | [ ] |
| 12A.3 | Add persona detection (URL path, query param, UTM, localStorage) | P0 | 1 hr | [ ] |
| 12A.4 | Wire CopyProvider into root layout | P0 | 15 min | [ ] |
| 12A.5 | Refactor homepage to use `useCopy()` — hero, stats, risk, how-it-works, FAQ, CTA | P0 | 2 hr | [ ] |
| 12A.6 | Update all 5 service page CTAs to be persona-aware | P1 | 1 hr | [ ] |
| 12A.7 | Update about page, blog page, quote page intro to be persona-aware | P1 | 45 min | [ ] |
| 12A.8 | Create `/enterprise` and `/fast` landing page routes | P1 | 30 min | [ ] |
| 12A.9 | Add GA4 event tracking for persona detection + conversion per persona | P1 | 30 min | [ ] |
| 12A.10 | QA all 3 personas x 5 themes (15 combinations) | P1 | 1 hr | [ ] |

### Phase 12B: Production Readiness (MUST DO BEFORE LAUNCH)

| # | Task | Priority | Est. Effort | Status |
|---|------|----------|-------------|--------|
| 12B.1 | Hide dev theme switcher in production (env guard) | P0 | 10 min | [ ] |
| 12B.2 | Make `ADMIN_EMAILS` fail-closed if unset | P0 | 15 min | [ ] |
| 12B.3 | Add security headers (X-Frame-Options, HSTS, CSP, etc.) | P0 | 30 min | [ ] |
| 12B.4 | Sanitize all API error responses — no internal details | P0 | 45 min | [ ] |
| 12B.5 | Add React error boundaries to each layout group | P0 | 1 hr | [ ] |
| 12B.6 | Wire admin settings to persist (create API + DB table) | P0 | 2 hr | [ ] |
| 12B.7 | Add `robots.txt` and `sitemap.xml` | P1 | 30 min | [ ] |
| 12B.8 | Add Open Graph + Twitter Card meta tags to all pages | P1 | 1 hr | [ ] |
| 12B.9 | Add mobile-responsive nav for admin + vendor dashboards | P1 | 2 hr | [ ] |
| 12B.10 | Strengthen vendor password requirements | P1 | 20 min | [ ] |

### Phase 13: SEO & Content

| # | Task | Priority | Est. Effort | Status |
|---|------|----------|-------------|--------|
| 13.1 | Add JSON-LD structured data (Organization, Service, FAQ) | P1 | 1 hr | [ ] |
| 13.2 | Write and publish 3+ blog posts (SEO content) | P1 | 4 hr | [ ] |
| 13.3 | Add page-specific metadata to all marketing pages | P1 | 45 min | [ ] |
| 13.4 | Add canonical URLs | P2 | 20 min | [ ] |
| 13.5 | Create 1-2 case study pages from testimonials | P2 | 2 hr | [ ] |
| 13.6 | FAQ schema markup for rich snippets | P2 | 30 min | [ ] |

### Phase 14: UX Polish & Conversion Optimization

| # | Task | Priority | Est. Effort | Status |
|---|------|----------|-------------|--------|
| 14.1 | Save quote form progress to localStorage | P1 | 1 hr | [ ] |
| 14.2 | Add skeleton loaders for dashboard pages | P2 | 1.5 hr | [ ] |
| 14.3 | Complete 7D: Typography & spacing polish | P2 | 2 hr | [ ] |
| 14.4 | Complete 8B: Quote form copy (Cashvertising principles) | P2 | 1.5 hr | [ ] |
| 14.5 | Complete 8C: Admin-facing copy polish | P3 | 1 hr | [ ] |
| 14.6 | Accessibility fixes (ARIA labels, keyboard nav, focus rings) | P2 | 2 hr | [ ] |
| 14.7 | Add admin search for leads and vendors | P2 | 1.5 hr | [ ] |
| 14.8 | Add admin breadcrumb navigation | P3 | 30 min | [ ] |

### Phase 15: Operational Readiness

| # | Task | Priority | Est. Effort | Status |
|---|------|----------|-------------|--------|
| 15.1 | Configure Upstash Redis for production rate limiting | P1 | 30 min | [ ] |
| 15.2 | Set up error monitoring (Sentry) | P1 | 1 hr | [ ] |
| 15.3 | Configure Google Analytics / GTM for funnel tracking | P1 | 1 hr | [ ] |
| 15.4 | Switch Stripe to live mode | P1 | 30 min | [ ] |
| 15.5 | Production deployment (Vercel env vars, domain, SSL) | P1 | 1 hr | [ ] |
| 15.6 | Set up email domain (SPF, DKIM, DMARC for Resend) | P1 | 1 hr | [ ] |
| 15.7 | Database backup strategy for Supabase | P2 | 30 min | [ ] |
| 15.8 | Uptime monitoring (BetterUptime, Checkly) | P2 | 30 min | [ ] |

### Phase 16: Growth Features (Post-Launch)

| # | Task | Priority | Est. Effort | Status |
|---|------|----------|-------------|--------|
| 16.1 | Move hardcoded pricing to DB rules (rack/asset costs) | P2 | 45 min | [ ] |
| 16.2 | Vendor email notifications for new matching leads | P2 | 1.5 hr | [ ] |
| 16.3 | Admin search for leads and vendors | P2 | 1.5 hr | [ ] |
| 16.4 | Real testimonials + company imagery | P2 | 2 hr | [ ] |
| 16.5 | Quick quote path (4 fields) alongside full form | P2 | 2 hr | [ ] |
| 16.6 | SMS notifications via Twilio | P3 | 2 hr | [ ] |
| 16.7 | Customer portal for lead status tracking | P3 | 4 hr | [ ] |
| 16.8 | Vendor onboarding email drip sequence | P3 | 2 hr | [ ] |
| 16.9 | Offline conversion tracking for Google Ads | P3 | 2 hr | [ ] |
| 16.10 | Refactor QuoteForm into step subcomponents | P3 | 2 hr | [ ] |
| 16.11 | Wire reports page to real Supabase queries | P2 | 2 hr | [ ] |
| 16.12 | Add DOMPurify sanitization to blog HTML rendering | P3 | 30 min | [ ] |

---

## File Reference Index

### Critical Files to Watch

| File | Purpose | Issues |
|------|---------|--------|
| `src/middleware.ts` | CSRF protection + route guards | Missing security headers |
| `src/lib/auth.ts` | Admin/vendor access control | Fails open without ADMIN_EMAILS |
| `src/lib/rate-limit.ts` | Rate limiting | No-op without Redis |
| `src/lib/pricing-service.ts:218-219` | Pricing calculation | Hardcoded rack/asset costs |
| `src/components/dev-theme-switcher.tsx` | Theme UI | Visible in production |
| `src/app/(admin)/admin/settings/page.tsx` | Admin settings | Doesn't persist |
| `src/app/api/leads/[id]/status/route.ts:39` | Lead status API | Leaks error details |
| `src/app/api/admin/vendors/[id]/status/route.ts:41` | Vendor status API | Leaks error details |
| `src/app/api/providers/signup/route.ts:34` | Vendor signup | Weak password req |
| `src/components/forms/quote-form.tsx` | Quote wizard | 1,022 lines, needs decomposition |
| `src/lib/copy.ts` | Copy persona system | To be created (Phase 12A) |
| `src/components/copy-provider.tsx` | Copy context + useCopy() | To be created (Phase 12A) |

### Database Migrations

```
supabase/migrations/
├── 001_add_distance_columns.sql
├── 002_add_pricing_rules.sql
├── 003_powerroute_rebrand.sql
├── 004_extend_vendors.sql
├── 005_add_lead_purchases.sql
├── 006_add_company_enrichments.sql
├── 007_extend_leads.sql
├── 008_extend_pricing_rules.sql
├── 009_rls_policies.sql
└── 010_atomic_counters.sql
```

### Key Library Files

```
src/lib/
├── auth.ts              — requireAdmin(), requireVendor()
├── blog.ts              — Blog post data store
├── constants.ts         — US states, ZIP-to-state mapping
├── distance.ts          — Google Maps + cache + ZIP fallback
├── email.ts             — Resend templates (3 email types)
├── pagination.ts        — Pagination utilities
├── pricing.ts           — Core pricing calculation
├── pricing-service.ts   — DB-driven pricing with cache
├── rate-limit.ts        — Upstash Redis rate limiter
├── stripe.ts            — Stripe client init
├── theme.ts             — Theme definitions + storage
├── utils.ts             — General utilities
└── analytics.ts         — GTM event tracking
```

---

## Completed Phases (Reference)

| Phase | Description | Status |
|-------|-------------|--------|
| 0 | Foundation — Types & Database Schema | Complete |
| 1 | Pricing Engine | Complete |
| 2 | API Routes & Email | Complete |
| 3 | Forms (Multi-Step Wizard) | Complete |
| 4 | Marketing Pages & Theme | Complete |
| 5 | Admin Dashboard & Vendor Management | Complete |
| 6 | Cleanup & Final Verification | Complete |
| 7A-7C | Theme System & Visual Overhaul | Complete |
| 7D | Typography & spacing polish | Remaining |
| 8A | Homepage Copywriting (Cashvertising) | Complete |
| 8B-8C | Form & Admin Copywriting | Remaining |
| 9 | Vendor Marketplace & Auth | Complete |
| 10 | Rate Limiting, CSRF, Stripe, Pagination | Complete |
| 11 | Security Hardening & Blog Infrastructure | Complete |

---

*This document should be updated as items are completed. Check off tasks in the gameplan tables as they're done.*
