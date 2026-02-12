-- Migration: PowerRoute Rebrand
-- Transforms the moving lead gen platform into an IT asset logistics lead gen platform
-- This is an ADDITIVE migration: new columns are added, old columns are NOT dropped yet

-- ============================================================
-- 1. Update leads table: Add new columns
-- ============================================================

-- Company & title (new contact fields)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS title TEXT;

-- Job type (replaces move_type)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS job_type TEXT
  CHECK (job_type IS NULL OR job_type IN (
    'data_center_relocation',
    'itad',
    'asset_recovery',
    'office_decommission',
    'equipment_delivery'
  ));

-- Service date (replaces move_date)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS service_date DATE;

-- Origin facility details
ALTER TABLE leads ADD COLUMN IF NOT EXISTS origin_facility_type TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS origin_loading_dock TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS origin_floor_level INTEGER;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS origin_freight_elevator BOOLEAN;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS origin_security_requirements TEXT;

-- Destination facility details
ALTER TABLE leads ADD COLUMN IF NOT EXISTS destination_facility_type TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS destination_loading_dock TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS destination_floor_level INTEGER;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS destination_freight_elevator BOOLEAN;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS destination_security_requirements TEXT;

-- Asset details
ALTER TABLE leads ADD COLUMN IF NOT EXISTS number_of_racks INTEGER;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS number_of_loose_assets INTEGER;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS total_weight_estimate TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS rack_unit_count INTEGER;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS equipment_types JSONB DEFAULT '[]';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS handling_requirements JSONB DEFAULT '[]';

-- Compliance & security
ALTER TABLE leads ADD COLUMN IF NOT EXISTS data_destruction_required BOOLEAN DEFAULT false;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS certificate_of_destruction_needed BOOLEAN DEFAULT false;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS chain_of_custody_tracking BOOLEAN DEFAULT false;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS security_clearance_required BOOLEAN DEFAULT false;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS compliance_notes TEXT;

-- Vendor assignment
ALTER TABLE leads ADD COLUMN IF NOT EXISTS vendor_id UUID;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS vendor_assigned_at TIMESTAMPTZ;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS vendor_notes TEXT;

-- ============================================================
-- 2. Update status CHECK constraint for new agency pipeline
-- ============================================================

-- Drop old constraint and add new one
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE leads ADD CONSTRAINT leads_status_check
  CHECK (status IN ('new', 'vetted', 'sent_to_vendor', 'vendor_accepted', 'quoted', 'won', 'lost'));

-- Migrate existing status values to new pipeline
UPDATE leads SET status = 'new' WHERE status = 'contacted';
UPDATE leads SET status = 'vetted' WHERE status = 'qualified';
UPDATE leads SET status = 'won' WHERE status = 'converted';
-- 'new' and 'lost' remain unchanged

-- ============================================================
-- 3. Create vendors table
-- ============================================================

CREATE TABLE IF NOT EXISTS vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Vendor info
  name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,

  -- Capabilities
  job_types TEXT[] DEFAULT '{}',
  geographic_coverage TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  capacity TEXT,

  -- Performance metrics
  performance_score NUMERIC DEFAULT 50,
  win_rate NUMERIC DEFAULT 0,
  avg_response_time_hours NUMERIC,
  pricing_tier TEXT CHECK (pricing_tier IS NULL OR pricing_tier IN ('economy', 'standard', 'premium')),

  -- Status
  is_active BOOLEAN DEFAULT true,
  notes TEXT
);

-- Enable RLS
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Service role full access
CREATE POLICY "Service role full access" ON vendors
  FOR ALL USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_vendors_active ON vendors(is_active);
CREATE INDEX IF NOT EXISTS idx_vendors_job_types ON vendors USING GIN(job_types);
CREATE INDEX IF NOT EXISTS idx_vendors_certifications ON vendors USING GIN(certifications);
CREATE INDEX IF NOT EXISTS idx_vendors_geographic ON vendors USING GIN(geographic_coverage);

-- Auto-update updated_at
DROP TRIGGER IF EXISTS update_vendors_updated_at ON vendors;
CREATE TRIGGER update_vendors_updated_at
  BEFORE UPDATE ON vendors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 4. Add FK from leads to vendors
