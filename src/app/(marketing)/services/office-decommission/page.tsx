import Link from 'next/link'
import {
  Building2,
  ArrowRight,
  Phone,
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap,
  DollarSign,
  FileCheck,
  Lock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

export const metadata = {
  title: 'Office IT Decommission Services | PowerRoute',
  description:
    'Complete IT removal during office relocations, closures, or consolidations. Workstations, networking, telecom, and security systems — fully documented.',
}

const pain_points = [
  {
    icon: Clock,
    title: 'Lease Deadline Pressure',
    description:
      'Your lease expires in 30 days and there are 200 workstations, 4 server closets, and a telecom room that need to be completely stripped. Every day past the deadline costs you holdover rent.',
  },
  {
    icon: AlertTriangle,
    title: 'Data Left Behind',
    description:
      'Drives in workstations, printers with stored documents, phones with call logs. If your decommission crew doesn\'t handle data destruction, your company\'s data walks out the door.',
  },
  {
    icon: DollarSign,
    title: 'Wasted Asset Value',
    description:
      'Companies routinely abandon or improperly dispose of equipment that still has resale value. A proper decommission recovers value instead of sending it to a landfill.',
  },
]

const scope = [
  { item: 'Workstations & monitors', detail: 'Desktops, laptops, docking stations, peripherals' },
  { item: 'Networking equipment', detail: 'Switches, routers, WAPs, patch panels, cabling' },
  { item: 'Server closets & racks', detail: 'Servers, UPS systems, PDUs, rack hardware' },
  { item: 'Telecom systems', detail: 'PBX, VoIP phones, conference room AV equipment' },
  { item: 'Security systems', detail: 'Cameras, access control panels, badge readers' },
  { item: 'Printers & copiers', detail: 'Including hard drive sanitization for stored documents' },
]

export default function OfficeDecommissionPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                Office IT Decommission
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hero-fg leading-tight tracking-tight mb-6">
              Your Lease Expires in 30 Days.{' '}
              <span className="text-primary">200 Workstations Need to Disappear.</span>
            </h1>

            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed mb-8">
              Office closures, relocations, and consolidations require complete IT removal —
              not just the servers, but every workstation, cable, phone, camera, and printer.
              PowerRoute matches you with decommission crews who strip it clean, document
              everything, and handle data destruction so nothing gets left behind.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-sm font-semibold">
                <Link href="/quote">
                  Get Matched with a Decommission Provider
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

      {/* Pain Points */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Why Office Decommissions Go Sideways
            </h2>
            <p className="text-muted-foreground">
              IT teams get handed the decommission project on top of everything else they&apos;re
              doing. Here&apos;s what usually goes wrong.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {pain_points.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} className="border-border border-destructive/20">
                  <CardContent className="p-5">
                    <div className="p-2.5 bg-destructive/10 rounded-lg w-fit mb-3">
                      <Icon className="h-5 w-5 text-destructive" />
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

      {/* Scope */}
      <section className="py-16 md:py-20 bg-section-alt border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Everything Goes. Nothing Gets Missed.
            </h2>
            <p className="text-muted-foreground">
              Our matched providers handle the full scope of office IT — not just the obvious stuff.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {scope.map((item) => (
              <div key={item.item} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-card-foreground">{item.item}</div>
                  <div className="text-xs text-muted-foreground">{item.detail}</div>
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
            Don&apos;t Let Your Decommission Become a Fire Drill
          </h2>
          <p className="text-muted-foreground mb-8">
            Tell us your timeline, location, and scope. We&apos;ll match you with a decommission
            provider who can strip the space clean — on schedule and fully documented.
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
              <Lock className="h-3.5 w-3.5" /> Data destruction included
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Matched in under 2 hours
            </span>
            <span className="flex items-center gap-1.5">
              <FileCheck className="h-3.5 w-3.5" /> Full documentation
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
