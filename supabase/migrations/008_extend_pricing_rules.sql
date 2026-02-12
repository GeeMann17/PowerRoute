-- Migration 008: Extend pricing_rules for lead marketplace pricing
-- Adds condition columns so the same table can hold both
-- job-pricing rules (PowerRoute) and lead-pricing rules (RackRoute).

-- ============================================================
-- 1. Lead pricing condition columns
-- ============================================================

ALTER TABLE pricing_rules ADD COLUMN IF NOT EXISTS company_tier TEXT
  CHECK (company_tier IS NULL OR company_tier IN ('enterprise', 'mid_market', 'smb', 'unknown'));
ALTER TABLE pricing_rules ADD COLUMN IF NOT EXISTS min_job_value NUMERIC;
ALTER TABLE pricing_rules ADD COLUMN IF NOT EXISTS max_job_value NUMERIC;
ALTER TABLE pricing_rules ADD COLUMN IF NOT EXISTS region TEXT;
ALTER TABLE pricing_rules ADD COLUMN IF NOT EXISTS base_price NUMERIC;
ALTER TABLE pricing_rules ADD COLUMN IF NOT EXISTS multiplier NUMERIC DEFAULT 1;
ALTER TABLE pricing_rules ADD COLUMN IF NOT EXISTS priority INTEGER DEFAULT 0;

-- Extend rule_type CHECK to include lead_price
ALTER TABLE pricing_rules DROP CONSTRAINT IF EXISTS pricing_rules_rule_type_check;
ALTER TABLE pricing_rules ADD CONSTRAINT pricing_rules_rule_type_check
  CHECK (rule_type IN (
    'labor_rate', 'material_cost', 'trip_charge',
    'weight_tier', 'compliance_surcharge', 'distance_tier',
    'lead_price'
  ));

-- ============================================================
-- 2. Seed default lead pricing rules
-- ============================================================

INSERT INTO pricing_rules (rule_type, key, company_tier, base_price, multiplier, label, sort_order, priority) VALUES
  ('lead_price', 'enterprise_default',  'enterprise',  300, 1.0, 'Enterprise Lead',   1, 10),
  ('lead_price', 'mid_market_default',  'mid_market',  150, 1.0, 'Mid-Market Lead',   2, 10),
  ('lead_price', 'smb_default',         'smb',          75, 1.0, 'SMB Lead',           3, 10),
  ('lead_price', 'unknown_default',     'unknown',     100, 1.0, 'Unknown Tier Lead',  4,  1)
ON CONFLICT (rule_type, job_type, key) DO NOTHING;

-- ============================================================
-- 3. Index
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_pricing_rules_company_tier ON pricing_rules(company_tier);

-- ============================================================
-- 4. Comments
-- ============================================================

COMMENT ON COLUMN pricing_rules.company_tier IS 'For lead_price rules: match leads with this company tier';
COMMENT ON COLUMN pricing_rules.base_price IS 'For lead_price rules: base cost a vendor pays for the lead';
COMMENT ON COLUMN pricing_rules.multiplier IS 'For lead_price rules: multiplier applied to base_price';
COMMENT ON COLUMN pricing_rules.priority IS 'Higher priority rules are evaluated first';
