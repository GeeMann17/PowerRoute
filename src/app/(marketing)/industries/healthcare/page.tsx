import Link from 'next/link'
import {
  Heart,
  ArrowRight,
  Phone,
  CheckCircle,
  Shield,
  FileCheck,
  Lock,
  AlertTriangle,
  ThermometerSun,
  Stethoscope,
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
  title: 'Healthcare & Medical Equipment Logistics | PowerRoute',
  description:
    'HIPAA-compliant medical equipment moving, hospital relocation, and healthcare IT logistics. Specialized handling for MRI, CT, lab equipment. Vetted providers nationwide.',
  keywords: [
    'medical equipment moving',
    'hospital relocation services',
    'healthcare logistics',
    'MRI moving services',
    'HIPAA compliant movers',
    'medical device transport',
    'lab equipment relocation',
  ],
}

const healthcareStats = [
  { value: '1,200+', label: 'Medical Moves' },
  { value: '85+', label: 'Healthcare Providers' },
  { value: '100%', label: 'HIPAA Compliant' },
  { value: '0', label: 'Compliance Failures' },
]

const equipmentTypes = [
  {
    icon: Stethoscope,
    title: 'Diagnostic Imaging',
    description:
      'MRI, CT, PET, X-ray, and ultrasound equipment. Specialized rigging, climate control, and calibration-aware handling.',
  },
  {
    icon: Heart,
    title: 'Patient Care Equipment',
    description:
      'Hospital beds, surgical tables, patient monitors, and life support systems. White glove delivery to patient floors.',
  },
  {
    icon: ThermometerSun,
    title: 'Laboratory Equipment',
    description:
      'Centrifuges, analyzers, freezers, and sensitive lab instruments. Temperature-controlled transport with chain of custody.',
  },
  {
    icon: Shield,
    title: 'IT & Medical Records',
    description:
      'PACS servers, EMR systems, and medical imaging archives. HIPAA-compliant handling with certified data destruction.',
  },
]

const complianceFeatures = [
  {
    icon: Lock,
    title: 'HIPAA Compliance',
    description:
      'Every provider in our healthcare network is trained in HIPAA requirements. Protected health information (PHI) is never exposed during transport.',
  },
  {
    icon: FileCheck,
    title: 'Chain of Custody Documentation',
    description:
      'Serialized inventory, tamper-evident seals, and timestamped handoffs. Full documentation for your compliance team.',
  },
  {
    icon: Shield,
    title: 'Background-Checked Crews',
    description:
      'Every crew member is background-checked and trained for healthcare environments. No unauthorized facility access.',
  },
  {
    icon: ThermometerSun,
    title: 'Climate-Controlled Transport',
    description:
      'Medical equipment and pharmaceuticals require precise environmental control. Real-time temperature monitoring.',
  },
]

const risks = [
  {
    icon: AlertTriangle,
    title: 'HIPAA Violations',
    description:
      'Patient data on unwiped drives. PHI visible during transport. A single violation can trigger OCR investigation and six-figure fines.',
  },
  {
    icon: AlertTriangle,
    title: 'Equipment Damage',
    description:
      'An MRI magnet damaged in transit costs $500K+. CT scanners, PET machines, and lab equipment are similarly fragile and expensive.',
  },
  {
    icon: AlertTriangle,
    title: 'Calibration Loss',
    description:
      'Diagnostic equipment requires precise calibration. Improper handling can throw off calibration, requiring expensive recertification.',
  },
]

const useCases = [
  'Hospital relocations & expansions',
  'Imaging center buildouts',
  'Lab equipment installations',
  'Medical office moves',
  'Equipment decommissioning',
  'IT infrastructure migrations',
  'Pharmaceutical logistics',
  'Clinical trial equipment',
]

