'use client'

import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import { Search, Filter, Loader2 } from 'lucide-react'
import { LeadCard } from '@/components/dashboard/lead-card'
import { LeadDetailModal } from '@/components/dashboard/lead-detail-modal'
import { Pagination } from '@/components/ui/pagination'
import { US_STATES } from '@/lib/constants'
import type { Lead } from '@/types/database'

const JOB_TYPE_OPTIONS = [
  { value: '', label: 'All Job Types' },
  { value: 'data_center_relocation', label: 'Data Center Relocation' },
  { value: 'itad', label: 'ITAD' },
  { value: 'asset_recovery', label: 'Asset Recovery' },
  { value: 'office_decommission', label: 'Office Decommission' },
  { value: 'equipment_delivery', label: 'Equipment Delivery' },
]

export default function AvailableLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [purchasing, setPurchasing] = useState(false)
  const [jobTypeFilter, setJobTypeFilter] = useState('')
  const [stateFilter, setStateFilter] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 20

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (jobTypeFilter) params.set('job_type', jobTypeFilter)
      if (stateFilter) params.set('state', stateFilter)
      params.set('page', String(page))
      params.set('pageSize', String(pageSize))

      const res = await fetch(`/api/dashboard/leads?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch leads')
      const data = await res.json()
      setLeads(data.leads || [])
      setTotal(data.total || 0)
    } catch {
      toast.error('Failed to load available leads')
    } finally {
      setLoading(false)
    }
  }, [jobTypeFilter, stateFilter, page])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1)
  }, [jobTypeFilter, stateFilter])

  const handlePurchase = async (leadId: string) => {
    try {
      setPurchasing(true)
      const res = await fetch(`/api/dashboard/leads/${leadId}/purchase`, {
        method: 'POST',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Purchase failed')
      }

      const data = await res.json()

      // If Stripe checkout URL is returned, redirect to Stripe
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
        return
      }

      // Fallback: immediate completion (no Stripe)
      toast.success('Lead purchased successfully! Check My Leads to view contact details.')
      setSelectedLead(null)
      fetchLeads()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to purchase lead')
    } finally {
      setPurchasing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Available Leads</h1>
        <p className="text-sm text-gray-500">
          Browse and purchase verified leads matching your service area.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-white p-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <div className="min-w-[200px]">
          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {JOB_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[200px]">
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All States</option>
            {Object.entries(US_STATES).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lead grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : leads.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border bg-white py-20">
          <Search className="mb-4 h-12 w-12 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900">No leads found</h3>
          <p className="text-sm text-gray-500">
            Try adjusting your filters or check back later for new leads.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onSelect={setSelectedLead}
              />
            ))}
          </div>
          <div className="mt-6">
            <Pagination
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={setPage}
            />
          </div>
        </>
      )}

      {/* Detail modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onPurchase={handlePurchase}
          onClose={() => setSelectedLead(null)}
          purchasing={purchasing}
        />
      )}
    </div>
  )
}
