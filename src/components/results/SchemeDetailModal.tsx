import React from 'react';
import { Scheme, UserProfile, ActiveTab } from '../../types';
import { X, ExternalLink, Calculator, MapPin, CheckCircle2, Shield, FileText, ArrowRight, Building, Award, UserCheck, Sparkles, Edit3 } from 'lucide-react';
import { formatINR } from '../../services/financialCalculator';
import { useAuth } from '../../context/AuthContext';

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  onClose: () => void;
  onCalculateEMI: (schemeId: string) => void;
  onFindPartners: (schemeId: string) => void;
  userProfile?: UserProfile;
  setActiveTab?: (tab: ActiveTab) => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  onClose,
  onCalculateEMI,
  onFindPartners,
  userProfile,
  setActiveTab
}) => {
  const { currentUser } = useAuth();
  if (!scheme) return null;

  const activeEmail = currentUser?.email || userProfile?.email || 'Local Session';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/80 sticky top-0 z-10 flex items-start justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                {scheme.ministry}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-mono bg-slate-200/80 text-slate-800 px-2 py-0.5 rounded">
                Code: {scheme.code}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-medium text-slate-600">{scheme.categoryTag}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {scheme.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">{scheme.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-8 space-y-8 text-xs sm:text-sm text-slate-700">
          {/* USER PRE-FILLED PROFILE RECOVERY BANNER */}
          {userProfile && (
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-blue-950">
                      Your Details Pre-Filled for {scheme.shortName}
                    </h4>
                    <p className="text-[11px] text-blue-700">
                      Auto-loaded from your account (Saved under: <span className="font-mono font-semibold">{activeEmail}</span>)
                    </p>
                  </div>
                </div>

                {setActiveTab && (
                  <button
                    onClick={() => {
                      onClose();
                      setActiveTab('profile');
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-blue-900 bg-white border border-blue-200 rounded-md hover:bg-blue-100/60 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Edit3 className="w-3 h-3 text-blue-700" />
                    <span>Edit Profile Details</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-[11px]">
                <div className="bg-white/80 border border-blue-100 p-2 rounded-lg">
                  <span className="text-slate-500 block text-[10px]">Applicant Name</span>
                  <span className="font-semibold text-slate-900 truncate block">{userProfile.fullName}</span>
                </div>
                <div className="bg-white/80 border border-blue-100 p-2 rounded-lg">
                  <span className="text-slate-500 block text-[10px]">Proposed Trade</span>
                  <span className="font-semibold text-slate-900 truncate block">{userProfile.tradeOrActivity}</span>
                </div>
                <div className="bg-white/80 border border-blue-100 p-2 rounded-lg">
                  <span className="text-slate-500 block text-[10px]">Requested Loan</span>
                  <span className="font-bold text-blue-900 font-mono">₹{userProfile.requiredLoanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="bg-white/80 border border-blue-100 p-2 rounded-lg">
                  <span className="text-slate-500 block text-[10px]">Social Category & State</span>
                  <span className="font-semibold text-slate-900 truncate block">{userProfile.socialCategory} · {userProfile.state}</span>
                </div>
              </div>
            </div>
          )}

          {/* Statutory Integrity Note */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-slate-600">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">Verified Central Government Framework:</span> Information sourced directly from the official ministry gazette notifications and JanSamarth / SIDBI guidelines. Last audited: {scheme.lastUpdated}.
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Scheme Overview
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
              {scheme.overview}
            </p>
          </div>

          {/* Key Financial Terms Grid */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Financial Credit Parameters
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Loan Limits</span>
                <span className="font-bold text-slate-900 font-mono text-xs sm:text-sm mt-0.5 block">
                  {formatINR(scheme.minLoanAmount)} – {formatINR(scheme.maxLoanAmount)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Interest Rate</span>
                <span className="font-bold text-slate-900 font-mono text-xs sm:text-sm mt-0.5 block">
                  {scheme.interestRate.displayText}
                </span>
                <span className="text-[10px] text-slate-500">{scheme.interestRate.note}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Moratorium Period</span>
                <span className="font-bold text-slate-900 font-mono text-xs sm:text-sm mt-0.5 block">
                  {scheme.moratoriumPeriod}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Repayment Tenure</span>
                <span className="font-bold text-slate-900 font-mono text-xs sm:text-sm mt-0.5 block">
                  {scheme.repaymentTenure}
                </span>
              </div>
            </div>

            {scheme.subsidyInfo.hasSubsidy && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900">
                <span className="font-bold">Government Subsidy / Subvention:</span> {scheme.subsidyInfo.description}
              </div>
            )}
          </div>

          {/* Key Scheme Benefits */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Core Benefits & Entitlements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {scheme.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                  <Award className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span className="text-slate-800">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Eligibility Rules & Requirements
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <div className="divide-y divide-slate-200">
                <div className="p-3 bg-slate-50 grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <span className="font-semibold text-slate-600">Target Beneficiaries</span>
                  <span className="col-span-2 sm:col-span-3 text-slate-800">
                    {scheme.eligibility.targetAudience.join(', ')}
                  </span>
                </div>
                <div className="p-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <span className="font-semibold text-slate-600">Eligible Categories</span>
                  <span className="col-span-2 sm:col-span-3 text-slate-800">
                    {scheme.eligibility.allowedCategories.join(', ')}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <span className="font-semibold text-slate-600">Age Bracket</span>
                  <span className="col-span-2 sm:col-span-3 text-slate-800 font-mono">
                    Min {scheme.eligibility.minAge || 18} yrs {scheme.eligibility.maxAge ? `to ${scheme.eligibility.maxAge} yrs` : '(no upper ceiling)'}
                  </span>
                </div>
                <div className="p-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <span className="font-semibold text-slate-600">Collateral Requirement</span>
                  <span className="col-span-2 sm:col-span-3 font-semibold text-emerald-800">
                    {scheme.eligibility.collateralRequired ? 'Collateral Required' : 'Zero Collateral Required (Covered by Central Credit Guarantee)'}
                  </span>
                </div>
                {scheme.eligibility.specialRequirements && (
                  <div className="p-3 bg-slate-50 grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <span className="font-semibold text-slate-600">Special Stipulations</span>
                    <ul className="col-span-2 sm:col-span-3 space-y-1 list-disc pl-4 text-slate-700">
                      {scheme.eligibility.specialRequirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Required Documents ({scheme.documents.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {scheme.documents.map(doc => (
                <div key={doc.id} className="p-3 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{doc.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${doc.mandatory ? 'bg-red-50 text-red-700 font-semibold' : 'bg-slate-100 text-slate-600'}`}>
                      {doc.mandatory ? 'Mandatory' : 'Optional'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{doc.description}</p>
                  <div className="text-[10px] text-slate-400">
                    How to obtain: {doc.howToObtain}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Steps */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Official Application Workflow
            </h3>
            <ol className="space-y-2 text-xs">
              {scheme.applicationSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-800">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onCalculateEMI(scheme.id);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-slate-600" />
              <span>Calculate Repayments</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onFindPartners(scheme.id);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-md transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-600" />
              <span>Find Nearest Partners</span>
            </button>
          </div>

          {scheme.officialPortalUrl && (
            <a
              href={scheme.officialPortalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-md transition-colors"
            >
              <span>Visit Official Government Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
