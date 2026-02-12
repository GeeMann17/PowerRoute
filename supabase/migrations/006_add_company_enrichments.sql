-- Migration 006: Create company_enrichments table
-- Cache for third-party company enrichment data (Clearbit, Apollo, etc.)
-- Keyed by email domain to avoid redundant API calls.

CREATE TABLE IF NOT EXISTS company_enrichments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Lookup key
  domain TEXT NOT NULL UNIQUE,

  -- Raw enrichment payload
  data JSONB DEFAULT '{}',

  -- Extracted / normalised fields
  company_size TEXT,
  company_revenue TEXT,
  company_industry TEXT,
  employee_count INTEGER
);

-- Enable RLS — service role only
ALTER TABLE company_enrichments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON company_enrichments
  FOR ALL USING (true);

-- Auto-update updated_at
DROP TRIGGER IF EXISTS update_company_enrichments_updated_at ON company_enrichments;
CREATE TRIGGER update_company_enrichments_updated_at
  BEFORE UPDATE ON company_enrichments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_company_enrichments_domain ON company_enrichments(domain);

-- Comments
COMMENT ON TABLE company_enrichments IS 'Cache for third-party company data enrichment (Clearbit, Apollo, etc.)';
COMMENT ON COLUMN company_enrichments.domain IS 'Email domain used as lookup key (e.g. acme.com)';
COMMENT ON COLUMN company_enrichments.data IS 'Raw JSON payload from enrichment provider';
