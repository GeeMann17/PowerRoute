import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Users, Package, MapPin, ShieldCheck, Scale } from 'lucide-react'
import type { PricingRule, PricingRuleType } from '@/types/database'

async function getPricingRules() {
  const supabase = await createClient()

  const { data: rules } = await supabase
    .from('pricing_rules')
    .select('*')
    .order('rule_type')
    .order('sort_order')

  return (rules || []) as PricingRule[]
}

function formatValue(rule: PricingRule): string {
  if (rule.rule_type === 'lead_price') {
    const price = (rule.base_price || 0) * (rule.multiplier || 1)
    return `$${price.toFixed(0)}`
  }
  if (rule.rule_type === 'distance_tier') {
    if (rule.value === 0) return 'Included'
    return `$${rule.value}/mile`
  }
  if (rule.rule_type === 'weight_tier') {
    return `$${rule.value}/lb`
  }
  return `$${rule.value}`
}

function getRuleTypeIcon(ruleType: string) {
  switch (ruleType) {
    case 'labor_rate':
      return Users
    case 'material_cost':
      return Package
    case 'trip_charge':
      return MapPin
    case 'weight_tier':
      return Scale
    case 'compliance_surcharge':
      return ShieldCheck
    case 'distance_tier':
      return MapPin
    case 'lead_price':
      return DollarSign
    default:
      return DollarSign
  }
}

function getRuleTypeLabel(ruleType: string): string {
  switch (ruleType) {
    case 'labor_rate':
      return 'Labor Rates'
    case 'material_cost':
      return 'Material Costs'
    case 'trip_charge':
      return 'Trip Charges'
    case 'weight_tier':
      return 'Weight Tiers'
    case 'compliance_surcharge':
      return 'Compliance Surcharges'
    case 'distance_tier':
      return 'Distance Tiers'
    case 'lead_price':
      return 'Lead Marketplace Pricing'
    default:
      return ruleType
  }
}

function getRuleTypeDescription(ruleType: string): string {
  switch (ruleType) {
    case 'labor_rate':
      return 'Hourly rates for technicians and logistics crew'
    case 'material_cost':
      return 'Cost of packing materials, crating, and supplies'
    case 'trip_charge':
      return 'Base charges per truck roll or site visit'
    case 'weight_tier':
      return 'Per-pound rates based on total equipment weight'
    case 'compliance_surcharge':
      return 'Additional costs for data destruction, certificates, and chain of custody'
    case 'distance_tier':
      return 'Per-mile rates based on total distance'
    case 'lead_price':
      return 'Prices vendors pay to purchase leads based on company tier'
    default:
      return ''
  }
}

const jobTypeLabels: Record<string, string> = {
  data_center_relocation: 'DC Relocation',
  itad: 'ITAD',
  asset_recovery: 'Asset Recovery',
  office_decommission: 'Office Decommission',
  equipment_delivery: 'Equipment Delivery',
}

const allJobTypes = ['data_center_relocation', 'itad', 'asset_recovery', 'office_decommission', 'equipment_delivery']

export default async function PricingRulesPage() {
  const rules = await getPricingRules()

  // Group rules by type
  const rulesByType = rules.reduce<Record<string, PricingRule[]>>((acc, rule) => {
    if (!acc[rule.rule_type]) {
      acc[rule.rule_type] = []
    }
    acc[rule.rule_type].push(rule)
    return acc
  }, {})

  const ruleTypes: PricingRuleType[] = ['labor_rate', 'material_cost', 'trip_charge', 'weight_tier', 'compliance_surcharge', 'distance_tier', 'lead_price']

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pricing Rules</h1>
        <p className="text-gray-500 mt-1">
          Configure pricing components for IT logistics quote calculations
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>How pricing works:</strong> Job quotes are calculated from:
          Labor Rate + Material Cost + Trip Charge + Weight-Based Fees + Compliance Surcharges + Distance Cost.
          The displayed range is 85% to 125% of this total. Lead marketplace prices are set separately by company tier.
        </p>
      </div>

      {/* Rules by Type */}
      <div className="grid gap-6">
        {ruleTypes.map((ruleType) => {
          const typeRules = rulesByType[ruleType] || []
          const Icon = getRuleTypeIcon(ruleType)

          return (
            <Card key={ruleType}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-blue-600" />
                  {getRuleTypeLabel(ruleType)}
                </CardTitle>
                <CardDescription>
                  {getRuleTypeDescription(ruleType)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {typeRules.length === 0 ? (
                  <p className="text-sm text-gray-500">No rules configured</p>
                ) : (
                  <div className="space-y-2">
                    {/* Group by job type if there are job-type-specific rules */}
                    {typeRules.some(r => r.job_type) ? (
                      <>
                        {allJobTypes.map((jobType) => {
                          const jobTypeRules = typeRules.filter((r) => r.job_type === jobType)
                          if (jobTypeRules.length === 0) return null

                          return (
                            <div key={jobType} className="mb-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                {jobTypeLabels[jobType] || jobType}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {jobTypeRules.map((rule) => (
                                  <div
                                    key={rule.id}
                                    className={`flex items-center justify-between p-3 rounded-lg border ${
                                      rule.is_active ? 'bg-white' : 'bg-gray-50 opacity-60'
                                    }`}
                                  >
                                    <div>
                                      <p className="font-medium text-sm">
                                        {rule.label || rule.key}
                                      </p>
                                      {!rule.is_active && (
                                        <Badge variant="secondary" className="text-xs mt-1">
                                          Disabled
                                        </Badge>
                                      )}
                                    </div>
                                    <Badge variant="outline" className="font-mono">
                                      {formatValue(rule)}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                        {/* Also show rules with no job type */}
                        {typeRules.filter(r => !r.job_type).length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">All Job Types</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              {typeRules.filter(r => !r.job_type).map((rule) => (
                                <div
                                  key={rule.id}
                                  className={`flex items-center justify-between p-3 rounded-lg border ${
                                    rule.is_active ? 'bg-white' : 'bg-gray-50 opacity-60'
                                  }`}
                                >
                                  <div>
                                    <p className="font-medium text-sm">
                                      {rule.label || rule.key}
                                    </p>
                                    {!rule.is_active && (
                                      <Badge variant="secondary" className="text-xs mt-1">
                                        Disabled
                                      </Badge>
                                    )}
                                  </div>
                                  <Badge variant="outline" className="font-mono">
                                    {formatValue(rule)}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      // Simple list for rules without job type grouping
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {typeRules.map((rule) => (
                          <div
                            key={rule.id}
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              rule.is_active ? 'bg-white' : 'bg-gray-50 opacity-60'
                            }`}
                          >
                            <div>
                              <p className="font-medium text-sm">
                                {rule.label || rule.key}
                              </p>
                              {rule.job_type && (
                                <Badge variant="secondary" className="text-xs mt-1">
                                  {jobTypeLabels[rule.job_type] || rule.job_type}
                                </Badge>
                              )}
                              {!rule.is_active && (
                                <Badge variant="destructive" className="text-xs mt-1 ml-1">
                                  Disabled
                                </Badge>
                              )}
                            </div>
                            <Badge variant="outline" className="font-mono">
                              {formatValue(rule)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Setup Instructions */}
      {rules.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <DollarSign className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Pricing Rules Found
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Run the migration script in your Supabase SQL Editor to set up default pricing rules.
              Check <code className="bg-gray-100 px-1 rounded">supabase/migrations/002_add_pricing_rules.sql</code>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
