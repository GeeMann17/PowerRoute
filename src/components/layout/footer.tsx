import Link from 'next/link'
import { Network, Phone, Mail } from 'lucide-react'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

const footerLinks = {
  services: [
    { label: 'Data Center Relocation', href: '/services/data-center-relocation' },
    { label: 'IT Asset Disposition', href: '/services/itad' },
    { label: 'Asset Recovery', href: '/services/asset-recovery' },
    { label: 'Office IT Decommission', href: '/services/office-decommission' },
    { label: 'White Glove Delivery', href: '/services/white-glove-delivery' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Resources', href: '/blog' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'FAQ', href: '/#faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background border-t-[3px] border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Network className="h-7 w-7 text-accent" />
              <span className="text-xl font-black uppercase tracking-tight font-mono">
                PowerRoute
              </span>
            </Link>
            <p className="text-sm text-background/70">
              Enterprise IT logistics matching platform. Pre-vetted, certified providers for data center relocations, ITAD, and white glove IT services.
            </p>
            <div className="space-y-2 text-sm">
              <a href={`tel:${PHONE_NUMBER}`} className="flex items-center space-x-2 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                <span>{PHONE_NUMBER}</span>
              </a>
              <a href="mailto:info@powerroute.com" className="flex items-center space-x-2 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@powerroute.com</span>
              </a>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {['R2', 'e-Stewards', 'NAID AAA', 'SOC 2'].map((cert) => (
                <span
                  key={cert}
                  className="text-xs font-bold uppercase px-2 py-1 border-2 border-current/30"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-black uppercase tracking-wider text-sm mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-black uppercase tracking-wider text-sm mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-black uppercase tracking-wider text-sm mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t-2 border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-background/60">
              &copy; {new Date().getFullYear()} PowerRoute. All rights reserved.
            </p>
            <p className="text-xs text-background/40 font-bold uppercase tracking-wider">
              R2 Certified | NAID AAA | SOC 2 Type II | NIST 800-88
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
