import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LeadsTable } from '@/components/admin/leads-table'
import { Pagination } from '@/components/ui/pagination'
import type { Lead, LeadStatus } from '@/types/database'

const PAGE_SIZE = 20

interface LeadsPageProps {
  searchParams: Promise<{ status?: string; page?: string }>
}

async function getLeads(status?: LeadStatus, page = 1) {
  const supabase = await createClient()

  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching leads:', error)
    return { leads: [], total: 0 }
  }

  return { leads: data as Lead[], total: count || 0 }
}

const statusFilters = [
  { value: '', label: 'All Leads' },
  { value: 'new', label: 'New' },
  { value: 'vetted', label: 'Vetted' },
  { value: 'sent_to_vendor', label: 'Sent to Vendor' },
  { value: 'vendor_accepted', label: 'Accepted' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
]

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams
  const statusFilter = params.status as LeadStatus | undefined
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1)
  const { leads, total } = await getLeads(statusFilter, page)

  // Build searchParams for pagination links (preserve status filter)
  const paginationSearchParams: Record<string, string> = {}
  if (statusFilter) paginationSearchParams.status = statusFilter

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
        <p className="text-gray-500 mt-1">Manage and track all your leads</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {statusFilters.map((filter) => (
          <a
            key={filter.value}
            href={filter.value ? `/admin/leads?status=${filter.value}` : '/admin/leads'}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              (statusFilter || '') === filter.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            {filter.label}
          </a>
        ))}
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>
            {total} {total === 1 ? 'lead' : 'leads'} found
            {statusFilter && ` with status "${statusFilter}"`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeadsTable leads={leads} />
          <div className="mt-4">
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              total={total}
              baseUrl="/admin/leads"
              searchParams={paginationSearchParams}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
