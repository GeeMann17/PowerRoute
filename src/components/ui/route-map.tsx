'use client'

import { useState } from 'react'
import { MapPin, Navigation, Maximize2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface RouteMapProps {
  originZip: string
  destinationZip: string
  originAddress?: string | null
  destinationAddress?: string | null
  distanceMiles?: number | null
  distanceSource?: string | null
  className?: string
}

export function RouteMap({
  originZip,
  destinationZip,
  originAddress,
  destinationAddress,
  distanceMiles,
  distanceSource,
  className = '',
}: RouteMapProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const origin = originAddress ? `${originAddress}, ${originZip}` : originZip
  const destination = destinationAddress ? `${destinationAddress}, ${destinationZip}` : destinationZip

  // Build Google Maps embed URL for directions
  const mapsEmbedUrl = `https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&origin=${encodeURIComponent(origin + ', USA')}&destination=${encodeURIComponent(destination + ', USA')}&mode=driving`

  // Build Google Maps link for opening in new tab
  const mapsLinkUrl = `https://www.google.com/maps/dir/${encodeURIComponent(origin + ', USA')}/${encodeURIComponent(destination + ', USA')}`

  const hasApiKey = !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  return (
    <>
      {/* Distance Info Bar */}
      <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            {/* Distance */}
            <div className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Distance</p>
                <p className="font-semibold text-gray-900">
                  {distanceMiles ? `${distanceMiles.toLocaleString()} miles` : 'Calculating...'}
                </p>
              </div>
            </div>

            {/* Route */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-gray-600">{originZip}</span>
              </div>
              <span className="text-gray-400">→</span>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-red-600" />
                <span className="text-gray-600">{destinationZip}</span>
              </div>
            </div>

            {/* Source Badge */}
            {distanceSource && (
              <Badge variant="secondary" className="text-xs">
                {distanceSource === 'google_maps' ? 'Google Maps' :
                 distanceSource === 'cache' ? 'Cached' : 'Estimated'}
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {hasApiKey && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(true)}
              >
                <Maximize2 className="h-4 w-4 mr-2" />
                View Map
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Map Modal */}
      {isExpanded && hasApiKey && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-semibold text-gray-900">Route Map</h3>
                <p className="text-sm text-gray-500">
                  {origin} → {destination}
                  {distanceMiles && ` (${distanceMiles.toLocaleString()} miles)`}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Map */}
            <div className="aspect-video w-full">
              <iframe
                src={mapsEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Route Map"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Powered by Google Maps
              </div>
              <Button asChild>
                <a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer">
                  Open Full Map
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Compact version for thank-you page
export function RouteMapCompact({
  originZip,
  destinationZip,
  distanceMiles,
}: {
  originZip: string
  destinationZip: string
  distanceMiles?: number | null
}) {
  const mapsLinkUrl = `https://www.google.com/maps/dir/${encodeURIComponent(originZip + ', USA')}/${encodeURIComponent(destinationZip + ', USA')}`

  return (
    <div className="flex items-center justify-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-green-600" />
        <span>{originZip}</span>
      </div>
      <div className="flex items-center gap-2">
        <Navigation className="h-4 w-4 text-blue-600" />
        <span className="font-medium">
          {distanceMiles ? `${distanceMiles.toLocaleString()} miles` : '...'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-red-600" />
        <span>{destinationZip}</span>
      </div>
      <a
        href={mapsLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline ml-2"
      >
        View route →
      </a>
    </div>
  )
}
