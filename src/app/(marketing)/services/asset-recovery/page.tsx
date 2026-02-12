import Link from 'next/link'
import {
  PackageSearch,
  ArrowRight,
  Phone,
  AlertTriangle,
  MapPin,
  Clock,
  Zap,
  Lock,
  FileCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

export const metadata = {
  title: 'IT Asset Recovery Services | PowerRoute',
  description:
    'Physical retrieval of IT assets from remote sites, branch offices, and decommissioned facilities. Full chain of custody from pickup to delivery.',
}

const challenges = [
  {
    icon: MapPin,
    title: 'Assets Scattered Across Locations',
    description:
      'Branch offices, remote sites, former tenant spaces, decommissioned facilities — your assets are everywhere and nobody local knows what\'s there or how to handle it.',
  },
  {
    icon: AlertTriangle,
    title: 'No Chain of Custody = No Compliance',
    description:
      'The moment an asset leaves a facility without serial logging, tamper-evident seals, and documented handoff, you\'ve created a compliance gap your auditor will find.',
  },
  {
    icon: Clock,
    title: 'Time-Sensitive Retrievals',
    description:
      'Lease expiring. Office closing. Facility access window closing. When you need assets out by a deadline, you can\'t afford to wait weeks for vendor quotes.',
  },
]

const process_steps = [
  {
    step: '01',
    title: 'Site Assessment & Inventory',
    description: 'Your matched provider coordinates site access, inventories all assets with serial numbers, and creates a documented pickup manifest before anything moves.',
  },
  {
    step: '02',
    title: 'Secure Packaging & Removal',
    description: 'Anti-static handling, shock pallets for sensitive equipment, and blanket wrap for monitors and peripherals. Every asset sealed and tagged.',
  },
  {
    step: '03',
    title: 'Tracked Transport',
    description: 'Live GPS tracking from pickup to delivery. Tamper-evident seals verified at both ends. You know exactly where your assets are at every moment.',
  },
  {
    step: '04',
    title: 'Verified Delivery & Documentation',
    description: 'Serial-verified handoff at the destination with timestamps, signatures, and condition notes. Complete chain of custody report delivered to your team.',
  },
]

export default function AssetRecoveryPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <PackageSearch className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                IT Asset Recovery
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hero-fg leading-tight tracking-tight mb-6">
              Your Assets Are Sitting in a Building{' '}
              <span className="text-primary">You No Longer Control.</span>
            </h1>

            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed mb-8">
              Remote offices. Closed branches. Decommissioned sites. Every day those assets
              sit unattended is another day of compliance risk and depreciation. PowerRoute
              matches you with recovery providers who retrieve, inventory, and deliver your
              assets with full chain of custody.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-sm font-semibold">
                <Link href="/quote">
                  Get Matched with a Recovery Provider
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

      {/* Challenges */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Why Asset Recovery Gets Complicated Fast
            </h2>
            <p className="text-muted-foreground">
              It&apos;s never as simple as &ldquo;go pick it up.&rdquo; Here&apos;s what IT teams
              actually deal with.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {challenges.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} className="border-border border-destructive/20">
                  <CardContent className="p-5">
                    <div className="p-2.5 bg-destructive/10 rounded-lg w-fit mb-3">
                      <Icon className="h-5 w-5 text-destructive" />
                    </div>
                    <h3 className="text-base font-semibold text-card-foreground mb-1.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-section-alt border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              From Remote Site to Your Dock — Fully Documented
            </h2>
            <p className="text-muted-foreground">
              Every recovery follows the same auditable process. No improvising, no shortcuts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {process_steps.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="text-3xl font-bold text-primary/20 flex-shrink-0">{item.step}</div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
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
            Stop Losing Track of Your Assets
          </h2>
          <p className="text-muted-foreground mb-8">
            Tell us where your assets are and what you need retrieved. We&apos;ll match you
            with a certified provider in under 2 hours. Free, no obligation.
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
              <FileCheck className="h-3.5 w-3.5" /> Serialized documentation
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
