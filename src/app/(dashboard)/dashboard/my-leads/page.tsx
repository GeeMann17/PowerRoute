'use client'

import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import {
  ShoppingBag,
  Trophy,
  Clock,
  DollarSign,
  Mail,
  Phone,
  Building2,
  User,
  ChevronDown,
  ChevronUp,
  MapPin,
  Package,
  Loader2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Pagination } from '@/components/ui/pagination'
import type { Lead, LeadPurchase, PurchaseOutcome } from '@/types/database'

const JOB_TYPE_LABELS: Record<string, string> = {
  data_center_relocation: 'Data Center Relocation',
  itad: 'ITAD',
  asset_recovery: 'Asset Recovery',
  office_decommission: 'Office Decommission',
  equipment_delivery: 'Equipment Delivery',
}

const OUTCOME_OPTIONS: { value: PurchaseOutcome; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
  { value: 'no_response', label: 'No Response' },
]

const OUTCOME_COLORS: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
  no_response: 'bg-amber-100 text-amber-700',
}

type PurchasedLead = LeadPurchase & {
  lead: Lead
}

export default function MyLeadsPage() {
  const [purchases, setPurchases] = useState<PurchasedLead[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [outcomes, setOutcomes] = useState<Record<string, PurchaseOutcome>>({})
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 20

  const fetchPurchases = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      params.set('page', String(page))
      params.set('pageSize', String(pageSize))

      const res = await fetch(`/api/dashboard/purchases?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch purchases')
      const data = await res.json()
      const purchaseData = data.purchases || []
      setPurchases(purchaseData)
      setTotal(data.total || 0)

      // Initialize outcomes from existing data
      const initialOutcomes: Record<string, PurchaseOutcome> = {}
      purchaseData.forEach((p: PurchasedLead) => {
        initialOutcomes[p.id] = p.outcome
      })
      setOutcomes(initialOutcomes)
    } catch {
      toast.error('Failed to load your leads')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchPurchases()
  }, [fetchPurchases])

  const handleOutcomeChange = (purchaseId: string, outcome: PurchaseOutcome) => {
    setOutcomes((prev) => ({ ...prev, [purchaseId]: outcome }))
    toast.success(`Outcome updated to "${outcome.replace(/_/g, ' ')}"`)
  }

  // Stats
  const totalLeads = purchases.length
  const wonCount = Object.values(outcomes).filter((o) => o === 'won').length
  const inProgressCount = Object.values(outcomes).filter((o) => o === 'pending').length
  const totalSpent = purchases.reduce((sum, p) => sum + (p.price_paid || 0), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Leads</h1>
        <p className="text-sm text-gray-500">
          Leads you have purchased with full contact details.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-100 p-3">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="rounded-lg bg-green-100 p-3">
              <Trophy className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Won</p>
              <p className="text-2xl font-bold text-gray-900">{wonCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="rounded-lg bg-amber-100 p-3">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{inProgressCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="rounded-lg bg-purple-100 p-3">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalSpent.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead list */}
      {purchases.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border bg-white py-20">
          <ShoppingBag className="mb-4 h-12 w-12 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900">No purchased leads yet</h3>
          <p className="text-sm text-gray-500">
            Browse available leads to get started.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {purchases.map((purchase) => {
              const lead = purchase.lead
              const isExpanded = expandedId === purchase.id
              const outcome = outcomes[purchase.id] || 'pending'

              return (
                <Card key={purchase.id} className="overflow-hidden">
                  {/* Collapsed row */}
                  <div
                    className="flex cursor-pointer items-center justify-between px-6 py-4"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : purchase.id)
                    }
                  >
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">
                        {JOB_TYPE_LABELS[lead.job_type || ''] || 'General'}
                      </Badge>
                      <div>
                        <p className="font-medium text-gray-900">
                          {lead.name}
                          {lead.company && (
                            <span className="ml-2 text-sm text-gray-500">
                              at {lead.company}
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {lead.origin_state || 'N/A'} &rarr;{' '}
                          {lead.destination_state || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${OUTCOME_COLORS[outcome]}`}
                      >
                        {outcome.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="border-t bg-gray-50 px-6 py-5">
                      <div className="grid gap-6 lg:grid-cols-2">
                        {/* Contact info */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                            Contact Information
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="font-medium text-gray-900">
                                {lead.name}
                              </span>
                              {lead.title && (
                                <span className="text-gray-500">{lead.title}</span>
                              )}
                            </div>
                            {lead.email && (
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="text-blue-600 hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {lead.email}
                                </a>
                              </div>
                            )}
                            {lead.phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="text-blue-600 hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {lead.phone}
                                </a>
                              </div>
                            )}
                            {lead.company && (
                              <div className="flex items-center gap-2 text-sm">
                                <Building2 className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-900">{lead.company}</span>
                              </div>
                            )}
                          </div>

                          {/* Contact actions */}
                          <div className="flex gap-2 pt-2">
                            {lead.email && (
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                              >
                                <a href={`mailto:${lead.email}`}>
                                  <Mail className="h-4 w-4" />
                                  Email
                                </a>
                              </Button>
                            )}
                            {lead.phone && (
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                              >
                                <a href={`tel:${lead.phone}`}>
                                  <Phone className="h-4 w-4" />
                                  Call
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Job details */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                            Job Details
                          </h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>
                                {lead.origin_state || 'N/A'} &rarr;{' '}
                                {lead.destination_state || 'N/A'}
                              </span>
                            </div>
                            {lead.timeline && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span>{lead.timeline.replace(/_/g, ' ')}</span>
                              </div>
                            )}
                            {lead.number_of_racks && (
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-gray-400" />
                                <span>{lead.number_of_racks} rack(s)</span>
                              </div>
                            )}
                            {lead.total_weight_estimate && (
                              <p>Weight: {lead.total_weight_estimate}</p>
                            )}
                            {lead.distance_miles && (
                              <p>Distance: {lead.distance_miles} miles</p>
                            )}
                          </div>

                          {/* Outcome tracking */}
                          <div className="pt-2">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                              Outcome
                            </label>
                            <select
                              value={outcome}
                              onChange={(e) => {
                                e.stopPropagation()
                                handleOutcomeChange(
                                  purchase.id,
                                  e.target.value as PurchaseOutcome
                                )
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="h-9 w-full max-w-[200px] rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            >
                              {OUTCOME_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Purchase info footer */}
                      <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm text-gray-500">
                        <span>
                          Purchased on{' '}
                          {new Date(purchase.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                        <span>Paid: ${purchase.price_paid?.toFixed(2) || '0.00'}</span>
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
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
    </div>
  )
}
