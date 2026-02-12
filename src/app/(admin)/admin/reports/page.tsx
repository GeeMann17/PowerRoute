import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { formatPrice } from '@/lib/pricing'
import { format, subDays, startOfDay, endOfDay, eachDayOfInterval } from 'date-fns'
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

const statusColors: Record<LeadStatus, string> = {
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

const jobTypeLabels: Record<string, string> = {
  data_center_relocation: 'DC Relocation',
  itad: 'ITAD',
  asset_recovery: 'Asset Recovery',
  office_decommission: 'Office Decommission',
  equipment_delivery: 'Equipment Delivery',
}

const jobTypeColors: Record<string, { bg: string; text: string; badge: string }> = {
  data_center_relocation: { bg: 'bg-blue-50', text: 'text-blue-900', badge: 'text-blue-600' },
  itad: { bg: 'bg-green-50', text: 'text-green-900', badge: 'text-green-600' },
  asset_recovery: { bg: 'bg-purple-50', text: 'text-purple-900', badge: 'text-purple-600' },
  office_decommission: { bg: 'bg-orange-50', text: 'text-orange-900', badge: 'text-orange-600' },
  equipment_delivery: { bg: 'bg-cyan-50', text: 'text-cyan-900', badge: 'text-cyan-600' },
}

async function getReportData() {
  const supabase = await createClient()

  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  const allLeads = (leads || []) as Lead[]

  const today = new Date()
  const thirtyDaysAgo = subDays(today, 30)
  const sixtyDaysAgo = subDays(today, 60)

  const currentPeriodLeads = allLeads.filter(
    (l) => new Date(l.created_at) >= thirtyDaysAgo
  )

  const previousPeriodLeads = allLeads.filter(
    (l) => new Date(l.created_at) >= sixtyDaysAgo && new Date(l.created_at) < thirtyDaysAgo
  )

  const currentLeadCount = currentPeriodLeads.length
  const previousLeadCount = previousPeriodLeads.length
  const leadGrowth = previousLeadCount > 0
    ? ((currentLeadCount - previousLeadCount) / previousLeadCount) * 100
    : 100

  const currentValue = currentPeriodLeads.reduce((sum, l) => sum + (l.quote_high || 0), 0)
  const previousValue = previousPeriodLeads.reduce((sum, l) => sum + (l.quote_high || 0), 0)
  const valueGrowth = previousValue > 0
    ? ((currentValue - previousValue) / previousValue) * 100
    : 100

  const currentWon = currentPeriodLeads.filter((l) => l.status === 'won').length
  const currentLost = currentPeriodLeads.filter((l) => l.status === 'lost').length
  const currentWinRate = (currentWon + currentLost) > 0
    ? (currentWon / (currentWon + currentLost)) * 100
    : 0

  const previousWon = previousPeriodLeads.filter((l) => l.status === 'won').length
  const previousLost = previousPeriodLeads.filter((l) => l.status === 'lost').length
  const previousWinRate = (previousWon + previousLost) > 0
    ? (previousWon / (previousWon + previousLost)) * 100
    : 0
  const winRateGrowth = previousWinRate > 0
    ? ((currentWinRate - previousWinRate) / previousWinRate) * 100
    : 0

  // Daily leads for chart
  const last14Days = eachDayOfInterval({
    start: subDays(today, 13),
    end: today,
  })

  const dailyLeads = last14Days.map((day) => {
    const dayStart = startOfDay(day)
    const dayEnd = endOfDay(day)
    const count = allLeads.filter((l) => {
      const created = new Date(l.created_at)
      return created >= dayStart && created <= dayEnd
    }).length
    return {
      date: format(day, 'MMM d'),
      count,
    }
  })

  // Status breakdown
  const statusBreakdown = {} as Record<LeadStatus, number>
  for (const s of ALL_STATUSES) {
    statusBreakdown[s] = allLeads.filter((l) => l.status === s).length
  }

  // Source counts
  const sourceCounts: Record<string, number> = {}
  allLeads.forEach((lead) => {
    const source = lead.source || 'form'
    sourceCounts[source] = (sourceCounts[source] || 0) + 1
  })

  // Job type breakdown
  const jobTypeBreakdown: Record<string, number> = {}
  allLeads.forEach((lead) => {
    const jt = lead.job_type || 'unspecified'
    jobTypeBreakdown[jt] = (jobTypeBreakdown[jt] || 0) + 1
  })

  return {
    currentLeadCount,
    leadGrowth,
    currentValue,
    valueGrowth,
    currentWinRate,
    winRateGrowth,
    dailyLeads,
    statusBreakdown,
    sourceCounts,
    jobTypeBreakdown,
    totalLeads: allLeads.length,
  }
}

export default async function ReportsPage() {
  const data = await getReportData()
  const maxDailyCount = Math.max(...data.dailyLeads.map((d) => d.count), 1)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500 mt-1">Analytics and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
              Leads (30 days)
              <Users className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.currentLeadCount}</div>
            <div className={`flex items-center text-sm mt-1 ${data.leadGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.leadGrowth >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {Math.abs(data.leadGrowth).toFixed(1)}% vs previous 30 days
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
              Pipeline Value (30 days)
              <DollarSign className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatPrice(data.currentValue)}</div>
            <div className={`flex items-center text-sm mt-1 ${data.valueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.valueGrowth >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {Math.abs(data.valueGrowth).toFixed(1)}% vs previous 30 days
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
              Win Rate
              <TrendingUp className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.currentWinRate.toFixed(1)}%</div>
            <div className={`flex items-center text-sm mt-1 ${data.winRateGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.winRateGrowth >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {Math.abs(data.winRateGrowth).toFixed(1)}% vs previous period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Leads Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Daily Leads (Last 14 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {data.dailyLeads.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-blue-600 rounded-t transition-all hover:bg-blue-700"
                    style={{
                      height: `${(day.count / maxDailyCount) * 100}%`,
                      minHeight: day.count > 0 ? '8px' : '2px',
                    }}
                    title={`${day.count} leads`}
                  />
                  <span className="text-xs text-gray-500 -rotate-45 origin-top-left translate-y-2">
                    {day.date.split(' ')[1]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Status Breakdown</CardTitle>
            <CardDescription>Distribution across 7 pipeline stages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ALL_STATUSES.map((status) => {
              const count = data.statusBreakdown[status]
              const percentage = data.totalLeads > 0 ? (count / data.totalLeads) * 100 : 0
              return (
                <div key={status} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{statusLabels[status]}</span>
                    <span className="text-gray-500">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${statusColors[status]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Job Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(data.jobTypeBreakdown)
                .sort(([, a], [, b]) => b - a)
                .map(([jobType, count]) => {
                  const colors = jobTypeColors[jobType] || { bg: 'bg-gray-50', text: 'text-gray-900', badge: 'text-gray-600' }
                  const percentage = data.totalLeads > 0 ? (count / data.totalLeads) * 100 : 0
                  return (
                    <div key={jobType} className={`flex items-center justify-between p-4 ${colors.bg} rounded-lg`}>
                      <div>
                        <p className={`font-medium ${colors.text}`}>
                          {jobTypeLabels[jobType] || jobType}
                        </p>
                        <p className="text-sm text-gray-600">
                          {percentage.toFixed(1)}% of all leads
                        </p>
                      </div>
                      <span className={`text-3xl font-bold ${colors.badge}`}>
                        {count}
                      </span>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(data.sourceCounts).length === 0 ? (
              <p className="text-center text-gray-500 py-8">No source data available</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(data.sourceCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([source, count]) => (
                    <div key={source} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium capitalize">{source.replace('_', ' ')}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">
                          {data.totalLeads > 0 ? ((count / data.totalLeads) * 100).toFixed(1) : 0}%
                        </span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