-- ============================================================

ALTER TABLE leads
  ADD CONSTRAINT leads_vendor_id_fkey
  FOREIGN KEY (vendor_id) REFERENCES vendors(id)
  ON DELETE SET NULL;

-- Index for vendor lookup
CREATE INDEX IF NOT EXISTS idx_leads_vendor_id ON leads(vendor_id);
CREATE INDEX IF NOT EXISTS idx_leads_job_type ON leads(job_type);

-- ============================================================
-- 5. Update pricing_rules for new rule types and job types
-- ============================================================

-- Rename move_type column to job_type in pricing_rules
ALTER TABLE pricing_rules RENAME COLUMN move_type TO job_type;

-- Drop old constraints
ALTER TABLE pricing_rules DROP CONSTRAINT IF EXISTS pricing_rules_rule_type_check;
ALTER TABLE pricing_rules DROP CONSTRAINT IF EXISTS pricing_rules_move_type_check;

-- Add new constraints
ALTER TABLE pricing_rules ADD CONSTRAINT pricing_rules_rule_type_check
  CHECK (rule_type IN ('labor_rate', 'material_cost', 'trip_charge', 'weight_tier', 'compliance_surcharge', 'distance_tier'));

ALTER TABLE pricing_rules ADD CONSTRAINT pricing_rules_job_type_check
  CHECK (job_type IS NULL OR job_type IN (
    'data_center_relocation',
    'itad',
    'asset_recovery',
    'office_decommission',
    'equipment_delivery'
  ));

-- Drop old unique constraint and recreate with new column name
ALTER TABLE pricing_rules DROP CONSTRAINT IF EXISTS pricing_rules_rule_type_move_type_key_key;
ALTER TABLE pricing_rules ADD CONSTRAINT pricing_rules_rule_type_job_type_key_key
  UNIQUE (rule_type, job_type, key);

-- Clear old pricing rules (moving-specific)
DELETE FROM pricing_rules;

-- ============================================================
-- 6. Seed new pricing rules for IT logistics
-- ============================================================

-- Labor rates per job type (hourly rate per technician)
INSERT INTO pricing_rules (rule_type, job_type, key, value, label, sort_order) VALUES
  ('labor_rate', 'data_center_relocation', 'default', 175, 'DC Relocation Technician Rate', 1),
  ('labor_rate', 'itad', 'default', 125, 'ITAD Technician Rate', 2),
  ('labor_rate', 'asset_recovery', 'default', 150, 'Asset Recovery Technician Rate', 3),
  ('labor_rate', 'office_decommission', 'default', 125, 'Office Decommission Technician Rate', 4),
  ('labor_rate', 'equipment_delivery', 'default', 165, 'White Glove Delivery Technician Rate', 5)
ON CONFLICT (rule_type, job_type, key) DO NOTHING;

-- Material costs (per unit)
INSERT INTO pricing_rules (rule_type, job_type, key, value, label, sort_order) VALUES
  ('material_cost', NULL, 'masonite_flooring', 150, 'Masonite Floor Protection (per roll)', 1),
  ('material_cost', NULL, 'crating', 350, 'Custom Crating (per unit)', 2),
  ('material_cost', NULL, 'palletizing', 85, 'Palletizing (per pallet)', 3),
  ('material_cost', NULL, 'anti_static_wrap', 45, 'Anti-Static Wrap (per unit)', 4),
  ('material_cost', NULL, 'shock_pallet', 200, 'Shock Pallet (per pallet)', 5),
  ('material_cost', NULL, 'blanket_wrap', 25, 'Blanket Wrap (per item)', 6),
  ('material_cost', NULL, 'climate_container', 500, 'Climate-Controlled Container (per load)', 7),
  ('material_cost', NULL, 'gps_tracker', 75, 'GPS Tracker Rental (per shipment)', 8)
ON CONFLICT (rule_type, job_type, key) DO NOTHING;

-- Trip charges
INSERT INTO pricing_rules (rule_type, job_type, key, value, label, sort_order) VALUES
  ('trip_charge', NULL, 'standard', 500, 'Standard Trip (local)', 1),
  ('trip_charge', NULL, 'regional', 1500, 'Regional Trip (100-300 miles)', 2),
  ('trip_charge', NULL, 'long_haul', 3500, 'Long Haul Trip (300+ miles)', 3),
  ('trip_charge', NULL, 'after_hours', 250, 'After-Hours Surcharge (per trip)', 4),
  ('trip_charge', NULL, 'weekend', 350, 'Weekend Surcharge (per trip)', 5)
