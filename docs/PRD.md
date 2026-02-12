# PowerRoute -- IT Infrastructure Lead Generation Platform

**Product Requirements Document (PRD)**
**Version**: 2.0
**Updated**: February 2026
**Status**: Active Development

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Target Users](#target-users)
4. [Technical Stack](#technical-stack)
5. [Core Features](#core-features)
6. [Data Models](#data-models)
7. [User Flows](#user-flows)
8. [Non-Functional Requirements](#non-functional-requirements)
9. [Roadmap](#roadmap)
10. [Success Metrics](#success-metrics)

---

## Executive Summary

PowerRoute is a B2B lead generation platform for the IT infrastructure logistics industry. The platform captures leads from companies needing IT logistics services (data center relocation, ITAD, asset recovery, office decommission, white glove delivery), qualifies and enriches them, calculates pricing estimates, and routes them to certified vendor partners.

**Version 2.0** merges the original PowerRoute admin-assigned lead flow with the RackRoute vendor self-service marketplace model, creating a dual-business-model platform:

1. **Admin-Assigned Leads (PowerRoute Model)** -- Leads are vetted by the admin team and assigned to the best-matched vendor partner. Revenue from agency margin.
2. **Vendor Self-Service Marketplace (RackRoute Model)** -- Qualified leads are listed in a vendor dashboard. Vendors browse, filter, and purchase leads. Each lead can be sold to up to 3 vendors (configurable). Revenue from lead sales.

Both models share the same lead capture, enrichment, and pricing infrastructure. The admin decides per-lead which pipeline to use.

---

## Problem Statement

### For IT Managers & Procurement Teams

- Finding qualified, certified IT logistics vendors is time-consuming
- Getting accurate estimates requires contacting multiple vendors individually
- No single platform aggregates and pre-qualifies IT logistics providers
- Compliance requirements (R2, e-Stewards, NAID AAA, SOC 2) make vendor vetting critical

### For IT Logistics Vendors

- Lead generation is expensive and unpredictable
- Cold outreach has low conversion rates
- No marketplace exists for pre-qualified IT logistics leads
- Vendor reputation and performance are hard to prove to new clients

### For Platform Operators (PowerRoute)

- The IT logistics lead market is underserved -- no dominant player
- High average deal value ($5K-$500K+) supports premium lead pricing
- Compliance and certification requirements create a natural moat
- Dual model (agency + marketplace) diversifies revenue

---

## Target Users

### Persona 1: IT Manager / Procurement Lead (Lead Source)

- Works at a mid-to-large enterprise
- Needs to move, dispose of, or install IT equipment
- Searches for "data center relocation near me" or similar
- Wants a quick estimate and vetted vendor recommendations
- Values compliance documentation and chain of custody

### Persona 2: IT Logistics Vendor (Service Provider)

- Operates an IT logistics company (5-500 employees)
- Specializes in one or more job types
- Wants a steady pipeline of qualified leads
- Willing to pay for pre-qualified leads with contact info
- Needs a dashboard to manage leads, track outcomes, and see ROI

### Persona 3: Platform Admin (PowerRoute Team)

- Manages the lead pipeline, vendor relationships, and pricing
- Needs full visibility into all leads, vendors, and revenue
- Approves/rejects vendor applications
- Adjusts pricing rules and monitors marketplace health
- Routes leads manually or lets the system auto-match

---

## Technical Stack

| Category | Technology | Version | Status |
|----------|-----------|---------|--------|
| Framework | Next.js (App Router) | 16.1.4 | Integrated |
| UI Library | React | 19 | Integrated |
| Language | TypeScript | 5 | Integrated |
| Styling | Tailwind CSS | 4 | Integrated |
| Validation | Zod | 4.3.5 | Integrated |
| Components | shadcn/ui + Radix UI | Latest | Integrated |
| Forms | React Hook Form | 7.x | Integrated |
| Database | Supabase (PostgreSQL) | Hosted | Integrated |
| Auth | Supabase Auth | Hosted | Integrated |
| Email | Resend | 6.x | Integrated |
| Payments | Stripe | -- | Phase 3 |
| Distance API | Google Maps Distance Matrix | -- | Integrated |
| Hosting | Vercel | -- | Integrated |
| Icons | Lucide React | Latest | Integrated |

---

## Core Features

### Phase 1: Foundation (Complete)

#### 1.1 Marketing Website

- [x] Homepage with hero section, trust signals, and mini quote calculator
- [x] 5 service-specific landing pages (data center relocation, ITAD, asset recovery, office decommission, white glove delivery)
- [x] About page
- [x] Blog index and dynamic `[slug]` post pages
- [x] Mobile-responsive dark-theme design
- [x] SEO metadata per page via Next.js Metadata API

#### 1.2 Lead Capture (6-Step Wizard)

- [x] Step 1: Job type selection with descriptions and icons
- [x] Step 2: Origin facility details (ZIP, address, facility type, loading dock, floor level, freight elevator, security)
- [x] Step 3: Destination facility details (conditional on job type -- hidden for ITAD and office decommission)
- [x] Step 4: Asset details (racks, loose assets, weight estimate, rack units, equipment types, handling requirements)
- [x] Step 5: Compliance & security (data destruction, certificate of destruction, chain of custody, security clearance, notes)
- [x] Step 6: Contact information (name, email, phone, company, title, service date, flexibility, consent)
- [x] Dynamic field visibility based on job type (JOB_TYPE_FIELD_CONFIG)
- [x] Client-side validation with Zod + React Hook Form
- [x] Server-side validation in API route
- [x] Real-time quote calculation during form submission
- [x] Thank you page with estimate range display

#### 1.3 Lead Processing Pipeline

- [x] Database-driven pricing engine (pricing_rules table)
- [x] Google Maps Distance Matrix integration for accurate distance calculation
- [x] 24-hour in-memory distance cache to minimize API costs
- [x] ZIP-based fallback estimation when Google Maps API is unavailable
- [x] Company domain extraction from email for enrichment
- [x] Company tier estimation (enterprise, mid_market, smb, unknown)
- [x] State derivation from ZIP code
- [x] Auto-vendor matching based on job type and performance score
- [x] Lead marketplace pricing (lead_price, lead_tier) based on company tier
- [x] Estimated job value calculation from quote range
- [x] Confirmation email to customer via Resend
- [x] Admin notification email via Resend with lead details and vendor match status
- [x] Vendor notification email via Resend (for admin-assigned leads)

#### 1.4 Provider Onboarding

- [x] Self-service vendor signup form with comprehensive fields:
  - Company info (name, website, years in business, description)
  - Contact info (name, email, phone)
  - Services (nationwide toggle, geographic coverage, job types, specialties)
  - Credentials (certifications, equipment, insurance coverage)
  - Account creation (email + password)
- [x] Zod validation on signup form
- [x] Supabase Auth user creation with email confirmation
- [x] Vendor record creation with `status: 'pending'`
- [x] Rollback (delete auth user) if vendor record creation fails
- [x] Duplicate email detection
- [x] Pending approval page shown after signup
- [x] Admin approval/rejection workflow via `/api/admin/vendors/[id]/status`

#### 1.5 Provider Dashboard (Vendor Self-Service)

- [x] Dashboard overview page
- [x] Available Leads page -- browse marketplace leads with filters (job_type, origin_state)
  - Contact info stripped (sanitized) until purchase
  - Only shows leads where `status = 'available'` and `sold_count < max_sales`
- [x] Lead purchase flow -- POST to purchase, creates lead_purchases record, increments sold_count
  - Duplicate purchase prevention (unique constraint on lead_id + vendor_id)
  - Auto-marks lead as `sold` when `sold_count >= max_sales`
  - Increments vendor `leads_purchased` counter
- [x] My Leads page -- view purchased leads with full contact info
- [x] Outcome tracking -- report won/lost/no_response on purchased leads
  - Tracks outcome_value (revenue from won deals)
  - Increments vendor `leads_closed` counter on wins
- [x] Profile management page
- [x] Billing page (placeholder for Stripe Phase 3)
- [x] Supabase Auth session management
- [x] Auth callback handler for magic link / OAuth flows

#### 1.6 Admin Panel

- [x] Admin dashboard with overview metrics
- [x] Admin login
- [x] Lead management
  - Full lead list with filtering
  - Individual lead detail view (`/admin/leads/[id]`)
  - Bulk status update (select multiple leads, change status)
  - Bulk delete
  - Individual lead status update
- [x] Vendor management
  - Vendor list with status filtering
  - Individual vendor detail view (`/admin/vendors/[id]`)
  - Approve / reject / suspend vendors
  - Create vendors manually (admin-created, auto-approved)
  - Update vendor details
  - Soft-delete (deactivate) vendors
- [x] Pricing rules management
  - View all rules by type
  - Create new rules
  - Batch update rules (value, label, active status, sort order)
  - Delete rules
- [x] Reports page
- [x] Settings page
- [x] Team / user management page

#### 1.7 Email System (Resend)

- [x] Customer confirmation email with branded HTML template (dark theme, PowerRoute branding)
- [x] Admin notification email with lead details, vendor match status, and direct link to lead
- [x] Vendor assignment notification email with job details and response time expectation
- [x] HTML escaping for XSS prevention in email templates
- [x] Graceful degradation when Resend API key is not configured

#### 1.8 Stripe Integration

- [ ] Phase 3 -- payment processing for lead purchases
- [ ] Phase 3 -- vendor subscription tiers
- [x] Schema pre-wired: `stripe_customer_id`, `stripe_payment_intent_id`, `subscription_tier`, `subscription_status` columns exist
- [x] Purchase flow currently records `status: 'completed'` immediately (no payment gate)

---

### Phase 2: Enhancement (In Progress)

#### 2.1 Company Enrichment

- [ ] Integrate Clearbit or Apollo for automatic company enrichment
- [x] company_enrichments cache table exists (keyed by email domain)
- [x] Domain-based heuristic tier estimation implemented as interim solution

#### 2.2 Advanced Vendor Matching

- [ ] Geographic matching based on origin/destination state vs. vendor regions_served
- [ ] Capacity-aware routing (don't overload vendors)
- [ ] Full scoring algorithm (performance_score + proximity + capacity + response time)
- [x] Basic auto-match by job type and performance score implemented

#### 2.3 Vendor Trust & Verification

- [ ] Certification verification workflow
- [ ] Insurance documentation upload
- [ ] Background check integration
- [x] Trust score field and verified flag in vendor schema

---

### Phase 3: Monetization (Planned)

#### 3.1 Stripe Payment Integration

- [ ] Stripe Checkout for lead purchases
- [ ] Payment intent creation on purchase
- [ ] Webhook handling for payment confirmation
- [ ] Refund flow for disputed leads
- [ ] Vendor wallet / credit balance system

#### 3.2 Vendor Subscriptions

- [ ] Subscription tiers (Basic, Pro, Enterprise)
- [ ] Monthly lead allocation per tier
- [ ] Priority lead access for higher tiers
- [ ] Stripe Billing integration for recurring payments

#### 3.3 Revenue Optimization

- [ ] Dynamic lead pricing based on demand/supply
- [ ] Regional demand multipliers
- [ ] Time-of-day pricing adjustments
- [ ] Lead auction model for premium leads

---

## Data Models

### Entity Relationship Summary

```
leads -----> vendors (vendor_id FK, admin-assigned)
leads <----> lead_purchases <----> vendors (marketplace purchases)
leads -----> company_enrichments (via company_domain)
pricing_rules (standalone, configures pricing engine)
```

### leads

Primary table. 60+ columns covering the full lead lifecycle.

| Field Group | Key Columns | Notes |
|-------------|-------------|-------|
| Contact | name, email, phone, company, title | Stripped from marketplace listings |
| Job | job_type, service_date, is_flexible, timeline | 5 job types supported |
| Origin Facility | origin_zip, origin_state, origin_facility_type, origin_loading_dock, origin_floor_level, origin_freight_elevator, origin_security_requirements | Full facility details |
| Destination Facility | (mirrors origin fields) | Hidden for ITAD and office decommission |
| Assets | number_of_racks, number_of_loose_assets, total_weight_estimate, rack_unit_count, equipment_types (JSONB), handling_requirements (JSONB) | Dynamic per job type |
| Compliance | data_destruction_required, certificate_of_destruction_needed, chain_of_custody_tracking, security_clearance_required, compliance_notes | ITAD-heavy |
| Quote | quote_low, quote_high, quote_method | Database-driven calculation |
| Distance | distance_miles, distance_source | google_maps, cache, or estimate |
| Vendor (Model A) | vendor_id, vendor_assigned_at, vendor_notes | Admin-assigned flow |
| Enrichment | company_domain, company_tier, company_revenue, company_industry, company_employee_count, enrichment_data (JSONB) | Tier drives lead pricing |
| Marketplace (Model B) | estimated_job_value, lead_tier, lead_price, sold_count, max_sales, sold_at | RackRoute marketplace fields |
| Attribution | utm_source, utm_medium, utm_campaign, utm_params (JSONB), landing_page, referrer | Marketing analytics |
| Status | status | Pipeline: new -> enriched -> vetted -> available/sent_to_vendor -> sold/vendor_accepted -> quoted -> won/lost/expired/closed |

**Status enum**: `new`, `enriched`, `vetted`, `available`, `sent_to_vendor`, `vendor_accepted`, `quoted`, `sold`, `won`, `lost`, `expired`, `closed`

### vendors

Vendor partner profiles.

| Field Group | Key Columns | Notes |
|-------------|-------------|-------|
| Auth | user_id (FK -> auth.users), status | pending/approved/rejected/suspended |
| Company | name, company_name, website, years_in_business, description, logo_url | Self-service signup fields |
| Contact | contact_name, contact_email, contact_phone | Primary contact |
| Capabilities | job_types[], specialties[], geographic_coverage[], regions_served[], nationwide, certifications[], equipment[], capacity | Used for matching |
| Performance | performance_score, win_rate, avg_response_time_hours | Drives auto-match ranking |
| Trust | verified, trust_score, admin_notes, insurance_coverage | Admin-managed |
| Billing | pricing_tier, stripe_customer_id, subscription_tier, subscription_status | Phase 3 Stripe fields |
| Stats | leads_purchased, leads_closed | Marketplace activity counters |
| Config | is_active, notes | Soft-delete via is_active |

**Status enum**: `pending`, `approved`, `rejected`, `suspended`

### pricing_rules

Unified pricing configuration table.

| Rule Type | Purpose | Key Fields |
|-----------|---------|------------|
| `labor_rate` | Hourly technician rate per job type | job_type, value |
| `material_cost` | Per-unit material costs | key (material name), value |
| `trip_charge` | Flat trip fees | key (distance category), value |
| `weight_tier` | Cost per 100 lbs by weight bracket | key (weight range), value |
| `compliance_surcharge` | Compliance service add-ons | key (service type), value |
| `distance_tier` | Per-mile charges by distance bracket | key (mile range), value |
| `lead_price` | Marketplace lead pricing | company_tier, base_price, multiplier |

### lead_purchases

Vendor lead purchases from the marketplace.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| lead_id | UUID FK | References leads |
| vendor_id | UUID FK | References vendors |
| price_paid | NUMERIC | Amount paid for the lead |
| stripe_payment_intent_id | TEXT | Phase 3 Stripe reference |
| status | TEXT | pending / completed / refunded |
| outcome | TEXT | pending / won / lost / no_response |
| outcome_value | NUMERIC | Revenue if outcome = won |
| outcome_notes | TEXT | Vendor notes on outcome |
| outcome_updated_at | TIMESTAMPTZ | When outcome was reported |

**Constraints**: Unique on (lead_id, vendor_id) -- a vendor can only purchase a given lead once.

### company_enrichments

Third-party company data cache.

| Column | Type | Notes |
|--------|------|-------|
| domain | TEXT UNIQUE | Email domain lookup key |
| data | JSONB | Raw enrichment payload |
| company_size | TEXT | Extracted field |
| company_revenue | TEXT | Extracted field |
| company_industry | TEXT | Extracted field |
| employee_count | INTEGER | Extracted field |

---

## User Flows

### Flow 1: Lead Capture (Customer)

```
Homepage / Service Page
  -> Click "Get Estimate" / "Start Quote"
  -> /quote (6-step wizard)
    Step 1: Select job type
    Step 2: Origin facility details
    Step 3: Destination facility details (if applicable)
    Step 4: Asset details
    Step 5: Compliance requirements (if applicable)
    Step 6: Contact info + submit
  -> POST /api/leads
    -> Zod validation
    -> Calculate quote (database pricing rules + distance API)
    -> Enrich company data (domain, tier)
    -> Auto-match vendor
    -> Calculate lead marketplace price
    -> Insert lead into database
    -> Send confirmation email (customer)
    -> Send notification email (admin)
  -> /thank-you (with estimate range)
```

### Flow 2: Lead Routing -- Admin-Assigned (Model A)

```
Admin receives notification email
  -> /admin/leads/[id]
  -> Reviews lead details, company enrichment, quote
  -> Assigns vendor (sets vendor_id) or lets auto-match pick
  -> Updates status: new -> vetted -> sent_to_vendor
  -> Vendor receives assignment notification email
  -> Vendor contacts customer
  -> Admin tracks: vendor_accepted -> quoted -> won/lost
```

### Flow 3: Lead Marketplace -- Vendor Purchase (Model B)

```
Admin marks lead as 'available' (or automation does it)
  -> Lead appears in /dashboard/leads for all approved vendors
  -> Vendor browses leads (filtered by job_type, origin_state)
  -> Vendor sees sanitized data (no contact info)
  -> Vendor clicks "Purchase Lead"
    -> POST /api/dashboard/leads/[id]/purchase
    -> Creates lead_purchases record
    -> Increments sold_count
    -> If sold_count >= max_sales -> status = 'sold'
  -> Lead with full contact info appears in /dashboard/my-leads
  -> Vendor contacts customer
  -> Vendor reports outcome: won/lost/no_response
    -> PATCH /api/dashboard/purchases/[id]/outcome
    -> If won: increments leads_closed counter
```

### Flow 4: Vendor Onboarding

```
Vendor visits /providers/signup
  -> Fills out comprehensive signup form
    (company, contact, services, credentials, password)
  -> POST /api/providers/signup
    -> Zod validation
    -> Check for duplicate email
    -> Create Supabase auth user
    -> Create vendor record (status: 'pending')
    -> If vendor creation fails: rollback auth user
  -> Redirect to /providers/pending
  -> Admin reviews in /admin/vendors
  -> Admin approves: PATCH /api/admin/vendors/[id]/status { status: 'approved' }
  -> Vendor can now log in at /providers/login
  -> Redirect to /dashboard
```

---

## Non-Functional Requirements

### Performance

- **LCP < 2.5s** on marketing pages (server-rendered, optimized images)
- **API response < 500ms** for lead submission (excluding distance API call)
- **Distance API cached** with 24-hour TTL to avoid redundant calls
- **Database queries indexed** -- all filter columns have indexes

### Security

- **Row Level Security (RLS)** on all tables
- **Service role** for admin API operations (never exposed to client)
- **Anon role** for client-side operations (scoped by RLS policies)
- **HTML escaping** in all email templates to prevent XSS
- **Zod validation** on all API inputs (client and server)
- **Password hashing** handled by Supabase Auth (bcrypt)
- **HTTPS enforced** via Vercel

### Reliability

- **Email delivery graceful degradation** -- system works without Resend API key
- **Distance calculation fallback** -- ZIP-based estimation when Google Maps unavailable
- **Pricing fallback** -- static pricing calculation if database pricing rules fail
- **Vendor creation rollback** -- auth user deleted if vendor record creation fails

### Scalability

- **Supabase PostgreSQL** scales vertically (and horizontally with read replicas)
- **Vercel serverless** auto-scales API routes
- **In-memory distance cache** reduces external API dependency
- **RLS policies** eliminate need for application-level authorization middleware

---

## Roadmap

### Q1 2026: Foundation Launch

| Item | Status | Notes |
|------|--------|-------|
| Marketing website (homepage + 5 service pages) | Done | SSR, dark theme, mobile responsive |
| 6-step quote wizard | Done | Dynamic per job type, Zod validation |
| Database-driven pricing engine | Done | 7 rule types, admin-configurable |
| Google Maps distance integration | Done | With caching and fallback |
| Resend email integration | Done | 3 email templates |
| Admin panel (leads, vendors, pricing, reports, settings, team) | Done | Full CRUD operations |
| Vendor self-service signup | Done | With approval workflow |
| Vendor dashboard (browse, purchase, track) | Done | Marketplace MVP |
| RLS policies | Done | Vendor-scoped access |
| PowerRoute + RackRoute codebase merge | Done | Dual business model |

### Q2 2026: Enhancement

| Item | Status | Notes |
|------|--------|-------|
| Company enrichment via Clearbit/Apollo | Planned | Table and schema ready |
| Advanced vendor geo-matching | Planned | regions_served data collected |
| Vendor verification workflow | Planned | verified flag and trust_score exist |
| Blog content pipeline | Planned | Blog routes implemented, need content |
| SEO optimization (structured data, sitemaps) | Planned | Metadata API in place |
| Lead expiration automation | Planned | expired status exists |

### Q3 2026: Monetization (Phase 3)

| Item | Status | Notes |
|------|--------|-------|
| Stripe Checkout for lead purchases | Planned | Schema pre-wired |
| Vendor subscription tiers | Planned | subscription_tier column exists |
| Payment webhook handling | Planned | -- |
| Refund flow | Planned | refunded status exists |
| Dynamic lead pricing (demand-based) | Planned | pricing_rules extensible |

### Q4 2026: Scale

| Item | Status | Notes |
|------|--------|-------|
| Lead auction model | Planned | Premium lead competition |
| Vendor reputation system | Planned | Performance metrics collected |
| White-label vendor microsites | Planned | Vendor marketing |
| Mobile app (vendor) | Planned | Lead notifications |
| API partner integrations | Planned | CRM, ERP connectors |

---

## Success Metrics

### Business KPIs

| Metric | Target (Q2 2026) | How Measured |
|--------|-------------------|-------------|
| Leads captured per month | 200+ | leads table count |
| Vendor signup rate | 10+ vendors/month | vendors table, status = 'pending' |
| Lead-to-purchase conversion | 30%+ | lead_purchases / available leads |
| Vendor win rate | 25%+ | outcome = 'won' / total purchases |
| Average lead price | $100-$200 | lead_purchases.price_paid average |
| Revenue per lead | $150-$300 (sold to ~2 vendors) | Total purchase revenue / unique leads |

### Technical KPIs

| Metric | Target | How Measured |
|--------|--------|-------------|
| Lighthouse Performance | 90+ | Lighthouse audit |
| API p95 latency | < 500ms | Vercel analytics |
| Email delivery rate | 95%+ | Resend dashboard |
| Distance API cache hit rate | 60%+ | Server logs |
| Uptime | 99.9% | Vercel status |
