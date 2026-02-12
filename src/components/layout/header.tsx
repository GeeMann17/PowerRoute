'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Phone, Menu, Network, ChevronDown, Server, Truck, PackageSearch, Building2, Recycle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MobileNav } from './mobile-nav'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

const serviceLinks = [
  { label: 'Data Center Relocation', href: '/services/data-center-relocation', icon: Server },
  { label: 'White Glove Delivery', href: '/services/white-glove-delivery', icon: Truck },
  { label: 'IT Asset Recovery', href: '/services/asset-recovery', icon: PackageSearch },
  { label: 'Office IT Decommission', href: '/services/office-decommission', icon: Building2 },
  { label: 'IT Asset Disposition', href: '/services/itad', icon: Recycle },
]

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
]

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b-[3px] border-border bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Network className="h-7 w-7 text-accent" />
            <span className="text-xl font-black text-foreground uppercase tracking-tight font-mono">
              PowerRoute
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Services
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-card border-2 border-border brutal-shadow py-2 z-50">
                  {serviceLinks.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/#faq"
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="hidden lg:flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-foreground hover:text-accent"
            >
              <Phone className="h-4 w-4" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <Button asChild variant="accent" size="sm" className="hidden sm:inline-flex">
              <Link href="/quote">Get Quote</Link>
            </Button>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        navItems={navItems}
      />
    </>
  )
}
