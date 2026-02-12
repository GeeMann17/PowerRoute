-- Migration: Add distance tracking columns to leads table
-- Run this in Supabase SQL Editor after the initial schema

-- Add distance-related columns
ALTER TABLE leads ADD COLUMN IF NOT EXISTS distance_miles INTEGER;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS distance_source TEXT CHECK (distance_source IN ('google_maps', 'cache', 'estimate'));

-- Add comments for documentation
COMMENT ON COLUMN leads.distance_miles IS 'Calculated driving distance in miles between origin and destination';
COMMENT ON COLUMN leads.distance_source IS 'Source of distance calculation: google_maps (API), cache (cached API result), or estimate (ZIP-based fallback)';
