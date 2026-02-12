import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pagination } from '@/components/ui/pagination'
import { Building2, Star, Clock, ShieldCheck } from 'lucide-react'
import type { Vendor } from '@/types/database'

const PAGE_SIZE = 21 // divisible by 3 columns

const jobTypeLabels: Record<string, string> = {
  data_center_relocation: 'DC Relocation',
  itad: 'ITAD',
  asset_recovery: 'Asset Recovery',
  office_decommission: 'Office Decommission',
  equipment_delivery: 'Equipment Delivery',
}

interface VendorsPageProps {
  searchParams: Promise<{ page?: string }>
}

async function getVendors(page = 1) {
  const supabase = await createClient()

  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, error, count } = await supabase
    .from('vendors')
    .select('*', { count: 'exact' })
    .order('performance_score', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching vendors:', error)
    return { vendors: [], total: 0 }
  }

  return { vendors: data as Vendor[], total: count || 0 }
}

export default async function VendorsPage({ searchParams }: VendorsPageProps) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1)
  const { vendors, total } = await getVendors(page)

  const activeVendors = vendors.filter(v => v.is_active)
  const inactiveVendors = vendors.filter(v => !v.is_active)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendors</h1>
          <p className="text-gray-500 mt-1">
            Manage your IT logistics vendor network ({activeVendors.length} active, {inactiveVendors.length} inactive)
          </p>
        </div>
      </div>

      {/* Vendor Cards */}
      {vendors.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Vendors Yet</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Vendors will appear here once added to the system. Run the vendor seed migration to add sample vendors.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <Link key={vendor.id} href={`/admin/vendors/${vendor.id}`}>
                <Card className={`hover:shadow-md transition-shadow cursor-pointer ${!vendor.is_active ? 'opacity-60' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{vendor.name}</CardTitle>
                          <CardDescription>{vendor.contact_name}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={vendor.is_active ? 'default' : 'secondary'}>
                        {vendor.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {vendor.performance_score}
                        </div>
                        <p className="text-xs text-gray-500">Score</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-sm font-bold text-gray-900">{vendor.win_rate}%</div>
                        <p className="text-xs text-gray-500">Win Rate</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900">
                          <Clock className="h-3 w-3 text-gray-400" />
                          {vendor.avg_response_time_hours ? `${vendor.avg_response_time_hours}h` : 'N/A'}
                        </div>
                        <p className="text-xs text-gray-500">Response</p>
                      </div>
                    </div>

                    {/* Job Types */}
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Services</p>
                      <div className="flex flex-wrap gap-1">
                        {vendor.job_types.slice(0, 3).map((jt) => (
                          <Badge key={jt} variant="outline" className="text-xs">
                            {jobTypeLabels[jt] || jt}
                          </Badge>
                        ))}
                        {vendor.job_types.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{vendor.job_types.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Certifications */}
                    {vendor.certifications.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <ShieldCheck className="h-3 w-3" />
                        {vendor.certifications.slice(0, 2).join(', ')}
                        {vendor.certifications.length > 2 && ` +${vendor.certifications.length - 2}`}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              total={total}
              baseUrl="/admin/vendors"
            />
          </div>
        </>
      )}
    </div>
  )
}
