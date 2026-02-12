-- Atomic increment of sold_count on leads
-- Returns the updated row, or NULL if the lead has reached max_sales
CREATE OR REPLACE FUNCTION increment_lead_sold_count(p_lead_id UUID)
RETURNS TABLE(
  id UUID,
  sold_count INTEGER,
  max_sales INTEGER,
  status TEXT,
  sold_at TIMESTAMPTZ
) AS $$
DECLARE
  v_row RECORD;
BEGIN
  UPDATE leads
  SET
    sold_count = leads.sold_count + 1,
    status = CASE
      WHEN leads.sold_count + 1 >= leads.max_sales THEN 'sold'
      ELSE leads.status
    END,
    sold_at = CASE
      WHEN leads.sold_count + 1 >= leads.max_sales THEN NOW()
      ELSE leads.sold_at
    END
  WHERE leads.id = p_lead_id
    AND leads.sold_count < leads.max_sales
  RETURNING leads.id, leads.sold_count, leads.max_sales, leads.status, leads.sold_at
  INTO v_row;

  IF v_row IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY SELECT v_row.id, v_row.sold_count, v_row.max_sales, v_row.status, v_row.sold_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- View for marketplace: only leads that are available AND have remaining capacity
CREATE OR REPLACE VIEW available_leads AS
SELECT *
FROM leads
WHERE status = 'available'
  AND sold_count < max_sales;

-- Atomic increment of leads_purchased on vendors
CREATE OR REPLACE FUNCTION increment_vendor_leads_purchased(p_vendor_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE vendors
  SET leads_purchased = leads_purchased + 1
  WHERE id = p_vendor_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
