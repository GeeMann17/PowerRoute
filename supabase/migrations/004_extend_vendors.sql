-- Migration 004: Extend vendors table with RackRoute marketplace fields
-- Adds self-service vendor portal fields: auth link, approval workflow,
-- company details, regional coverage, Stripe billing, and marketplace stats.

-- ============================================================
-- 1. Auth & approval workflow
-- ============================================================

ALTER TABLE vendors ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'approved'
  CHECK (status IN ('pending', 'approved', 'rejected', 'suspended'));

-- Existing vendors keep is_active behaviour; new self-signup vendors use status workflow.
-- Mark all existing rows as 'approved' (they were admin-created).
UPDATE vendors SET status = 'approved' WHERE status IS NULL;

-- ============================================================
-- 2. Company details
-- ============================================================

ALTER TABLE vendors ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS years_in_business INTEGER;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- Back-fill company_name from name for existing rows
UPDATE vendors SET company_name = name WHERE company_name IS NULL;

-- ============================================================
-- 3. Expanded capabilities
-- ============================================================

ALTER TABLE vendors ADD COLUMN IF NOT EXISTS nationwide BOOLEAN DEFAULT false;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS regions_served TEXT[] DEFAULT '{}';
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS specialties TEXT[] DEFAULT '{}';
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS equipment TEXT[] DEFAULT '{}';

-- Back-fill specialties from job_types for existing rows
UPDATE vendors SET specialties = job_types WHERE specialties = '{}' AND job_types != '{}';
-- Back-fill regions_served from geographic_coverage
UPDATE vendors SET regions_served = geographic_coverage WHERE regions_served = '{}' AND geographic_coverage != '{}';

-- ============================================================
-- 4. Trust & verification
-- ============================================================

ALTER TABLE vendors ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS trust_score INTEGER DEFAULT 0;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS insurance_coverage TEXT;

-- ============================================================
-- 5. Stripe billing (Phase 3 prep)
-- ============================================================

ALTER TABLE vendors ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS subscription_tier TEXT;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS subscription_status TEXT;

-- ============================================================
-- 6. Marketplace stats
-- ============================================================

ALTER TABLE vendors ADD COLUMN IF NOT EXISTS leads_purchased INTEGER DEFAULT 0;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS leads_closed INTEGER DEFAULT 0;

-- ============================================================
-- 7. Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_vendors_user_id ON vendors(user_id);
CREATE INDEX IF NOT EXISTS idx_vendors_status ON vendors(status);
CREATE INDEX IF NOT EXISTS idx_vendors_regions ON vendors USING GIN(regions_served);
CREATE INDEX IF NOT EXISTS idx_vendors_specialties ON vendors USING GIN(specialties);

-- ============================================================
-- 8. Comments
-- ============================================================

COMMENT ON COLUMN vendors.user_id IS 'FK to auth.users — links vendor to a Supabase auth account for self-service login';
COMMENT ON COLUMN vendors.status IS 'Approval workflow: pending → approved | rejected | suspended';
COMMENT ON COLUMN vendors.regions_served IS 'Array of US state abbreviations the vendor services';
COMMENT ON COLUMN vendors.specialties IS 'Array of job types the vendor specialises in';
COMMENT ON COLUMN vendors.nationwide IS 'If true, vendor covers all US states';
COMMENT ON COLUMN vendors.trust_score IS 'Admin-assigned trust score 0-100';
COMMENT ON COLUMN vendors.leads_purchased IS 'Total leads purchased through marketplace';
COMMENT ON COLUMN vendors.leads_closed IS 'Total purchased leads where outcome = won';
