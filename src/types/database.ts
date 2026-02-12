export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ============================================================
// Enums
// ============================================================

export type LeadStatus =
  | 'new'
  | 'enriched'
  | 'vetted'
  | 'available'
  | 'sent_to_vendor'
  | 'vendor_accepted'
  | 'quoted'
  | 'sold'
  | 'won'
  | 'lost'
  | 'expired'
  | 'closed'

export type LeadSource = 'form' | 'chat' | 'phone' | 'ai_quote'

export type JobType =
  | 'data_center_relocation'
  | 'itad'
  | 'asset_recovery'
  | 'office_decommission'
  | 'equipment_delivery'

export type DistanceSource = 'google_maps' | 'cache' | 'estimate'

export type PricingRuleType =
  | 'labor_rate'
  | 'material_cost'
  | 'trip_charge'
  | 'weight_tier'
  | 'compliance_surcharge'
  | 'distance_tier'
  | 'lead_price'

export type VendorStatus = 'pending' | 'approved' | 'rejected' | 'suspended'

export type CompanyTier = 'enterprise' | 'mid_market' | 'smb' | 'unknown'

export type LeadTier = 'premium' | 'standard' | 'basic'

export type PurchaseStatus = 'pending' | 'completed' | 'refunded'

export type PurchaseOutcome = 'pending' | 'won' | 'lost' | 'no_response'

