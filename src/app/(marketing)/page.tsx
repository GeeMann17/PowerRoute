'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Server,
  Recycle,
  PackageSearch,
  Building2,
  Truck,
  ClipboardCheck,
  Phone,
  ArrowRight,
  Award,
  Lock,
  Eye,
  Zap,
  FileCheck,
  Search,
  Handshake,
  CheckCircle,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { MiniCalculator } from '@/components/forms/mini-calculator'
import { cn } from '@/lib/utils'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

// ============================================================
// Data
// ============================================================

const services = [
  {
    icon: Truck,
    title: 'White Glove Transport',
    description: 'Shock pallets. Climate-controlled trucks. Live GPS tracking. Certified crews trained specifically for sensitive IT equipment handling.',
  },
  {
    icon: Server,
    title: 'Data Center Relocation',
    description: 'Full rack migrations with labeling, teardown, transport, rack & stack, cabling, and power-on verification. 14,200+ racks moved with zero lost assets.',
  },
  {
    icon: PackageSearch,
    title: 'IT Asset Recovery',
    description: 'Secure equipment retrieval from remote sites, branch offices, and decommissioned facilities. Every asset serial-logged, sealed, and GPS-tracked.',
  },
  {
    icon: Building2,
    title: 'Office Decommission',
    description: 'Complete facility strip-outs covering workstations, networking, telecom, and security systems with full documentation your compliance team requires.',
  },
  {
    icon: Recycle,
    title: 'ITAD & Data Destruction',
    description: 'NIST 800-88 certified media sanitization with serialized Certificates of Destruction for every asset. Audit-ready documentation standard.',
  },
]

const howItWorks = [
  {
    step: 1,
    icon: ClipboardCheck,
    title: 'Scope Your Project',
    description: 'Equipment type, facility access requirements, compliance needs. Three minutes is all it takes.',
  },
  {
    step: 2,
    icon: Search,
    title: 'We Deploy the Right Team',
    description: 'Our specialists review your scope and match you with 1-3 pre-vetted providers who specialize in your exact job type and region.',
  },
  {
    step: 3,
    icon: Handshake,
    title: 'Your Provider Engages Directly',
    description: 'Detailed scope review, transparent pricing, and full chain of custody documentation before a single asset moves.',
  },
]

const stats = [
  { value: '14,200+', label: 'Racks Relocated' },
  { value: '340+', label: 'Certified Providers' },
  { value: '99.7%', label: 'Destruction Rate' },
  { value: '< 10 Min', label: 'Avg Match Time' },
]

const testimonials = [
  {
    quote: 'We were quoted 3 weeks of downtime by another vendor. PowerRoute matched us with a team that moved 120 racks in a single weekend. Zero downtime. Zero lost assets. The chain of custody docs passed our SOC 2 audit without a single finding.',
    name: 'Marcus Chen',
    title: 'VP of Infrastructure',
    company: 'TechScale Systems',
    outcome: '120 racks moved \u2014 0 downtime, 0 lost assets',
  },
  {
    quote: 'We had 3,000 end-of-life assets across 12 offices and no idea where to start. PowerRoute matched us with a certified ITAD provider who handled everything \u2014 data destruction, serialized CoDs, and remarketing. We recovered $47K from asset resale.',
    name: 'Sarah Johnson',
    title: 'IT Director',
    company: 'National Financial Group',
    outcome: '3,000 assets retired \u2014 $47K recovered',
  },
  {
    quote: 'Our facility requires TS/SCI clearances and no forklifts. PowerRoute found us a provider whose entire crew was cleared, used shock pallets and pallet jacks only, and had our 8 racks installed in under 6 hours.',
    name: 'David Park',
    title: 'Facilities Manager',
    company: 'SecureData Corp',
    outcome: '8 racks delivered \u2014 cleared facility, 6 hours',
  },
]

const faqs = [
  {
    question: 'Why not hire a logistics company directly?',
    answer: 'You can \u2014 if you have 3-4 weeks to evaluate vendors, verify certifications, check insurance, confirm clearances, and negotiate pricing. Most enterprise IT teams don\'t. PowerRoute maintains a pre-vetted network of 340+ certified providers and matches your project to the right specialist based on job type, geography, and compliance requirements. You skip the entire RFP process.',
  },
  {
    question: 'What certifications do your providers hold?',
    answer: 'Every provider is fully insured, DOT compliant, and background-checked. For specialized work — data destruction, secure facilities, clearance-required jobs — we match providers with the specific certifications required (NAID AAA, R2, SOC 2, security clearances). We reject roughly 60% of applicants to maintain network quality.',
  },
  {
    question: 'How is chain of custody guaranteed?',
    answer: 'Every provider follows our standardized chain of custody protocol: serial number inventory at pickup, tamper-evident seals on every container, live GPS tracking in transit, and verified handoff with timestamps and signatures at delivery. If a seal is broken or a scan is missed, our system flags it immediately. 100% compliance rate across 14,200+ rack moves.',
  },
  {
    question: 'Can your providers access classified or high-security facilities?',
    answer: 'Yes. All providers carry background-checked laborers with valid government IDs as baseline. For classified environments, we match providers whose crews hold TS/SCI or other required clearances and who comply with your specific facility access protocols. We handle SCIF environments, government data centers, and financial institutions regularly.',
  },
  {
    question: 'How fast will I hear from a matched provider?',
    answer: 'We review your project scope and match you with qualified providers in under 10 minutes. Most customers receive their first provider contact within hours of submitting. For emergency projects, we expedite matching immediately.',
  },
  {
    question: 'What does this cost?',
    answer: 'Using PowerRoute is completely free. We\'re compensated by the providers in our network, not by you. There\'s no commitment, no credit card required, and no obligation to accept a match. You receive competitive, transparent pricing directly from the matched provider.',
  },
]

