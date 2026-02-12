-- Migration 009: Comprehensive RLS policies
-- Replaces the blanket "Service role full access" with scoped policies.
-- Service role still has full access; authenticated vendors get scoped access.

-- ============================================================
-- 1. Leads — anyone can INSERT (quote form); service role manages
-- ============================================================

-- Allow anonymous inserts (quote form submissions)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can insert leads' AND tablename = 'leads'
  ) THEN
    CREATE POLICY "Anyone can insert leads" ON leads
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- ============================================================
-- 2. Vendors — own-profile access for authenticated vendors
-- ============================================================

-- Vendors can view their own profile
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Vendors view own profile' AND tablename = 'vendors'
  ) THEN
    CREATE POLICY "Vendors view own profile" ON vendors
      FOR SELECT USING (user_id = auth.uid());
  END IF;
END $$;

-- Vendors can update their own profile
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Vendors update own profile' AND tablename = 'vendors'
  ) THEN
    CREATE POLICY "Vendors update own profile" ON vendors
      FOR UPDATE USING (user_id = auth.uid());
  END IF;
END $$;

-- Anyone can insert a vendor record (signup flow uses service role,
-- but this policy ensures the RLS doesn't block it)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can insert vendors' AND tablename = 'vendors'
  ) THEN
    CREATE POLICY "Anyone can insert vendors" ON vendors
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- ============================================================
-- 3. Pricing rules & company enrichments — service role only
--    (already have "Service role full access" from earlier migrations)
-- ============================================================

-- No additional policies needed — existing "Service role full access"
-- covers admin operations. No anon/authenticated access required.

-- ============================================================
-- 4. Lead purchases — already has vendor-scoped policy from migration 005
-- ============================================================

-- Vendor insert policy (vendors can create their own purchases)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Vendors can create purchases' AND tablename = 'lead_purchases'
  ) THEN
    CREATE POLICY "Vendors can create purchases" ON lead_purchases
      FOR INSERT WITH CHECK (
        vendor_id IN (
          SELECT id FROM vendors WHERE user_id = auth.uid()
        )
      );
  END IF;
END $$;

-- Vendor update policy (vendors can update outcome on their own purchases)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Vendors update own purchases' AND tablename = 'lead_purchases'
  ) THEN
    CREATE POLICY "Vendors update own purchases" ON lead_purchases
      FOR UPDATE USING (
        vendor_id IN (
          SELECT id FROM vendors WHERE user_id = auth.uid()
        )
      );
  END IF;
END $$;
