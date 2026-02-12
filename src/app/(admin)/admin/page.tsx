import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  Clock,
  ArrowRight,
  DollarSign,
  BarChart3,
  CheckCircle,
  Phone,
  MessageSquare,
  Globe,
  Trophy,
  Building2,
  ShoppingBag,
} from 'lucide-react'
import { formatPrice } from '@/lib/pricing'
import { format } from 'date-fns'
import type { Lead, LeadStatus } from '@/types/database'

const ALL_STATUSES: LeadStatus[] = ['new', 'enriched', 'vetted', 'available', 'sent_to_vendor', 'vendor_accepted', 'quoted', 'sold', 'won', 'lost', 'expired', 'closed']

const statusLabels: Record<LeadStatus, string> = {
  new: 'New',
  enriched: 'Enriched',
  vetted: 'Vetted',
  available: 'Available',
  sent_to_vendor: 'Sent to Vendor',
  vendor_accepted: 'Vendor Accepted',
  quoted: 'Quoted',
  sold: 'Sold',
  won: 'Won',
  lost: 'Lost',
  expired: 'Expired',
  closed: 'Closed',
}

const statusBarColors: Record<LeadStatus, string> = {
  new: 'bg-blue-500',
  enriched: 'bg-teal-500',
  vetted: 'bg-cyan-500',
  available: 'bg-emerald-500',
  sent_to_vendor: 'bg-yellow-500',
  vendor_accepted: 'bg-orange-500',
  quoted: 'bg-purple-500',
  sold: 'bg-indigo-500',
  won: 'bg-green-500',
  lost: 'bg-gray-400',
  expired: 'bg-red-400',
  closed: 'bg-gray-500',
}

const statusBadgeColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  enriched: 'bg-teal-100 text-teal-800',
  vetted: 'bg-cyan-100 text-cyan-800',
  available: 'bg-emerald-100 text-emerald-800',
  sent_to_vendor: 'bg-yellow-100 text-yellow-800',
  vendor_accepted: 'bg-orange-100 text-orange-800',
  quoted: 'bg-purple-100 text-purple-800',
  sold: 'bg-indigo-100 text-indigo-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-gray-100 text-gray-800',
  expired: 'bg-red-100 text-red-800',
  closed: 'bg-gray-100 text-gray-800',
}

interface DashboardStats {
  todayCount: number
  weekCount: number
  monthCount: number
  totalValue: number
  avgQuote: number
  winRate: number
  statusCounts: Record<LeadStatus, number>
  sourceCounts: Record<string, number>
  recentLeads: Lead[]
  vendorCount: number
  pendingVendorCount: number
  leadRevenue: number
}

async function getStats(): Promise<DashboardStats> {
  const supabase = await createClient()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)

  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)

  // Get all leads for calculations
  const { data: allLeads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  const leads = (allLeads || []) as Lead[]

  // Get vendor count
  const { count: vendorCount } = await supabase
    .from('vendors')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  // Get pending vendor count
  const { count: pendingVendorCount } = await supabase
    .from('vendors')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  // Get lead revenue from completed purchases
  const { data: purchaseData } = await supabase
    .from('lead_purchases')
    .select('price_paid')
    .eq('status', 'completed')

  const leadRevenue = (purchaseData || []).reduce((sum: number, p: { price_paid: number }) => sum + (p.price_paid || 0), 0)

  // Calculate counts
  const todayCount = leads.filter(l => new Date(l.created_at) >= today).length
  const weekCount = leads.filter(l => new Date(l.created_at) >= weekAgo).length
  const monthCount = leads.filter(l => new Date(l.created_at) >= monthAgo).length

  // Calculate total value (sum of quote_high)
  const totalValue = leads.reduce((sum, lead) => sum + (lead.quote_high || 0), 0)

  // Calculate average quote
  const leadsWithQuotes = leads.filter(l => l.quote_high && l.quote_high > 0)
  const avgQuote = leadsWithQuotes.length > 0
    ? leadsWithQuotes.reduce((sum, l) => sum + (l.quote_high || 0), 0) / leadsWithQuotes.length
    : 0

  // Calculate win rate (won / (won + lost))
  const wonCount = leads.filter(l => l.status === 'won').length
  const lostCount = leads.filter(l => l.status === 'lost').length
  const winRate = (wonCount + lostCount) > 0 ? (wonCount / (wonCount + lostCount)) * 100 : 0

  // Count by status
  const statusCounts = {} as Record<LeadStatus, number>
  for (const s of ALL_STATUSES) {
    statusCounts[s] = leads.filter(l => l.status === s).length
  }

  // Count by source
  const sourceCounts: Record<string, number> = {}
  leads.forEach(lead => {
    const source = lead.source || 'form'
    sourceCounts[source] = (sourceCounts[source] || 0) + 1
  })

  return {
    todayCount,
    weekCount,
    monthCount,
    totalValue,
    avgQuote,
    winRate,
    statusCounts,
    sourceCounts,
    recentLeads: leads.slice(0, 10),
    vendorCount: vendorCount || 0,
    pendingVendorCount: pendingVendorCount || 0,
    leadRevenue,
  }
}

