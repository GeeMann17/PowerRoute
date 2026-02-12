import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  CheckCircle,
  ShieldCheck,
  Users,
  XCircle,
  Award,
  FileCheck,
  Lock,
  Target,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

export const metadata = {
  title: 'About PowerRoute | How We Vet IT Logistics Providers',
  description:
    'We reject 60% of providers who apply. Learn how PowerRoute vets, certifies, and matches IT logistics providers for data center relocations, ITAD, and more.',
}

const vettingSteps = [
  {
    step: '01',
    title: 'Application & Certification Verification',
    description: 'We verify every claimed certification directly with the issuing body — R2, e-Stewards, NAID AAA, SOC 2 Type II. If a cert is expired, pending, or unverifiable, the application stops here.',
    rejection: '~30% rejected at this stage',
  },
  {
    step: '02',
    title: 'Insurance & Compliance Review',
    description: 'General liability, cargo insurance, workers\' comp, auto liability — all verified with the carrier. DOT compliance checked. Any gaps and we don\'t proceed.',
    rejection: '~10% rejected at this stage',
  },
  {
    step: '03',
    title: 'Operational Assessment',
    description: 'We review their fleet (air-ride, climate control, GPS), equipment handling protocols, crew background check policies, and chain of custody procedures against our standards.',
    rejection: '~12% rejected at this stage',
  },
  {
    step: '04',
    title: 'Reference Checks & Performance Baseline',
    description: 'We contact their existing enterprise clients. On-time rates, damage claims, documentation quality, communication responsiveness. If they can\'t provide references, they don\'t join.',
    rejection: '~8% rejected at this stage',
  },
  {
    step: '05',
    title: 'Ongoing Performance Monitoring',
    description: 'Acceptance is just the beginning. We track performance scores, win rates, response times, and customer feedback. Providers who drop below our standards are suspended or removed.',
    rejection: 'Continuous — providers can be removed at any time',
  },
]

const byTheNumbers = [
  { value: '340+', label: 'Active Providers', detail: 'Across all 50 states' },
  { value: '60%', label: 'Rejection Rate', detail: 'Of provider applications' },
  { value: '14,200+', label: 'Racks Relocated', detail: 'Zero assets lost' },
  { value: '99.7%', label: 'Destruction Rate', detail: 'Certified & serialized' },
  { value: '<2 hrs', label: 'Match Time', detail: 'Average response' },
  { value: '100%', label: 'Chain of Custody', detail: 'Compliance rate' },
]

const certifications = [
  { cert: 'R2 (Responsible Recycling)', desc: 'Sustainable IT asset recycling and management standards' },
  { cert: 'e-Stewards', desc: 'Highest standard for ethical electronics recycling' },
  { cert: 'NAID AAA', desc: 'Certified data destruction with unannounced audits' },
  { cert: 'SOC 2 Type II', desc: 'Third-party verified security and operational controls' },
  { cert: 'NIST 800-88', desc: 'Federal media sanitization guidelines' },
  { cert: 'DOT Compliant', desc: 'Registered, insured, and federally compliant transport' },
]

const whyExists = [
  {
    icon: Target,
    title: 'IT Teams Don\'t Have Time to Vet Vendors',
    description: 'You have a migration deadline, not a vendor evaluation sprint. Researching, verifying certifications, checking insurance, and comparing quotes takes 3-4 weeks you don\'t have.',
  },
  {
    icon: ShieldCheck,
    title: 'The Stakes Are Too High to Guess',
    description: 'A wrong hire doesn\'t just cost money — it costs compliance certifications, client trust, and in some cases, your job. The risk of hiring an unvetted IT logistics provider is asymmetric.',
  },
  {
    icon: Eye,
    title: 'You Can\'t Tell Who\'s Good from a Google Search',
    description: 'Every logistics company claims to be "certified" and "experienced." Without verifying those claims directly with issuing bodies and past clients, you\'re trusting marketing copy.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hero-fg leading-tight tracking-tight mb-6">
              We Reject 60% of Providers{' '}
              <span className="text-primary">Who Apply to Join Our Network.</span>
            </h1>

            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed mb-6">
              PowerRoute exists because hiring the wrong IT logistics vendor is expensive,
              risky, and entirely avoidable. We vet providers so you don&apos;t have to —
              and we only let the best ones through.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-hero-fg/50">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-success" />
                340+ active providers nationwide
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-success" />
                Free to use, always
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-success" />
                Matched in under 2 hours
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why PowerRoute Exists */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Why PowerRoute Exists
            </h2>
            <p className="text-muted-foreground">
              We built PowerRoute after watching too many IT teams get burned by vendors who
              looked good on paper but couldn&apos;t deliver when it mattered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {whyExists.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} className="border-border">
                  <CardContent className="p-5">
                    <div className="p-2.5 bg-primary/10 rounded-lg w-fit mb-3">
                      <Icon className="h-5 w-5 text-primary" />
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

      {/* By the Numbers */}
      <section className="py-16 md:py-20 bg-section-alt border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {byTheNumbers.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vetting Process */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              How We Vet Every Provider
            </h2>
            <p className="text-muted-foreground">
              No shortcuts. No self-reported certifications. Every provider in our network has
              survived a 5-stage vetting process that rejects 6 out of every 10 applicants.
            </p>
          </div>

          <div className="space-y-6 max-w-3xl">
            {vettingSteps.map((item) => (
              <div key={item.step} className="flex gap-5 p-5 bg-card border border-border rounded-lg">
                <div className="text-3xl font-bold text-primary/20 flex-shrink-0">{item.step}</div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-card-foreground mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">{item.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive">
                    <XCircle className="h-3.5 w-3.5" />
                    {item.rejection}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-20 bg-section-alt border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
              Required Certifications
            </h2>
            <p className="text-muted-foreground text-center mb-10">
              Every provider in our network holds these certifications — verified directly
              with the issuing body, not self-reported.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((item) => (
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
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Ready to Work with Providers We&apos;d Trust with Our Own Equipment?
          </h2>
          <p className="text-muted-foreground mb-8">
            Describe your project in 3 minutes. We&apos;ll match you with a certified provider
            from our vetted network in under 2 hours. Free, no obligation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="h-12 px-8 text-sm font-semibold">
              <Link href="/quote">
                Get Your Free Provider Match
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
              <Users className="h-3.5 w-3.5" /> 340+ vetted providers
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" /> 60% rejection rate
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" /> 100% chain of custody
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
