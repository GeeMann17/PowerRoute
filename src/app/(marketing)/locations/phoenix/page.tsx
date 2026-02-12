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
  Sun,
  ThermometerSun,
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
  title: 'White Glove Delivery & Commercial Moving in Phoenix, AZ | PowerRoute',
  description:
    'Phoenix white glove delivery, data center relocation, and commercial moving services. Climate-controlled transport for Arizona heat. Get matched with vetted local providers in minutes.',
  keywords: [
    'white glove delivery phoenix',
    'commercial moving phoenix az',
    'data center relocation phoenix',
    'IT equipment movers phoenix',
    'phoenix freight forwarding',
    'white glove shipping arizona',
  ],
}

const phoenixStats = [
  { value: '2,400+', label: 'Racks Moved in AZ' },
  { value: '45+', label: 'Phoenix Providers' },
  { value: '< 2 hrs', label: 'Local Match Time' },
  { value: '99.8%', label: 'On-Time Delivery' },
]

const localServices = [
  {
    icon: Server,
    title: 'Data Center Relocation',
    description:
      'Phoenix is home to major data center hubs. Our providers specialize in rack migrations, colo moves, and hyperscale deployments across the Valley.',
  },
  {
    icon: Truck,
    title: 'White Glove IT Delivery',
    description:
      'Climate-controlled transport is critical in Arizona. Every shipment rides in temperature-monitored vehicles with shock pallets and live GPS.',
  },
  {
    icon: Building2,
    title: 'Commercial Office Moving',
    description:
      'From downtown Phoenix high-rises to Scottsdale corporate campuses, we match you with commercial movers who minimize downtime.',
  },
  {
    icon: ThermometerSun,
    title: 'Climate-Controlled Storage',
    description:
      'Arizona heat destroys unprotected equipment. Our warehouse partners offer climate-controlled staging and long-term storage.',
  },
]

const phoenixAdvantages = [
  {
    icon: Sun,
    title: 'Arizona Heat Protection',
    description:
      'Phoenix summers hit 115°F+. Every provider in our network uses climate-controlled vehicles and facilities. No exceptions.',
  },
  {
    icon: MapPin,
    title: 'Valley-Wide Coverage',
    description:
      'Phoenix, Scottsdale, Tempe, Mesa, Chandler, Gilbert, Glendale — our providers cover the entire metro area and beyond.',
  },
  {
    icon: Clock,
    title: 'Same-Day Matching',
    description:
      'With 45+ vetted providers in the Phoenix area, we match most projects within 2 hours. Emergency? We expedite.',
  },
  {
    icon: Shield,
    title: 'Security Clearances',
    description:
      'Phoenix hosts government contractors and defense facilities. Our providers carry appropriate clearances for secure environments.',
  },
]

const areasServed = [
  'Downtown Phoenix',
  'Scottsdale',
  'Tempe',
  'Mesa',
  'Chandler',
  'Gilbert',
  'Glendale',
  'Peoria',
  'Surprise',
  'Goodyear',
  'Buckeye',
  'Avondale',
]

const faqs = [
  {
    question: 'How do you handle Phoenix summer heat during transport?',
    answer:
      'All providers in our Phoenix network use climate-controlled vehicles with real-time temperature monitoring. For sensitive IT equipment, we require vehicles maintain 65-75°F regardless of outside temperature. Deliveries are scheduled during cooler hours when possible, and equipment never sits in an un-cooled vehicle.',
  },
  {
    question: 'Do you service the entire Phoenix metro area?',
    answer:
      'Yes. Our provider network covers all of Maricopa County including Phoenix, Scottsdale, Tempe, Mesa, Chandler, Gilbert, Glendale, Peoria, and surrounding areas. We also service Pinal County (Casa Grande, Florence) and can coordinate moves to/from Tucson.',
  },
  {
    question: 'Can you handle data center moves in Phoenix?',
    answer:
      'Absolutely. Phoenix is a major data center hub with facilities from CyrusOne, QTS, EdgeCore, and others. Our providers have completed 2,400+ rack relocations in Arizona and understand the specific requirements of local colos including access protocols, loading dock limitations, and security requirements.',
  },
  {
    question: 'What about government or defense contractor facilities?',
    answer:
      'Phoenix hosts numerous defense contractors and government facilities. We maintain a roster of providers whose crews hold appropriate security clearances (up to TS/SCI) and who are experienced with facility access requirements for secure environments.',
  },
  {
    question: 'How quickly can you match me with a Phoenix provider?',
    answer:
      'Most Phoenix-area projects are matched within 2 hours during business hours. For emergency or time-sensitive projects, we prioritize immediately. With 45+ providers in the metro area, we have depth to handle multiple simultaneous projects.',
  },
]

export default function PhoenixPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b-[3px] border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-widest">
                Phoenix, Arizona
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-hero-fg leading-tight tracking-tight mb-6 font-mono uppercase">
              White Glove Delivery &{' '}
              <span className="brutal-highlight">Commercial Moving in Phoenix</span>
            </h1>

            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed mb-4">
              Arizona&apos;s extreme heat demands specialized handling. PowerRoute connects you
              with pre-vetted Phoenix providers who use climate-controlled transport, shock
              pallets, and chain-of-custody protocols — protecting your equipment from the
              desert sun.
            </p>

            <div className="space-y-2 border-l-4 border-accent pl-4 mb-8">
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                45+ vetted providers across the Valley
              </span>
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                Climate-controlled transport required
              </span>
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                Matched in under 2 hours
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="accent" size="xl">
                <Link href="/quote">
                  Get Matched with Phoenix Providers
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
                  Call Phoenix Team
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
            {phoenixStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center py-6 px-4 ${
                  i < phoenixStats.length - 1 ? 'border-r-2 border-border' : ''
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
              Phoenix Services
            </h2>
            <p className="text-muted-foreground">
              Specialized logistics for the Valley&apos;s unique challenges — from extreme heat
              to data center density.
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

      {/* Why Phoenix */}
      <section className="py-16 md:py-20 bg-section-alt border-y-[3px] border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Why Phoenix Needs Specialized Logistics
            </h2>
            <p className="text-muted-foreground">
              Standard delivery companies aren&apos;t equipped for Arizona conditions. Here&apos;s
              what our Phoenix providers do differently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
            {phoenixAdvantages.map((item) => {
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
              Areas We Serve in Phoenix Metro
            </h2>
            <p className="text-muted-foreground">
              Full coverage across Maricopa County and surrounding areas.
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
                Phoenix FAQs
              </h2>
              <p className="text-muted-foreground">
                Common questions about our Phoenix-area services.
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
            Ready to Move in Phoenix?
          </h2>
          <p className="text-background/70 mb-8 text-lg">
            Get matched with vetted Phoenix-area providers in under 2 hours. Climate-controlled
            transport, background-checked crews, full chain of custody.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="accent" size="xl">
              <Link href="/quote">
                Get Your Free Phoenix Match
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
                Call Phoenix Team
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
