'use client'

import { useEffect, useState, useCallback } from 'react'
import { CreditCard, Loader2, DollarSign, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pagination } from '@/components/ui/pagination'
import { formatPrice } from '@/lib/pricing'

interface Purchase {
  id: string
  lead_id: string
  price_paid: number
  status: string
  outcome: string
  created_at: string
  leads: {
    job_type: string
    origin_state: string | null
    lead_tier: string | null
  } | null
}

export default function BillingPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)
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
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setPurchases(data.purchases || [])
      setTotal(data.total || 0)
    } catch {
      // Silent fail — page still renders
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchPurchases()
  }, [fetchPurchases])

  const totalSpent = purchases.reduce((sum, p) => sum + (p.price_paid || 0), 0)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-sm text-gray-500">
          View your payment history and purchase activity.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-full bg-green-100 p-3">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold">{formatPrice(totalSpent)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-full bg-blue-100 p-3">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Purchases</p>
              <p className="text-2xl font-bold">{purchases.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-full bg-purple-100 p-3">
              <CreditCard className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="text-sm font-medium text-gray-900">Stripe Checkout</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment history table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : purchases.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">
              No purchases yet. Browse available leads to get started.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="pb-3 pr-4 font-medium">Date</th>
                      <th className="pb-3 pr-4 font-medium">Lead</th>
                      <th className="pb-3 pr-4 font-medium">Amount</th>
                      <th className="pb-3 pr-4 font-medium">Status</th>
                      <th className="pb-3 font-medium">Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((purchase) => (
                      <tr key={purchase.id} className="border-b last:border-0">
                        <td className="py-3 pr-4 text-gray-700">
                          {new Date(purchase.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 pr-4">
                          <span className="font-medium text-gray-900">
                            {purchase.leads?.job_type?.replace(/_/g, ' ') || 'Unknown'}
                          </span>
                          {purchase.leads?.origin_state && (
                            <span className="ml-2 text-gray-500">
                              ({purchase.leads.origin_state})
                            </span>
                          )}
                        </td>
                        <td className="py-3 pr-4 font-medium text-gray-900">
                          {formatPrice(purchase.price_paid)}
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                              purchase.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : purchase.status === 'refunded'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {purchase.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                              purchase.outcome === 'won'
                                ? 'bg-green-100 text-green-700'
                                : purchase.outcome === 'lost'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {purchase.outcome}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <Pagination
                  page={page}
                  pageSize={pageSize}
                  total={total}
                  onPageChange={setPage}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
