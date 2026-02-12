import Link from 'next/link'
import { Factory, ArrowRight, Heart, Cpu, ShoppingCart, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Industries We Serve | Specialized Logistics | PowerRoute',
  description:
    'PowerRoute provides specialized logistics for healthcare, technology, manufacturing, and retail. Industry-specific expertise for your most critical moves.',
  keywords: [
    'healthcare logistics',
    'technology logistics',
    'manufacturing logistics',
    'retail logistics',
    'industry-specific moving',
  ],
}

const industries = [
  {
    icon: Heart,
    title: 'Healthcare & Medical',
    slug: 'healthcare',
    description:
      'HIPAA-compliant medical equipment moving, hospital relocation, and healthcare IT logistics. MRI, CT, lab equipment specialists.',
    stats: '1,200+ medical moves',
    highlights: ['HIPAA compliant', 'Medical equipment specialists', 'Chain of custody'],
  },
  {
    icon: Cpu,
    title: 'Technology & Data Centers',
    slug: 'technology',
    description:
      'Enterprise IT logistics, data center relocation, server migrations, and tech office moves. Security clearances available.',
    stats: '14,200+ racks relocated',
    highlights: ['Chain of custody', 'Security clearances', 'Minimal downtime'],
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    slug: 'manufacturing',
    description:
      'Heavy equipment, production lines, and industrial machinery. Rigging, millwrighting, and precision placement.',
    stats: 'Coming soon',
    highlights: ['Heavy equipment', 'Rigging & millwright', 'Precision placement'],
    comingSoon: true,
  },
  {
    icon: ShoppingCart,
    title: 'Retail & E-commerce',
    slug: 'retail',
    description:
      'Store fixtures, inventory, and display installations. Multi-location rollouts and white glove last-mile delivery.',
    stats: 'Coming soon',
    highlights: ['Fixture installation', 'Multi-site rollouts', 'Last-mile delivery'],
    comingSoon: true,
  },
]

export default function IndustriesPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b-[3px] border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-widest">
                Industries
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-hero-fg leading-tight tracking-tight mb-6 font-mono uppercase">
              Your Industry Has{' '}
              <span className="brutal-highlight">Unique Requirements.</span>
            </h1>

            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed">
              Generic freight carriers don&apos;t understand HIPAA, chain of custody, or
              calibration requirements. PowerRoute matches you with providers who
              specialize in your industry&apos;s specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-5">
            {industries.map((industry) => {
              const Icon = industry.icon
              return (
                <Card key={industry.slug} className="brutal-hover relative">
                  {industry.comingSoon && (
                    <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold uppercase px-2 py-1 border-2 border-border">
                      Coming Soon
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-accent border-2 border-border flex-shrink-0">
                        <Icon className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-card-foreground uppercase">
                          {industry.title}
                        </h3>
                        <p className="text-sm text-accent font-bold font-mono">
                          {industry.stats}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {industry.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {industry.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {!industry.comingSoon ? (
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/industries/${industry.slug}`}>
                          View {industry.title.split(' ')[0]} Solutions
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-section-alt border-y-[3px] border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono tracking-tight mb-4">
            Don&apos;t See Your Industry?
          </h2>
          <p className="text-muted-foreground mb-8">
            Our provider network spans dozens of specializations. Tell us about your
            specific requirements and we&apos;ll match you with the right expertise.
          </p>

          <Button asChild variant="accent" size="xl">
            <Link href="/quote">
              Describe Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
