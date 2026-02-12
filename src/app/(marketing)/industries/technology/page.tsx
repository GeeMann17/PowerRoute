import Link from 'next/link'
import {
  Cpu,
  ArrowRight,
  Phone,
  CheckCircle,
  Shield,
  FileCheck,
  Server,
  Lock,
  AlertTriangle,
  Zap,
  HardDrive,
  Network,
  Building2,
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
  title: 'Technology & Data Center Logistics | PowerRoute',
  description:
    'Enterprise IT logistics, data center relocation, server migrations, and tech office moves. Specialized handling for sensitive equipment. Vetted providers nationwide.',
  keywords: [
    'data center relocation',
    'server migration services',
    'IT equipment moving',
    'tech office relocation',
    'enterprise IT logistics',
    'colocation move',
    'rack relocation',
  ],
}

const techStats = [
  { value: '14,200+', label: 'Racks Relocated' },
  { value: '120+', label: 'Tech Providers' },
  { value: '99.7%', label: 'Asset Accuracy' },
  { value: '< 10 min', label: 'Match Time' },
]

const equipmentTypes = [
  {
    icon: Server,
    title: 'Data Center Equipment',
    description:
      'Full rack migrations, blade chassis, storage arrays, and network infrastructure. Shock pallets, climate control, and rack & stack installation.',
  },
  {
    icon: HardDrive,
    title: 'Enterprise Servers',
    description:
      'Dell, HP, IBM, SuperMicro, and custom builds. Proper ESD handling, vibration protection, and temperature control throughout transit.',
  },
  {
    icon: Network,
    title: 'Network Infrastructure',
    description:
      'Switches, routers, firewalls, and cabling. Coordinated decommission and recommission with your network team.',
  },
  {
    icon: Building2,
    title: 'Tech Office Equipment',
    description:
      'Workstations, monitors, AV equipment, and tech lab setups. White glove delivery and installation at your new facility.',
  },
]

const securityFeatures = [
  {
    icon: Lock,
    title: 'Chain of Custody',
    description:
      'Serial-number inventory at pickup, tamper-evident seals, GPS tracking, and verified handoff with timestamps. 100% asset accountability.',
  },
  {
    icon: Shield,
    title: 'Security Clearances',
    description:
      'For classified or high-security environments, we match providers whose crews hold appropriate clearances (up to TS/SCI).',
  },
  {
    icon: FileCheck,
    title: 'Data Destruction',
    description:
      'NIST 800-88 compliant media sanitization. Serialized Certificates of Destruction for every data-bearing device.',
  },
  {
    icon: Zap,
    title: 'Minimal Downtime',
    description:
      'Weekend and after-hours moves. Parallel infrastructure builds. Cutover planning to minimize business disruption.',
  },
]

const risks = [
  {
    icon: AlertTriangle,
    title: 'Data Breach',
    description:
      'Drives removed by uncertified crews. Equipment delivered to wrong location. Chain of custody breaks expose your data to unauthorized access.',
  },
  {
    icon: AlertTriangle,
    title: 'Equipment Damage',
    description:
      'A fully populated 42U rack weighs 2,000+ lbs. Standard freight handling destroys sensitive components. One vibration event can corrupt drives.',
  },
  {
    icon: AlertTriangle,
    title: 'Extended Downtime',
    description:
      'Inexperienced crews take 3x longer. Missing documentation delays cutover. Poor planning turns a weekend migration into a week-long outage.',
  },
]

const useCases = [
  'Data center migrations',
  'Colo facility moves',
  'Office tech relocations',
  'Lab equipment moves',
  'Disaster recovery sites',
  'Edge deployments',
  'Equipment decommission',
  'Hardware refresh rollouts',
]