const sourceIcons: Record<string, typeof Globe> = {
  form: Globe,
  phone: Phone,
  chat: MessageSquare,
  ai_quote: BarChart3,
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const totalLeads = Object.values(stats.statusCounts).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">PowerRoute lead pipeline overview</p>
      </div>

      {/* Primary Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today&apos;s Leads</CardTitle>
            <Clock className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.todayCount}</div>
            <p className="text-sm text-gray-500 mt-1">leads received today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">This Week</CardTitle>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.weekCount}</div>
            <p className="text-sm text-gray-500 mt-1">leads this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pipeline Value</CardTitle>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{formatPrice(stats.totalValue)}</div>
            <p className="text-sm text-gray-500 mt-1">potential revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Win Rate</CardTitle>
            <Trophy className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.winRate.toFixed(1)}%</div>
            <p className="text-sm text-gray-500 mt-1">{stats.statusCounts.won} won</p>
          </CardContent>
        </Card>
      </div>

      {stats.pendingVendorCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-amber-600" />
            <p className="text-sm text-amber-800">
              <strong>{stats.pendingVendorCount}</strong> vendor application{stats.pendingVendorCount > 1 ? 's' : ''} pending review
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/vendors">Review</Link>
          </Button>
        </div>
      )}

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 7-Stage Pipeline Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Pipeline Funnel
            </CardTitle>
            <CardDescription>7-stage lead pipeline breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ALL_STATUSES.map((status) => {
              const count = stats.statusCounts[status]
              const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0
              return (
                <div key={status} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{statusLabels[status]}</span>
                    <span className="text-gray-500">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${statusBarColors[status]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Source Attribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Lead Sources
            </CardTitle>
            <CardDescription>Where your leads come from</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(stats.sourceCounts).length === 0 ? (
              <p className="text-center text-gray-500 py-8">No lead source data yet</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(stats.sourceCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([source, count]) => {
                    const Icon = sourceIcons[source] || Globe
                    const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0
                    return (
                      <div key={source} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium capitalize">{source.replace('_', ' ')}</p>
                            <p className="text-sm text-gray-500">{percentage.toFixed(1)}% of leads</p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{count}</span>
                      </div>
                    )
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Average Quote</p>
                <p className="text-2xl font-bold text-blue-900">{formatPrice(stats.avgQuote)}</p>
              </div>
              <DollarSign className="h-10 w-10 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Won Deals</p>
                <p className="text-2xl font-bold text-green-900">{stats.statusCounts.won}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Active Vendors</p>
                <p className="text-2xl font-bold text-purple-900">{stats.vendorCount}</p>
              </div>
              <Building2 className="h-10 w-10 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Lead Revenue</p>
                <p className="text-2xl font-bold text-amber-900">{formatPrice(stats.leadRevenue)}</p>
              </div>
              <ShoppingBag className="h-10 w-10 text-amber-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>The last 10 leads submitted</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/leads">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {stats.recentLeads.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No leads yet. They will appear here once submitted.
            </p>
          ) : (
            <div className="space-y-4">
              {stats.recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {lead.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-sm text-gray-500">{lead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {lead.quote_low && lead.quote_high
                          ? `${formatPrice(lead.quote_low)} - ${formatPrice(lead.quote_high)}`
                          : 'No quote'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(lead.created_at), 'MMM d, h:mm a')}
                      </p>
                    </div>
                    <Badge className={statusBadgeColors[lead.status] || ''}>
                      {statusLabels[lead.status as LeadStatus] || lead.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