// ============================================================
// Database Schema
// ============================================================

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          status: LeadStatus
          source: LeadSource

          // Contact
          name: string
          email: string
          phone: string | null
          company: string | null
          title: string | null
          contact_consent: boolean
          consent_timestamp: string | null

          // Job details
          job_type: JobType | null
          service_date: string | null
          is_flexible: boolean
          timeline: string | null

          // Origin facility
          origin_zip: string | null
          origin_address: string | null
          origin_state: string | null
          origin_facility_type: string | null
          origin_loading_dock: string | null
          origin_floor_level: number | null
          origin_freight_elevator: boolean | null
          origin_security_requirements: string | null

          // Destination facility
          destination_zip: string | null
          destination_address: string | null
          destination_state: string | null
          destination_facility_type: string | null
          destination_loading_dock: string | null
          destination_floor_level: number | null
          destination_freight_elevator: boolean | null
          destination_security_requirements: string | null

          // Asset details
          number_of_racks: number | null
          number_of_loose_assets: number | null
          total_weight_estimate: string | null
          rack_unit_count: number | null
          equipment_types: Json
          handling_requirements: Json

          // Compliance & security
          data_destruction_required: boolean
          certificate_of_destruction_needed: boolean
          chain_of_custody_tracking: boolean
          security_clearance_required: boolean
          compliance_notes: string | null

          // Job quote (PowerRoute pricing engine)
          quote_low: number | null
          quote_high: number | null
          quote_method: string

          // Distance
          distance_miles: number | null
          distance_source: DistanceSource | null

          // Vendor assignment (admin-routed)
          vendor_id: string | null
          vendor_assigned_at: string | null
          vendor_notes: string | null

          // Company enrichment
          company_domain: string | null
          company_tier: CompanyTier | null
          company_revenue: string | null
          company_industry: string | null
          company_employee_count: number | null
          enrichment_data: Json

          // Lead marketplace
          estimated_job_value: number | null
          lead_tier: LeadTier | null
          lead_price: number | null
          sold_count: number
          max_sales: number
          sold_at: string | null

          // Attribution
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          utm_params: Json
          landing_page: string | null
          referrer: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          status?: LeadStatus
          source?: LeadSource

          name: string
          email: string
          phone?: string | null
          company?: string | null
          title?: string | null
          contact_consent?: boolean
          consent_timestamp?: string | null

          job_type?: JobType | null
          service_date?: string | null
          is_flexible?: boolean
          timeline?: string | null

          origin_zip?: string | null
          origin_address?: string | null
          origin_state?: string | null
          origin_facility_type?: string | null
          origin_loading_dock?: string | null
          origin_floor_level?: number | null
          origin_freight_elevator?: boolean | null
          origin_security_requirements?: string | null

          destination_zip?: string | null
          destination_address?: string | null
          destination_state?: string | null
          destination_facility_type?: string | null
          destination_loading_dock?: string | null
          destination_floor_level?: number | null
          destination_freight_elevator?: boolean | null
          destination_security_requirements?: string | null

          number_of_racks?: number | null
          number_of_loose_assets?: number | null
          total_weight_estimate?: string | null
          rack_unit_count?: number | null
          equipment_types?: Json
          handling_requirements?: Json

          data_destruction_required?: boolean
          certificate_of_destruction_needed?: boolean
          chain_of_custody_tracking?: boolean
          security_clearance_required?: boolean
          compliance_notes?: string | null

          quote_low?: number | null
          quote_high?: number | null
          quote_method?: string

          distance_miles?: number | null
          distance_source?: DistanceSource | null

          vendor_id?: string | null
          vendor_assigned_at?: string | null
          vendor_notes?: string | null

          company_domain?: string | null
          company_tier?: CompanyTier | null
          company_revenue?: string | null
          company_industry?: string | null
          company_employee_count?: number | null
          enrichment_data?: Json

          estimated_job_value?: number | null
          lead_tier?: LeadTier | null
          lead_price?: number | null
          sold_count?: number
          max_sales?: number
          sold_at?: string | null

          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_params?: Json
          landing_page?: string | null
          referrer?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          status?: LeadStatus
          source?: LeadSource

          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          title?: string | null
          contact_consent?: boolean
          consent_timestamp?: string | null

          job_type?: JobType | null
          service_date?: string | null
          is_flexible?: boolean
          timeline?: string | null

          origin_zip?: string | null
          origin_address?: string | null
          origin_state?: string | null
          origin_facility_type?: string | null
          origin_loading_dock?: string | null
          origin_floor_level?: number | null
          origin_freight_elevator?: boolean | null
          origin_security_requirements?: string | null

          destination_zip?: string | null
          destination_address?: string | null
          destination_state?: string | null
          destination_facility_type?: string | null
          destination_loading_dock?: string | null
          destination_floor_level?: number | null
          destination_freight_elevator?: boolean | null
          destination_security_requirements?: string | null

          number_of_racks?: number | null
          number_of_loose_assets?: number | null
          total_weight_estimate?: string | null
          rack_unit_count?: number | null
          equipment_types?: Json
          handling_requirements?: Json

          data_destruction_required?: boolean
          certificate_of_destruction_needed?: boolean
          chain_of_custody_tracking?: boolean
          security_clearance_required?: boolean
          compliance_notes?: string | null

          quote_low?: number | null
          quote_high?: number | null
          quote_method?: string

          distance_miles?: number | null
          distance_source?: DistanceSource | null

          vendor_id?: string | null
          vendor_assigned_at?: string | null
          vendor_notes?: string | null

          company_domain?: string | null
          company_tier?: CompanyTier | null
          company_revenue?: string | null
          company_industry?: string | null
          company_employee_count?: number | null
          enrichment_data?: Json

          estimated_job_value?: number | null
          lead_tier?: LeadTier | null
          lead_price?: number | null
          sold_count?: number
          max_sales?: number
          sold_at?: string | null

          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_params?: Json
          landing_page?: string | null
          referrer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'leads_vendor_id_fkey'
            columns: ['vendor_id']
            referencedRelation: 'vendors'
            referencedColumns: ['id']
          },
        ]
      }
      vendors: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string | null
          status: VendorStatus

          // Company
          name: string
          company_name: string | null
          website: string | null
          years_in_business: number | null
          description: string | null
          logo_url: string | null

          // Contact
          contact_name: string
          contact_email: string
          contact_phone: string | null

          // Capabilities
          job_types: string[]
          specialties: string[]
          geographic_coverage: string[]
          regions_served: string[]
          nationwide: boolean
          certifications: string[]
          equipment: string[]
          capacity: string | null

          // Performance
          performance_score: number
          win_rate: number
          avg_response_time_hours: number | null

          // Trust
          verified: boolean
          trust_score: number
          admin_notes: string | null
          insurance_coverage: string | null

          // Billing
          pricing_tier: string | null
          stripe_customer_id: string | null
          subscription_tier: string | null
          subscription_status: string | null

          // Stats
          leads_purchased: number
          leads_closed: number

          // Config
          is_active: boolean
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          status?: VendorStatus

          name: string
          company_name?: string | null
          website?: string | null
          years_in_business?: number | null
          description?: string | null
          logo_url?: string | null

          contact_name: string
          contact_email: string
          contact_phone?: string | null

          job_types?: string[]
          specialties?: string[]
          geographic_coverage?: string[]
          regions_served?: string[]
          nationwide?: boolean
          certifications?: string[]
          equipment?: string[]
          capacity?: string | null

          performance_score?: number
          win_rate?: number
          avg_response_time_hours?: number | null

          verified?: boolean
          trust_score?: number
          admin_notes?: string | null
          insurance_coverage?: string | null

          pricing_tier?: string | null
          stripe_customer_id?: string | null
          subscription_tier?: string | null
          subscription_status?: string | null

          leads_purchased?: number
          leads_closed?: number

          is_active?: boolean
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          status?: VendorStatus

          name?: string
          company_name?: string | null
          website?: string | null
          years_in_business?: number | null
          description?: string | null
          logo_url?: string | null

          contact_name?: string
          contact_email?: string
          contact_phone?: string | null

          job_types?: string[]
          specialties?: string[]
          geographic_coverage?: string[]
          regions_served?: string[]
          nationwide?: boolean
          certifications?: string[]
          equipment?: string[]
          capacity?: string | null

          performance_score?: number
          win_rate?: number
          avg_response_time_hours?: number | null

          verified?: boolean
          trust_score?: number
          admin_notes?: string | null
          insurance_coverage?: string | null

          pricing_tier?: string | null
          stripe_customer_id?: string | null
          subscription_tier?: string | null
          subscription_status?: string | null

          leads_purchased?: number
          leads_closed?: number

          is_active?: boolean
          notes?: string | null
        }
        Relationships: []
      }
      pricing_rules: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          rule_type: PricingRuleType
          job_type: JobType | null
          key: string
          value: number
          label: string | null
          sort_order: number
          is_active: boolean
          company_tier: CompanyTier | null
          min_job_value: number | null
          max_job_value: number | null
          region: string | null
          base_price: number | null
          multiplier: number
          priority: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          rule_type: PricingRuleType
          job_type?: JobType | null
          key: string
          value?: number
          label?: string | null
          sort_order?: number
          is_active?: boolean
          company_tier?: CompanyTier | null
          min_job_value?: number | null
          max_job_value?: number | null
          region?: string | null
          base_price?: number | null
          multiplier?: number
          priority?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          rule_type?: PricingRuleType
          job_type?: JobType | null
          key?: string
          value?: number
          label?: string | null
          sort_order?: number
          is_active?: boolean
          company_tier?: CompanyTier | null
          min_job_value?: number | null
          max_job_value?: number | null
          region?: string | null
          base_price?: number | null
          multiplier?: number
          priority?: number
        }
        Relationships: []
      }
      lead_purchases: {
        Row: {
          id: string
          created_at: string
          lead_id: string
          vendor_id: string
          price_paid: number
          stripe_payment_intent_id: string | null
          status: PurchaseStatus
          outcome: PurchaseOutcome
          outcome_value: number | null
          outcome_notes: string | null
          outcome_updated_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          lead_id: string
          vendor_id: string
          price_paid?: number
          stripe_payment_intent_id?: string | null
          status?: PurchaseStatus
          outcome?: PurchaseOutcome
          outcome_value?: number | null
          outcome_notes?: string | null
          outcome_updated_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          lead_id?: string
          vendor_id?: string
          price_paid?: number
          stripe_payment_intent_id?: string | null
          status?: PurchaseStatus
          outcome?: PurchaseOutcome
          outcome_value?: number | null
          outcome_notes?: string | null
          outcome_updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'lead_purchases_lead_id_fkey'
            columns: ['lead_id']
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'lead_purchases_vendor_id_fkey'
            columns: ['vendor_id']
            referencedRelation: 'vendors'
            referencedColumns: ['id']
          },
        ]
      }
      company_enrichments: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          domain: string
          data: Json
          company_size: string | null
          company_revenue: string | null
          company_industry: string | null
          employee_count: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          domain: string
          data?: Json
          company_size?: string | null
          company_revenue?: string | null
          company_industry?: string | null
          employee_count?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          domain?: string
          data?: Json
          company_size?: string | null
          company_revenue?: string | null
          company_industry?: string | null
          employee_count?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// ============================================================
