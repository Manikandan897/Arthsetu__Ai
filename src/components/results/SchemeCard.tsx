import React from 'react';
import { SchemeMatchResult } from '../../types';
import { formatINR } from '../../services/financialCalculator';
import { Check, ShieldCheck, ArrowRight, HelpCircle, Scale, Calculator, MapPin, FileText } from 'lucide-react';

interface SchemeCardProps {
  matchResult: SchemeMatchResult;
  onWhyThisScheme: () => void;
  onViewDetails: () => void;
  onToggleCompare: () => void;
  isCompared: boolean;
  onCalculateEMI: () => void;
  onFindPartners: () => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  matchResult,
  onWhyThisScheme,
  onViewDetails,
  onToggleCompare,
  isCompared,
  onCalculateEMI,
  onFindPartners
}) => {
  const { scheme, matchScore, matchLevel, matchingCriteria, estimatedSubsidyAmount } = matchResult;

  // Score styling
  const scoreColor =
    matchScore >= 80
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
      : matchScore >= 60
      ? 'text-blue-700 bg-blue-50 border-blue-200'
      : 'text-amber-700 bg-amber-50 border-amber-200';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        {/* Top Metadata Row: Ministry & Category Tag (Clean text, no pill badges) */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="text-xs text-slate-500 font-medium">
            <span>{scheme.ministry}</span>
            <span className="mx-1.5 text-slate-300" aria-hidden="true">·</span>
            <span className="text-slate-700 font-semibold">{scheme.categoryTag}</span>
          </div>

          {/* Profile Match Score Tag (Clean bordered badge) */}
          <div className={`px-2.5 py-1 rounded text-xs font-bold font-mono border ${scoreColor} shrink-0`}>
            {matchScore}% Profile Match
          </div>
        </div>

        {/* Scheme Title & Tagline */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
          {scheme.name}
        </h3>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          {scheme.shortDescription}
        </p>

        {/* Subsidy Highlight Banner if applicable */}
        {scheme.subsidyInfo.hasSubsidy && (
          <div className="mt-3 py-1.5 px-2.5 bg-emerald-50 border border-emerald-200/80 rounded text-xs text-emerald-900 font-medium flex items-center justify-between">
            <span>Grant/Subsidy: {scheme.subsidyInfo.percentageText}</span>
            {estimatedSubsidyAmount && (
              <span className="font-bold font-mono text-emerald-800">
                ~{formatINR(estimatedSubsidyAmount)} est.
              </span>
            )}
          </div>
        )}

        {/* 3-Column Financial Grid */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-left">
          <div>
            <span className="text-[11px] text-slate-500 block">Assistance Cap</span>
            <span className="text-xs font-bold text-slate-900 font-mono mt-0.5 block">
              Up to {formatINR(scheme.maxLoanAmount)}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Interest Rate</span>
            <span className="text-xs font-bold text-slate-900 font-mono mt-0.5 block">
              {scheme.interestRate.displayText}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Moratorium</span>
            <span className="text-xs font-bold text-slate-900 font-mono mt-0.5 block">
              {scheme.moratoriumPeriod}
            </span>
          </div>
        </div>

        {/* Top 2 Matching Criteria Checkmarks */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Verified Compatibility:
          </div>
          {matchingCriteria.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 leading-snug">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="line-clamp-2">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
        {/* Secondary quick-links */}
        <div className="flex items-center justify-between text-xs text-slate-600">
          <button
            type="button"
            onClick={onWhyThisScheme}
            className="flex items-center gap-1 font-semibold text-blue-800 hover:text-blue-950 underline underline-offset-2"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Why This Scheme?</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCalculateEMI}
              title="Estimate monthly repayments"
              className="flex items-center gap-1 hover:text-slate-900 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-slate-500" />
              <span>EMI</span>
            </button>
            <button
              type="button"
              onClick={onFindPartners}
              title="Locate branches supporting this scheme"
              className="flex items-center gap-1 hover:text-slate-900 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>Partners</span>
            </button>
          </div>
        </div>

        {/* Main CTA & Compare Checkbox */}
        <div className="flex items-center justify-between gap-2">
          {/* Compare toggle */}
          <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isCompared}
              onChange={onToggleCompare}
              className="w-4 h-4 rounded text-blue-900 focus:ring-blue-600 border-slate-300"
            />
            <span className={isCompared ? 'font-semibold text-blue-900' : ''}>Compare</span>
          </label>

          {/* View Details Primary Action */}
          <button
            type="button"
            onClick={onViewDetails}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors shadow-xs"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
