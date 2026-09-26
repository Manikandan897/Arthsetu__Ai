import React, { useState } from 'react';
import { UserProfile, SocialCategory, Gender, BusinessStage, BusinessType, LocationType } from '../../types';
import { STATES_AND_DISTRICTS } from '../../data/partners';
import { NaturalLanguageInput } from './NaturalLanguageInput';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, User, Briefcase, IndianRupee, MapPin, ShieldAlert, Mail, ShieldCheck } from 'lucide-react';
import { formatINR } from '../../services/financialCalculator';
import { useAuth } from '../../context/AuthContext';

interface FindSchemeWizardProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onComplete: () => void;
  initialSampleText?: string;
}

export const FindSchemeWizard: React.FC<FindSchemeWizardProps> = ({
  userProfile,
  setUserProfile,
  onComplete,
  initialSampleText = ''
}) => {
  const { currentUser, saveUserProfile, isSaving } = useAuth();
  const [activeMode, setActiveMode] = useState<'guided' | 'nlp'>(initialSampleText ? 'nlp' : 'guided');
  const [currentStep, setCurrentStep] = useState<number>(1);

  const totalSteps = 5;

  const updateProfile = (fields: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...fields }));
  };

  const handleFinish = async () => {
    if (currentUser) {
      await saveUserProfile(userProfile);
    }
    onComplete();
  };

  const states = Object.keys(STATES_AND_DISTRICTS);
  const currentDistricts = STATES_AND_DISTRICTS[userProfile.state] || STATES_AND_DISTRICTS['Tamil Nadu'];

  const quickAmounts = [
    { label: '₹20,000 (Micro Vendor)', value: 20000 },
    { label: '₹50,000 (Mudra Shishu)', value: 50000 },
    { label: '₹1 Lakh (Artisan / Tailor)', value: 100000 },
    { label: '₹2 Lakh (Small Workshop)', value: 200000 },
    { label: '₹5 Lakh (Mudra Kishore)', value: 500000 },
    { label: '₹10 Lakh (PMEGP Unit)', value: 1000000 },
    { label: '₹25 Lakh (Stand-Up India)', value: 2500000 }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header and Mode Selector */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Find My Government Scheme
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Deterministic rule evaluation ensures accurate, non-hallucinated eligibility matching.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setActiveMode('guided')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeMode === 'guided'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Step-by-Step Form
            </button>
            <button
              onClick={() => setActiveMode('nlp')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeMode === 'nlp'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>In Your Own Words</span>
            </button>
          </div>
        </div>
      </div>

      {activeMode === 'nlp' ? (
        <NaturalLanguageInput
          initialText={initialSampleText}
          onApplyProfile={fields => updateProfile(fields)}
          onProceedToResults={onComplete}
        />
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>
                {currentStep === 1 && 'Personal Information'}
                {currentStep === 2 && 'Business & Purpose'}
                {currentStep === 3 && 'Income & Project Cost'}
                {currentStep === 4 && 'Location & Geography'}
                {currentStep === 5 && 'Eligibility Verification'}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-900 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Step Contents */}
          <form onSubmit={e => e.preventDefault()} className="space-y-6">
            {/* STEP 1: PERSONAL DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <User className="w-4 h-4 text-blue-700" />
                  <h3 className="text-base font-bold text-slate-900">Step 1: Personal Details</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name of Applicant
                    </label>
                    <input
                      type="text"
                      value={userProfile.fullName}
                      onChange={e => updateProfile({ fullName: e.target.value })}
                      placeholder="e.g. Ramesh Kumar / Meena Devi"
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Age (Years) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min={18}
                      max={75}
                      value={userProfile.age}
                      onChange={e => updateProfile({ age: Number(e.target.value) })}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Minimum legal age is 18 years across all schemes.
                    </span>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={userProfile.gender}
                      onChange={e => updateProfile({ gender: e.target.value as Gender })}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      <option value="Female">Female (Eligible for Stand-Up India & Women Subsidies)</option>
                      <option value="Male">Male</option>
                      <option value="Transgender">Transgender</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  {/* Social Category */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Social Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={userProfile.socialCategory}
                      onChange={e => updateProfile({ socialCategory: e.target.value as SocialCategory })}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-medium"
                    >
                      <option value="OBC">Other Backward Classes (OBC)</option>
                      <option value="SC">Scheduled Caste (SC)</option>
                      <option value="ST">Scheduled Tribe (ST)</option>
                      <option value="Minority">Minority Community (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)</option>
                      <option value="Safai Karamchari">Safai Karamchari / Sanitation Worker Dependent</option>
                      <option value="General">General Category</option>
                    </select>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Enables targeted capital subsidies (e.g. 25%–35% under PMEGP or NSFDC 4% credit).
                    </span>
                  </div>

                  {/* PwD / Divyangjan */}
                  <div className="flex flex-col justify-center">
                    <label className="text-xs font-semibold text-slate-700 mb-2">
                      Special Category / Divyangjan (PwD)
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userProfile.isDivyangjan}
                        onChange={e => updateProfile({ isDivyangjan: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-900 focus:ring-blue-600"
                      />
                      <span>Applicant possesses Divyangjan / Disability Certificate</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: BUSINESS & PURPOSE */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Briefcase className="w-4 h-4 text-blue-700" />
                  <h3 className="text-base font-bold text-slate-900">Step 2: Business & Enterprise Purpose</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Business Stage */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Stage <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={userProfile.businessStage}
                      onChange={e => updateProfile({ businessStage: e.target.value as BusinessStage })}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      <option value="New Idea / Startup">New Idea / Startup (First-time Greenfield)</option>
                      <option value="Existing Enterprise (< 3 yrs)">Existing Enterprise (&lt; 3 years old)</option>
                      <option value="Expanding Enterprise (> 3 yrs)">Expanding Enterprise (&gt; 3 years old)</option>
                    </select>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      PMEGP and Stand-Up India require first-time new enterprises.
                    </span>
                  </div>

                  {/* Business Type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Classification <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={userProfile.businessType}
                      onChange={e => updateProfile({ businessType: e.target.value as BusinessType })}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      <option value="Traditional Artisan / Craft">Traditional Artisan / Craft (18 notified trades)</option>
                      <option value="Manufacturing / Production">Manufacturing / Processing Workshop</option>
                      <option value="Services">Services, Maintenance & Repair</option>
                      <option value="Retail / Trading">Retail Kirana / Trading Outlet</option>
                      <option value="Street Vending / Micro Hawkers">Street Vending / Micro Hawker</option>
                      <option value="Agriculture Allied">Agriculture Allied (Dairy, Poultry, Fishery)</option>
                    </select>
                  </div>

                  {/* Specific Trade / Activity */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Specific Trade / Activity Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={userProfile.tradeOrActivity}
                      onChange={e => updateProfile({ tradeOrActivity: e.target.value })}
                      placeholder="e.g. Tailoring (Darzi), Pottery (Kumhaar), Carpentry, Street Snack Cart, Mobile Repair"
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Brief Description of Business / Required Equipment
                    </label>
                    <textarea
                      rows={2}
                      value={userProfile.businessDescription}
                      onChange={e => updateProfile({ businessDescription: e.target.value })}
                      placeholder="e.g. Setting up a garment stitching unit with 2 commercial electric sewing machines and inventory."
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Checkboxes: Udyam & Training */}
                  <div className="sm:col-span-2 flex flex-wrap gap-4 pt-1">
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userProfile.hasUdyamRegistration}
                        onChange={e => updateProfile({ hasUdyamRegistration: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-900 focus:ring-blue-600"
                      />
                      <span>Already have Udyam MSME Registration Certificate</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userProfile.hasPriorTraining}
                        onChange={e => updateProfile({ hasPriorTraining: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-900 focus:ring-blue-600"
                      />
                      <span>Completed formal trade / vocational training (ITI / RSETI)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: INCOME & PROJECT COST */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <IndianRupee className="w-4 h-4 text-blue-700" />
                  <h3 className="text-base font-bold text-slate-900">Step 3: Income & Project Cost</h3>
                </div>

                <div className="space-y-4">
                  {/* Loan Amount */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Required Loan / Financial Assistance (₹) <span className="text-red-500">*</span>
                      </label>
                      <span className="text-sm font-bold text-blue-900 font-mono">
                        {formatINR(userProfile.requiredLoanAmount)}
                      </span>
                    </div>
                    <input
                      type="number"
                      step={5000}
                      value={userProfile.requiredLoanAmount}
                      onChange={e => updateProfile({ requiredLoanAmount: Math.max(5000, Number(e.target.value)) })}
                      className="w-full text-sm p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                    />

                    {/* Quick Presets */}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {quickAmounts.map(item => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => updateProfile({ requiredLoanAmount: item.value })}
                          className={`text-[11px] px-2.5 py-1 rounded border transition-colors ${
                            userProfile.requiredLoanAmount === item.value
                              ? 'bg-blue-900 text-white border-blue-900 font-semibold'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Own Contribution */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Own Investment / Promoter Margin (₹)
                      </label>
                      <input
                        type="number"
                        step={1000}
                        value={userProfile.ownContribution}
                        onChange={e => updateProfile({ ownContribution: Number(e.target.value) })}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Government schemes require only 5% to 15% own contribution for marginalized groups.
                      </span>
                    </div>

                    {/* Annual Family Income */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Annual Household Income (₹)
                      </label>
                      <input
                        type="number"
                        step={10000}
                        value={userProfile.annualHouseholdIncome}
                        onChange={e => updateProfile({ annualHouseholdIncome: Number(e.target.value) })}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Income &lt; ₹3,00,000 qualifies for concessional 4%–5% NSFDC & NBCFDC schemes.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: LOCATION & GEOGRAPHY */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <MapPin className="w-4 h-4 text-blue-700" />
                  <h3 className="text-base font-bold text-slate-900">Step 4: Location & Geography</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* State */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      State / Union Territory <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={userProfile.state}
                      onChange={e => {
                        const newState = e.target.value;
                        const dists = STATES_AND_DISTRICTS[newState] || [];
                        updateProfile({
                          state: newState,
                          district: dists.length > 0 ? dists[0] : 'Default District'
                        });
                      }}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-medium"
                    >
                      {states.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      District <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={userProfile.district}
                      onChange={e => updateProfile({ district: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      {currentDistricts.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  {/* Area Type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Area Classification <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={userProfile.locationType}
                      onChange={e => updateProfile({ locationType: e.target.value as LocationType })}
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-medium"
                    >
                      <option value="Rural">Rural (Gram Panchayat / Village)</option>
                      <option value="Semi-Urban">Semi-Urban (Town / Nagar Panchayat)</option>
                      <option value="Urban">Urban (City / Municipal Corporation)</option>
                      <option value="Aspirational District">Aspirational District (Special NITI Aayog Focus)</option>
                    </select>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Rural units under PMEGP receive up to 35% margin money subsidy.
                    </span>
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pincode (6 digits)
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={userProfile.pincode}
                      onChange={e => updateProfile({ pincode: e.target.value })}
                      placeholder="e.g. 600001"
                      className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Enables precise distance mapping to nearby bank branches.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: ELIGIBILITY VERIFICATION DETAILS */}
            {currentStep === 5 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <ShieldAlert className="w-4 h-4 text-blue-700" />
                  <h3 className="text-base font-bold text-slate-900">Step 5: Institutional Eligibility Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                    <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userProfile.isShgMember}
                        onChange={e => updateProfile({ isShgMember: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-900 focus:ring-blue-600 mt-0.5"
                      />
                      <div>
                        <span className="font-semibold text-slate-900 block">
                          Self Help Group (SHG) / JLGs Member
                        </span>
                        <span className="text-slate-500">
                          Applicant is an active member of a recognized Women SHG or Joint Liability Group.
                        </span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userProfile.isBPLOrLowIncome}
                        onChange={e => updateProfile({ isBPLOrLowIncome: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-900 focus:ring-blue-600 mt-0.5"
                      />
                      <div>
                        <span className="font-semibold text-slate-900 block">
                          Possesses BPL Ration Card / Antyodaya Card
                        </span>
                        <span className="text-slate-500">
                          Confirms priority classification for socio-economic corporation schemes.
                        </span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!userProfile.hasExistingBankLoan}
                        onChange={e => updateProfile({ hasExistingBankLoan: !e.target.checked })}
                        className="w-4 h-4 rounded text-blue-900 focus:ring-blue-600 mt-0.5"
                      />
                      <div>
                        <span className="font-semibold text-slate-900 block">
                          No Overdue / Non-Performing Loans
                        </span>
                        <span className="text-slate-500">
                          Confirm you do not have unresolved defaults in existing bank loans (mandatory for institutional sanctions).
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs space-y-1.5">
                    <div className="font-bold text-blue-950 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-700" />
                      <span>Ready for Rule-Verified Eligibility Evaluation</span>
                    </div>
                    <p className="text-blue-900 leading-relaxed">
                      Our system will now evaluate your profile against all 8 Central Government Schemes using exact statutory eligibility formulas. We will present your profile match percentage, matching conditions, and items requiring branch verification.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-md transition-colors cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-md shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>Verify Eligibility & View Results</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
