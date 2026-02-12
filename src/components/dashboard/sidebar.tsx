'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, ShoppingBag, User, CreditCard, Network } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  {
    label: 'Available Leads',
    href: '/dashboard/leads',
    icon: Search,
  },
  {
    label: 'My Leads',
    href: '/dashboard/my-leads',
    icon: ShoppingBag,
  },
  {
    label: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    label: 'Billing',
    href: '/dashboard/billing',
    icon: CreditCard,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-gray-900 text-white">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-6">
          <Network className="h-7 w-7 text-blue-500" />
          <div>
            <span className="text-lg font-bold">PowerRoute</span>
            <span className="block text-xs text-gray-400">Vendor Portal</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-800 p-3">
          <p className="px-3 py-2 text-xs text-gray-500">
            White Glove Leads
          </p>
        </div>
      </div>
    </aside>
  )
}
