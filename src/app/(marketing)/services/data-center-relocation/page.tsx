import Link from 'next/link'
import {
  Server,
  ArrowRight,
  Phone,
  CheckCircle,
  ShieldCheck,
  Clock,
  AlertTriangle,
  FileCheck,
  Zap,
  Lock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

export const metadata = {
  title: 'Data Center Relocation Services | PowerRoute',
  description:
    'Pre-vetted, certified providers for full rack migrations. Labeling, teardown, transport, rack & stack, cabling, and power-on testing. Matched in under 2 hours.',
}

const risks = [
  {
    icon: AlertTriangle,
    title: 'Unplanned Downtime',
    description:
      'A single mislabeled cable or dropped rack can cascade into hours — or days — of production downtime. The average cost of data center downtime is $9,000 per minute.',
  },
  {
    icon: Lock,
    title: 'Broken Chain of Custody',
    description:
      'If your drives leave the building without tamper-evident seals, serial logging, and GPS tracking, your compliance certification is at risk. Period.',
  },
  {
    icon: ShieldCheck,
    title: 'Uncertified Crews',
    description:
      'Laborers without facility clearances, background checks, or IT handling experience. One wrong move with a loaded rack and you\'re looking at six figures in damaged equipment.',
  },
]

const process_steps = [
  {
    step: '01',
    title: 'Pre-Move Assessment',
    description:
      'Your matched provider inventories every rack, cable, and connection. Serial numbers logged. Photos documented. Labels applied. Nothing moves until everything is mapped.',
  },
  {
    step: '02',
    title: 'Coordinated Teardown',
    description:
      'Systematic disconnection following your change management protocol. Power-down sequence, cable labeling, and rack preparation with anti-static handling throughout.',
  },
  {
    step: '03',
    title: 'Secure Transport',
    description:
      'Climate-controlled vehicles. Shock pallets. GPS tracking. Tamper-evident seals on every rack. Your equipment travels like the six-figure asset it is.',
  },
  {
    step: '04',
    title: 'Rack & Stack + Validation',
    description:
      'Installation at the destination facility, cabling per your documentation, and full power-on testing. You don\'t sign off until every system is confirmed live.',
  },
]

const stats = [
  { value: '14,200+', label: 'Racks Relocated' },
  { value: '0', label: 'Assets Lost' },
  { value: '99.8%', label: 'On-Time Completion' },
  { value: '<2 hrs', label: 'Average Match Time' },
]

export default function DataCenterRelocationPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Server className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                Data Center Relocation
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hero-fg leading-tight tracking-tight mb-6">
              A 120-Rack Migration With{' '}
              <span className="text-primary">Zero Downtime</span> Isn&apos;t Luck.
              It&apos;s Vetting.
            </h1>

            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed mb-8">
              The difference between a flawless data center move and a catastrophic one
              is the crew you hire. PowerRoute matches you with providers who have moved
              14,200+ racks without losing a single asset.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-sm font-semibold">
                <Link href="/quote">
                  Get Matched with a DC Relocation Provider
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

      {/* Stats Bar */}
      <section className="border-b border-border bg-section-alt">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              What Goes Wrong When You Hire the Wrong Crew
            </h2>
            <p className="text-muted-foreground">
              Data center relocations are high-stakes, low-margin-for-error operations.
              Here&apos;s what we see when companies skip proper vetting.
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

      {/* Process Section */}
      <section className="py-16 md:py-20 bg-section-alt border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              How Our Matched Providers Execute a DC Move
            </h2>
            <p className="text-muted-foreground">
              Every provider in our network follows a standardized, auditable process.
              No shortcuts. No improvising.
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

      {/* Certifications */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
              Every Provider is Certified. Every Time.
            </h2>
            <p className="text-muted-foreground text-center mb-10">
              We reject 60% of providers who apply. The ones who make it hold these certifications — verified annually.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { cert: 'SOC 2 Type II', desc: 'Third-party security controls' },
                { cert: 'R2 Certified', desc: 'Responsible recycling' },
                { cert: 'DOT Compliant', desc: 'Registered and insured transport' },
                { cert: 'NIST 800-88', desc: 'Media sanitization' },
                { cert: 'Background Checked', desc: 'Every laborer, every job' },
                { cert: 'GPS Tracked', desc: 'Live tracking on every shipment' },
              ].map((item) => (
                <div key={item.cert} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <FileCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-card-foreground">{item.cert}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-section-alt border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Your Next DC Move Deserves a Vetted Crew
          </h2>
          <p className="text-muted-foreground mb-8">
            Describe your migration scope in 3 minutes. We&apos;ll match you with a
            certified provider in under 2 hours. Completely free, no obligation.
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
              <CheckCircle className="h-3.5 w-3.5" /> 14,200+ racks moved
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Matched in under 2 hours
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> No commitment required
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
