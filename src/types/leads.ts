import { z } from 'zod'

// ============================================================
// Job Types (replaces moveType: residential | commercial)
// ============================================================

export const JOB_TYPES = [
  'data_center_relocation',
  'itad',
  'asset_recovery',
  'office_decommission',
  'equipment_delivery',
] as const

export type JobType = (typeof JOB_TYPES)[number]

export const jobTypeOptions = [
  {
    value: 'data_center_relocation',
    label: 'Data Center Relocation',
    description: 'Full rack migrations and populated server rack transport between data centers and colo facilities',
    icon: 'Server',
  },
  {
    value: 'itad',
    label: 'IT Asset Disposition (ITAD)',
    description: 'Secure data destruction, certified e-waste recycling, asset remarketing, and chain of custody tracking',
    icon: 'Recycle',
  },
  {
    value: 'asset_recovery',
    label: 'IT Asset Recovery',
    description: 'Physical retrieval of IT equipment from remote sites, offices, and decommissioned facilities',
    icon: 'PackageSearch',
  },
  {
    value: 'office_decommission',
    label: 'Office IT Decommission',
    description: 'Removing IT infrastructure from offices during relocations, closures, or consolidations',
    icon: 'Building2',
  },
  {
    value: 'equipment_delivery',
    label: 'White Glove Delivery & Install',
    description: 'Premium delivery, rack & stack installation, cabling, and power-on testing of IT equipment',
    icon: 'Truck',
  },
] as const

// ============================================================
// Equipment Types (what is being moved/handled)
// ============================================================

export const equipmentTypeOptions = [
  { value: 'populated_server_racks', label: 'Populated Server Racks' },
  { value: 'ups_battery_systems', label: 'UPS / Battery Systems' },
  { value: 'network_switches', label: 'Network Switches & Routers' },
  { value: 'storage_arrays', label: 'Storage Arrays / SAN' },
  { value: 'blade_chassis', label: 'Blade Chassis' },
  { value: 'pdus', label: 'PDUs (Power Distribution Units)' },
  { value: 'cable_trays', label: 'Cable Trays & Management' },
  { value: 'desktop_workstations', label: 'Desktop Workstations' },
  { value: 'monitors_displays', label: 'Monitors & Digital Displays' },
  { value: 'printers_mfps', label: 'Printers / MFPs' },
  { value: 'telecom_equipment', label: 'Telecom / VoIP Equipment' },
  { value: 'security_cameras', label: 'Security / Surveillance Systems' },
] as const

// ============================================================
// Handling Requirements (how it needs to be handled)
// ============================================================

export const handlingRequirementOptions = [
  { value: 'climate_controlled', label: 'Climate-Controlled Transport' },
  { value: 'anti_static', label: 'Anti-Static Packaging' },
  { value: 'liftgate_required', label: 'Liftgate Required' },
  { value: 'crating_palletizing', label: 'Crating / Palletizing' },
  { value: 'escort_security', label: 'Escort / Security Required' },
  { value: 'shock_pallets', label: 'Shock Pallets' },
  { value: 'pallet_jacks_only', label: 'No Forklifts — Pallet Jacks Only' },
  { value: 'blanket_wrap', label: 'Blanket Wrap Protection' },
  { value: 'gps_tracking', label: 'GPS Tracking in Transit' },
  { value: 'after_hours', label: 'After-Hours / Weekend Service' },
] as const

// ============================================================
// Facility Types
// ============================================================

export const facilityTypeOptions = [
  { value: 'colocation_dc', label: 'Colocation Data Center' },
  { value: 'enterprise_dc', label: 'Enterprise Data Center' },
  { value: 'office', label: 'Office Building' },
  { value: 'warehouse', label: 'Warehouse / Storage' },
  { value: 'edge_mdf', label: 'Edge Site / MDF / IDF Room' },
  { value: 'government', label: 'Government / Secure Facility' },
] as const

// ============================================================
// Weight Estimate Options
// ============================================================

export const weightEstimateOptions = [
  { value: 'under_500', label: 'Under 500 lbs' },
  { value: '500_2000', label: '500 – 2,000 lbs' },
  { value: '2000_5000', label: '2,000 – 5,000 lbs' },
  { value: '5000_10000', label: '5,000 – 10,000 lbs' },
  { value: '10000_plus', label: '10,000+ lbs' },
] as const

