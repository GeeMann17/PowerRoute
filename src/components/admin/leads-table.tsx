'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { toast } from 'sonner'
import {
  Phone,
  Mail,
  Trash2,
  Download,
  CheckSquare,
  RefreshCw,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { formatPrice } from '@/lib/pricing'
import type { Lead, LeadStatus } from '@/types/database'

interface LeadsTableProps {
  leads: Lead[]
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
  data_center_relocation: 'DC Relocation',
  itad: 'ITAD',
  asset_recovery: 'Asset Recovery',
  office_decommission: 'Office Decommission',
  equipment_delivery: 'Equipment Delivery',
}

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'vetted', label: 'Vetted' },
  { value: 'sent_to_vendor', label: 'Sent to Vendor' },
  { value: 'vendor_accepted', label: 'Vendor Accepted' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
]

export function LeadsTable({ leads }: LeadsTableProps) {
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const allSelected = leads.length > 0 && selectedIds.size === leads.length
  const someSelected = selectedIds.size > 0

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(leads.map((l) => l.id)))
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error('Failed to update status')

      toast.success('Status updated')
      router.refresh()
    } catch {
      toast.error('Failed to update status')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleBulkStatusChange = async (newStatus: LeadStatus) => {
    if (selectedIds.size === 0) return

    setIsUpdating(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedIds), status: newStatus }),
      })

      if (!response.ok) throw new Error('Failed to update leads')

      toast.success(`Updated ${selectedIds.size} leads`)
      setSelectedIds(new Set())
      router.refresh()
    } catch {
      toast.error('Failed to update leads')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return

    setIsDeleting(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      })

      if (!response.ok) throw new Error('Failed to delete leads')

      toast.success(`Deleted ${selectedIds.size} leads`)
      setSelectedIds(new Set())
      setShowDeleteDialog(false)
      router.refresh()
    } catch {
      toast.error('Failed to delete leads')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleExportCSV = () => {
    const selectedLeads = leads.filter((l) => selectedIds.has(l.id))
    const dataToExport = selectedLeads.length > 0 ? selectedLeads : leads

    const headers = [
      'Name',
      'Email',
      'Phone',
      'Company',
      'Status',
      'Job Type',
      'Origin ZIP',
      'Destination ZIP',
      'Racks',
      'Loose Assets',
      'Quote Low',
      'Quote High',
      'Created At',
    ]

    const rows = dataToExport.map((lead) => [
      lead.name,
      lead.email,
      lead.phone || '',
      lead.company || '',
      lead.status,
      lead.job_type ? jobTypeLabels[lead.job_type] || lead.job_type : '',
      lead.origin_zip || '',
      lead.destination_zip || '',
      lead.number_of_racks?.toString() || '',
      lead.number_of_loose_assets?.toString() || '',
      lead.quote_low?.toString() || '',
      lead.quote_high?.toString() || '',
      format(new Date(lead.created_at), 'yyyy-MM-dd HH:mm:ss'),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `leads-export-${format(new Date(), 'yyyy-MM-dd')}.csv`
    link.click()

    toast.success(`Exported ${dataToExport.length} leads`)
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No leads found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Bulk Action Bar */}
      {someSelected && (
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-300 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckSquare className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-900">
              {selectedIds.size} {selectedIds.size === 1 ? 'lead' : 'leads'} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Bulk Status Change */}
            <Select onValueChange={(value) => handleBulkStatusChange(value as LeadStatus)} disabled={isUpdating}>
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder="Change status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Export */}
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            {/* Delete */}
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>

            {/* Clear Selection */}
            <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Export All Button (when nothing selected) */}
      {!someSelected && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Job Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Quote</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id} className={selectedIds.has(lead.id) ? 'bg-blue-50' : ''}>
                <TableCell>
                  <Checkbox
                    checked={selectedIds.has(lead.id)}
                    onCheckedChange={() => toggleSelect(lead.id)}
                    aria-label={`Select ${lead.name}`}
                  />
                </TableCell>
                <TableCell>
                  <Link href={`/admin/leads/${lead.id}`} className="block hover:text-blue-600">
                    {format(new Date(lead.created_at), 'MMM d, yyyy')}
                    <span className="block text-xs text-gray-500">
                      {format(new Date(lead.created_at), 'h:mm a')}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/leads/${lead.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                    {lead.name}
                  </Link>
                  <span className="block text-xs text-gray-500">{lead.email}</span>
                </TableCell>
                <TableCell>
                  {lead.job_type ? (
                    <Badge variant="outline" className="text-xs whitespace-nowrap">
                      {jobTypeLabels[lead.job_type] || lead.job_type}
                    </Badge>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {lead.phone && (
                      <a
                        href={`tel:${lead.phone}`}
                        className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-green-600"
                        title="Call"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    )}
                    <a
                      href={`mailto:${lead.email}`}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-blue-600"
                      title="Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  {lead.quote_low && lead.quote_high ? (
                    <span className="font-medium">
                      {formatPrice(lead.quote_low)} - {formatPrice(lead.quote_high)}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Select
                    value={lead.status}
                    onValueChange={(value) => handleStatusChange(lead.id, value as LeadStatus)}
                    disabled={isUpdating}
                  >
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <Badge className={`${statusColors[lead.status] || ''} text-xs`}>
                        {statusLabels[lead.status] || lead.status}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <Badge className={`${statusColors[option.value] || ''} text-xs`}>
                            {option.label}
                          </Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/leads/${lead.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedIds.size} leads?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected leads from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
