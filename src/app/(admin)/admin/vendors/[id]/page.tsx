import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft, Mail, Phone, Building2, Star,
  MapPin, ShieldCheck, Server, Trophy,
} from 'lucide-react'
import type { Vendor, Lead } from '@/types/database'
import { VendorActions } from '@/components/admin/vendor-actions'

interface VendorDetailPageProps {
  params: Promise<{ id: string }>
}

const jobTypeLabels: Record<string, string> = {
  data_center_relocation: 'Data Center Relocation',
  itad: 'IT Asset Disposition (ITAD)',
  asset_recovery: 'Asset Recovery',
  office_decommission: 'Office IT Decommission',
  equipment_delivery: 'White Glove Equipment Delivery',
}

const statusLabels: Record<string, string> = {
  new: 'New',
  vetted: 'Vetted',
  sent_to_vendor: 'Sent to Vendor',
  vendor_accepted: 'Vendor Accepted',
  quoted: 'Quoted',
  won: 'Won',
  lost: 'Lost',
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  vetted: 'bg-cyan-100 text-cyan-800',
  sent_to_vendor: 'bg-yellow-100 text-yellow-800',
  vendor_accepted: 'bg-orange-100 text-orange-800',
  quoted: 'bg-purple-100 text-purple-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-gray-100 text-gray-800',
}

async function getVendor(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Vendor
}

async function getVendorLeads(vendorId: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('leads')
    .select('*')
    .eq('vendor_id', vendorId)
    .order('created_at', { ascending: false })
    .limit(20)

  return (data || []) as Lead[]
}

export default async function VendorDetailPage({ params }: VendorDetailPageProps) {
  const { id } = await params
  const vendor = await getVendor(id)

  if (!vendor) {
    notFound()
  }

  const leads = await getVendorLeads(vendor.id)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/vendors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Vendors
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={vendor.is_active ? 'default' : 'secondary'}>
            {vendor.is_active ? 'Active' : 'Inactive'}
          </Badge>
          <Badge
            variant="outline"
            className={
              vendor.status === 'approved' ? 'border-green-300 bg-green-50 text-green-800' :
              vendor.status === 'pending' ? 'border-yellow-300 bg-yellow-50 text-yellow-800' :
              vendor.status === 'rejected' ? 'border-red-300 bg-red-50 text-red-800' :
              vendor.status === 'suspended' ? 'border-amber-300 bg-amber-50 text-amber-800' :
              ''
            }
          >
            {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Building2 className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{vendor.name}</CardTitle>
                  <CardDescription>
                    Added {format(new Date(vendor.created_at), 'MMMM d, yyyy')}
                    {vendor.pricing_tier && (
                      <span className="ml-2">
                        <Badge variant="outline">{vendor.pricing_tier} tier</Badge>
                      </span>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Contact Name</p>
                      <p className="font-medium">{vendor.contact_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href={`mailto:${vendor.contact_email}`} className="text-blue-600 hover:underline">
                        {vendor.contact_email}
                      </a>
                    </div>
                  </div>
                  {vendor.contact_phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <a href={`tel:${vendor.contact_phone}`} className="text-blue-600 hover:underline">
                          {vendor.contact_phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Services */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Server className="h-5 w-5 text-gray-400" />
                  Services Offered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.job_types.map((jt) => (
                    <Badge key={jt} variant="secondary" className="text-sm">
                      {jobTypeLabels[jt] || jt}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Geographic Coverage */}
              {vendor.geographic_coverage.length > 0 && (
                <>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      Geographic Coverage
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {vendor.geographic_coverage.map((region) => (
                        <Badge key={region} variant="outline">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                </>
              )}

              {/* Certifications */}
              {vendor.certifications.length > 0 && (
                <>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-gray-400" />
                      Certifications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {vendor.certifications.map((cert) => (
                        <Badge key={cert} className="bg-green-100 text-green-800">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                </>
              )}

              {/* Notes */}
              {vendor.notes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
                  <p className="text-gray-600">{vendor.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assigned Leads */}
          <Card>
            <CardHeader>
              <CardTitle>Assigned Leads</CardTitle>
              <CardDescription>
                {leads.length} {leads.length === 1 ? 'lead' : 'leads'} assigned to this vendor
              </CardDescription>
            </CardHeader>
            <CardContent>
              {leads.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No leads assigned to this vendor yet.</p>
              ) : (
                <div className="space-y-3">
                  {leads.map((lead) => (
                    <Link
                      key={lead.id}
                      href={`/admin/leads/${lead.id}`}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-500">{lead.email}</p>
                      </div>
                      <Badge className={statusColors[lead.status] || ''}>
                        {statusLabels[lead.status] || lead.status}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Performance Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <span className="text-3xl font-bold text-gray-900">{vendor.performance_score}</span>
                </div>
                <p className="text-sm text-gray-500">Performance Score</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <p className="text-xl font-bold text-green-700">{vendor.win_rate}%</p>
                  <p className="text-xs text-gray-500">Win Rate</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <p className="text-xl font-bold text-blue-700">
                    {vendor.avg_response_time_hours ? `${vendor.avg_response_time_hours}h` : 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500">Avg Response</p>
                </div>
              </div>

              {vendor.capacity && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Capacity</p>
                  <p className="font-medium">{vendor.capacity}</p>
                </div>
              )}

              {(vendor.leads_purchased > 0 || vendor.leads_closed > 0) && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-indigo-50 rounded-lg text-center">
                    <p className="text-xl font-bold text-indigo-700">{vendor.leads_purchased}</p>
                    <p className="text-xs text-gray-500">Leads Purchased</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg text-center">
                    <p className="text-xl font-bold text-emerald-700">{vendor.leads_closed}</p>
                    <p className="text-xs text-gray-500">Leads Closed</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vendor Approval */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vendor Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <VendorActions vendorId={vendor.id} currentStatus={vendor.status} />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full" variant="outline">
                <a href={`mailto:${vendor.contact_email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email Vendor
                </a>
              </Button>
              {vendor.contact_phone && (
                <Button asChild className="w-full" variant="outline">
                  <a href={`tel:${vendor.contact_phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Vendor
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
