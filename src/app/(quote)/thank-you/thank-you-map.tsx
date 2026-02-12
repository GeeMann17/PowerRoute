'use client'

import { useState } from 'react'
import { MapPin, Navigation, Maximize2, X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ThankYouMapProps {
  originZip: string
  destinationZip: string
  distanceMiles: number | null
}

export function ThankYouMap({ originZip, destinationZip, distanceMiles }: ThankYouMapProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const origin = `${originZip}, USA`
  const destination = `${destinationZip}, USA`

  // Build Google Maps link for opening in new tab
  const mapsLinkUrl = `https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`

  // Build Google Maps embed URL for directions
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  const mapsEmbedUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving`
    : null

  return (
    <>
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 mb-8 overflow-hidden">
        <CardContent className="p-0">
          {/* Route Info Header */}
          <div className="p-4 border-b border-blue-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                {/* Origin */}
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-full">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500">From</p>
                    <p className="font-medium">{originZip}</p>
                  </div>
                </div>

                {/* Distance */}
                <div className="flex items-center gap-2 px-4">
                  <Navigation className="h-5 w-5 text-blue-600" />
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Distance</p>
                    <p className="font-semibold text-blue-700">
                      {distanceMiles ? `${distanceMiles.toLocaleString()} miles` : 'Calculating...'}
                    </p>
                  </div>
                </div>

                {/* Destination */}
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-100 rounded-full">
                    <MapPin className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500">To</p>
                    <p className="font-medium">{destinationZip}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {mapsEmbedUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsExpanded(true)}
                    className="bg-white"
                  >
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Expand
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="bg-white"
                >
                  <a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Maps
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Embedded Map - Shown by default */}
          {mapsEmbedUrl ? (
            <div className="aspect-[16/9] md:aspect-[21/9] w-full">
              <iframe
                src={mapsEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Your Moving Route"
              />
            </div>
          ) : (
            <div className="aspect-[16/9] md:aspect-[21/9] w-full bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Navigation className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Map preview unavailable</p>
                <a
                  href={mapsLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View route on Google Maps →
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expanded Map Modal */}
      {isExpanded && mapsEmbedUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-semibold text-gray-900">Your Moving Route</h3>
                <p className="text-sm text-gray-500">
                  {originZip} → {destinationZip}
                  {distanceMiles && ` • ${distanceMiles.toLocaleString()} miles`}
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
                title="Your Moving Route"
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
                    <ExternalLink className="h-4 w-4 mr-2" />
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