// ============================================================
// Security Requirement Options
// ============================================================

export const securityRequirementOptions = [
  { value: 'none', label: 'None' },
  { value: 'escort_required', label: 'Escort Required' },
  { value: 'clearance_required', label: 'Security Clearance Required' },
  { value: 'both', label: 'Escort + Clearance Required' },
] as const

// ============================================================
// Loading Dock Access Options
// ============================================================

export const loadingDockOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unknown', label: 'Unknown' },
] as const

// ============================================================
// Job Type Field Configuration
// Determines which wizard steps and fields appear per job type
// ============================================================

export type FieldVisibility = 'required' | 'optional' | 'hidden'

export interface JobTypeFieldConfig {
  label: string
  showOriginFacility: boolean
  showDestinationFacility: boolean
  showAssetDetails: boolean
  showComplianceStep: boolean
  fields: {
    numberOfRacks: FieldVisibility
    numberOfLooseAssets: FieldVisibility
    totalWeightEstimate: FieldVisibility
    rackUnitCount: FieldVisibility
    equipmentTypes: FieldVisibility
    handlingRequirements: FieldVisibility
    dataDestructionRequired: FieldVisibility
    certificateOfDestructionNeeded: FieldVisibility
    chainOfCustodyTracking: FieldVisibility
    securityClearanceRequired: FieldVisibility
  }
}

export const JOB_TYPE_FIELD_CONFIG: Record<JobType, JobTypeFieldConfig> = {
  data_center_relocation: {
    label: 'Data Center Relocation',
    showOriginFacility: true,
    showDestinationFacility: true,
    showAssetDetails: true,
    showComplianceStep: true,
    fields: {
      numberOfRacks: 'required',
      numberOfLooseAssets: 'optional',
      totalWeightEstimate: 'required',
      rackUnitCount: 'optional',
      equipmentTypes: 'required',
      handlingRequirements: 'required',
      dataDestructionRequired: 'optional',
      certificateOfDestructionNeeded: 'optional',
      chainOfCustodyTracking: 'required',
      securityClearanceRequired: 'optional',
    },
  },
  itad: {
    label: 'IT Asset Disposition (ITAD)',
    showOriginFacility: true,
    showDestinationFacility: false, // vendor handles destination
    showAssetDetails: true,
    showComplianceStep: true,
    fields: {
      numberOfRacks: 'optional',
      numberOfLooseAssets: 'required',
      totalWeightEstimate: 'optional',
      rackUnitCount: 'optional',
      equipmentTypes: 'required',
      handlingRequirements: 'optional',
      dataDestructionRequired: 'required',
      certificateOfDestructionNeeded: 'required',
      chainOfCustodyTracking: 'required',
      securityClearanceRequired: 'optional',
    },
  },
  asset_recovery: {
    label: 'IT Asset Recovery',
    showOriginFacility: true,
    showDestinationFacility: true,
    showAssetDetails: true,
    showComplianceStep: true,
    fields: {
      numberOfRacks: 'optional',
      numberOfLooseAssets: 'required',
      totalWeightEstimate: 'optional',
      rackUnitCount: 'hidden',
      equipmentTypes: 'required',
      handlingRequirements: 'optional',
      dataDestructionRequired: 'optional',
      certificateOfDestructionNeeded: 'optional',
      chainOfCustodyTracking: 'required',
      securityClearanceRequired: 'optional',
    },
  },
  office_decommission: {
    label: 'Office IT Decommission',
    showOriginFacility: true,
    showDestinationFacility: false, // decommission = removal from origin
    showAssetDetails: true,
    showComplianceStep: true,
    fields: {
      numberOfRacks: 'optional',
      numberOfLooseAssets: 'required',
      totalWeightEstimate: 'optional',
      rackUnitCount: 'hidden',
      equipmentTypes: 'required',
      handlingRequirements: 'optional',
      dataDestructionRequired: 'optional',
      certificateOfDestructionNeeded: 'optional',
      chainOfCustodyTracking: 'optional',
      securityClearanceRequired: 'optional',
    },
  },
  equipment_delivery: {
    label: 'White Glove Delivery & Install',
    showOriginFacility: false, // pickup from vendor/manufacturer
    showDestinationFacility: true,
    showAssetDetails: true,
    showComplianceStep: false,
    fields: {
      numberOfRacks: 'required',
      numberOfLooseAssets: 'optional',
      totalWeightEstimate: 'required',
      rackUnitCount: 'optional',
      equipmentTypes: 'required',
      handlingRequirements: 'required',
      dataDestructionRequired: 'hidden',
      certificateOfDestructionNeeded: 'hidden',
      chainOfCustodyTracking: 'optional',
      securityClearanceRequired: 'optional',
    },
  },
}