const faqs = [
  {
    question: 'How do you ensure chain of custody for IT equipment?',
    answer:
      'Every provider follows our standardized chain of custody protocol: serial number inventory at pickup using barcode scanning, tamper-evident seals on every container and rack, live GPS tracking throughout transit, and verified handoff with timestamps and signatures at delivery. If a seal is broken or a scan is missed, our system flags it immediately. We maintain a 99.7% asset accuracy rate across 14,200+ rack moves.',
  },
  {
    question: 'Can you handle data center migrations with minimal downtime?',
    answer:
      'Yes. Our providers specialize in migration planning to minimize business disruption. This includes weekend and after-hours moves, parallel infrastructure builds, phased migrations, and detailed cutover planning. Many of our providers can complete a full rack migration with less than 4 hours of downtime.',
  },
  {
    question: 'Do your providers have experience with major colocation facilities?',
    answer:
      'Absolutely. Our providers have completed moves at Equinix, Digital Realty, CyrusOne, QTS, CoreSite, DataBank, and dozens of other colocation facilities nationwide. They understand specific access protocols, loading dock limitations, and security requirements for each facility.',
  },
  {
    question: 'How do you handle classified or high-security environments?',
    answer:
      'For classified environments, we match providers whose crews hold appropriate security clearances (up to TS/SCI) and who are experienced with facility access protocols for secure environments. We handle SCIF environments, government data centers, and financial institutions regularly.',
  },
  {
    question: 'What about data destruction for decommissioned equipment?',
    answer:
      'We offer NIST 800-88 compliant media sanitization through certified ITAD providers in our network. Every data-bearing device receives a serialized Certificate of Destruction, and we can provide on-site destruction for sensitive environments. Our providers hold NAID AAA, R2, and e-Stewards certifications.',
  },
  {
    question: 'Can you coordinate with our IT team during the move?',
    answer:
      'Yes. Our providers work alongside your IT team for proper equipment labeling, cable management, and power-on verification. They understand the importance of coordination for server migrations and can follow your specific procedures for shutdown, transport, and recommission.',
  },
]

export default function TechnologyPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b-[3px] border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="h-5 w-5 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-widest">
                Technology & Data Centers
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-hero-fg leading-tight tracking-tight mb-6 font-mono uppercase">
              Your Infrastructure is Worth Millions.{' '}
              <span className="brutal-highlight">Move It Like It.</span>
            </h1>

            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed mb-4">
              Data centers, server rooms, and tech facilities require specialized logistics
              that general freight carriers can&apos;t provide. PowerRoute connects you with
              providers who understand chain of custody, vibration sensitivity, and
              the cost of downtime.
            </p>

            <div className="space-y-2 border-l-4 border-accent pl-4 mb-8">
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                14,200+ racks relocated — zero lost assets
              </span>
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                Shock pallets, climate control, GPS tracking
              </span>
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                Security clearances available
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="accent" size="xl">
                <Link href="/quote">
                  Get Matched with Tech Providers
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
                  Talk to Tech Team
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
            {techStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center py-6 px-4 ${
                  i < techStats.length - 1 ? 'border-r-2 border-border' : ''
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

      {/* Risks */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              The Real Cost of Using a General Freight Carrier
            </h2>
            <p className="text-muted-foreground">
              Your IT infrastructure requires specialized handling. Here&apos;s what&apos;s at risk
              when you use unqualified movers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {risks.map((risk) => {
              const Icon = risk.icon
              return (
                <Card key={risk.title} className="border-destructive/20">
                  <CardContent className="p-5">
                    <div className="p-2.5 bg-destructive/10 rounded-lg w-fit mb-3">
                      <Icon className="h-5 w-5 text-destructive" />
                    </div>
                    <h3 className="text-base font-black text-card-foreground uppercase mb-1.5">
                      {risk.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {risk.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Equipment Types */}
      <section className="py-16 md:py-20 bg-section-alt border-y-[3px] border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Equipment We Move
            </h2>
            <p className="text-muted-foreground">
              Our technology providers specialize in every category of IT equipment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {equipmentTypes.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} className="brutal-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent border-2 border-border flex-shrink-0">
                        <Icon className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-card-foreground uppercase mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
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

      {/* Security Features */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Enterprise-Grade Security
            </h2>
            <p className="text-muted-foreground">
              Every provider in our technology network meets strict security requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
            {securityFeatures.map((item) => {
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

      {/* Use Cases */}
      <section className="py-16 md:py-20 bg-section-alt border-y-[3px] border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Technology Use Cases
            </h2>
            <p className="text-muted-foreground">
              Common projects our technology providers handle.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
            {useCases.map((useCase) => (
              <div
                key={useCase}
                className="flex items-center gap-2 p-3 bg-card border-2 border-border text-sm font-medium"
              >
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                {useCase}
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
                Technology Logistics FAQs
              </h2>
              <p className="text-muted-foreground">
                Common questions about our IT and data center services.
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
          <Server className="h-10 w-10 text-accent mx-auto mb-6" />

          <h2 className="text-3xl md:text-4xl font-black uppercase font-mono tracking-tight mb-4">
            Your Infrastructure Deserves Better
          </h2>
          <p className="text-background/70 mb-8 text-lg">
            Get matched with IT logistics providers who understand chain of custody,
            vibration sensitivity, and the cost of downtime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="accent" size="xl">
              <Link href="/quote">
                Get Your Technology Match
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
                Talk to Tech Team
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
