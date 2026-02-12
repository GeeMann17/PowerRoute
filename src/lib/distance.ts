/**
 * Google Maps Distance Matrix API integration
 * Calculates driving distance between two ZIP codes
 */

export interface DistanceResult {
  distanceMiles: number
  durationMinutes: number
  originAddress: string
  destinationAddress: string
  status: 'ok' | 'error' | 'fallback'
  source: 'google_maps' | 'cache' | 'estimate'
}

interface GoogleDistanceResponse {
  status: string
  origin_addresses: string[]
  destination_addresses: string[]
  rows: {
    elements: {
      status: string
      distance?: {
        text: string
        value: number // meters
      }
      duration?: {
        text: string
        value: number // seconds
      }
    }[]
  }[]
}

// In-memory cache for distance calculations (server-side)
const distanceCache = new Map<string, { result: DistanceResult; timestamp: number }>()
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

/**
 * Generate cache key from origin and destination
 */
function getCacheKey(originZip: string, destinationZip: string): string {
  return `${originZip}-${destinationZip}`
}

/**
 * Get cached result if available and not expired
 */
function getCachedResult(originZip: string, destinationZip: string): DistanceResult | null {
  const key = getCacheKey(originZip, destinationZip)
  const cached = distanceCache.get(key)

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return { ...cached.result, source: 'cache' }
  }

  // Also check reverse direction (same distance)
  const reverseKey = getCacheKey(destinationZip, originZip)
  const reverseCached = distanceCache.get(reverseKey)

  if (reverseCached && Date.now() - reverseCached.timestamp < CACHE_TTL) {
    return {
      ...reverseCached.result,
      originAddress: reverseCached.result.destinationAddress,
      destinationAddress: reverseCached.result.originAddress,
      source: 'cache',
    }
  }

  return null
}

/**
 * Cache a distance result
 */
function cacheResult(originZip: string, destinationZip: string, result: DistanceResult): void {
  const key = getCacheKey(originZip, destinationZip)
  distanceCache.set(key, { result, timestamp: Date.now() })

  // Clean old entries periodically
  if (distanceCache.size > 1000) {
    const now = Date.now()
    for (const [k, v] of distanceCache.entries()) {
      if (now - v.timestamp > CACHE_TTL) {
        distanceCache.delete(k)
      }
    }
  }
}

/**
 * Fallback distance estimation based on ZIP code prefixes
 * Used when Google Maps API is unavailable or not configured
 */
function estimateDistanceFallback(originZip: string, destinationZip: string): DistanceResult {
  const originPrefix = parseInt(originZip.substring(0, 3))
  const destPrefix = parseInt(destinationZip.substring(0, 3))
  const zipDiff = Math.abs(originPrefix - destPrefix)

  let distanceMiles: number
  let durationMinutes: number

  // Rough estimate: each ZIP prefix difference correlates with distance
  if (zipDiff === 0) {
    distanceMiles = 25 // Local job
    durationMinutes = 45
  } else if (zipDiff <= 5) {
    distanceMiles = 100 // Regional
    durationMinutes = 120
  } else if (zipDiff <= 20) {
    distanceMiles = 500 // Interstate nearby
    durationMinutes = 540
  } else if (zipDiff <= 50) {
    distanceMiles = 1000 // Cross-country partial
    durationMinutes = 1080
  } else {
    distanceMiles = 2000 // Cross-country
    durationMinutes = 2160
  }

  return {
    distanceMiles,
    durationMinutes,
    originAddress: `ZIP ${originZip}`,
    destinationAddress: `ZIP ${destinationZip}`,
    status: 'fallback',
    source: 'estimate',
  }
}

/**
 * Calculate driving distance using Google Maps Distance Matrix API
 * Falls back to ZIP-based estimation if API is unavailable
 */
export async function calculateDistance(
  originZip: string,
  destinationZip: string
): Promise<DistanceResult> {
  // Check cache first
  const cached = getCachedResult(originZip, destinationZip)
  if (cached) {
    return cached
  }

  // Check if API key is configured
  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    console.warn('GOOGLE_MAPS_API_KEY not configured, using fallback distance estimation')
    return estimateDistanceFallback(originZip, destinationZip)
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/distancematrix/json')
    url.searchParams.set('origins', `${originZip}, USA`)
    url.searchParams.set('destinations', `${destinationZip}, USA`)
    url.searchParams.set('units', 'imperial')
    url.searchParams.set('key', apiKey)

    const response = await fetch(url.toString(), {
      next: { revalidate: 86400 }, // Cache for 24 hours at HTTP level
    })

    if (!response.ok) {
      throw new Error(`Google Maps API returned ${response.status}`)
    }

    const data: GoogleDistanceResponse = await response.json()

    if (data.status !== 'OK') {
      throw new Error(`Google Maps API error: ${data.status}`)
    }

    const element = data.rows[0]?.elements[0]
    if (!element || element.status !== 'OK') {
      throw new Error(`Route not found: ${element?.status || 'unknown'}`)
    }

    const result: DistanceResult = {
      distanceMiles: Math.round(element.distance!.value / 1609.34), // meters to miles
      durationMinutes: Math.round(element.duration!.value / 60), // seconds to minutes
      originAddress: data.origin_addresses[0] || originZip,
      destinationAddress: data.destination_addresses[0] || destinationZip,
      status: 'ok',
      source: 'google_maps',
    }

    // Cache the result
    cacheResult(originZip, destinationZip, result)

    return result
  } catch (error) {
    console.error('Google Maps Distance API error:', error)
    // Fall back to ZIP-based estimation
    return estimateDistanceFallback(originZip, destinationZip)
  }
}

/**
 * Get just the distance in miles (convenience function)
 */
export async function getDistanceMiles(
  originZip: string,
  destinationZip: string
): Promise<number> {
  const result = await calculateDistance(originZip, destinationZip)
  return result.distanceMiles
}

/**
 * Check if Google Maps API is properly configured
 */
export function isGoogleMapsConfigured(): boolean {
  return !!process.env.GOOGLE_MAPS_API_KEY
}