const trustItems = [
  { icon: Lock, text: 'Tamper-evident seals + live GPS on every shipment' },
  { icon: Award, text: 'Every provider vetted, insured, and certified for the job' },
  { icon: Eye, text: 'Every laborer background-checked with valid government ID' },
  { icon: Zap, text: 'Shock pallets, climate-controlled trucks, zero forklift contact' },
]

const certs = [
  { cert: 'Fully Insured', desc: 'Cargo, liability, and workers comp coverage verified' },
  { cert: 'Background Checked', desc: 'Every crew member screened and ID-verified' },
  { cert: 'DOT Compliant', desc: 'Department of Transportation registered carriers' },
  { cert: 'Chain of Custody', desc: 'Serial-level tracking from pickup to delivery' },
  { cert: 'Industry Certified', desc: 'Specialized certifications for ITAD, data centers, and secure facilities' },
]

// ============================================================
// Page Component
// ============================================================

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* ================ HERO ================ */}
      <section className="bg-hero-bg border-b-[3px] border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
            {/* Left: Copy */}
            <div className="space-y-6 pt-4">
              <span className="inline-block bg-accent text-accent-foreground px-3 py-1.5 text-xs font-bold uppercase tracking-widest border-2 border-border">
                Trusted by 500+ Enterprise IT Teams
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-hero-fg leading-[1.08] tracking-tight font-mono uppercase">
                Mission-Critical Deployments Demand{' '}
                <span className="brutal-highlight">Mission-Critical Logistics.</span>
              </h1>

              <p className="text-lg text-hero-fg/70 max-w-xl leading-relaxed">
                Your infrastructure is too valuable for unvetted crews. PowerRoute matches
                you with pre-certified IT logistics providers in minutes &mdash;
                not weeks. Free to use. Zero obligation.
              </p>

              {/* Trust bullets */}
              <div className="space-y-2 border-l-4 border-accent pl-4">
                <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                  <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                  14,200+ racks relocated &mdash; zero lost assets
                </span>
                <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                  <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                  Every provider vetted, insured &amp; background-checked
                </span>
                <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                  <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                  Matched in under 10 minutes
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild variant="accent" size="xl">
                  <Link href="/quote">
                    Get Matched Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-hero-fg/30 text-hero-fg hover:bg-hero-fg hover:text-hero-bg">
                  <a href={`tel:${PHONE_NUMBER}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Us Direct
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Image + Calculator */}
            <div className="space-y-4">
              {/* Stock image */}
              <div className="relative border-2 border-hero-fg/30 brutal-shadow overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
                  alt="Data center aisle with server racks and infrastructure"
                  width={800}
                  height={500}
                  className="w-full h-48 md:h-56 object-cover grayscale contrast-125"
                  priority
                />
                <div className="absolute bottom-0 left-0 bg-accent text-accent-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-widest border-t-2 border-r-2 border-border">
                  Certified. Cleared. Insured.
                </div>
              </div>

              {/* Calculator card */}
              <div className="bg-card border-2 border-border brutal-shadow p-6">
                <h2 className="text-lg font-black text-card-foreground uppercase font-mono mb-1">
                  What Will This Cost?
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  30-second estimate. No email required. No strings.
                </p>
                <MiniCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================ STATS BAR ================ */}
      <section className="border-b-[3px] border-border bg-accent">
        <div className="container mx-auto px-0">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "text-center py-6 px-4",
                  i < stats.length - 1 && "md:border-r-2 md:border-border",
                  i < 2 && "border-b-2 md:border-b-0 border-border",
                  i === 0 && "border-r-2 border-border md:border-r-2",
                  i === 1 && "md:border-r-2 md:border-border"
                )}
              >
                <div className="text-3xl md:text-4xl font-black text-accent-foreground font-mono">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-accent-foreground/70 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ SERVICES ================ */}
      <section id="services" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Five Specialized Disciplines. One Vetted Network.
            </h2>
            <p className="text-muted-foreground">
              Each service demands different certifications, specialized equipment, and proven expertise.
              We match the right crew to the right job &mdash; every time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.title} className="brutal-hover group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent border-2 border-border flex-shrink-0">
                        <Icon className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-card-foreground uppercase mb-2">{service.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================ HOW IT WORKS ================ */}
      <section id="how-it-works" className="py-16 md:py-24 bg-section-alt border-y-[3px] border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Matched in Minutes. Not Weeks.
            </h2>
            <p className="text-muted-foreground">
              No RFPs. No vendor spreadsheets. No 3-week evaluation cycles.
              You describe the job. We find the certified crew.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 max-w-5xl">
            {howItWorks.map((step, i) => (
              <div
                key={step.step}
                className={cn(
                  "p-8 border-2 border-border bg-card",
                  i < howItWorks.length - 1 && "md:border-r-0"
                )}
              >
                <div className="brutal-step-number mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-black text-foreground uppercase mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ WHY POWERROUTE (RISK / TRUST SECTION) ================ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-4">
                The Cost of an Unqualified Crew: $142,000.
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Broken chain of custody. Drives wiped by an uncertified crew.
                Laborers without clearances in your secure facility. A single
                compliance failure triggers audits, fines, and client trust
                that takes years to rebuild.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Enterprise IT teams rarely have weeks to vet logistics vendors.
                PowerRoute has already rejected 60% of applicants and certified
                the remaining 340+ providers &mdash; so your team can focus on
                what matters.
              </p>

              <div className="space-y-3">
                {trustItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.text} className="flex items-start gap-3 border-l-4 border-accent pl-4 py-2">
                      <Icon className="h-4 w-4 text-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-foreground">{item.text}</span>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8">
                <Button asChild variant="accent" size="lg">
                  <Link href="/quote">
                    Eliminate the Risk &mdash; Get Matched Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card border-2 border-border brutal-shadow p-6">
                <h3 className="text-base font-black text-card-foreground uppercase font-mono mb-5 border-b-2 border-border pb-3">
                  Provider Requirements
                </h3>
                <div className="space-y-0">
                  {certs.map((item, i) => (
                    <div key={item.cert} className={cn(
                      "flex items-start gap-3 py-3",
                      i !== certs.length - 1 && "border-b border-border"
                    )}>
                      <FileCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-card-foreground uppercase">{item.cert}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary image */}
              <div className="border-2 border-border brutal-shadow-sm overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600267185393-e158a98703de?w=800&q=80"
                  alt="Server rack infrastructure in a modern data center"
                  width={600}
                  height={300}
                  className="w-full h-40 object-cover grayscale contrast-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================ TESTIMONIALS ================ */}
      <section className="py-16 md:py-24 bg-section-alt border-y-[3px] border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Results.
            </h2>
            <p className="text-muted-foreground">
              What happens when enterprise IT teams work with pre-vetted providers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <Card key={t.name} className="overflow-hidden">
                <div className="bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest px-6 py-2 border-b-2 border-border">
                  {t.outcome}
                </div>
                <CardContent className="p-6">
                  <blockquote className="text-sm text-foreground/80 leading-relaxed mb-4 font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="border-t-2 border-border pt-3">
                    <div className="font-bold text-foreground text-sm uppercase">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.title}, {t.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================ FAQ ================ */}
      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
                Common Questions
              </h2>
              <p className="text-muted-foreground">
                What enterprise IT teams ask before every engagement.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-2 border-border bg-card px-6 brutal-shadow-sm data-[state=open]:brutal-shadow"
                >
                  <AccordionTrigger className="py-5 text-left text-foreground hover:no-underline hover:text-accent text-sm">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ================ FINAL CTA ================ */}
      <section className="py-20 md:py-28 bg-foreground text-background border-t-[3px] border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Shield className="h-10 w-10 text-accent mx-auto mb-6" />

          <h2 className="text-3xl md:text-4xl font-black uppercase font-mono tracking-tight mb-4">
            Your Infrastructure Deserves Better Than a Guess.
          </h2>
          <p className="text-background/70 mb-4 text-lg">
            Three minutes to scope your project. Matched with a certified
            provider in minutes. Zero cost. Zero obligation.
          </p>

          <p className="text-accent font-black text-sm uppercase tracking-widest mb-8">
            We&apos;ll contact you in 10 minutes or less.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="accent" size="xl">
              <Link href="/quote">
                Get Matched Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-background/30 text-background hover:bg-background hover:text-foreground">
              <a href={`tel:${PHONE_NUMBER}`}>
                <Phone className="mr-2 h-4 w-4" />
                Talk to a Human
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs font-bold uppercase tracking-wider text-background/40">
            <span>340+ Vetted Providers</span>
            <span className="text-accent">|</span>
            <span>No Credit Card</span>
            <span className="text-accent">|</span>
            <span>100% Chain of Custody</span>
          </div>
        </div>
      </section>
    </div>
  )
}