const faqs = [
  {
    question: 'Are your providers HIPAA compliant?',
    answer:
      'Yes. Every provider in our healthcare network has completed HIPAA training and understands the requirements for handling protected health information (PHI). We provide Business Associate Agreements (BAAs) upon request, and all moves involving patient data follow strict chain of custody protocols.',
  },
  {
    question: 'Can you move MRI and CT equipment?',
    answer:
      'Absolutely. Our healthcare providers include specialized medical equipment movers with experience in diagnostic imaging. This includes MRI systems (with proper quench planning), CT scanners, PET machines, X-ray equipment, and ultrasound systems. We coordinate with OEM service teams for deinstallation and reinstallation.',
  },
  {
    question: 'How do you handle medical IT systems with patient data?',
    answer:
      'Medical IT systems containing PHI require special handling. Our providers follow strict protocols: drives are never removed from systems without authorization, all equipment is sealed with tamper-evident packaging, and chain of custody is documented at every step. For decommissioned equipment, we offer NIST 800-88 compliant data destruction with Certificates of Destruction.',
  },
  {
    question: 'Do you handle pharmaceutical and temperature-sensitive shipments?',
    answer:
      'Yes. Our healthcare logistics providers include those with cold chain capabilities for pharmaceuticals, biologics, and temperature-sensitive materials. Vehicles are equipped with real-time temperature monitoring, and we can maintain specific temperature ranges throughout transport.',
  },
  {
    question: 'Can you work with our equipment vendors and service teams?',
    answer:
      'Absolutely. Healthcare equipment moves often require coordination with OEM service teams (GE, Siemens, Philips, etc.) for proper deinstallation and reinstallation. Our providers are experienced in this coordination and can work alongside your vendor teams.',
  },
  {
    question: 'What documentation do you provide for compliance audits?',
    answer:
      'We provide comprehensive documentation including: detailed inventory with serial numbers, timestamped chain of custody records, photographic evidence of condition, tamper-evident seal tracking, and Certificates of Destruction for any data-bearing devices. All documentation is audit-ready.',
  },
]

export default function HealthcarePage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b-[3px] border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-widest">
                Healthcare & Medical
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-hero-fg leading-tight tracking-tight mb-6 font-mono uppercase">
              Medical Equipment Deserves{' '}
              <span className="brutal-highlight">Medical-Grade Logistics</span>
            </h1>

            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed mb-4">
              MRI machines, CT scanners, lab equipment, and medical IT systems require specialized
              handling that general freight carriers can&apos;t provide. PowerRoute connects you with
              HIPAA-compliant providers who understand healthcare logistics.
            </p>

            <div className="space-y-2 border-l-4 border-accent pl-4 mb-8">
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                HIPAA-compliant, background-checked crews
              </span>
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                Specialized medical equipment handling
              </span>
              <span className="flex items-center gap-2 text-sm text-hero-fg/60">
                <CheckCircle className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                Full chain of custody documentation
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="accent" size="xl">
                <Link href="/quote">
                  Get Matched with Healthcare Providers
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
                  Talk to Healthcare Team
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
            {healthcareStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center py-6 px-4 ${
                  i < healthcareStats.length - 1 ? 'border-r-2 border-border' : ''
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
              The Cost of Getting Healthcare Logistics Wrong
            </h2>
            <p className="text-muted-foreground">
              Medical equipment and patient data require specialized handling. The risks of
              using unqualified movers are severe.
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
              Our healthcare providers specialize in every category of medical equipment.
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

      {/* Compliance */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-3">
              Healthcare Compliance Built In
            </h2>
            <p className="text-muted-foreground">
              Every provider in our healthcare network meets strict compliance requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
            {complianceFeatures.map((item) => {
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
              Healthcare Use Cases
            </h2>
            <p className="text-muted-foreground">
              Common projects our healthcare providers handle.
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
                Healthcare Logistics FAQs
              </h2>
              <p className="text-muted-foreground">
                Common questions about our healthcare moving services.
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
          <Heart className="h-10 w-10 text-accent mx-auto mb-6" />

          <h2 className="text-3xl md:text-4xl font-black uppercase font-mono tracking-tight mb-4">
            Your Medical Equipment Deserves Specialized Care
          </h2>
          <p className="text-background/70 mb-8 text-lg">
            Get matched with HIPAA-compliant healthcare logistics providers. Full documentation
            for your compliance team. Zero risk to patient data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="accent" size="xl">
              <Link href="/quote">
                Get Your Healthcare Match
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
                Talk to Healthcare Team
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