// ============================================================
// Zod Schemas
// ============================================================

const zipSchema = z.string().regex(/^\d{5}$/, 'Enter a valid 5-digit ZIP code')
const phoneSchema = z
  .string()
  .regex(/^[\d\s\-\(\)\+]+$/, 'Enter a valid phone number')
  .optional()
  .or(z.literal(''))

// Mini calculator schema (homepage)
export const miniQuoteSchema = z.object({
  jobType: z.enum(JOB_TYPES, {
    message: 'Please select a job type',
  }),
  assetCount: z.coerce
    .number()
    .min(1, 'Enter at least 1 asset')
    .max(500, 'For 500+ assets, please use the full quote form'),
  originZip: zipSchema,
  destinationZip: zipSchema,
})

// Facility sub-schema (used for origin and destination)
export const facilitySchema = z.object({
  zip: zipSchema,
  address: z.string().optional(),
  facilityType: z.string().min(1, 'Please select facility type'),
  loadingDockAccess: z.string().optional(),
  floorLevel: z.coerce.number().min(0).max(99).optional(),
  freightElevator: z.boolean().optional(),
  securityRequirements: z.string().optional(),
})

// Full quote form schema
export const quoteFormSchema = z.object({
  // Job type
  jobType: z.enum(JOB_TYPES, {
    message: 'Please select a job type',
  }),

  // Company info
  company: z.string().min(2, 'Company name is required').optional().or(z.literal('')),
  title: z.string().optional(),

  // Origin facility
  originZip: zipSchema,
  originAddress: z.string().optional(),
  originFacilityType: z.string().optional(),
  originLoadingDock: z.string().optional(),
  originFloorLevel: z.coerce.number().min(0).max(99).optional(),
  originFreightElevator: z.boolean().optional(),
  originSecurityRequirements: z.string().optional(),

  // Destination facility
  destinationZip: zipSchema.optional().or(z.literal('')),
  destinationAddress: z.string().optional(),
  destinationFacilityType: z.string().optional(),
  destinationLoadingDock: z.string().optional(),
  destinationFloorLevel: z.coerce.number().min(0).max(99).optional(),
  destinationFreightElevator: z.boolean().optional(),
  destinationSecurityRequirements: z.string().optional(),

  // Asset details
  numberOfRacks: z.coerce.number().min(0).max(500).optional(),
  numberOfLooseAssets: z.coerce.number().min(0).max(10000).optional(),
  totalWeightEstimate: z.string().optional(),
  rackUnitCount: z.coerce.number().min(0).max(5000).optional(),
  equipmentTypes: z.array(z.string()).default([]),
  handlingRequirements: z.array(z.string()).default([]),

  // Compliance & security
  dataDestructionRequired: z.boolean().default(false),
  certificateOfDestructionNeeded: z.boolean().default(false),
  chainOfCustodyTracking: z.boolean().default(false),
  securityClearanceRequired: z.boolean().default(false),
  complianceNotes: z.string().optional(),

  // Service date
  serviceDate: z.string().min(1, 'Please select a service date'),
  isFlexible: z.boolean().default(false),

  // Contact info
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: phoneSchema,
  contactConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to be contacted',
  }),
})

// ============================================================
// Inferred Types
// ============================================================

export type MiniQuoteFormData = z.infer<typeof miniQuoteSchema>
export type QuoteFormData = z.infer<typeof quoteFormSchema>
export type FacilityData = z.infer<typeof facilitySchema>
