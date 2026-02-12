'use client'

import { MapPin, Clock, Building2, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Lead } from '@/types/database'

const JOB_TYPE_LABELS: Record<string, string> = {
  data_center_relocation: 'Data Center Relocation',
  itad: 'ITAD',
  asset_recovery: 'Asset Recovery',
  office_decommission: 'Office Decommission',
  equipment_delivery: 'Equipment Delivery',
}

const TIER_STYLES: Record<string, string> = {
  premium: 'bg-amber-100 text-amber-800 border-amber-200',
  standard: 'bg-blue-100 text-blue-800 border-blue-200',
  basic: 'bg-gray-100 text-gray-700 border-gray-200',
}

const COMPANY_TIER_LABELS: Record<string, string> = {
  enterprise: 'Enterprise',
  mid_market: 'Mid-Market',
  smb: 'SMB',
  unknown: 'Unknown',
}

interface LeadCardProps {
  lead: Lead
  onSelect: (lead: Lead) => void
}

export function LeadCard({ lead, onSelect }: LeadCardProps) {
  const spotsLeft = lead.max_sales - lead.sold_count
  const tierStyle = TIER_STYLES[lead.lead_tier || 'basic'] || TIER_STYLES.basic

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => onSelect(lead)}
    >
      <CardContent className="space-y-4">
        {/* Top row: job type badge + lead tier */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary">
            {JOB_TYPE_LABELS[lead.job_type || ''] || 'General'}
          </Badge>
          {lead.lead_tier && (
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${tierStyle}`}
            >
              {lead.lead_tier.charAt(0).toUpperCase() + lead.lead_tier.slice(1)}
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
          <span>
            {lead.origin_state || 'N/A'} &rarr; {lead.destination_state || 'N/A'}
          </span>
        </div>

        {/* Timeline */}
        {lead.timeline && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 shrink-0 text-gray-400" />
            <span>{lead.timeline.replace(/_/g, ' ')}</span>
          </div>
        )}

        {/* Company tier */}
        {lead.company_tier && lead.company_tier !== 'unknown' && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 className="h-4 w-4 shrink-0 text-gray-400" />
            <span>{COMPANY_TIER_LABELS[lead.company_tier]}</span>
          </div>
        )}

        {/* Bottom row: price + spots */}
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-xl font-bold text-gray-900">
            ${lead.lead_price?.toFixed(2) || '0.00'}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>
              {spotsLeft} of {lead.max_sales} spot{lead.max_sales !== 1 ? 's' : ''} left
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