// Convenience Types
// ============================================================

export type Lead = Database['public']['Tables']['leads']['Row']
export type LeadInsert = Database['public']['Tables']['leads']['Insert']
export type LeadUpdate = Database['public']['Tables']['leads']['Update']

export type Vendor = Database['public']['Tables']['vendors']['Row']
export type VendorInsert = Database['public']['Tables']['vendors']['Insert']
export type VendorUpdate = Database['public']['Tables']['vendors']['Update']

export type PricingRule = Database['public']['Tables']['pricing_rules']['Row']
export type PricingRuleInsert = Database['public']['Tables']['pricing_rules']['Insert']
export type PricingRuleUpdate = Database['public']['Tables']['pricing_rules']['Update']

export type LeadPurchase = Database['public']['Tables']['lead_purchases']['Row']
export type LeadPurchaseInsert = Database['public']['Tables']['lead_purchases']['Insert']
export type LeadPurchaseUpdate = Database['public']['Tables']['lead_purchases']['Update']

export type CompanyEnrichment = Database['public']['Tables']['company_enrichments']['Row']
export type CompanyEnrichmentInsert = Database['public']['Tables']['company_enrichments']['Insert']
export type CompanyEnrichmentUpdate = Database['public']['Tables']['company_enrichments']['Update']
