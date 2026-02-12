'use client'

import Link from 'next/link'
import { X, Phone, Network } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  navItems: { label: string; href: string }[]
}

export function MobileNav({ isOpen, onClose, navItems }: MobileNavProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l-[3px] border-border">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-border">
            <Link href="/" className="flex items-center space-x-2" onClick={onClose}>
              <Network className="h-7 w-7 text-accent" />
              <span className="text-lg font-black text-foreground uppercase tracking-tight font-mono">
                PowerRoute
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 text-lg font-bold uppercase tracking-wide text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Footer CTAs */}
          <div className="p-4 border-t-2 border-border space-y-3">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-center space-x-2 py-3 font-bold uppercase tracking-wide text-foreground hover:text-accent"
            >
              <Phone className="h-5 w-5" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <Button asChild variant="accent" className="w-full" size="lg">
              <Link href="/quote" onClick={onClose}>
                Get Free Quote
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
