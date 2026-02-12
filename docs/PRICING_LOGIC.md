# Pricing Logic Documentation

## Current Implementation

The pricing calculation is in `/src/lib/pricing.ts`. Currently uses a **simplified estimate** based on ZIP codes, not real distance.

### Base Rates
```typescript
const BASE_RATES = {
  residential: $800,
  commercial: $1,500,
}
```

### Size Multipliers

**Residential:**
| Size | Multiplier |
|------|------------|
| Studio | 0.6x |
| 1 Bedroom | 0.8x |
| 2 Bedrooms | 1.0x |
| 3 Bedrooms | 1.3x |
| 4 Bedrooms | 1.6x |
| 5+ Bedrooms | 2.0x |

**Commercial:**
| Size | Multiplier |
|------|------------|
| Small (<1,000 sq ft) | 0.8x |
| Medium (1,000-5,000 sq ft) | 1.2x |
| Large (5,000-10,000 sq ft) | 2.0x |
| Enterprise (10,000+ sq ft) | 3.5x |

### Special Items Add-ons
| Item | Cost |
|------|------|
| Piano | $300 |
| Pool Table | $400 |
| Safe | $200 |
| Antiques | $250 |
| Vehicle | $500 |
| Hot Tub | $600 |
| Gym Equipment | $200 |
| Wine Collection | $150 |

### Distance Calculation (SIMPLIFIED)
Currently estimates distance based on ZIP code prefix difference:
- Same prefix (e.g., 100xx to 100xx): ~25 miles (local)
- 1-5 prefix diff: ~100 miles (regional)
- 6-20 prefix diff: ~500 miles (interstate nearby)
- 21-50 prefix diff: ~1,000 miles (cross-country partial)
- 50+ prefix diff: ~2,000 miles (cross-country)

**This needs to be replaced with Google Maps Distance Matrix API for accuracy.**

### Distance Cost Tiers
```
0-50 miles: $0 (included in base)
51-200 miles: $3/mile
201-500 miles: $2.50/mile (after first 200)
501-1000 miles: $2/mile (after first 500)
1000+ miles: $1.50/mile (after first 1000)
```

### Quote Range
Final estimate is returned as a range:
- **Low:** Base estimate × 0.85 (rounded to nearest $50)
- **High:** Base estimate × 1.25 (rounded to nearest $50)

### Mini Calculator (Homepage)
Uses `calculateQuickEstimate()` which assumes default sizes:
- Residential: 2 bedrooms
- Commercial: Medium office

---

## Future: Custom Pricing Rules

### Planned Database Schema
```sql
CREATE TABLE pricing_rules (
  id UUID PRIMARY KEY,
  rule_type TEXT, -- 'base_rate', 'size_multiplier', 'special_item', 'distance_tier'
  move_type TEXT, -- 'residential', 'commercial', 'all'
  key TEXT,       -- 'studio', 'piano', '0-50', etc.
  value DECIMAL,  -- the rate/multiplier/cost
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

### Admin UI Needs
- Form to edit base rates
- Table to manage size multipliers
- Table to manage special items and costs
- Distance tier configuration
- Preview calculator to test changes