ON CONFLICT (rule_type, job_type, key) DO NOTHING;

-- Weight tiers (cost per 100 lbs)
INSERT INTO pricing_rules (rule_type, job_type, key, value, label, sort_order) VALUES
  ('weight_tier', NULL, 'under_500', 0, 'Under 500 lbs - Included in base', 1),
  ('weight_tier', NULL, '500_2000', 8, '500-2,000 lbs - $8/100 lbs', 2),
  ('weight_tier', NULL, '2000_5000', 6, '2,000-5,000 lbs - $6/100 lbs', 3),
  ('weight_tier', NULL, '5000_10000', 5, '5,000-10,000 lbs - $5/100 lbs', 4),
  ('weight_tier', NULL, '10000_plus', 4, '10,000+ lbs - $4/100 lbs', 5)
ON CONFLICT (rule_type, job_type, key) DO NOTHING;

-- Compliance surcharges
INSERT INTO pricing_rules (rule_type, job_type, key, value, label, sort_order) VALUES
  ('compliance_surcharge', NULL, 'data_destruction', 500, 'Certified Data Destruction', 1),
  ('compliance_surcharge', NULL, 'certificate_of_destruction', 200, 'Certificate of Destruction', 2),
  ('compliance_surcharge', NULL, 'chain_of_custody', 350, 'Chain of Custody Documentation', 3),
  ('compliance_surcharge', NULL, 'security_clearance', 750, 'Security Clearance Coordination', 4),
  ('compliance_surcharge', NULL, 'escort_service', 400, 'On-Site Security Escort', 5)
ON CONFLICT (rule_type, job_type, key) DO NOTHING;

-- Distance tiers (keep similar structure, cost per mile)
INSERT INTO pricing_rules (rule_type, job_type, key, value, label, sort_order) VALUES
  ('distance_tier', NULL, '0-50', 0, 'Local (0-50 miles) - Included', 1),
  ('distance_tier', NULL, '51-200', 4, 'Regional (51-200 miles) - $4/mile', 2),
  ('distance_tier', NULL, '201-500', 3.5, 'Interstate (201-500 miles) - $3.50/mile', 3),
  ('distance_tier', NULL, '501-1000', 3, 'Long Distance (501-1000 miles) - $3/mile', 4),
  ('distance_tier', NULL, '1001+', 2.5, 'Cross Country (1000+ miles) - $2.50/mile', 5)
ON CONFLICT (rule_type, job_type, key) DO NOTHING;

-- ============================================================
-- 7. Add documentation comments
-- ============================================================

COMMENT ON TABLE vendors IS 'Vendor partner profiles for lead distribution and matching';
COMMENT ON COLUMN vendors.job_types IS 'Array of job types this vendor handles (data_center_relocation, itad, etc.)';
COMMENT ON COLUMN vendors.geographic_coverage IS 'Array of US state abbreviations or region names';
COMMENT ON COLUMN vendors.certifications IS 'Array of certifications (R2, e-Stewards, NAID_AAA, SOC2, etc.)';
COMMENT ON COLUMN vendors.performance_score IS 'Composite score 0-100 based on win rate, response time, and reviews';
COMMENT ON COLUMN vendors.win_rate IS 'Percentage of assigned leads that resulted in won deals';

COMMENT ON COLUMN leads.job_type IS 'IT logistics job type (replaces move_type)';
COMMENT ON COLUMN leads.vendor_id IS 'Assigned vendor partner (FK to vendors table)';
COMMENT ON COLUMN leads.equipment_types IS 'JSONB array of equipment type identifiers';
COMMENT ON COLUMN leads.handling_requirements IS 'JSONB array of special handling requirement identifiers';
COMMENT ON COLUMN leads.chain_of_custody_tracking IS 'Whether chain of custody documentation is required';
COMMENT ON COLUMN leads.data_destruction_required IS 'Whether certified data destruction is needed (ITAD)';
