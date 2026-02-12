/**
 * Database-driven pricing service for PowerRoute
 * Loads pricing rules from Supabase for dynamic IT logistics quote calculation
 */

import { createServiceClient } from '@/lib/supabase/server'
import { calculateDistance } from './distance'
import type { JobType, PricingRule } from '@/types/database'

interface QuoteParams {
  jobType: JobType
  originZip: string
  destinationZip: string
  numberOfRacks?: number
  numberOfLooseAssets?: number
  totalWeightEstimate?: string
  handlingRequirements?: string[]
  dataDestructionRequired?: boolean
  certificateOfDestructionNeeded?: boolean
  chainOfCustodyTracking?: boolean
  securityClearanceRequired?: boolean
}

interface QuoteResult {
  low: number
  high: number
  distanceInfo?: {
    miles: number
    source: 'google_maps' | 'cache' | 'estimate'
    originAddress?: string
    destinationAddress?: string
  }
  breakdown?: {
    laborBase: number
    rackCost: number
    looseAssetCost: number
    distanceCost: number
    materialsCost: number
    complianceCost: number
    totalBeforeRange: number
  }
}

// Cache for pricing rules (refreshes every 5 minutes)
let rulesCache: {
  rules: PricingRule[]
  timestamp: number
} | null = null

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// Fallback labor rates if DB rules unavailable
const FALLBACK_LABOR_RATES: Record<JobType, number> = {
  data_center_relocation: 5000,
  itad: 2000,
  asset_recovery: 1500,
  office_decommission: 3000,
  equipment_delivery: 2500,
}

/**
 * Get pricing rules from database with caching
 */
async function getPricingRules(): Promise<PricingRule[]> {
  const now = Date.now()

  if (rulesCache && now - rulesCache.timestamp < CACHE_TTL) {
    return rulesCache.rules
  }

  try {
    const supabase = createServiceClient()

    const { data: rules, error } = await supabase
      .from('pricing_rules')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (error) {
      console.error('Failed to fetch pricing rules:', error)
      if (rulesCache) return rulesCache.rules
      return []
    }

    rulesCache = {
      rules: rules || [],
      timestamp: now,
    }

    return rules || []
  } catch (error) {
    console.error('Error fetching pricing rules:', error)
    if (rulesCache) return rulesCache.rules
    return []
  }
}

/**
 * Get labor base rate for job type
 */
function getLaborRate(rules: PricingRule[], jobType: JobType): number {
  const rule = rules.find(
    (r) => r.rule_type === 'labor_rate' && r.job_type === jobType
  )
  return rule?.value || FALLBACK_LABOR_RATES[jobType]
}

/**
 * Calculate distance cost using tiered pricing from DB rules
 */
function calculateDistanceCost(rules: PricingRule[], miles: number): number {
  const tiers = rules
    .filter((r) => r.rule_type === 'distance_tier')
    .sort((a, b) => a.sort_order - b.sort_order)

  if (tiers.length === 0) {
    // Fallback to hardcoded tiers
    if (miles <= 50) return 0
    if (miles <= 200) return (miles - 50) * 4
    if (miles <= 500) return 600 + (miles - 200) * 3.5
    if (miles <= 1000) return 1650 + (miles - 500) * 3
    return 3150 + (miles - 1000) * 2.5
  }

  let totalCost = 0

  const parsedTiers = tiers.map((tier) => {
    const [minStr, maxStr] = tier.key.split('-')
    const min = parseInt(minStr) || 0
    const max = maxStr === '+' || !maxStr ? Infinity : parseInt(maxStr)
    return { min, max, rate: tier.value }
  })

  for (const tier of parsedTiers) {
    if (miles <= tier.min) break
    const milesInTier = Math.min(miles, tier.max) - tier.min
    if (milesInTier > 0) {
      totalCost += milesInTier * tier.rate
    }
  }

  return totalCost
}

/**
 * Get cost for handling requirements / materials
 */
function getMaterialsCost(rules: PricingRule[], handlingRequirements: string[]): number {
  return handlingRequirements.reduce((total, req) => {
    const rule = rules.find(
      (r) => r.rule_type === 'material_cost' && r.key === req
    )
    return total + (rule?.value || 0)
  }, 0)
}

/**
 * Get cost for compliance surcharges
 */
function getComplianceCost(
  rules: PricingRule[],
  flags: {
    dataDestructionRequired: boolean
    certificateOfDestructionNeeded: boolean
    chainOfCustodyTracking: boolean
    securityClearanceRequired: boolean
  }
): number {
  let cost = 0

  if (flags.dataDestructionRequired) {
    const rule = rules.find((r) => r.rule_type === 'compliance_surcharge' && r.key === 'data_destruction')
    cost += rule?.value || 500
  }
  if (flags.certificateOfDestructionNeeded) {
    const rule = rules.find((r) => r.rule_type === 'compliance_surcharge' && r.key === 'certificate_of_destruction')
    cost += rule?.value || 200
  }
  if (flags.chainOfCustodyTracking) {
    const rule = rules.find((r) => r.rule_type === 'compliance_surcharge' && r.key === 'chain_of_custody')
    cost += rule?.value || 350
  }
  if (flags.securityClearanceRequired) {
    const rule = rules.find((r) => r.rule_type === 'compliance_surcharge' && r.key === 'security_clearance')
    cost += rule?.value || 750
  }

  return cost
}

/**
 * Calculate quote using database-driven pricing rules
 */
export async function calculateQuoteFromDB(params: QuoteParams): Promise<QuoteResult> {
  const {
    jobType,
    originZip,
    destinationZip,
    numberOfRacks = 0,
    numberOfLooseAssets = 0,
    handlingRequirements = [],
    dataDestructionRequired = false,
    certificateOfDestructionNeeded = false,
    chainOfCustodyTracking = false,
    securityClearanceRequired = false,
  } = params

  // Fetch pricing rules
  const rules = await getPricingRules()

  // Get distance
  const distanceResult = await calculateDistance(originZip, destinationZip)
  const miles = distanceResult.distanceMiles

  // Calculate components
  const laborBase = getLaborRate(rules, jobType)
  const rackCost = numberOfRacks * 500 // TODO: make configurable via DB rule
  const looseAssetCost = numberOfLooseAssets * 25 // TODO: make configurable via DB rule
  const distanceCost = calculateDistanceCost(rules, miles)
  const materialsCost = getMaterialsCost(rules, handlingRequirements)
  const complianceCost = getComplianceCost(rules, {
    dataDestructionRequired,
    certificateOfDestructionNeeded,
    chainOfCustodyTracking,
    securityClearanceRequired,
  })

  // Total estimate
  const totalBeforeRange = laborBase + rackCost + looseAssetCost + distanceCost + materialsCost + complianceCost

  // Range: 15% below to 25% above, rounded to nearest $50
  return {
    low: Math.round((totalBeforeRange * 0.85) / 50) * 50,
    high: Math.round((totalBeforeRange * 1.25) / 50) * 50,
    distanceInfo: {
      miles,
      source: distanceResult.source,
      originAddress: distanceResult.originAddress,
      destinationAddress: distanceResult.destinationAddress,
    },
    breakdown: {
      laborBase,
      rackCost,
      looseAssetCost,
      distanceCost,
      materialsCost,
      complianceCost,
      totalBeforeRange,
    },
  }
}

/**
 * Clear the pricing rules cache
 */
export function clearPricingRulesCache(): void {
  rulesCache = null
}

/**
 * Force refresh pricing rules from database
 */
export async function refreshPricingRules(): Promise<PricingRule[]> {
  clearPricingRulesCache()
  return getPricingRules()
}
