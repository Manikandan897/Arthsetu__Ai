import React, { useState } from 'react';
import {
  UserCheck,
  Mail,
  Phone,
  Building2,
  MapPin,
  FileCheck2,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserProfile, SocialCategory, Gender, BusinessStage, BusinessType, LocationType, ActiveTab } from '../../types';
import { OFFICIAL_SCHEMES } from '../../data/schemes';

interface ProfileViewProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSchemeDetails: (schemeId: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  setUserProfile,
  setActiveTab,
  onOpenSchemeDetails
}) => {
  const { currentUser, userEmail, saveUserProfile, isSaving, lastSavedAt, saveStatus, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setUserProfile(formData);

    if (currentUser) {
      const success = await saveUserProfile(formData);
      if (success) {
        setNotification({
          type: 'success',
          message: `Your profile has been saved to your mail ID (${currentUser.email}). All government schemes will now automatically pull these details!`
        });
      } else {
        setNotification({
          type: 'error',
          message: 'Saved locally in session. Cloud synchronization encountered a network delay.'
        });
      }
    } else {
      setNotification({
        type: 'success',
        message: 'Details saved to your local session. Sign in with Google to keep them permanently linked to your mail ID.'
      });
    }

    setTimeout(() => setNotification(null), 6000);
  };

  const activeEmail = currentUser?.email || formData.email || 'Not logged in';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Top Banner & Account Status */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-slate-900 text-amber-400 border-2 border-slate-800 flex items-center justify-center font-bold text-xl font-serif shrink-0 shadow-sm">
            {currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : formData.fullName?.[0]?.toUpperCase() || 'अ'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-slate-900">
                {currentUser?.displayName || formData.fullName || 'Citizen Entrepreneur Profile'}
              </h1>
              {currentUser ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Linked to Mail ID
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Guest / Local Mode
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 flex items-center gap-2 mt-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono text-slate-800 font-medium">{activeEmail}</span>
              {lastSavedAt && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 text-[11px]">Last synced at {lastSavedAt}</span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!currentUser ? (
            <button
              onClick={() => loginWithGoogle()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Link to Google Account</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('login')}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Account Settings
            </button>
          )}

          <button
            onClick={() => handleSave()}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Profile</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs flex items-start gap-3 border ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{notification.message}</span>
        </div>
      )}

      {/* Cross-Scheme Synchronisation Explainer Card */}
      <div className="bg-gradient-to-r from-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>Unified Cross-Scheme Autofill Active</span>
            </div>
            <h2 className="text-lg font-bold text-white">
              Enter Once · Pre-fills Across All 8 Central Schemes
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Whenever you update your trade, location, machinery quotations, or loan requirements below, your ArthSetu Account saves it to your mail ID. Clicking any scheme in the catalog automatically recovers and applies these details without repetitive forms.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('scheme-results')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Explore Matched Schemes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="space-y-8">
        {/* SECTION 1: Personal & Contact Information */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <UserCheck className="w-4 h-4 text-blue-900" />
            <h3 className="text-sm font-bold text-slate-900">1. Citizen Identity & Category Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Legal Name (as per Aadhaar)
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={e => handleChange('fullName', e.target.value)}
                required
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none"
                placeholder="e.g. Ramesh Sundaram"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registered Mail ID
              </label>
              <input
                type="email"
                value={formData.email || activeEmail}
                onChange={e => handleChange('email', e.target.value)}
                readOnly={!!currentUser?.email}
                className="w-full text-xs px-3 py-2 border border-slate-200 bg-slate-50 text-slate-600 rounded-lg cursor-not-allowed font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number (Aadhaar Linked)
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Applicant Age (Years)
              </label>
              <input
                type="number"
                min="18"
                max="75"
                value={formData.age}
                onChange={e => handleChange('age', parseInt(e.target.value) || 18)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Gender Identity
              </label>
              <select
                value={formData.gender}
                onChange={e => handleChange('gender', e.target.value as Gender)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none bg-white"
              >
                <option value="Female">Female (Priority for Stand-Up & Swarnima)</option>
                <option value="Male">Male</option>
                <option value="Transgender">Transgender (Special category concessions)</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Social Demographic Category
              </label>
              <select
                value={formData.socialCategory}
                onChange={e => handleChange('socialCategory', e.target.value as SocialCategory)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none bg-white"
              >
                <option value="SC">Scheduled Caste (SC) · NSFDC, Stand-Up, PMEGP</option>
                <option value="ST">Scheduled Tribe (ST) · Stand-Up, PMEGP</option>
                <option value="OBC">Other Backward Class (OBC) · NBCFDC, PMEGP</option>
                <option value="Safai Karamchari">Safai Karamchari / Sanitation · NSKFDC</option>
                <option value="Minority">Minority Community</option>
                <option value="General">General Category</option>
              </select>
            </div>
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isDivyangjan}
                onChange={e => handleChange('isDivyangjan', e.target.checked)}
                className="rounded text-blue-900 focus:ring-blue-900"
              />
              <span className="text-xs text-slate-700">
                Person with Disability (Divyangjan / PwD) — Eligible for special concession & 35% subsidy
              </span>
            </label>

            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isBPLOrLowIncome}
                onChange={e => handleChange('isBPLOrLowIncome', e.target.checked)}
                className="rounded text-blue-900 focus:ring-blue-900"
              />
              <span className="text-xs text-slate-700">
                BPL Ration Card / Low Household Income Card Holder
              </span>
            </label>
          </div>
        </div>

        {/* SECTION 2: Business & Vocation Profile */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-blue-900" />
            <h3 className="text-sm font-bold text-slate-900">2. Enterprise & Craft Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Stage
              </label>
              <select
                value={formData.businessStage}
                onChange={e => handleChange('businessStage', e.target.value as BusinessStage)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none bg-white"
              >
                <option value="New Idea / Startup">New Idea / Startup (Greenfield unit)</option>
                <option value="Existing Enterprise (< 3 yrs)">Existing Enterprise (&lt; 3 yrs)</option>
                <option value="Expanding Enterprise (> 3 yrs)">Expanding Enterprise (&gt; 3 yrs)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Enterprise Sector / Classification
              </label>
              <select
                value={formData.businessType}
                onChange={e => handleChange('businessType', e.target.value as BusinessType)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none bg-white"
              >
                <option value="Traditional Artisan / Craft">Traditional Artisan / Family Craft (PM Vishwakarma)</option>
                <option value="Street Vending / Micro Hawkers">Street Vending / Micro Hawkers (PM SVANidhi)</option>
                <option value="Manufacturing / Production">Manufacturing / Production (PMEGP / Mudra / Stand-Up)</option>
                <option value="Services">Services (Salons, Repairs, IT, Transport)</option>
                <option value="Retail / Trading">Retail / Trading / Grocery Store</option>
                <option value="Agriculture Allied">Agriculture Allied (Dairy, Poultry, Fishery)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Specific Trade or Activity
              </label>
              <input
                type="text"
                value={formData.tradeOrActivity}
                onChange={e => handleChange('tradeOrActivity', e.target.value)}
                placeholder="e.g. Tailoring & Garments (Darzi), Pottery, Street Tea Stall"
                required
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project & Machinery Description
            </label>
            <textarea
              rows={3}
              value={formData.businessDescription}
              onChange={e => handleChange('businessDescription', e.target.value)}
              placeholder="Describe your machinery needs, raw materials, target customers, and daily operations..."
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasUdyamRegistration}
                onChange={e => handleChange('hasUdyamRegistration', e.target.checked)}
                className="rounded text-blue-900 focus:ring-blue-900"
              />
              <span className="text-xs text-slate-700">
                Udyam Registration Certificate held
              </span>
            </label>

            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasPriorTraining}
                onChange={e => handleChange('hasPriorTraining', e.target.checked)}
                className="rounded text-blue-900 focus:ring-blue-900"
              />
              <span className="text-xs text-slate-700">
                Completed Skill / EDP training
              </span>
            </label>

            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isShgMember}
                onChange={e => handleChange('isShgMember', e.target.checked)}
                className="rounded text-blue-900 focus:ring-blue-900"
              />
              <span className="text-xs text-slate-700">
                Self Help Group (SHG) Member
              </span>
            </label>
          </div>
        </div>

        {/* SECTION 3: Financial Outlay & Project Cost */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FileCheck2 className="w-4 h-4 text-blue-900" />
            <h3 className="text-sm font-bold text-slate-900">3. Financial Requirements & Income Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Total Required Loan / Assistance (₹)
              </label>
              <input
                type="number"
                step="5000"
                min="10000"
                max="10000000"
                value={formData.requiredLoanAmount}
                onChange={e => handleChange('requiredLoanAmount', parseFloat(e.target.value) || 0)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none font-mono"
              />
              <div className="text-[11px] text-slate-500 mt-1">
                Current value: ₹{formData.requiredLoanAmount.toLocaleString('en-IN')}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Own Margin / Promoter Contribution (₹)
              </label>
              <input
                type="number"
                step="1000"
                min="0"
                value={formData.ownContribution}
                onChange={e => handleChange('ownContribution', parseFloat(e.target.value) || 0)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none font-mono"
              />
              <div className="text-[11px] text-slate-500 mt-1">
                Current value: ₹{formData.ownContribution.toLocaleString('en-IN')}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Annual Household Family Income (₹)
              </label>
              <input
                type="number"
                step="10000"
                min="0"
                value={formData.annualHouseholdIncome}
                onChange={e => handleChange('annualHouseholdIncome', parseFloat(e.target.value) || 0)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none font-mono"
              />
              <div className="text-[11px] text-slate-500 mt-1">
                Current value: ₹{formData.annualHouseholdIncome.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasExistingBankLoan}
                onChange={e => handleChange('hasExistingBankLoan', e.target.checked)}
                className="rounded text-blue-900 focus:ring-blue-900"
              />
              <span className="text-xs text-slate-700">
                Existing active commercial bank loan
              </span>
            </label>

            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasCollateral}
                onChange={e => handleChange('hasCollateral', e.target.checked)}
                className="rounded text-blue-900 focus:ring-blue-900"
              />
              <span className="text-xs text-slate-700">
                Land or commercial property available for collateral mortgage
              </span>
            </label>
          </div>
        </div>

        {/* SECTION 4: Enterprise Location */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-blue-900" />
            <h3 className="text-sm font-bold text-slate-900">4. Geographic Location of Unit</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                State / UT
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={e => handleChange('state', e.target.value)}
                placeholder="e.g. Tamil Nadu, Maharashtra, UP"
                required
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                District
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={e => handleChange('district', e.target.value)}
                placeholder="e.g. Chennai, Madurai, Pune"
                required
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location Classification
              </label>
              <select
                value={formData.locationType}
                onChange={e => handleChange('locationType', e.target.value as LocationType)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none bg-white"
              >
                <option value="Rural">Rural Area (35% PMEGP Subsidy Rate)</option>
                <option value="Urban">Urban Area (25% / 15% PMEGP Subsidy)</option>
                <option value="Semi-Urban">Semi-Urban</option>
                <option value="Aspirational District">Aspirational District</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                maxLength={6}
                value={formData.pincode}
                onChange={e => handleChange('pincode', e.target.value)}
                placeholder="600001"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-600 flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-800" />
            <span>
              Changes are safely saved and immediately reflected when browsing any government scheme.
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save & Sync All Schemes</span>
            </button>
          </div>
        </div>
      </form>

      {/* SECTION 5: Cross-Scheme Availability Showcase */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Your Details Pre-loaded Across All 8 Government Schemes
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any scheme below to view its specific guidelines, subsidized EMI, and pre-filled application checklist using your saved details.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OFFICIAL_SCHEMES.map(scheme => (
            <div
              key={scheme.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-blue-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-blue-900 uppercase">
                    {scheme.categoryTag}
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded">
                    Pre-filled
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                  {scheme.shortName}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {scheme.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-700">
                  {scheme.interestRate.displayText}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenSchemeDetails(scheme.id)}
                  className="text-xs font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Scheme</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
