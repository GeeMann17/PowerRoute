import Link from 'next/link'
import {
  Recycle,
  ArrowRight,
  Phone,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  ShieldAlert,
  DollarSign,
  Clock,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

export const metadata = {
  title: 'IT Asset Disposition (ITAD) Services | PowerRoute',
  description:
    'Certified data destruction, e-waste recycling, and asset remarketing with serialized Certificates of Destruction. NIST 800-88 compliant providers matched in under 2 hours.',
}

const risks = [
  {
    icon: ShieldAlert,
    title: 'Data Breach from "Wiped" Drives',
    description:
      'A drive that\'s been "wiped" by an uncertified crew is a liability, not an asset. Without NIST 800-88 verification, you have no proof the data is actually gone — and neither does your auditor.',
  },
  {
    icon: AlertTriangle,
    title: 'Compliance Violations',
    description:
      'HIPAA, PCI-DSS, SOX, GDPR — they all require documented, certified data destruction. "We took care of it" doesn\'t survive a regulatory audit. Serialized Certificates of Destruction do.',
  },
  {
    icon: DollarSign,
    title: 'Leaving Money on the Table',
    description:
      'Most companies treat end-of-life assets as waste. Certified ITAD providers can recover 15-40% of original asset value through tested remarketing — turning a cost center into a revenue line.',
  },
]

const services = [
  {
    title: 'Certified Data Destruction',
    description: 'NIST 800-88 compliant sanitization — degaussing, shredding, or cryptographic erasure. Serialized Certificate of Destruction for every single asset. No exceptions.',
  },
  {
    title: 'Asset Remarketing & Recovery',
    description: 'Functional testing, grading, and resale through certified channels. Our providers typically recover 15-40% of original value on enterprise equipment.',
  },
  {
    title: 'E-Waste Recycling',
    description: 'R2 and e-Stewards certified recycling with full downstream documentation. Zero landfill policy. Complete chain of custody from your dock to final disposition.',
  },
  {
    title: 'Reporting & Documentation',
    description: 'Serialized asset reports, Certificates of Destruction, recycling manifests, and chain of custody logs. Everything your compliance team and auditors need in one package.',
  },
]

const stats = [
  { value: '99.7%', label: 'Certified Destruction Rate' },
  { value: '$2.1M+', label: 'Value Recovered for Clients' },
  { value: 'NIST 800-88', label: 'Compliant Providers Only' },
  { value: '100%', label: 'Serialized Documentation' },
]

export default function ITADPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Recycle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                IT Asset Disposition
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hero-fg leading-tight tracking-tight mb-6">
              &ldquo;We Wiped the Drives&rdquo; Doesn&apos;t{' '}
              <span className="text-primary">Survive an Audit.</span>
            </h1>

            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed mb-8">
              Your end-of-life assets deserve certified destruction, not a promise. PowerRoute
              matches you with NAID AAA and NIST 800-88 certified ITAD providers who deliver
              serialized Certificates of Destruction for every asset — and can recover value
              from what&apos;s still sellable.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-sm font-semibold">
                <Link href="/quote">
                  Get Matched with a Certified ITAD Provider
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

      {/* Stats */}
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

      {/* Risks */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              The Real Cost of Cutting Corners on ITAD
            </h2>
            <p className="text-muted-foreground">
              Most data breaches don&apos;t come from hackers. They come from improperly
              retired assets sitting in a warehouse or shipped to an uncertified recycler.
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

      {/* Services Breakdown */}
      <section className="py-16 md:py-20 bg-section-alt border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              What Our ITAD Providers Deliver
            </h2>
            <p className="text-muted-foreground">
              Every provider is NAID AAA certified, R2 compliant, and delivers serialized
              documentation your compliance team will accept without questions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {services.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <FileCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-semibold text-card-foreground mb-1.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
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
            Retire Your Assets the Right Way
          </h2>
          <p className="text-muted-foreground mb-8">
            Get matched with a certified ITAD provider who handles data destruction,
            documentation, and asset recovery — so your next audit is a non-event.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="h-12 px-8 text-sm font-semibold">
              <Link href="/quote">
                Get Your Free ITAD Match
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
              <CheckCircle className="h-3.5 w-3.5" /> NAID AAA + NIST 800-88
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
