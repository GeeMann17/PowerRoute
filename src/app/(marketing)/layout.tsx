import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { DevThemeSwitcher } from '@/components/dev-theme-switcher'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <DevThemeSwitcher />
    </div>
  )
}
