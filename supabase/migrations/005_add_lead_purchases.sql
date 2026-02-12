-- Migration 005: Create lead_purchases table
-- Tracks vendor lead purchases for the marketplace model.
-- Each lead can be sold to up to max_sales vendors (default 3).

CREATE TABLE IF NOT EXISTS lead_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Relationships
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,

  -- Payment
  price_paid NUMERIC NOT NULL DEFAULT 0,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'completed', 'refunded')),

  -- Outcome tracking
  outcome TEXT DEFAULT 'pending'
    CHECK (outcome IN ('pending', 'won', 'lost', 'no_response')),
  outcome_value NUMERIC,
  outcome_notes TEXT,
  outcome_updated_at TIMESTAMPTZ,

  -- A vendor can only purchase a given lead once
  UNIQUE (lead_id, vendor_id)
);

-- Enable RLS
ALTER TABLE lead_purchases ENABLE ROW LEVEL SECURITY;

-- Service role full access
CREATE POLICY "Service role full access" ON lead_purchases
  FOR ALL USING (true);

-- Vendors can view their own purchases
CREATE POLICY "Vendors view own purchases" ON lead_purchases
  FOR SELECT USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lead_purchases_lead ON lead_purchases(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_purchases_vendor ON lead_purchases(vendor_id);
CREATE INDEX IF NOT EXISTS idx_lead_purchases_status ON lead_purchases(status);

-- Comments
COMMENT ON TABLE lead_purchases IS 'Records of vendors purchasing lead contact information';
COMMENT ON COLUMN lead_purchases.price_paid IS 'Amount the vendor paid for the lead';
COMMENT ON COLUMN lead_purchases.outcome IS 'Did the vendor win the deal? pending | won | lost | no_response';
COMMENT ON COLUMN lead_purchases.outcome_value IS 'Revenue from the deal if outcome = won';
