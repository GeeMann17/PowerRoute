'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Ban, Loader2 } from 'lucide-react'

interface VendorActionsProps {
  vendorId: string
  currentStatus: string
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className?: string }> = {
  pending: { label: 'Pending Review', variant: 'outline', className: 'border-yellow-300 bg-yellow-50 text-yellow-800' },
  approved: { label: 'Approved', variant: 'default', className: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejected', variant: 'destructive', className: 'bg-red-100 text-red-800' },
  suspended: { label: 'Suspended', variant: 'secondary', className: 'bg-amber-100 text-amber-800' },
}

export function VendorActions({ vendorId, currentStatus }: VendorActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const updateStatus = async (status: 'approved' | 'rejected' | 'suspended') => {
    setLoading(status)
    try {
      const response = await fetch(`/api/admin/vendors/${vendorId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update vendor status')
      }

      toast.success(`Vendor ${status} successfully`)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update vendor status')
    } finally {
      setLoading(null)
    }
  }

  const config = statusConfig[currentStatus] || statusConfig.pending

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">Status</span>
        <Badge variant={config.variant} className={config.className}>
          {config.label}
        </Badge>
      </div>

      <div className="space-y-2">
        {currentStatus === 'pending' && (
          <>
            <Button
              onClick={() => updateStatus('approved')}
              disabled={loading !== null}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {loading === 'approved' ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Approve Vendor
            </Button>
            <Button
              onClick={() => updateStatus('rejected')}
              disabled={loading !== null}
              variant="destructive"
              className="w-full"
            >
              {loading === 'rejected' ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4 mr-2" />
              )}
              Reject Vendor
            </Button>
          </>
        )}

        {currentStatus === 'approved' && (
          <Button
            onClick={() => updateStatus('suspended')}
            disabled={loading !== null}
            variant="outline"
            className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            {loading === 'suspended' ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Ban className="h-4 w-4 mr-2" />
            )}
            Suspend Vendor
          </Button>
        )}

        {currentStatus === 'suspended' && (
          <Button
            onClick={() => updateStatus('approved')}
            disabled={loading !== null}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {loading === 'approved' ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4 mr-2" />
            )}
            Approve Vendor
          </Button>
        )}

        {currentStatus === 'rejected' && (
          <Button
            onClick={() => updateStatus('approved')}
            disabled={loading !== null}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {loading === 'approved' ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4 mr-2" />
            )}
            Approve Vendor
          </Button>
        )}
      </div>
    </div>
  )
}
