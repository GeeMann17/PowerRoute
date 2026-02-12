'use client'

import { X, MapPin, Clock, Building2, Shield, Package, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Lead } from '@/types/database'

const JOB_TYPE_LABELS: Record<string, string> = {
  data_center_relocation: 'Data Center Relocation',
  itad: 'ITAD',
  asset_recovery: 'Asset Recovery',
  office_decommission: 'Office Decommission',
  equipment_delivery: 'Equipment Delivery',
}

interface LeadDetailModalProps {
  lead: Lead
  onPurchase: (leadId: string) => void
  onClose: () => void
  purchasing?: boolean
}

export function LeadDetailModal({
  lead,
  onPurchase,
  onClose,
  purchasing = false,
}: LeadDetailModalProps) {
  const spotsLeft = lead.max_sales - lead.sold_count

  const complianceItems = [
    lead.data_destruction_required && 'Data Destruction Required',
    lead.certificate_of_destruction_needed && 'Certificate of Destruction',
    lead.chain_of_custody_tracking && 'Chain of Custody Tracking',
    lead.security_clearance_required && 'Security Clearance Required',
  ].filter(Boolean)

  const equipmentTypes = Array.isArray(lead.equipment_types)
    ? (lead.equipment_types as string[])
    : []

  const handlingReqs = Array.isArray(lead.handling_requirements)
    ? (lead.handling_requirements as string[])
    : []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <Badge variant="secondary" className="mb-1">
              {JOB_TYPE_LABELS[lead.job_type || ''] || 'General'}
            </Badge>
            <p className="text-sm text-gray-500">Lead Details</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">
          {/* Location */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Location
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border bg-gray-50 p-3">
                <p className="mb-1 text-xs font-medium text-gray-500">Origin</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {lead.origin_state || 'Not specified'}
                  </span>
                </div>
                {lead.origin_facility_type && (
                  <p className="mt-1 text-xs text-gray-500">
                    {lead.origin_facility_type}
                  </p>
                )}
              </div>
              <div className="rounded-lg border bg-gray-50 p-3">
                <p className="mb-1 text-xs font-medium text-gray-500">Destination</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {lead.destination_state || 'Not specified'}
                  </span>
                </div>
                {lead.destination_facility_type && (
                  <p className="mt-1 text-xs text-gray-500">
                    {lead.destination_facility_type}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          {lead.timeline && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="font-medium">Timeline:</span>
              <span>{lead.timeline.replace(/_/g, ' ')}</span>
            </div>
          )}

          {/* Company tier */}
          {lead.company_tier && lead.company_tier !== 'unknown' && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Building2 className="h-4 w-4 text-gray-400" />
              <span className="font-medium">Company Tier:</span>
              <span className="capitalize">{lead.company_tier.replace(/_/g, ' ')}</span>
            </div>
          )}

          {/* Asset details */}
          {(lead.number_of_racks || lead.number_of_loose_assets || lead.total_weight_estimate || equipmentTypes.length > 0) && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Asset Details
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                {lead.number_of_racks && (
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span>{lead.number_of_racks} rack(s)</span>
                  </div>
                )}
                {lead.number_of_loose_assets && (
                  <p>{lead.number_of_loose_assets} loose assets</p>
                )}
                {lead.total_weight_estimate && (
                  <p>Estimated weight: {lead.total_weight_estimate}</p>
                )}
                {equipmentTypes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {equipmentTypes.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {String(type).replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Handling requirements */}
          {handlingReqs.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Handling Requirements
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {handlingReqs.map((req) => (
                  <Badge key={req} variant="outline" className="text-xs">
                    {String(req).replace(/_/g, ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Compliance */}
          {complianceItems.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Compliance Requirements
              </h3>
              <div className="space-y-2">
                {complianceItems.map((item) => (
                  <div key={item as string} className="flex items-center gap-2 text-sm text-gray-700">
                    <Shield className="h-4 w-4 text-amber-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What you get */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="mb-2 text-sm font-semibold text-blue-900">
              What You Get After Purchase
            </h3>
            <ul className="space-y-1.5 text-sm text-blue-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Full contact name and title
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Direct email address
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Phone number
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Company name and details
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Complete job specifications
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-between border-t bg-white px-6 py-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              ${lead.lead_price?.toFixed(2) || '0.00'}
            </p>
            <p className="text-sm text-gray-500">
              {spotsLeft} of {lead.max_sales} spot{lead.max_sales !== 1 ? 's' : ''} remaining
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => onPurchase(lead.id)}
            disabled={purchasing || spotsLeft <= 0}
          >
            {purchasing
              ? 'Processing...'
              : spotsLeft <= 0
                ? 'Sold Out'
                : `Purchase Lead - $${lead.lead_price?.toFixed(2) || '0.00'}`}
          </Button>
        </div>
      </div>
    </div>
  )
}
