import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardHeader } from '@/components/dashboard/header'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/providers/login')
  }

  const { data: vendor } = await supabase
    .from('vendors')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!vendor) {
    redirect('/providers/login')
  }

  if (vendor.status === 'pending') {
    redirect('/providers/pending')
  }

  if (vendor.status === 'rejected' || vendor.status === 'suspended') {
    redirect('/providers/login')
  }

  return (
    <div className="min-h-screen bg-muted">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader companyName={vendor.company_name || vendor.name} />
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
