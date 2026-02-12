import type { JobType } from '@/types/database'
import { calculateDistance } from './distance'

// ============================================================
// Interfaces
// ============================================================

export interface QuoteParams {
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

export interface QuoteResult {
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

// ============================================================
// Pricing Constants (fallback values when DB rules unavailable)
// ============================================================

// Labor base rates per job type (represents base project cost)
const LABOR_BASE_RATES: Record<JobType, number> = {
  data_center_relocation: 5000,
  itad: 2000,
  asset_recovery: 1500,
  office_decommission: 3000,
  equipment_delivery: 2500,
}

// Per-rack cost
const RACK_COST = 500

// Per loose asset cost
const LOOSE_ASSET_COST = 25

// Material / handling requirement costs
const HANDLING_COSTS: Record<string, number> = {
  climate_controlled: 500,
  anti_static: 45,
  liftgate_required: 150,
  crating_palletizing: 350,
  escort_security: 400,
  shock_pallets: 200,
  pallet_jacks_only: 0, // methodology, not a surcharge
  blanket_wrap: 25,
  gps_tracking: 75,
  after_hours: 250,
}

// Compliance surcharges
const COMPLIANCE_COSTS: Record<string, number> = {
  data_destruction: 500,
  certificate_of_destruction: 200,
  chain_of_custody: 350,
  security_clearance: 750,
}


// ============================================================
// Distance Cost (tiered pricing per mile)
// ============================================================

function calculateDistanceCost(miles: number): number {
  if (miles <= 50) return 0 // Included in base
  if (miles <= 200) return (miles - 50) * 4
  if (miles <= 500) return 600 + (miles - 200) * 3.5
  if (miles <= 1000) return 1650 + (miles - 500) * 3
  return 3150 + (miles - 1000) * 2.5
}

// ============================================================
// Legacy sync distance estimation (for quick estimates)
// ============================================================

function estimateDistanceSync(originZip: string, destinationZip: string): number {
  const originPrefix = parseInt(originZip.substring(0, 3))
  const destPrefix = parseInt(destinationZip.substring(0, 3))
  const zipDiff = Math.abs(originPrefix - destPrefix)

  if (zipDiff === 0) return 25
  if (zipDiff <= 5) return 100
  if (zipDiff <= 20) return 500
  if (zipDiff <= 50) return 1000
  return 2000
}

// ============================================================
// Core Calculation Logic
// ============================================================

function computeQuote(
  params: QuoteParams,
  miles: number,
  distanceSource?: 'google_maps' | 'cache' | 'estimate',
  originAddress?: string,
  destinationAddress?: string
): QuoteResult {
  const {
    jobType,
    numberOfRacks = 0,
    numberOfLooseAssets = 0,
    handlingRequirements = [],
    dataDestructionRequired = false,
    certificateOfDestructionNeeded = false,
    chainOfCustodyTracking = false,
    securityClearanceRequired = false,
  } = params

  // Labor base rate
  const laborBase = LABOR_BASE_RATES[jobType]

  // Asset volume costs
  const rackCost = numberOfRacks * RACK_COST
  const looseAssetCost = numberOfLooseAssets * LOOSE_ASSET_COST

  // Distance cost
  const distanceCost = calculateDistanceCost(miles)

  // Materials / handling costs
  const materialsCost = handlingRequirements.reduce((total, req) => {
    return total + (HANDLING_COSTS[req] || 0)
  }, 0)

  // Compliance surcharges
  let complianceCost = 0
  if (dataDestructionRequired) complianceCost += COMPLIANCE_COSTS.data_destruction
  if (certificateOfDestructionNeeded) complianceCost += COMPLIANCE_COSTS.certificate_of_destruction
  if (chainOfCustodyTracking) complianceCost += COMPLIANCE_COSTS.chain_of_custody
  if (securityClearanceRequired) complianceCost += COMPLIANCE_COSTS.security_clearance

  // Total estimate
  const totalBeforeRange = laborBase + rackCost + looseAssetCost + distanceCost + materialsCost + complianceCost

  // Range: 15% below to 25% above, rounded to nearest $50
  const result: QuoteResult = {
    low: Math.round((totalBeforeRange * 0.85) / 50) * 50,
    high: Math.round((totalBeforeRange * 1.25) / 50) * 50,
  }

  if (distanceSource) {
    result.distanceInfo = {
      miles,
      source: distanceSource,
      originAddress,
      destinationAddress,
    }
  }

  result.breakdown = {
    laborBase,
    rackCost,
    looseAssetCost,
    distanceCost,
    materialsCost,
    complianceCost,
    totalBeforeRange,
  }

  return result
}

// ============================================================
// Public API
// ============================================================

/**
 * Calculate quote using Google Maps Distance API (async)
 * Preferred method for accurate pricing
 */
export async function calculateQuoteAsync(params: QuoteParams): Promise<QuoteResult> {
  const { originZip, destinationZip } = params

  const distanceResult = await calculateDistance(originZip, destinationZip)

  return computeQuote(
    params,
    distanceResult.distanceMiles,
    distanceResult.source,
    distanceResult.originAddress,
    distanceResult.destinationAddress
  )
}

/**
 * Quick estimate for mini calculator (async)
 * Uses job type + asset count + ZIPs for a ballpark
 */
export async function calculateQuickEstimateAsync(
  jobType: JobType,
  assetCount: number,
  originZip: string,
  destinationZip: string
): Promise<QuoteResult> {
  return calculateQuoteAsync({
    jobType,
    originZip,
    destinationZip,
    numberOfRacks: jobType === 'data_center_relocation' || jobType === 'equipment_delivery' ? assetCount : 0,
    numberOfLooseAssets: jobType !== 'data_center_relocation' && jobType !== 'equipment_delivery' ? assetCount : 0,
  })
}

/**
 * Quick estimate for mini calculator (sync, uses ZIP distance estimation)
 */
export function calculateQuickEstimate(
  jobType: JobType,
  assetCount: number,
  originZip: string,
  destinationZip: string
): QuoteResult {
  const estimatedMiles = estimateDistanceSync(originZip, destinationZip)
  return computeQuote(
    {
      jobType,
      originZip,
      destinationZip,
      numberOfRacks: jobType === 'data_center_relocation' || jobType === 'equipment_delivery' ? assetCount : 0,
      numberOfLooseAssets: jobType !== 'data_center_relocation' && jobType !== 'equipment_delivery' ? assetCount : 0,
    },
    estimatedMiles
  )
}

/**
 * Format price for display
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Re-export distance utilities
export { calculateDistance, isGoogleMapsConfigured } from './distance'
export type { DistanceResult } from './distance'
