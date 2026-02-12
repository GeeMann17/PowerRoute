-- Migration: Add pricing_rules table for dynamic pricing configuration
-- Run this in Supabase SQL Editor after the initial schema

-- Create pricing_rules table
CREATE TABLE IF NOT EXISTS pricing_rules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Rule identification
  rule_type TEXT NOT NULL CHECK (rule_type IN ('base_rate', 'size_multiplier', 'distance_tier', 'special_item')),
  move_type TEXT CHECK (move_type IS NULL OR move_type IN ('residential', 'commercial')),

  -- Rule key (e.g., 'studio', 'piano', '0-50')
  key TEXT NOT NULL,

  -- Rule value (cost or multiplier)
  value NUMERIC NOT NULL,

  -- Display name for UI
  label TEXT,

  -- Rule ordering for tiered pricing
  sort_order INTEGER DEFAULT 0,

  -- Enable/disable rules without deleting
  is_active BOOLEAN DEFAULT true,

  -- Unique constraint for rule type + move type + key combination
  UNIQUE (rule_type, move_type, key)
);

-- Enable Row Level Security
ALTER TABLE pricing_rules ENABLE ROW LEVEL SECURITY;

-- Admin policy (service role can do everything)
CREATE POLICY "Service role full access" ON pricing_rules
  FOR ALL USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_pricing_rules_type ON pricing_rules(rule_type);
CREATE INDEX IF NOT EXISTS idx_pricing_rules_active ON pricing_rules(is_active);

-- Auto-update updated_at timestamp
DROP TRIGGER IF EXISTS update_pricing_rules_updated_at ON pricing_rules;
CREATE TRIGGER update_pricing_rules_updated_at
  BEFORE UPDATE ON pricing_rules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default pricing rules
-- Base rates
INSERT INTO pricing_rules (rule_type, move_type, key, value, label) VALUES
  ('base_rate', 'residential', 'default', 800, 'Residential Base Rate'),
  ('base_rate', 'commercial', 'default', 1500, 'Commercial Base Rate')
ON CONFLICT (rule_type, move_type, key) DO NOTHING;

-- Residential size multipliers
INSERT INTO pricing_rules (rule_type, move_type, key, value, label, sort_order) VALUES
  ('size_multiplier', 'residential', 'studio', 0.6, 'Studio', 1),
  ('size_multiplier', 'residential', '1bed', 0.8, '1 Bedroom', 2),
  ('size_multiplier', 'residential', '2bed', 1.0, '2 Bedroom', 3),
  ('size_multiplier', 'residential', '3bed', 1.3, '3 Bedroom', 4),
  ('size_multiplier', 'residential', '4bed', 1.6, '4 Bedroom', 5),
  ('size_multiplier', 'residential', '5bed', 2.0, '5+ Bedroom', 6)
ON CONFLICT (rule_type, move_type, key) DO NOTHING;

-- Commercial size multipliers
INSERT INTO pricing_rules (rule_type, move_type, key, value, label, sort_order) VALUES
  ('size_multiplier', 'commercial', 'small', 0.8, 'Small Office (<5 employees)', 1),
  ('size_multiplier', 'commercial', 'medium', 1.2, 'Medium Office (5-20 employees)', 2),
  ('size_multiplier', 'commercial', 'large', 2.0, 'Large Office (20-50 employees)', 3),
  ('size_multiplier', 'commercial', 'enterprise', 3.5, 'Enterprise (50+ employees)', 4)
ON CONFLICT (rule_type, move_type, key) DO NOTHING;

-- Distance tiers (value is cost per mile above the threshold)
INSERT INTO pricing_rules (rule_type, move_type, key, value, label, sort_order) VALUES
  ('distance_tier', NULL, '0-50', 0, 'Local (0-50 miles) - Included', 1),
  ('distance_tier', NULL, '51-200', 3, 'Regional (51-200 miles) - $3/mile', 2),
  ('distance_tier', NULL, '201-500', 2.5, 'Interstate (201-500 miles) - $2.50/mile', 3),
  ('distance_tier', NULL, '501-1000', 2, 'Long Distance (501-1000 miles) - $2/mile', 4),
  ('distance_tier', NULL, '1001+', 1.5, 'Cross Country (1000+ miles) - $1.50/mile', 5)
ON CONFLICT (rule_type, move_type, key) DO NOTHING;

-- Residential special items
INSERT INTO pricing_rules (rule_type, move_type, key, value, label, sort_order) VALUES
  ('special_item', 'residential', 'piano', 300, 'Piano', 1),
  ('special_item', 'residential', 'pool_table', 400, 'Pool Table', 2),
  ('special_item', 'residential', 'safe', 200, 'Heavy Safe', 3),
  ('special_item', 'residential', 'antiques', 250, 'Antiques', 4),
  ('special_item', 'residential', 'vehicle', 500, 'Vehicle', 5),
  ('special_item', 'residential', 'hot_tub', 600, 'Hot Tub', 6),
  ('special_item', 'residential', 'gym_equipment', 200, 'Gym Equipment', 7),
  ('special_item', 'residential', 'wine_collection', 150, 'Wine Collection', 8)
ON CONFLICT (rule_type, move_type, key) DO NOTHING;

-- Commercial special items
INSERT INTO pricing_rules (rule_type, move_type, key, value, label, sort_order) VALUES
  ('special_item', 'commercial', 'it_assets', 350, 'IT Assets (Laptops, Monitors)', 1),
  ('special_item', 'commercial', 'server_racks', 800, 'Populated Server Racks', 2),
  ('special_item', 'commercial', 'office_furniture', 400, 'Office Furniture', 3),
  ('special_item', 'commercial', 'tvs_displays', 250, 'TVs & Digital Displays', 4)
ON CONFLICT (rule_type, move_type, key) DO NOTHING;

-- Add comments for documentation
COMMENT ON TABLE pricing_rules IS 'Dynamic pricing configuration for quotes';
COMMENT ON COLUMN pricing_rules.rule_type IS 'Type of rule: base_rate, size_multiplier, distance_tier, or special_item';
COMMENT ON COLUMN pricing_rules.move_type IS 'Apply to residential, commercial, or NULL for both';
COMMENT ON COLUMN pricing_rules.key IS 'Lookup key for the rule (e.g., studio, piano, 0-50)';
COMMENT ON COLUMN pricing_rules.value IS 'Cost (for items/base) or multiplier (for size)';
