-- Migration 007: Extend leads table with marketplace fields
-- Adds company enrichment, lead pricing, and sold-count tracking
-- to support the vendor marketplace / lead-purchase model.

-- ============================================================
-- 1. State fields (derived from ZIP for filtering)
-- ============================================================

ALTER TABLE leads ADD COLUMN IF NOT EXISTS origin_state TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS destination_state TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS timeline TEXT;

-- ============================================================
-- 2. Company enrichment
-- ============================================================

ALTER TABLE leads ADD COLUMN IF NOT EXISTS company_domain TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS company_tier TEXT
  CHECK (company_tier IS NULL OR company_tier IN ('enterprise', 'mid_market', 'smb', 'unknown'));
ALTER TABLE leads ADD COLUMN IF NOT EXISTS company_revenue TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS company_industry TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS company_employee_count INTEGER;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS enrichment_data JSONB DEFAULT '{}';

-- ============================================================
-- 3. Lead marketplace pricing
-- ============================================================

ALTER TABLE leads ADD COLUMN IF NOT EXISTS estimated_job_value NUMERIC;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_tier TEXT
  CHECK (lead_tier IS NULL OR lead_tier IN ('premium', 'standard', 'basic'));
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_price NUMERIC;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS sold_count INTEGER DEFAULT 0;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS max_sales INTEGER DEFAULT 3;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS sold_at TIMESTAMPTZ;

-- ============================================================
-- 4. Extended status values for marketplace lifecycle
-- ============================================================

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE leads ADD CONSTRAINT leads_status_check
  CHECK (status IN (
    'new',
    'enriched',
    'vetted',
    'available',
    'sent_to_vendor',
    'vendor_accepted',
    'quoted',
    'sold',
    'won',
    'lost',
    'expired',
    'closed'
  ));

-- ============================================================
-- 5. UTM params JSONB (RackRoute stores as single column)
-- ============================================================

ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_params JSONB DEFAULT '{}';

-- ============================================================
-- 6. Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_leads_company_tier ON leads(company_tier);
CREATE INDEX IF NOT EXISTS idx_leads_lead_tier ON leads(lead_tier);
CREATE INDEX IF NOT EXISTS idx_leads_origin_state ON leads(origin_state);
CREATE INDEX IF NOT EXISTS idx_leads_sold_count ON leads(sold_count);

-- ============================================================
-- 7. Comments
-- ============================================================

COMMENT ON COLUMN leads.company_tier IS 'Estimated company size tier: enterprise | mid_market | smb | unknown';
COMMENT ON COLUMN leads.lead_tier IS 'Marketplace lead quality tier: premium | standard | basic';
COMMENT ON COLUMN leads.lead_price IS 'Price a vendor pays to purchase this lead';
COMMENT ON COLUMN leads.sold_count IS 'Number of vendors who have purchased this lead';
COMMENT ON COLUMN leads.max_sales IS 'Maximum vendors who can purchase this lead (default 3)';
COMMENT ON COLUMN leads.company_domain IS 'Domain extracted from contact email for enrichment lookup';
