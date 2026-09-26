import React from 'react';
import { UserProfile, ActiveTab } from '../../types';
import { formatINR } from '../../services/financialCalculator';
import { User, Briefcase, MapPin, FileCheck2, Calculator, ArrowRight, ShieldCheck, Clock, ExternalLink } from 'lucide-react';

interface EntrepreneurDashboardViewProps {
  userProfile: UserProfile;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSchemeDetails: (schemeId: string) => void;
}

export const EntrepreneurDashboardView: React.FC<EntrepreneurDashboardViewProps> = ({
  userProfile,
  setActiveTab,
  onOpenSchemeDetails
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
            Citizen Workspace
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Entrepreneur Profile & Application Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage your verified application profile, monitor requirements, and follow up with local bank touchpoints.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('find-scheme')}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-md transition-colors"
        >
          <span>Update Application Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
              {userProfile.fullName ? userProfile.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {userProfile.fullName || 'Registered Entrepreneur'}
              </h3>
              <div className="text-xs text-slate-500">
                {userProfile.age} yrs · {userProfile.gender} · {userProfile.socialCategory} Category
              </div>
            </div>
          </div>

          {/* Core Profile Parameters */}
          <div className="space-y-3 text-xs">
            <div className="flex items-start justify-between">
              <span className="text-slate-500">Trade Activity:</span>
              <strong className="text-slate-900 text-right">{userProfile.tradeOrActivity || 'Craft/Artisan'}</strong>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-500">Classification:</span>
              <span className="text-slate-700 text-right">{userProfile.businessType}</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-500">Stage:</span>
              <span className="text-slate-700 text-right">{userProfile.businessStage}</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-500">Loan Needed:</span>
              <strong className="text-blue-900 font-mono text-sm">{formatINR(userProfile.requiredLoanAmount)}</strong>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-500">Location:</span>
              <span className="text-slate-700 text-right">{userProfile.district}, {userProfile.state} ({userProfile.locationType})</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-500">Udyam Registration:</span>
              <span className={`font-semibold ${userProfile.hasUdyamRegistration ? 'text-emerald-700' : 'text-slate-500'}`}>
                {userProfile.hasUdyamRegistration ? 'Registered' : 'Not yet registered'}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('scheme-results')}
              className="w-full py-2 px-3 text-xs font-semibold text-center text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
            >
              View 8 Matched Schemes
            </button>
          </div>
        </div>

        {/* Middle & Right: Application Stages & Shortcuts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Application Demonstration */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                  Active Demo Tracking
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">
                  PM Vishwakarma Scheme (First Tranche)
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-900 block">₹1,00,000 @ 5%</span>
                <span className="text-[11px] text-slate-500">MoMSME Subsidized</span>
              </div>
            </div>

            {/* Stepper */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Application Progress: Level-2 Verification Completed</span>
                <span className="font-bold text-blue-900">75%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-900 h-full w-3/4 rounded-full" />
              </div>

              <div className="grid grid-cols-4 gap-2 pt-3 text-center text-[11px]">
                <div className="p-2 bg-emerald-50 text-emerald-900 rounded font-medium">
                  1. CSC Enrolment ✓
                </div>
                <div className="p-2 bg-emerald-50 text-emerald-900 rounded font-medium">
                  2. GP Screening ✓
                </div>
                <div className="p-2 bg-blue-50 text-blue-900 rounded font-bold border border-blue-200">
                  3. Bank Appraisal
                </div>
                <div className="p-2 bg-slate-50 text-slate-400 rounded">
                  4. Disbursal & Kit
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Next step: Visit SBI SME Hub for biometric counter check</span>
              <button
                onClick={() => setActiveTab('partners')}
                className="font-bold text-blue-900 hover:underline flex items-center gap-1"
              >
                <span>View Bank Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Access Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setActiveTab('calculator')}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-blue-900" />
                <h4 className="text-sm font-bold text-slate-900">EMI & Moratorium Simulator</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Test monthly installments and interest relief scenarios for loans up to ₹50 Lakh.
              </p>
            </div>

            <div
              onClick={() => setActiveTab('documents')}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2 mb-2">
                <FileCheck2 className="w-4 h-4 text-emerald-700" />
                <h4 className="text-sm font-bold text-slate-900">Document Readiness File</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ensure KYC documents, caste certificates, and vendor quotations are in order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
