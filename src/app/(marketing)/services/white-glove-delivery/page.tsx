import Link from 'next/link'
import {
  Truck,
  ArrowRight,
  Phone,
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap,
  Lock,
  ThermometerSun,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

export const metadata = {
  title: 'White Glove IT Delivery Services | PowerRoute',
  description:
    'Shock pallets, GPS tracking, climate-controlled transport for populated server racks and sensitive IT equipment. Matched in under 2 hours.',
}

const risks = [
  {
    icon: AlertTriangle,
    title: 'One Bump. $200K Gone.',
    description:
      'A fully populated blade chassis on a standard pallet in the back of a dry van. One pothole, one hard stop, and you\'re filing an insurance claim for equipment that was working fine this morning.',
  },
  {
    icon: Shield,
    title: 'Unclearanced Crew in Your Facility',
    description:
      'Your colo requires background checks, government IDs, and facility-specific access protocols. A delivery crew that can\'t get past the front desk wastes everyone\'s time — and your budget.',
  },
  {
    icon: ThermometerSun,
    title: 'Temperature & Humidity Damage',
    description:
      'Enterprise IT equipment has strict environmental tolerances. A non-climate-controlled truck in summer heat or winter cold can cause condensation damage that doesn\'t show up until power-on.',
  },
]

const differentiators = [
  {
    title: 'Shock Pallets & Air-Ride Suspension',
    description: 'Your equipment rides on shock-absorbing pallets inside air-ride vehicles. No forklifts touch a loaded rack. Ever.',
  },
  {
    title: 'Climate-Controlled Transport',
    description: 'Temperature and humidity controlled throughout transit. Real-time environmental monitoring with alerts.',
  },
  {
    title: 'Live GPS Tracking',
    description: 'You know exactly where your equipment is at every moment. Geofence alerts for route deviations.',
  },
  {
    title: 'Cleared & Background-Checked Crews',
    description: 'Every laborer background-checked with valid government ID. Facility clearances verified before dispatch.',
  },
  {
    title: 'Full Chain of Custody',
    description: 'Serial-number inventory, tamper-evident seals, verified handoff with timestamps and signatures.',
  },
  {
    title: 'Rack & Stack Installation',
    description: 'Not just delivery — installation, cabling, and power-on testing at the destination. Turnkey.',
  },
]

export default function WhiteGloveDeliveryPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                White Glove IT Delivery
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hero-fg leading-tight tracking-tight mb-6">
              Your Servers Aren&apos;t Furniture.{' '}
              <span className="text-primary">Stop Shipping Them Like It.</span>
            </h1>

            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed mb-8">
              Populated server racks, blade chassis, and sensitive IT equipment need shock pallets,
              climate control, GPS tracking, and crews who have the clearances to walk into
              your facility. PowerRoute matches you with white glove providers who treat your
              hardware like the six-figure asset it is.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-sm font-semibold">
                <Link href="/quote">
                  Get Matched with a White Glove Provider
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 text-sm">
                <a href={`tel:${PHONE_NUMBER}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Talk to Us Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Risks */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              What Happens When You Hire a &ldquo;Delivery Company&rdquo;
            </h2>
            <p className="text-muted-foreground">
              General freight carriers move boxes. IT equipment requires specialized handling
              that most delivery companies simply don&apos;t have.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {risks.map((risk) => {
              const Icon = risk.icon
              return (
                <Card key={risk.title} className="border-border border-destructive/20">
                  <CardContent className="p-5">
                    <div className="p-2.5 bg-destructive/10 rounded-lg w-fit mb-3">
                      <Icon className="h-5 w-5 text-destructive" />
                    </div>
                    <h3 className="text-base font-semibold text-card-foreground mb-1.5">{risk.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{risk.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 md:py-20 bg-section-alt border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              What White Glove Actually Means
            </h2>
            <p className="text-muted-foreground">
              Not a marketing term. A specific set of handling standards that every
              provider in our network is required to meet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
            {differentiators.map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-card-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Your Equipment Deserves Better Than a Dry Van
          </h2>
          <p className="text-muted-foreground mb-8">
            Tell us what you&apos;re shipping, where it&apos;s going, and any facility access
            requirements. We&apos;ll match you with a white glove provider in under 2 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="h-12 px-8 text-sm font-semibold">
              <Link href="/quote">
                Get Your Free Match
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 text-sm">
              <a href={`tel:${PHONE_NUMBER}`}>
                <Phone className="mr-2 h-4 w-4" />
                Talk to a Human
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" /> Full chain of custody
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Matched in under 2 hours
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Free, no commitment
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
