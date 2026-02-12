import Link from 'next/link'
import {
  Building2,
  ArrowRight,
  Phone,
  CheckCircle,
  Shield,
  FileCheck,
  Truck,
  Clock,
  Users,
  Package,
  Boxes,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

export const metadata = {
  title: 'Commercial Moving Services | Office Relocation | PowerRoute',
  description:
    'Full-service commercial moving and office relocation. Vetted movers for corporate relocations, warehouse moves, and business expansions. Get matched in minutes.',
  keywords: [
    'commercial moving company',
    'office relocation services',
    'business moving',
    'corporate relocation',
    'warehouse moving',
    'office movers',
    'commercial relocation services',
  ],
}

const commercialStats = [
  { value: '500+', label: 'Office Moves' },
  { value: '180+', label: 'Commercial Providers' },
  { value: '< 2 hrs', label: 'Match Time' },
  { value: '97%', label: 'On-Time Rate' },
]

const services = [
  {
    icon: Building2,
    title: 'Office Relocation',
    description:
      'From single-floor moves to multi-building corporate relocations. Furniture disassembly, packing, transport, and setup at your new location.',
  },
  {
    icon: Boxes,
    title: 'Warehouse & Industrial',
    description:
      'Racking systems, inventory, heavy equipment, and manufacturing lines. Rigging, millwrighting, and machinery moving.',
  },
  {
    icon: Package,
    title: 'Furniture Installation',
    description:
      'New furniture delivery and installation, or reconfiguration of existing workstations. Systems furniture specialists.',
  },
  {
    icon: Settings,
    title: 'Decommission & Liquidation',
    description:
      'End-of-lease facility clearing, asset liquidation, and responsible disposal. Documentation for your compliance needs.',
  },
]

const processSteps = [
  {
    step: 1,
    title: 'Scope Your Move',
    description:
      'Tell us about your space, timeline, and any special requirements. Takes about 3 minutes.',
  },
  {
    step: 2,
    title: 'Get Matched',
    description:
      'We review your project and match you with 1-3 vetted commercial movers who specialize in your type of move.',
  },
  {
    step: 3,
    title: 'Choose Your Provider',
    description:
      'Review quotes, credentials, and availability. Pick the provider that fits your needs and budget.',
  },
  {
    step: 4,
    title: 'Execute Your Move',
    description:
      'Your provider handles everything — packing, transport, setup — with project management throughout.',
  },
]

const features = [
  {
    icon: Shield,
    title: 'Vetted & Insured',
    description:
      'Every provider is fully insured, DOT compliant, and background-checked. We reject 60% of applicants.',
  },
  {
    icon: Users,
    title: 'Dedicated Project Manager',
    description:
      'Complex moves include a dedicated PM who coordinates timelines, building access, and vendor logistics.',
  },
  {
    icon: Clock,
    title: 'After-Hours & Weekends',
    description:
      'Minimize business disruption with evening and weekend moves. Many providers offer 24/7 availability.',
  },
  {
    icon: FileCheck,
    title: 'Full Documentation',
    description:
      'Detailed inventory, condition reports, and chain of custody. Everything your compliance team needs.',
  },
]

const moveTypes = [
  'Corporate headquarters',
  'Branch office moves',
  'Medical & dental offices',
  'Law firm relocations',
  'Financial institutions',
  'Retail store moves',
  'Restaurant relocations',
  'Warehouse consolidations',
  'Manufacturing facilities',
  'Tech company moves',
  'Multi-floor relocations',
  'Multi-site rollouts',
]

const faqs = [
  {
    question: 'How much does a commercial move cost?',
    answer:
      'Commercial moving costs vary based on several factors: square footage, distance, amount of furniture and equipment, floor levels, building access, and timeline. Most office moves range from $5,000-$25,000 for small to mid-size offices, and $25,000-$100,000+ for larger corporate relocations. We provide free, no-obligation quotes from vetted providers.',
  },
  {
    question: 'How do you minimize business downtime during a move?',
    answer:
      'Our providers use several strategies to minimize downtime: weekend and after-hours moves, phased relocations (moving departments sequentially), parallel infrastructure setup at the new location, and detailed cutover planning. Many office moves are completed in a single weekend with employees back at work Monday morning.',
  },
  {
    question: 'Do you handle IT equipment as part of the office move?',
    answer:
      'Yes. Our commercial moving providers can coordinate with your IT team for workstation moves, or we can match you with specialized IT logistics providers for data centers and server rooms. For complex IT components, we recommend a dedicated IT mover working alongside the commercial mover.',
  },
  {
    question: 'What about furniture installation and reconfiguration?',
    answer:
      'Many of our commercial providers include furniture installation services. This includes disassembly at origin, transport, and reassembly at destination. For new furniture or complex systems furniture (Herman Miller, Steelcase, etc.), we can match you with certified installation specialists.',
  },
  {
    question: 'Can you handle moves between cities or states?',
    answer:
      'Absolutely. Our network includes providers who specialize in long-distance commercial moves. These moves require additional planning for vehicle logistics, storage during transit, and coordination across locations. Interstate commercial movers carry appropriate USDOT authority.',
  },
  {
    question: 'What credentials do your commercial movers have?',
    answer:
      'Every provider is fully insured (cargo, liability, workers comp), DOT compliant, and background-checked. Many hold additional certifications including AMSA ProMover, IOMI (International Office Moving Institute), and GSA contracts for government moves.',
  },
]

export default function CommercialMovingPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b-[3px] border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-widest">
                Commercial Moving
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-hero-fg leading-tight tracking-tight mb-6 font-mono uppercase">
              Your Business is Moving.{' '}
              <span className="brutal-highlight">It Shouldn&apos;t Stop.</span>
            </h1>

            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed mb-4">
              Office relocations, warehouse moves, and corporate expansions require specialized
              commercial movers — not residential crews with a big truck. PowerRoute matches
              you with vetted providers who minimize downtime and protect your assets.
            </p>

            <div className="space-y-2 border-l-4 border-accent pl-4 mb-8">
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                180+ vetted commercial moving providers
              </span>
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                After-hours and weekend availability
              </span>
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                Free matching — no obligation
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="accent" size="xl">
                <Link href="/quote">
                  Get Matched with Commercial Movers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-hero-fg/30 text-hero-fg hover:bg-hero-fg hover:text-hero-bg"
              >
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
      <section className="border-b-[3px] border-border bg-accent">
        <div className="container mx-auto px-0">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {commercialStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center py-6 px-4 ${
                  i < commercialStats.length - 1 ? 'border-r-2 border-border' : ''
                } ${i < 2 ? 'border-b-2 md:border-b-0 border-border' : ''}`}
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

      {/* Services */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Commercial Moving Services
            </h2>
            <p className="text-muted-foreground">
              Full-service commercial relocation — from planning to execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.title} className="brutal-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent border-2 border-border flex-shrink-0">
                        <Icon className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-card-foreground uppercase mb-2">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-section-alt border-y-[3px] border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              From scoping to move day — we make commercial moving simple.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-0 max-w-5xl">
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className={`p-6 border-2 border-border bg-card ${
                  i < processSteps.length - 1 ? 'md:border-r-0' : ''
                }`}
              >
                <div className="w-10 h-10 bg-accent border-2 border-border flex items-center justify-center text-lg font-black text-accent-foreground mb-4">
                  {step.step}
                </div>
                <h3 className="text-base font-black text-foreground uppercase mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Why PowerRoute for Commercial Moves
            </h2>
            <p className="text-muted-foreground">
              We vet commercial movers so you don&apos;t have to.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
            {features.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-5 bg-card border-2 border-border"
                >
                  <div className="p-2 bg-accent border-2 border-border flex-shrink-0">
                    <Icon className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-card-foreground uppercase mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Move Types */}
      <section className="py-16 md:py-20 bg-section-alt border-y-[3px] border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Types of Commercial Moves We Handle
            </h2>
            <p className="text-muted-foreground">
              Every business is different. Our providers specialize.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
            {moveTypes.map((type) => (
              <div
                key={type}
                className="flex items-center gap-2 p-3 bg-card border-2 border-border text-sm font-medium"
              >
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
                Commercial Moving FAQs
              </h2>
              <p className="text-muted-foreground">
                Common questions about commercial relocation services.
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

      {/* CTA */}
      <section className="py-20 md:py-28 bg-foreground text-background border-t-[3px] border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Truck className="h-10 w-10 text-accent mx-auto mb-6" />

          <h2 className="text-3xl md:text-4xl font-black uppercase font-mono tracking-tight mb-4">
            Ready to Move Your Business?
          </h2>
          <p className="text-background/70 mb-8 text-lg">
            Get matched with vetted commercial movers in under 2 hours. Free quotes,
            no obligation, minimal downtime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="accent" size="xl">
              <Link href="/quote">
                Get Your Free Commercial Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/30 text-background hover:bg-background hover:text-foreground"
            >
              <a href={`tel:${PHONE_NUMBER}`}>
                <Phone className="mr-2 h-4 w-4" />
                Talk to a Human
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
