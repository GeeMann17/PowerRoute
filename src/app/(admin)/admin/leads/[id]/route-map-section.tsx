'use client'

import { useState } from 'react'
import { Map, Maximize2, ExternalLink, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RouteMapSectionProps {
  originZip: string
  destinationZip: string
  originAddress?: string | null
  destinationAddress?: string | null
}

export function RouteMapSection({
  originZip,
  destinationZip,
  originAddress,
  destinationAddress,
}: RouteMapSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMap, setShowMap] = useState(false)

  const origin = originAddress ? `${originAddress}, ${originZip}` : `${originZip}, USA`
  const destination = destinationAddress ? `${destinationAddress}, ${destinationZip}` : `${destinationZip}, USA`

  // Build Google Maps link for opening in new tab
  const mapsLinkUrl = `https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`

  // Build Google Maps embed URL for directions (requires API key)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  const mapsEmbedUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving`
    : null

  return (
    <>
      {/* Map Controls */}
      <div className="flex items-center gap-2">
        {mapsEmbedUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMap(!showMap)}
          >
            <Map className="h-4 w-4 mr-2" />
            {showMap ? 'Hide Map' : 'Show Map'}
          </Button>
        )}
        {mapsEmbedUrl && showMap && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(true)}
          >
            <Maximize2 className="h-4 w-4 mr-2" />
            Expand
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Google Maps
          </a>
        </Button>
      </div>

      {/* Inline Map Preview */}
      {showMap && mapsEmbedUrl && (
        <div className="mt-4 rounded-lg overflow-hidden border">
          <iframe
            src={mapsEmbedUrl}
            className="w-full h-64 border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Route Map"
          />
        </div>
      )}

      {/* Expanded Map Modal */}
      {isExpanded && mapsEmbedUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-semibold text-gray-900">Route Map</h3>
                <p className="text-sm text-gray-500">
                  {originZip} → {destinationZip}
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
              <p className="text-sm text-gray-500">
                Powered by Google Maps
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsExpanded(false)}>
                  Close
                </Button>
                <Button asChild>
                  <a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer">
                    Open Full Map
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
