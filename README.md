# PowerRoute

B2B lead generation marketplace for IT logistics — connecting enterprises with vetted providers for data center relocations, ITAD, asset recovery, office decommissions, and white glove IT delivery.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components, TypeScript)
- **Database**: Supabase (PostgreSQL + Row-Level Security)
- **Payments**: Stripe (Checkout Sessions + Webhooks)
- **Email**: Resend (transactional emails)
- **Styling**: Tailwind CSS v4 + shadcn/ui + 5 switchable themes
- **Rate Limiting**: Upstash Redis (graceful degradation)
- **Forms**: React Hook Form + Zod v4
- **Distance**: Google Maps Distance Matrix API (with caching + ZIP fallback)

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in your Supabase, Resend, and other keys (see .env.example for details)

# Run database migrations
# Execute all files in supabase/migrations/ in order via Supabase SQL Editor

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── (marketing)/       # Public pages (landing, about, blog, services, legal)
│   ├── (quote)/           # Quote wizard + thank you page
│   ├── (admin)/admin/     # Admin dashboard (protected)
│   ├── (dashboard)/       # Vendor portal (protected)
│   ├── (providers)/       # Vendor auth (signup, login)
│   ├── (auth)/            # Auth callback
│   └── api/               # API routes (leads, vendors, pricing, stripe, dashboard)
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, footer, mobile nav
│   ├── forms/             # Quote form, mini calculator
│   ├── admin/             # Admin sidebar, leads table
│   ├── dashboard/         # Vendor sidebar, lead cards, modals
│   └── providers/         # Vendor signup form
├── lib/                   # Utilities (auth, pricing, email, distance, rate-limit, stripe)
└── types/                 # TypeScript types (database, leads/validation schemas)

supabase/
└── migrations/            # 10 sequential SQL migrations

docs/
├── AUDIT_AND_GAMEPLAN.md  # Active roadmap (Phases 12-16)
├── BLUEPRINT.md           # Technical architecture spec
├── PRD.md                 # Product requirements document
├── PROJECT_CONTEXT.md     # Developer quick reference
├── MARKETING.md           # Brand voice, messaging, ad templates
├── CHANGELOG.md           # Version history
└── TODO.md                # Phases 0-11 history (archived)
```

## Key Features

- **Quote Wizard**: 6-step form with per-job-type field visibility, Zod validation, inline pricing estimates
- **Mini Calculator**: Homepage quick estimate (job type, asset count, ZIP codes)
- **Admin Dashboard**: 7-stage lead pipeline, vendor management, pricing rules, reports, CSV export
- **Vendor Marketplace**: Browse/purchase leads, Stripe checkout, outcome tracking, profile management
- **5 Themes**: Light (neo-brutalist), Dark, Corporate, Concrete, Whiteout — CSS variable system with FOUC prevention
- **Security**: CSRF protection, rate limiting, RLS policies, atomic counters, webhook signature verification

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Environment Variables

See [`.env.example`](.env.example) for all configuration options. Required services:

| Service | Required | Purpose |
|---------|----------|---------|
| Supabase | Yes | Database, auth, RLS |
| Resend | No (degrades gracefully) | Transactional email |
| Google Maps | No (falls back to ZIP estimates) | Distance calculation |
| Stripe | No (purchases complete without payment in dev) | Lead marketplace payments |
| Upstash Redis | No (rate limiting disabled without it) | API rate limiting |

## Documentation

| Document | Purpose |
|----------|---------|
| [AUDIT_AND_GAMEPLAN.md](docs/AUDIT_AND_GAMEPLAN.md) | Active go-live roadmap with P0-P3 priorities |
| [BLUEPRINT.md](docs/BLUEPRINT.md) | Technical architecture and design decisions |
| [PRD.md](docs/PRD.md) | Product requirements and user flows |
| [PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md) | Developer quick reference |
| [COPY_STRATEGY.md](docs/COPY_STRATEGY.md) | Copy persona system (Enterprise, Mid-Market, Fast-Track) |
| [MARKETING.md](docs/MARKETING.md) | Brand voice, messaging framework, ad templates |
| [CHANGELOG.md](docs/CHANGELOG.md) | Version history |
