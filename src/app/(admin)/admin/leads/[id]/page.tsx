import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft, Mail, Phone, MapPin, Calendar, Package,
  Server, ShieldCheck, Building2, Truck, Lock,
} from 'lucide-react'
import { formatPrice } from '@/lib/pricing'
import { LeadStatusSelect } from './lead-status-select'
import { RouteMapSection } from './route-map-section'
import type { Lead } from '@/types/database'

interface LeadDetailPageProps {
  params: Promise<{ id: string }>
}

async function getLead(id: string): Promise<Lead | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching lead:', error)
    return null
  }

  return data as Lead
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

const statusLabels: Record<string, string> = {
  new: 'New',
  vetted: 'Vetted',
  sent_to_vendor: 'Sent to Vendor',
  vendor_accepted: 'Vendor Accepted',
  quoted: 'Quoted',
  won: 'Won',
  lost: 'Lost',
}

const jobTypeLabels: Record<string, string> = {
  data_center_relocation: 'Data Center Relocation',
  itad: 'IT Asset Disposition (ITAD)',
  asset_recovery: 'Asset Recovery',
  office_decommission: 'Office IT Decommission',
  equipment_delivery: 'White Glove Equipment Delivery',
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params
  const lead = await getLead(id)

  if (!lead) {
    notFound()
  }

  const equipmentTypes = (lead.equipment_types as string[]) || []
  const handlingRequirements = (lead.handling_requirements as string[]) || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/leads">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Leads
            </Link>
          </Button>
        </div>
        <Badge className={statusColors[lead.status] || ''}>
          {statusLabels[lead.status] || lead.status}
        </Badge>
      </div>

      {/* Lead Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{lead.name}</CardTitle>
                  <CardDescription>
                    Submitted on {format(new Date(lead.created_at), 'MMMM d, yyyy')} at{' '}
                    {format(new Date(lead.created_at), 'h:mm a')}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Estimated Quote</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {lead.quote_low && lead.quote_high
                      ? `${formatPrice(lead.quote_low)} - ${formatPrice(lead.quote_high)}`
                      : 'No quote'}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                        {lead.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      {lead.phone ? (
                        <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
                          {lead.phone}
                        </a>
                      ) : (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </div>
                  </div>
                  {lead.company && (
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="font-medium">{lead.company}</p>
                      </div>
                    </div>
                  )}
                  {lead.title && (
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Title</p>
                        <p className="font-medium">{lead.title}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Job Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Server className="h-5 w-5 text-gray-400" />
                  Job Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Job Type</p>
                    <p className="font-medium">
                      {lead.job_type ? jobTypeLabels[lead.job_type] || lead.job_type : 'Not specified'}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Service Date</p>
                      <p className="font-medium">
                        {lead.service_date
                          ? format(new Date(lead.service_date), 'MMMM d, yyyy')
                          : 'Not specified'}
                        {lead.is_flexible && (
                          <span className="text-gray-500 text-sm ml-2">(Flexible)</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Facility Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  Facility Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <p className="text-sm font-medium text-green-800">Origin</p>
                    </div>
                    <p className="font-medium">
                      {lead.origin_address && <span>{lead.origin_address}, </span>}
                      {lead.origin_zip || 'Not specified'}
                    </p>
                    {lead.origin_facility_type && (
                      <p className="text-sm text-gray-600 mt-1">Type: {lead.origin_facility_type.replace(/_/g, ' ')}</p>
                    )}
                    {lead.origin_loading_dock && (
                      <p className="text-sm text-gray-600">Loading dock: {lead.origin_loading_dock.replace(/_/g, ' ')}</p>
                    )}
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <p className="text-sm font-medium text-red-800">Destination</p>
                    </div>
                    <p className="font-medium">
                      {lead.destination_address && <span>{lead.destination_address}, </span>}
                      {lead.destination_zip || 'Not specified'}
                    </p>
                    {lead.destination_facility_type && (
                      <p className="text-sm text-gray-600 mt-1">Type: {lead.destination_facility_type.replace(/_/g, ' ')}</p>
                    )}
                    {lead.destination_loading_dock && (
                      <p className="text-sm text-gray-600">Loading dock: {lead.destination_loading_dock.replace(/_/g, ' ')}</p>
                    )}
                  </div>
                </div>

                {/* Distance Display */}
                {lead.distance_miles && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Calculated Distance</p>
                        <p className="text-2xl font-bold text-blue-700">
                          {lead.distance_miles.toLocaleString()} miles
                        </p>
                      </div>
                      {lead.distance_source && (
                        <Badge variant="secondary" className="text-xs">
                          {lead.distance_source === 'google_maps' ? 'Google Maps' :
                           lead.distance_source === 'cache' ? 'Cached' : 'Estimated'}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Interactive Map */}
                {lead.origin_zip && lead.destination_zip && (
                  <div className="mt-4">
                    <RouteMapSection
                      originZip={lead.origin_zip}
                      destinationZip={lead.destination_zip}
                      originAddress={lead.origin_address}
                      destinationAddress={lead.destination_address}
                    />
                  </div>
                )}
              </div>

              <Separator />

              {/* Equipment & Handling */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5 text-gray-400" />
                  Equipment &amp; Handling
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Racks</p>
                    <p className="font-medium text-lg">{lead.number_of_racks ?? 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Loose Assets</p>
                    <p className="font-medium text-lg">{lead.number_of_loose_assets ?? 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight Estimate</p>
                    <p className="font-medium text-lg">{lead.total_weight_estimate?.replace(/_/g, ' ') || 'N/A'}</p>
                  </div>
                </div>

                {equipmentTypes.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-2">Equipment Types</p>
                    <div className="flex flex-wrap gap-2">
                      {equipmentTypes.map((item) => (
                        <Badge key={String(item)} variant="secondary" className="capitalize">
                          {String(item).replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {handlingRequirements.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Handling Requirements</p>
                    <div className="flex flex-wrap gap-2">
                      {handlingRequirements.map((item) => (
                        <Badge key={String(item)} variant="outline" className="capitalize text-orange-700 border-orange-300">
                          {String(item).replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Compliance Requirements */}
              {(lead.data_destruction_required || lead.certificate_of_destruction_needed || lead.chain_of_custody_tracking || lead.security_clearance_required || lead.compliance_notes) && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-gray-400" />
                      Compliance Requirements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {lead.data_destruction_required && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <Lock className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-red-800">Data Destruction Required</span>
                        </div>
                      )}
                      {lead.certificate_of_destruction_needed && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <ShieldCheck className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-red-800">Certificate of Destruction Needed</span>
                        </div>
                      )}
                      {lead.chain_of_custody_tracking && (
                        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <Truck className="h-4 w-4 text-amber-600" />
                          <span className="text-sm font-medium text-amber-800">Chain of Custody Tracking</span>
                        </div>
                      )}
                      {lead.security_clearance_required && (
                        <div className="flex items-center gap-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <Lock className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-800">Security Clearance Required</span>
                        </div>
                      )}
                    </div>
                    {lead.compliance_notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Compliance Notes</p>
                        <p className="text-sm">{lead.compliance_notes}</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Vendor Assignment */}
              {lead.vendor_id && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-gray-400" />
                      Vendor Assignment
                    </h3>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Assigned Vendor</p>
                          <Link href={`/admin/vendors/${lead.vendor_id}`} className="font-medium text-blue-600 hover:underline">
                            View Vendor Profile
                          </Link>
                        </div>
                        {lead.vendor_assigned_at && (
                          <p className="text-sm text-gray-500">
                            Assigned {format(new Date(lead.vendor_assigned_at), 'MMM d, yyyy h:mm a')}
                          </p>
                        )}
                      </div>
                      {lead.vendor_notes && (
                        <p className="text-sm text-gray-600 mt-2">{lead.vendor_notes}</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadStatusSelect leadId={lead.id} currentStatus={lead.status} />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full" variant="outline">
                <a href={`mailto:${lead.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </a>
              </Button>
              {lead.phone && (
                <Button asChild className="w-full" variant="outline">
                  <a href={`tel:${lead.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Attribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Attribution</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Source</span>
                <span className="font-medium">{lead.source || 'Direct'}</span>
              </div>
              {lead.utm_source && (
                <div className="flex justify-between">
                  <span className="text-gray-500">UTM Source</span>
                  <span className="font-medium">{lead.utm_source}</span>
                </div>
              )}
              {lead.utm_medium && (
                <div className="flex justify-between">
                  <span className="text-gray-500">UTM Medium</span>
                  <span className="font-medium">{lead.utm_medium}</span>
                </div>
              )}
              {lead.utm_campaign && (
                <div className="flex justify-between">
                  <span className="text-gray-500">UTM Campaign</span>
                  <span className="font-medium">{lead.utm_campaign}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
