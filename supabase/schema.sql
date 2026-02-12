-- MovingLeadGen Database Schema
-- Run this in the Supabase SQL Editor to set up your database

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  source TEXT DEFAULT 'form' CHECK (source IN ('form', 'chat', 'phone', 'ai_quote')),

  -- Contact
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  contact_consent BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMPTZ,

  -- Move details
  move_type TEXT CHECK (move_type IN ('residential', 'commercial')),
  origin_zip TEXT,
  origin_address TEXT,
  destination_zip TEXT,
  destination_address TEXT,
  move_date DATE,
  is_flexible BOOLEAN DEFAULT false,
  property_type TEXT,
  size TEXT,
  special_items JSONB DEFAULT '[]',

  -- Quote
  quote_low INTEGER,
  quote_high INTEGER,
  quote_method TEXT DEFAULT 'form',

  -- Attribution
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  landing_page TEXT,
  referrer TEXT
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Admin policy (service role can do everything)
CREATE POLICY "Service role full access" ON leads
  FOR ALL USING (true);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
