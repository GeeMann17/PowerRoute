import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  Building2,
  Globe,
  Mail,
  Phone,
  User,
  Shield,
  Award,
  Truck,
  MapPin,
  ShoppingBag,
  Trophy,
  TrendingUp,
  BadgeCheck,
  Clock,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CERTIFICATIONS, EQUIPMENT_OPTIONS } from '@/lib/constants'

function getCertLabel(value: string): string {
  const cert = CERTIFICATIONS.find((c) => c.value === value)
  return cert ? cert.label : value
}

function getEquipmentLabel(value: string): string {
  const equip = EQUIPMENT_OPTIONS.find((e) => e.value === value)
  return equip ? equip.label : value.replace(/_/g, ' ')
}

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/providers/login')
  }

  const { data: vendor } = await supabase
    .from('vendors')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!vendor) {
    redirect('/providers/login')
  }

  const winRate = vendor.leads_purchased > 0
    ? Math.round((vendor.leads_closed / vendor.leads_purchased) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-500">
            Your vendor profile and performance overview.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {vendor.verified && (
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <BadgeCheck className="mr-1 h-3 w-3" />
              Verified
            </Badge>
          )}
          <Badge
            className={
              vendor.status === 'approved'
                ? 'bg-green-100 text-green-700 border-green-200'
                : 'bg-gray-100 text-gray-700 border-gray-200'
            }
          >
            {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content - 2 cols */}
        <div className="space-y-6 lg:col-span-2">
          {/* Company info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-gray-500" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoRow label="Company Name" value={vendor.company_name} />
              <InfoRow label="Display Name" value={vendor.name} />
              {vendor.website && (
                <div className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Website</p>
                    <p className="text-sm text-blue-600">{vendor.website}</p>
                  </div>
                </div>
              )}
              {vendor.years_in_business && (
                <InfoRow
                  label="Years in Business"
                  value={`${vendor.years_in_business} years`}
                />
              )}
              {vendor.description && (
                <div>
                  <p className="text-xs text-gray-500">Description</p>
                  <p className="mt-1 text-sm text-gray-700">{vendor.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-500" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900">{vendor.contact_name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900">{vendor.contact_email}</span>
              </div>
              {vendor.contact_phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{vendor.contact_phone}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Services & Regions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-gray-500" />
                Services & Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {vendor.job_types.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium text-gray-500">Job Types</p>
                  <div className="flex flex-wrap gap-1.5">
                    {vendor.job_types.map((jt) => (
                      <Badge key={jt} variant="secondary" className="text-xs">
                        {jt.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {vendor.specialties.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium text-gray-500">Specialties</p>
                  <div className="flex flex-wrap gap-1.5">
                    {vendor.specialties.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs">
                        {s.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {vendor.regions_served.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium text-gray-500">Regions Served</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                    <div className="flex flex-wrap gap-1.5">
                      {vendor.regions_served.map((r) => (
                        <Badge key={r} variant="outline" className="text-xs">
                          {r}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {vendor.nationwide && (
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <MapPin className="h-4 w-4" />
                  Nationwide coverage
                </div>
              )}
            </CardContent>
          </Card>

          {/* Certifications */}
          {vendor.certifications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-gray-500" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {vendor.certifications.map((c) => (
                    <Badge key={c} className="bg-blue-100 text-blue-800 border-blue-200">
                      {getCertLabel(c)}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Equipment */}
          {vendor.equipment.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-gray-500" />
                  Equipment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {vendor.equipment.map((e) => (
                    <Badge key={e} variant="outline" className="text-xs">
                      {getEquipmentLabel(e)}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Insurance */}
          {vendor.insurance_coverage && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gray-500" />
                  Insurance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{vendor.insurance_coverage}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats sidebar - 1 col */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2.5">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Leads Purchased</p>
                  <p className="text-xl font-bold text-gray-900">
                    {vendor.leads_purchased}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2.5">
                  <Trophy className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Deals Won</p>
                  <p className="text-xl font-bold text-gray-900">
                    {vendor.leads_closed}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2.5">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Win Rate</p>
                  <p className="text-xl font-bold text-gray-900">{winRate}%</p>
                </div>
              </div>
              {vendor.avg_response_time_hours && (
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-amber-100 p-2.5">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avg. Response</p>
                    <p className="text-xl font-bold text-gray-900">
                      {vendor.avg_response_time_hours}h
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trust Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16">
                  <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray={`${vendor.trust_score}, 100`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">
                    {vendor.trust_score}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {vendor.trust_score >= 80
                      ? 'Excellent'
                      : vendor.trust_score >= 60
                        ? 'Good'
                        : vendor.trust_score >= 40
                          ? 'Fair'
                          : 'Building'}
                  </p>
                  <p className="text-xs text-gray-500">out of 100</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function InfoRow({
  label,
  value,
}: {
  label: string
  value: string | null | undefined
}) {
  if (!value) return null
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  )
}
