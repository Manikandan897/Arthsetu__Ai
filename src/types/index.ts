export type SocialCategory = 'SC' | 'ST' | 'OBC' | 'Minority' | 'Safai Karamchari' | 'General' | 'Other';
export type Gender = 'Female' | 'Male' | 'Transgender' | 'Prefer not to say';
export type BusinessStage = 'New Idea / Startup' | 'Existing Enterprise (< 3 yrs)' | 'Expanding Enterprise (> 3 yrs)';
export type BusinessType = 'Manufacturing / Production' | 'Services' | 'Retail / Trading' | 'Traditional Artisan / Craft' | 'Street Vending / Micro Hawkers' | 'Agriculture Allied';
export type LocationType = 'Rural' | 'Semi-Urban' | 'Urban' | 'Aspirational District';

export interface UserProfile {
  // Account & Contact
  userId?: string;
  email?: string;
  phone?: string;

  // Personal Details
  fullName: string;
  age: number;
  gender: Gender;
  socialCategory: SocialCategory;
  isDivyangjan: boolean; // PwD
  isBPLOrLowIncome: boolean;

  // Business & Purpose
  businessStage: BusinessStage;
  businessType: BusinessType;
  tradeOrActivity: string; // e.g. "Tailoring & Garments", "Pottery", "Street Food"
  businessDescription: string;
  hasPriorTraining: boolean;
  hasUdyamRegistration: boolean;
  isShgMember: boolean; // Self Help Group member

  // Financials & Project Cost
  requiredLoanAmount: number; // in INR
  ownContribution: number; // in INR
  annualHouseholdIncome: number; // in INR
  hasExistingBankLoan: boolean;
  hasCollateral?: boolean;

  // Location
  state: string;
  district: string;
  pincode: string;
  locationType: LocationType;
}

export type PartnerType =
  | 'Public Sector Bank'
  | 'Regional Rural Bank (RRB)'
  | 'Small Finance Bank (SFB)'
  | 'District Industries Centre (DIC)'
  | 'KVIC / KVIB Office'
  | 'SIDBI Branch'
  | 'CSC / Common Service Centre';

export interface SchemeDocument {
  id: string;
  name: string;
  category: 'Identity' | 'Address' | 'Income' | 'Business / Project' | 'Category / Caste' | 'Bank';
  description: string;
  mandatory: boolean;
  howToObtain: string;
}

export type DocumentRequirement = SchemeDocument;

export interface ChannelPartnerInfo {
  type: string;
  description: string;
  examples: string[];
}

export interface Scheme {
  id: string;
  code: string; // e.g., "PMMY-KISHORE", "PM-VISHWAKARMA"
  name: string;
  shortName: string;
  ministry: string;
  nodalAgency: string;
  tagline: string;
  shortDescription: string;
  overview: string;
  categoryTag: string; // e.g., "Micro Enterprise", "Artisan & Craft", "Women / SC / ST"

  // Financial Bounds
  minLoanAmount: number;
  maxLoanAmount: number;
  assistanceType: string;
  subsidyInfo: {
    hasSubsidy: boolean;
    percentageText?: string;
    description: string;
  };
  interestRate: {
    min: number;
    max: number;
    subsidizedRate?: number;
    displayText: string;
    note: string;
  };
  moratoriumPeriod: string;
  repaymentTenure: string;

  // Eligibility Rules
  eligibility: {
    targetAudience: string[];
    allowedCategories: SocialCategory[];
    allowedGenders?: Gender[];
    minAge?: number;
    maxAge?: number;
    maxAnnualIncome?: number;
    allowedBusinessTypes: BusinessType[];
    collateralRequired: boolean;
    specialRequirements: string[];
  };

  // Benefits & Features
  benefits: string[];
  keyHighlights: string[];

  // Documents
  documents: SchemeDocument[];

  // Application
  applicationRoute: 'Online Portal' | 'Bank Branch / Nodal Office' | 'Hybrid (Portal + Branch Verification)';
  applicationSteps: string[];
  channelPartners: ChannelPartnerInfo[];
  officialPortalUrl: string;
  officialGuidelineUrl?: string;
  importantNotes: string[];
  lastUpdated: string;
}

export interface SchemeMatchResult {
  scheme: Scheme;
  matchScore: number; // 0 - 100
  matchLevel: 'High Profile Match' | 'Moderate Profile Match' | 'Specialized Category Match';
  matchingCriteria: string[]; // ✓ Met
  verificationRequired: string[]; // ⚠ Needs verification
  missingInformation: string[]; // ℹ Profile fields needed for exact match
  estimatedSubsidyAmount?: number;
  estimatedEmiRange?: string;
}

export interface PartnerLocation {
  id: string;
  name: string;
  type: 'Public Sector Bank' | 'District Industries Centre (DIC)' | 'KVIC / KVIB Office' | 'SIDBI Branch' | 'Regional Rural Bank (RRB)' | 'CSC / Common Service Centre';
  state: string;
  district: string;
  pincode: string;
  address: string;
  distanceKm: number;
  contactPerson: string;
  phone: string;
  email: string;
  supportedSchemes: string[]; // Scheme IDs
  timings: string;
  servicesOffered: string[];
  isDemoData: boolean;
}

export interface AmortizationMonth {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  isMoratorium: boolean;
}

export interface FinancialCalculationResult {
  loanAmount: number;
  annualInterestRate: number;
  tenureMonths: number;
  moratoriumMonths: number;
  monthlyEmi: number;
  totalInterest: number;
  totalRepayment: number;
  interestDuringMoratorium: number;
  effectiveCostPerMonth: number;
  schedule: AmortizationMonth[];
}

export interface ExtractedProfileData {
  tradeOrActivity?: string;
  businessType?: BusinessType;
  businessStage?: BusinessStage;
  requiredLoanAmount?: number;
  socialCategory?: SocialCategory;
  gender?: Gender;
  state?: string;
  district?: string;
  extractedTextSummary: string;
  confidenceScore: number;
  missingFields: string[];
}

export type ActiveTab = 
  | 'home'
  | 'find-scheme'
  | 'scheme-results'
  | 'compare'
  | 'calculator'
  | 'partners'
  | 'documents'
  | 'guidance'
  | 'dashboard'
  | 'profile'
  | 'login';
