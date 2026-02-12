import Link from 'next/link'
import {
  MapPin,
  ArrowRight,
  Phone,
  CheckCircle,
  Building2,
  Server,
  Truck,
  Clock,
  Shield,
  Zap,
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
  title: 'White Glove Delivery & Commercial Moving in Dallas-Fort Worth | PowerRoute',
  description:
    'Dallas white glove delivery, data center relocation, and commercial moving services. DFW metro coverage with vetted local providers. Get matched in minutes.',
  keywords: [
    'white glove delivery dallas',
    'commercial moving dallas tx',
    'data center relocation dallas',
    'IT equipment movers dfw',
    'dallas freight forwarding',
    'white glove shipping texas',
  ],
}

const dallasStats = [
  { value: '3,100+', label: 'Racks Moved in DFW' },
  { value: '60+', label: 'Dallas Providers' },
  { value: '< 2 hrs', label: 'Local Match Time' },
  { value: '99.6%', label: 'On-Time Delivery' },
]

const localServices = [
  {
    icon: Server,
    title: 'Data Center Relocation',
    description:
      'Dallas is a top 5 data center market. Our providers handle migrations for Digital Realty, CyrusOne, QTS, and enterprise facilities across the Metroplex.',
  },
  {
    icon: Truck,
    title: 'White Glove IT Delivery',
    description:
      'From downtown Dallas to the telecom corridor, our providers deliver sensitive IT equipment with shock pallets, climate control, and live GPS tracking.',
  },
  {
    icon: Building2,
    title: 'Commercial Office Moving',
    description:
      'Uptown, Deep Ellum, Las Colinas, Legacy West — we match you with commercial movers experienced in DFW\'s unique building requirements.',
  },
  {
    icon: Zap,
    title: 'Emergency & After-Hours',
    description:
      'Texas business never stops. Our Dallas providers offer 24/7 availability for emergency moves and after-hours installations.',
  },
]

const dallasAdvantages = [
  {
    icon: Server,
    title: 'Data Center Hub',
    description:
      'Dallas-Fort Worth is one of the largest data center markets in the world. Our providers specialize in colo moves and enterprise migrations.',
  },
  {
    icon: MapPin,
    title: 'Full DFW Coverage',
    description:
      'Dallas, Fort Worth, Arlington, Plano, Frisco, Irving, Richardson, Carrollton — complete Metroplex coverage.',
  },
  {
    icon: Clock,
    title: 'Rapid Response',
    description:
      'With 60+ vetted providers in DFW, we match most projects within 2 hours. Same-day service available.',
  },
  {
    icon: Shield,
    title: 'Corporate HQ Experience',
    description:
      'Dallas hosts dozens of Fortune 500 HQs. Our providers understand enterprise security and compliance requirements.',
  },
]

const areasServed = [
  'Downtown Dallas',
  'Uptown',
  'Fort Worth',
  'Arlington',
  'Plano',
  'Frisco',
  'Irving',
  'Las Colinas',
  'Richardson',
  'Carrollton',
  'Addison',
  'McKinney',
]

const faqs = [
  {
    question: 'Do you cover the entire Dallas-Fort Worth Metroplex?',
    answer:
      'Yes. Our provider network covers all of the DFW Metroplex including Dallas, Fort Worth, Arlington, Plano, Frisco, Irving, Richardson, Carrollton, and surrounding areas. We also coordinate moves to/from Austin, Houston, and San Antonio.',
  },
  {
    question: 'What data center facilities do your providers serve in Dallas?',
    answer:
      'Our providers have completed moves at major Dallas data centers including Digital Realty, CyrusOne, QTS, DataBank, Stream Data Centers, and numerous enterprise facilities. They understand specific access protocols, loading dock limitations, and security requirements for each facility.',
  },
  {
    question: 'Can you handle corporate headquarters relocations?',
    answer:
      'Absolutely. Dallas hosts AT&T, Texas Instruments, Southwest Airlines, and dozens of other major corporate headquarters. Our providers are experienced with large-scale office relocations, executive floor moves, and projects requiring strict security and discretion.',
  },
  {
    question: 'Do you offer after-hours or weekend moves in Dallas?',
    answer:
      'Yes. Many of our Dallas providers offer 24/7 availability for after-hours installations, weekend moves, and emergency projects. This is especially useful for data center work where downtime must be minimized.',
  },
  {
    question: 'How quickly can you match me with a Dallas provider?',
    answer:
      'Most Dallas-area projects are matched within 2 hours during business hours. For emergency or time-sensitive projects, we prioritize immediately. With 60+ providers in the metro area, we have capacity for large and complex projects.',
  },
]

export default function DallasPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b-[3px] border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-widest">
                Dallas-Fort Worth, Texas
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-hero-fg leading-tight tracking-tight mb-6 font-mono uppercase">
              White Glove Delivery &{' '}
              <span className="brutal-highlight">Commercial Moving in Dallas</span>
            </h1>

            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed mb-4">
              Dallas-Fort Worth is a major data center and corporate hub. PowerRoute connects
              you with pre-vetted DFW providers who specialize in enterprise moves, data center
              migrations, and white glove IT delivery across the Metroplex.
            </p>

            <div className="space-y-2 border-l-4 border-accent pl-4 mb-8">
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                60+ vetted providers across DFW
              </span>
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                3,100+ racks relocated in the market
              </span>
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                24/7 availability for urgent projects
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="accent" size="xl">
                <Link href="/quote">
                  Get Matched with Dallas Providers
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
                  Call Dallas Team
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
            {dallasStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center py-6 px-4 ${
                  i < dallasStats.length - 1 ? 'border-r-2 border-border' : ''
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
              Dallas Services
            </h2>
            <p className="text-muted-foreground">
              Specialized logistics for one of America&apos;s most dynamic business markets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {localServices.map((service) => {
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

      {/* Why Dallas */}
      <section className="py-16 md:py-20 bg-section-alt border-y-[3px] border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Why Choose PowerRoute for Dallas Moves
            </h2>
            <p className="text-muted-foreground">
              Deep local expertise in one of America&apos;s fastest-growing tech and business hubs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
            {dallasAdvantages.map((item) => {
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

      {/* Areas Served */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Areas We Serve in Dallas-Fort Worth
            </h2>
            <p className="text-muted-foreground">
              Full coverage across the Metroplex.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl">
            {areasServed.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 p-3 bg-card border-2 border-border text-sm font-medium"
              >
                <MapPin className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-section-alt border-y-[3px] border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
                Dallas FAQs
              </h2>
              <p className="text-muted-foreground">
                Common questions about our Dallas-Fort Worth services.
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
          <MapPin className="h-10 w-10 text-accent mx-auto mb-6" />

          <h2 className="text-3xl md:text-4xl font-black uppercase font-mono tracking-tight mb-4">
            Ready to Move in Dallas?
          </h2>
          <p className="text-background/70 mb-8 text-lg">
            Get matched with vetted Dallas-area providers in under 2 hours. Enterprise-grade
            handling, background-checked crews, full chain of custody.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="accent" size="xl">
              <Link href="/quote">
                Get Your Free Dallas Match
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
                Call Dallas Team
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
