import React from 'react';
import { SchemeMatchResult } from '../../types';
import { X, CheckCircle2, AlertTriangle, HelpCircle, Shield, ArrowRight } from 'lucide-react';
import { formatINR } from '../../services/financialCalculator';

interface WhyThisSchemeModalProps {
  matchResult: SchemeMatchResult | null;
  onClose: () => void;
  onOpenDetails: (schemeId: string) => void;
  onCalculateEMI: (schemeId: string) => void;
}

export const WhyThisSchemeModal: React.FC<WhyThisSchemeModalProps> = ({
  matchResult,
  onClose,
  onOpenDetails,
  onCalculateEMI
}) => {
  if (!matchResult) return null;

  const { scheme, matchScore, matchLevel, matchingCriteria, verificationRequired, missingInformation } = matchResult;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                Explainable Match Breakdown
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-semibold text-slate-700">{scheme.ministry}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {scheme.name}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs">
              <span className="font-semibold text-slate-800">
                Profile Match: <span className="font-bold text-blue-900 font-mono text-sm">{matchScore}%</span>
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600 font-medium">{matchLevel}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 text-xs text-slate-700">
          {/* Strict Non-Approval Disclaimer */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-3.5 flex items-start gap-2.5 text-amber-900">
            <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Not a Credit Sanction:</span> This evaluation is an algorithmic profile match based on published government norms. Official loan sanction and subsidy release are subject to document verification and field appraisal by the lending bank or nodal committee.
            </div>
          </div>

          {/* Section 1: Matching Criteria (✓ Met) */}
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm mb-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Matching Criteria ({matchingCriteria.length} parameters satisfied)</span>
            </div>
            <ul className="space-y-2 pl-6 list-disc text-slate-700 leading-relaxed">
              {matchingCriteria.map((item, idx) => (
                <li key={idx} className="marker:text-emerald-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Criteria Requiring Verification (⚠ Needs Verification) */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm mb-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Criteria Requiring Branch / Field Verification</span>
            </div>
            <ul className="space-y-2 pl-6 list-disc text-slate-700 leading-relaxed">
              {verificationRequired.map((item, idx) => (
                <li key={idx} className="marker:text-amber-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Missing Information / Suggested Next Steps (ℹ Missing info) */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm mb-2.5">
              <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Missing Information for Higher Match Certainty</span>
            </div>
            {missingInformation.length > 0 ? (
              <ul className="space-y-2 pl-6 list-disc text-slate-700 leading-relaxed">
                {missingInformation.map((item, idx) => (
                  <li key={idx} className="marker:text-blue-600">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 pl-2">
                All primary baseline profile questions answered. Proceed with document checklist compilation.
              </p>
            )}
          </div>

          {/* Key Financial Snapshot */}
          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-[11px] text-slate-500">Interest Rate</div>
              <div className="font-bold text-slate-900 font-mono mt-0.5">{scheme.interestRate.displayText}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">Moratorium</div>
              <div className="font-bold text-slate-900 font-mono mt-0.5">{scheme.moratoriumPeriod}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">Max Assistance</div>
              <div className="font-bold text-slate-900 font-mono mt-0.5">{formatINR(scheme.maxLoanAmount)}</div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onCalculateEMI(scheme.id);
            }}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-100 rounded-md transition-colors"
          >
            Calculate Repayment
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenDetails(scheme.id);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-md transition-colors"
          >
            <span>View Full Scheme Guidelines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
