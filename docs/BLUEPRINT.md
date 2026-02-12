# PowerRoute Blueprint

> Adapted from RackRoute BLUEPRINT.md -- merged with PowerRoute architecture.
> Last updated: February 2026

---

## Table of Contents

1. [Niche](#niche)
2. [Domain & SEO Strategy](#domain--seo-strategy)
3. [Design Direction](#design-direction)
4. [Dual Business Model](#dual-business-model)
5. [Pricing Philosophy](#pricing-philosophy)
6. [Technical Architecture](#technical-architecture)
7. [Site Structure](#site-structure)
8. [API Reference](#api-reference)
9. [Data Models](#data-models)
10. [Integration Stack](#integration-stack)
11. [Decision Log](#decision-log)

---

## Niche

**IT Infrastructure Logistics Lead Generation**

PowerRoute operates in the intersection of enterprise IT infrastructure and white-glove logistics services. The platform captures, qualifies, enriches, prices, and routes leads for:

- **Data Center Relocation** -- Full rack migrations, populated server rack transport between data centers and colo facilities
- **IT Asset Disposition (ITAD)** -- Secure data destruction, certified e-waste recycling, asset remarketing, and chain of custody tracking
- **IT Asset Recovery** -- Physical retrieval of IT equipment from remote sites, offices, and decommissioned facilities
- **Office IT Decommission** -- Removing IT infrastructure during office relocations, closures, or consolidations
- **White Glove Delivery & Install** -- Premium delivery, rack & stack installation, cabling, and power-on testing of IT equipment

**Why this niche?**

- High-value B2B services ($5K-$500K+ per engagement)
- Compliance-heavy (R2, e-Stewards, NAID AAA, SOC 2 Type II) creates barriers to entry
- Fragmented vendor landscape with no dominant lead-gen platform
- Increasing demand from cloud migrations, data center consolidations, and corporate office restructuring
- Sticky vendor relationships -- once a logistics partner is vetted and performing, companies re-use them

---

## Domain & SEO Strategy

### Primary Domain

`powerroute.com` (or configured via `NEXT_PUBLIC_SITE_URL`)

### SEO Pillars

| Pillar | Target Keywords | Content Strategy |
|--------|----------------|------------------|
| Data Center Relocation | "data center relocation services", "server rack movers" | Service page + blog posts |
| ITAD | "it asset disposition", "certified data destruction" | Service page + compliance guides |
| Asset Recovery | "it asset recovery service", "equipment retrieval" | Service page + case studies |
| Office Decommission | "office it decommission", "office closure it removal" | Service page + checklists |
| White Glove Delivery | "white glove delivery it equipment", "rack and stack service" | Service page + testimonials |

### Technical SEO

- Server-side rendered via Next.js App Router (full SSR/SSG support)
- Dynamic `sitemap.xml` generation
- Structured data (JSON-LD) for local business and service pages
- Meta title/description per page via Next.js Metadata API
- Blog with `[slug]` dynamic routes for content marketing
- Canonical URLs, Open Graph, and Twitter Card tags

---

## Design Direction

### Visual Identity

- **Primary Color**: Blue (#3b82f6) -- trust, reliability, enterprise feel
- **Background**: Dark slate (#0f172a, #1e293b) -- modern SaaS aesthetic
- **Accent**: Subtle gradients, glow effects for CTAs
- **Typography**: System font stack (-apple-system, Segoe UI) for performance

### UI Framework

- Tailwind CSS 4 utility-first styling
- Radix UI primitives for accessible, unstyled components
- shadcn/ui component library (customized)
- Dark mode default with next-themes support
- Lucide React icons throughout

### Design Principles

1. **Enterprise credibility** -- The site must look like a company that handles $100K+ logistics projects
2. **Speed over flash** -- Fast LCP, no heavy animations, instant page transitions
3. **Trust signals everywhere** -- Certifications, compliance badges, testimonials, phone number visible
4. **Mobile-first** -- Many IT managers browse on mobile; quote form must work on phones
5. **Data density for admins** -- Admin panel favors tables, filters, and bulk actions over cards

---

## Dual Business Model

PowerRoute merges two business models into a single platform:

### Model A: Admin-Assigned Leads (PowerRoute Original)

The agency model. Leads come in via the quote form, get vetted and enriched by the admin team, then are assigned to a matched vendor partner. Revenue comes from the margin between what the customer pays and the vendor's cost.

**Pipeline**: `new` -> `enriched` -> `vetted` -> `sent_to_vendor` -> `vendor_accepted` -> `quoted` -> `won` / `lost`

### Model B: Vendor Self-Service Marketplace (RackRoute Model)

The marketplace model. Qualified leads are priced by the system (based on company tier, job value, and region), listed in a vendor dashboard, and purchased by vendors directly. Each lead can be sold to up to N vendors (default 3).

**Pipeline**: `new` -> `enriched` -> `available` -> `sold` (when `sold_count >= max_sales`) -> `closed`

### How They Coexist

- All leads enter as `new` via the same quote form
- Admin decides per-lead whether to route it through Model A (assign to vendor) or Model B (mark as `available` for marketplace)
- The `leads` table supports both flows with `vendor_id` (admin-assigned) and `sold_count`/`max_sales`/`lead_price` (marketplace) fields
- Vendors in the marketplace see only `available` leads with `sold_count < max_sales`
- Contact information is stripped from marketplace listings until a vendor purchases

---

## Pricing Philosophy

### Job Pricing (Customer-Facing Estimates)

Dynamic, database-driven pricing engine with the following rule types:

| Rule Type | Description | Example |
|-----------|-------------|---------|
| `labor_rate` | Hourly rate per technician by job type | DC Relocation: $175/hr |
| `material_cost` | Per-unit material costs | Custom Crating: $350/unit |
| `trip_charge` | Flat trip fees by distance/time | Regional Trip: $1,500 |
| `weight_tier` | Cost per 100 lbs by weight bracket | 2,000-5,000 lbs: $6/100 lbs |
| `compliance_surcharge` | Add-on for compliance services | Data Destruction: $500 |
| `distance_tier` | Per-mile charges by distance bracket | 51-200 miles: $4/mile |

All pricing rules are managed via the Admin Panel (/admin/pricing) and stored in the `pricing_rules` table. Rules can be toggled active/inactive without deletion.

### Lead Pricing (Marketplace / RackRoute Model)

Leads are priced for the marketplace based on:

| Factor | How It Affects Price |
|--------|---------------------|
| Company Tier | Enterprise leads cost more ($300) than SMB ($75) |
| Estimated Job Value | Higher-value jobs command higher lead prices |
| Region | (Planned) Regional demand multipliers |

Lead pricing rules use `rule_type = 'lead_price'` in the same `pricing_rules` table, with `base_price` and `multiplier` fields.

**Default Lead Prices:**
- Enterprise: $300
- Mid-Market: $150
- SMB: $75
- Unknown Tier: $100

---

## Technical Architecture

### Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.4 |
| UI Library | React | 19 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 4 |
| Validation | Zod | 4.3.5 |
| Database | Supabase (PostgreSQL) | Hosted |
| Auth | Supabase Auth | Integrated |
| Email | Resend | Integrated |
| Payments | Stripe | Phase 3 (planned) |
| Distance API | Google Maps Distance Matrix | Integrated |
| Hosting | Vercel | Deployed |
| Forms | React Hook Form + Zod resolver | 7.x |
| Components | shadcn/ui + Radix UI | Latest |
| Icons | Lucide React | Latest |

### Architecture Decisions

- **App Router** -- All routes use the Next.js App Router with route groups for layout isolation
- **Service Client vs. Browser Client** -- API routes use `createServiceClient()` (server-side, service role key) while pages use `createClient()` (browser-side, anon key with RLS)
- **Row Level Security** -- All tables have RLS enabled. Vendors can only see their own profiles and purchases. Leads are insertable by anyone (quote form). Admin operations use the service role
- **Server Components** -- Marketing pages are server-rendered for SEO. Dashboard/admin pages hydrate on the client for interactivity
- **Route Handlers** -- All mutations go through `/api/*` route handlers, never through direct Supabase calls from the client

### Project Structure

```
src/
  app/
    (marketing)/         # Public pages (SSR)
    (quote)/             # Lead capture wizard
    (auth)/              # Provider login
    (providers)/         # Provider signup & pending
    (dashboard)/         # Vendor dashboard (auth required)
    (admin)/             # Admin panel
    api/                 # API route handlers
  components/            # Shared UI components
  lib/                   # Utilities, Supabase clients, pricing engine
  types/                 # TypeScript types & Zod schemas
supabase/
  migrations/            # SQL migrations (001-009)
```

---

## Site Structure

### Route Groups & Pages

#### (marketing) -- Public Pages
| Route | Page | Purpose |
|-------|------|---------|
| `/` | Homepage | Hero, mini quote calculator, service cards, trust signals |
| `/services/data-center-relocation` | Service Page | DC relocation details |
| `/services/itad` | Service Page | ITAD service details |
| `/services/asset-recovery` | Service Page | Asset recovery details |
| `/services/office-decommission` | Service Page | Office decommission details |
| `/services/white-glove-delivery` | Service Page | White glove delivery details |
| `/about` | About Page | Company info, mission, team |
| `/blog` | Blog Index | Content marketing hub |
| `/blog/[slug]` | Blog Post | Individual articles |

#### (quote) -- Lead Capture
| Route | Page | Purpose |
|-------|------|---------|
| `/quote` | Quote Wizard | 6-step multi-form lead capture |
| `/thank-you` | Confirmation | Post-submission thank you + estimate |

#### (auth) -- Provider Authentication
| Route | Page | Purpose |
|-------|------|---------|
| `/providers/login` | Login | Magic link / password login for vendors |

#### (providers) -- Provider Onboarding
| Route | Page | Purpose |
|-------|------|---------|
| `/providers/signup` | Signup Form | Self-service vendor application |
| `/providers/pending` | Pending Page | Shown while application is under review |

#### (dashboard) -- Vendor Dashboard (Authenticated)
| Route | Page | Purpose |
|-------|------|---------|
| `/dashboard` | Overview | Vendor dashboard home, key metrics |
| `/dashboard/leads` | Available Leads | Browse and purchase leads (marketplace) |
| `/dashboard/my-leads` | My Leads | Purchased leads with outcome tracking |
| `/dashboard/profile` | Profile | Vendor profile management |
| `/dashboard/billing` | Billing | Billing info placeholder (Stripe Phase 3) |

#### (admin) -- Admin Panel
| Route | Page | Purpose |
|-------|------|---------|
| `/admin` | Dashboard | Admin overview, key metrics |
| `/admin/login` | Login | Admin authentication |
| `/admin/leads` | Lead Management | List, filter, bulk actions on all leads |
| `/admin/leads/[id]` | Lead Detail | Individual lead view with full history |
| `/admin/vendors` | Vendor Management | List, approve/reject, manage vendors |
| `/admin/vendors/[id]` | Vendor Detail | Individual vendor profile and stats |
| `/admin/pricing` | Pricing Rules | Manage all pricing rules |
| `/admin/reports` | Reports | Revenue, lead, and vendor analytics |
| `/admin/settings` | Settings | Platform configuration |
| `/admin/users` | Team Management | Admin user management |

---

## API Reference

All API routes are under `/api/`. Routes use Next.js Route Handlers (App Router).

### Public Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `POST` | `/api/leads` | Submit a new lead via the quote form. Validates with Zod, calculates quote, enriches company data, auto-matches vendor, sends confirmation + admin emails via Resend. | None |

### Admin Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `PATCH` | `/api/leads` | Bulk update lead status. Body: `{ ids: string[], status: LeadStatus }` | Service role |
| `DELETE` | `/api/leads` | Bulk delete leads. Body: `{ ids: string[] }` | Service role |
| `PATCH` | `/api/leads/[id]/status` | Update single lead status. Body: `{ status: LeadStatus }` | Service role |
| `PATCH` | `/api/admin/vendors/[id]/status` | Update vendor approval status. Body: `{ status: 'approved' \| 'rejected' \| 'suspended' }` | Service role |
| `GET` | `/api/vendors` | List vendors with optional `?job_type=` and `?active=` filters | Service role |
| `POST` | `/api/vendors` | Create a new vendor (admin-created) | Service role |
| `PATCH` | `/api/vendors` | Update vendor details. Body includes `{ id, ...fields }` | Service role |
| `DELETE` | `/api/vendors` | Soft-delete (deactivate) a vendor. Body: `{ id }` | Service role |
| `GET` | `/api/pricing-rules` | List all pricing rules | Service role |
| `POST` | `/api/pricing-rules` | Create a pricing rule | Service role |
| `PATCH` | `/api/pricing-rules` | Batch update pricing rules | Service role |
| `DELETE` | `/api/pricing-rules` | Delete a pricing rule | Service role |

### Provider (Vendor) Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `GET` | `/api/dashboard/leads` | Browse available leads for the marketplace. Supports `?job_type=` and `?origin_state=` filters. Contact info is stripped. | Supabase Auth (vendor) |
| `POST` | `/api/dashboard/leads/[id]/purchase` | Purchase a lead. Creates `lead_purchases` record, increments `sold_count`, marks lead as `sold` when max reached. | Supabase Auth (vendor) |
| `GET` | `/api/dashboard/purchases` | List the authenticated vendor's completed purchases with full lead data. | Supabase Auth (vendor) |
| `PATCH` | `/api/dashboard/purchases/[id]/outcome` | Report outcome on a purchased lead. Body: `{ outcome: 'won' \| 'lost' \| 'no_response', outcome_value?, outcome_notes? }` | Supabase Auth (vendor) |

### Auth Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `POST` | `/api/providers/signup` | Vendor self-service signup. Creates Supabase auth user + vendor record with `status: 'pending'`. Validates with Zod. | None |
| `GET` | `/api/auth/callback` | Supabase auth callback for magic link / OAuth flows. Exchanges code for session, redirects to `/dashboard`. | None |

---

## Data Models

### leads

The central table. Stores every inbound lead regardless of business model.

**Key field groups:**
- **Contact**: name, email, phone, company, title
- **Job Details**: job_type, service_date, is_flexible, timeline
- **Origin Facility**: origin_zip, origin_state, origin_facility_type, origin_loading_dock, origin_floor_level, origin_freight_elevator, origin_security_requirements
- **Destination Facility**: (mirrors origin fields)
- **Asset Details**: number_of_racks, number_of_loose_assets, total_weight_estimate, rack_unit_count, equipment_types (JSONB), handling_requirements (JSONB)
- **Compliance**: data_destruction_required, certificate_of_destruction_needed, chain_of_custody_tracking, security_clearance_required, compliance_notes
- **Quote**: quote_low, quote_high, quote_method
- **Distance**: distance_miles, distance_source
- **Vendor Assignment (Model A)**: vendor_id (FK -> vendors), vendor_assigned_at, vendor_notes
- **Company Enrichment**: company_domain, company_tier, company_revenue, company_industry, company_employee_count, enrichment_data (JSONB)
- **Marketplace (Model B)**: estimated_job_value, lead_tier, lead_price, sold_count, max_sales, sold_at
- **Attribution**: utm_source, utm_medium, utm_campaign, utm_params (JSONB), landing_page, referrer
- **Status Pipeline**: new -> enriched -> vetted -> available / sent_to_vendor -> sold / vendor_accepted -> quoted -> won / lost / expired / closed

### vendors

Vendor partners who receive leads (admin-assigned) or purchase leads (marketplace).

**Key field groups:**
- **Auth**: user_id (FK -> auth.users), status (pending/approved/rejected/suspended)
- **Company**: name, company_name, website, years_in_business, description, logo_url
- **Contact**: contact_name, contact_email, contact_phone
- **Capabilities**: job_types[], specialties[], geographic_coverage[], regions_served[], nationwide, certifications[], equipment[], capacity
- **Performance**: performance_score, win_rate, avg_response_time_hours
- **Trust**: verified, trust_score, admin_notes, insurance_coverage
- **Billing (Phase 3)**: pricing_tier, stripe_customer_id, subscription_tier, subscription_status
- **Stats**: leads_purchased, leads_closed
- **Config**: is_active, notes

### pricing_rules

Unified pricing configuration for both job estimates and lead marketplace pricing.

**Key fields:**
- rule_type: labor_rate | material_cost | trip_charge | weight_tier | compliance_surcharge | distance_tier | lead_price
- job_type: Nullable, scopes rule to specific job types
- key, value, label, sort_order, is_active
- company_tier, min_job_value, max_job_value, region (for lead_price rules)
- base_price, multiplier, priority (for lead_price rules)

### lead_purchases

Tracks vendor purchases from the marketplace.

**Key fields:**
- lead_id (FK -> leads), vendor_id (FK -> vendors)
- price_paid, stripe_payment_intent_id (Phase 3), status (pending/completed/refunded)
- outcome (pending/won/lost/no_response), outcome_value, outcome_notes, outcome_updated_at
- Unique constraint: (lead_id, vendor_id) -- a vendor can only purchase a given lead once

### company_enrichments

Cache for third-party company enrichment data (Clearbit, Apollo, etc.).

**Key fields:**
- domain (unique key, extracted from contact email)
- data (JSONB raw payload)
- company_size, company_revenue, company_industry, employee_count

---

## Integration Stack

| Service | Purpose | Status | Notes |
|---------|---------|--------|-------|
| **Supabase** | Database (PostgreSQL), Auth, RLS | Integrated | 9 migrations applied. RLS policies for vendors, leads, purchases. |
| **Resend** | Transactional email | Integrated | Customer confirmation, admin notification, vendor assignment emails. 3 email templates implemented. |
| **Google Maps Distance Matrix API** | Distance calculation | Integrated | Calculates driving distance between ZIP codes. 24-hour in-memory cache. ZIP-based fallback estimation when API key not configured. |
| **Stripe** | Payment processing for lead purchases and vendor subscriptions | Phase 3 (planned) | Schema columns exist (stripe_customer_id, stripe_payment_intent_id, subscription_tier). Currently purchases are recorded with `status: 'completed'` immediately (no payment flow). |
| **Vercel** | Hosting & deployment | Integrated | Next.js 16.1.4 optimized deployment. |
| **Clearbit / Apollo** | Company enrichment | Planned | company_enrichments table exists. Currently using domain-based heuristic tier estimation. |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| Feb 2026 | Merge PowerRoute + RackRoute codebases into unified platform | PowerRoute had the admin-assigned lead flow and marketing site. RackRoute had the vendor self-service marketplace model. Merging gives the platform both business models under one codebase, one database, and one admin panel. Vendors can be admin-assigned OR self-service. Leads can flow through either pipeline. |
| Feb 2026 | Keep "RackRoute" as internal name for marketplace subsystem | The marketplace (vendor dashboard, lead purchasing, self-service signup) originated from the RackRoute codebase. Keeping the name internally helps distinguish the two business models in code and documentation. |
| Feb 2026 | Adopt Next.js 16.1.4 + React 19 | Leverages React Server Components, streaming SSR, and the stable App Router. React 19 compiler provides automatic memoization. |
| Feb 2026 | Use Zod 4.3.5 for validation | Zod 4 offers better tree-shaking, faster validation, and improved TypeScript inference. Used for both form validation (client) and API request validation (server). |
| Feb 2026 | Tailwind CSS 4 | Native CSS layers, JIT engine rewrite, smaller runtime. Used with tw-animate-css for transitions. |
| Feb 2026 | Supabase for database + auth | PostgreSQL with Row Level Security provides per-vendor data isolation without custom middleware. Supabase Auth handles magic links and password auth for vendors. Service role used for admin operations. |
| Feb 2026 | Resend for email (not SendGrid) | Developer-friendly API, React email template support, good deliverability. Three email templates implemented: customer confirmation, admin notification, vendor assignment. |
| Feb 2026 | Stripe deferred to Phase 3 | Lead purchase flow works without payments for initial launch. Schema is pre-wired (stripe_customer_id, stripe_payment_intent_id). Actual Stripe integration comes when marketplace has enough vendor volume to justify payment processing. |
| Feb 2026 | Google Maps Distance Matrix over ZIP-code-only estimation | Accurate driving distances are critical for pricing. API provides real distance/duration. In-memory caching (24h TTL) minimizes API costs. ZIP-based fallback ensures the system works even without an API key. |
| Feb 2026 | Database-driven pricing over hardcoded | All pricing rules live in `pricing_rules` table. Admins can adjust rates, add rules, toggle rules active/inactive via `/admin/pricing`. No code deploy needed to change pricing. |
| Feb 2026 | RLS policies (migration 009) | Comprehensive Row Level Security: anyone can insert leads (quote form), vendors can view/update their own profiles and purchases, pricing rules and enrichments are service-role-only. |
| Feb 2026 | Lead marketplace sold_count / max_sales model | Each lead can be sold to multiple vendors (default 3). This maximizes revenue per lead while giving vendors competitive but fair access. Vendor sees sanitized lead data (no contact info) until purchase. |
| Feb 2026 | Company tier estimation from email domain | Quick heuristic to classify leads (enterprise, mid-market, SMB) based on email domain patterns. Full enrichment (Clearbit/Apollo) planned for later. Tier drives lead pricing in the marketplace. |
