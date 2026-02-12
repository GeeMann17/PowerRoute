import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Service Locations | White Glove Delivery Nationwide | PowerRoute',
  description:
    'PowerRoute provides white glove delivery, commercial moving, and IT logistics services nationwide. Find vetted providers in your city.',
  keywords: [
    'white glove delivery near me',
    'commercial moving locations',
    'IT logistics providers',
    'data center movers',
  ],
}

const locations = [
  {
    city: 'Phoenix',
    state: 'Arizona',
    slug: 'phoenix',
    providers: '45+',
    highlights: ['Climate-controlled transport', 'Data center hub', 'Valley-wide coverage'],
  },
  {
    city: 'Dallas',
    state: 'Texas',
    slug: 'dallas',
    providers: '60+',
    highlights: ['Data center market', 'Corporate HQ experience', '24/7 availability'],
  },
  {
    city: 'Los Angeles',
    state: 'California',
    slug: 'los-angeles',
    providers: '75+',
    highlights: ['Entertainment industry', 'Port logistics', 'Tech corridor'],
    comingSoon: true,
  },
]

const additionalMarkets = [
  'New York City',
  'Chicago',
  'Houston',
  'Atlanta',
  'Miami',
  'San Francisco',
  'Seattle',
  'Denver',
  'Boston',
  'Austin',
]

export default function LocationsPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b-[3px] border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-widest">
                Service Locations
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-hero-fg leading-tight tracking-tight mb-6 font-mono uppercase">
              White Glove Logistics.{' '}
              <span className="brutal-highlight">Nationwide Coverage.</span>
            </h1>

            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed">
              PowerRoute connects you with vetted logistics providers across the United States.
              From data center hubs to corporate corridors, we have local expertise wherever
              your business needs to move.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Featured Markets
            </h2>
            <p className="text-muted-foreground">
              Major metros with dedicated provider networks and local expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {locations.map((location) => (
              <Card key={location.slug} className="brutal-hover relative">
                {location.comingSoon && (
                  <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold uppercase px-2 py-1 border-2 border-border">
                    Coming Soon
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-accent" />
                    <div>
                      <h3 className="text-lg font-black text-card-foreground uppercase">
                        {location.city}
                      </h3>
                      <p className="text-xs text-muted-foreground">{location.state}</p>
                    </div>
                  </div>

                  <div className="text-2xl font-black text-accent font-mono mb-4">
                    {location.providers} <span className="text-sm font-medium text-muted-foreground">Providers</span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {location.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {!location.comingSoon ? (
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/locations/${location.slug}`}>
                        View {location.city} Services
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Markets */}
      <section className="py-16 md:py-20 bg-section-alt border-y-[3px] border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Additional Markets
            </h2>
            <p className="text-muted-foreground">
              We have provider coverage in these markets. Contact us for availability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl">
            {additionalMarkets.map((market) => (
              <div
                key={market}
                className="flex items-center gap-2 p-3 bg-card border-2 border-border text-sm font-medium"
              >
                <MapPin className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                {market}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-4">
            Don&apos;t See Your City?
          </h2>
          <p className="text-muted-foreground mb-8">
            Our network spans the entire United States. Tell us where you need to move,
            and we&apos;ll match you with qualified providers.
          </p>

          <Button asChild variant="accent" size="xl">
            <Link href="/quote">
              Get Matched Anywhere
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
