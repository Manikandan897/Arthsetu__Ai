import React, { useState } from 'react';
import { Scheme, ActiveTab } from '../../types';
import { OFFICIAL_SCHEMES } from '../../data/schemes';
import { formatINR } from '../../services/financialCalculator';
import { Scale, Check, X, Calculator, MapPin, Plus, ArrowLeft } from 'lucide-react';

interface SchemeComparisonViewProps {
  selectedSchemeIds: string[];
  setSelectedSchemeIds: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveTab: (tab: ActiveTab) => void;
  onCalculateEMI: (schemeId: string) => void;
  onFindPartners: (schemeId: string) => void;
}

export const SchemeComparisonView: React.FC<SchemeComparisonViewProps> = ({
  selectedSchemeIds,
  setSelectedSchemeIds,
  setActiveTab,
  onCalculateEMI,
  onFindPartners
}) => {
  // If fewer than 2 schemes selected, populate with top recommended defaults
  const effectiveIds =
    selectedSchemeIds.length >= 2
      ? selectedSchemeIds
      : ['pm-vishwakarma', 'pmmy-mudra', 'pmegp-kvic'];

  const comparedSchemes = OFFICIAL_SCHEMES.filter(s => effectiveIds.includes(s.id));

  const removeScheme = (id: string) => {
    if (effectiveIds.length <= 2) {
      alert('Comparison requires at least 2 schemes.');
      return;
    }
    setSelectedSchemeIds(effectiveIds.filter(x => x !== id));
  };

  const addScheme = (id: string) => {
    if (effectiveIds.length >= 4) {
      alert('You can compare a maximum of 4 schemes at once.');
      return;
    }
    if (!effectiveIds.includes(id)) {
      setSelectedSchemeIds([...effectiveIds, id]);
    }
  };

  const remainingSchemes = OFFICIAL_SCHEMES.filter(s => !effectiveIds.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => setActiveTab('scheme-results')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Scheme Matches</span>
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-900" />
            <span>Scheme Comparison Matrix</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Side-by-side statutory parameter analysis across {comparedSchemes.length} central financial assistance programs.
          </p>
        </div>

        {/* Add Scheme Dropdown if space permits */}
        {remainingSchemes.length > 0 && effectiveIds.length < 4 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">Add to comparison:</span>
            <select
              onChange={e => {
                if (e.target.value) {
                  addScheme(e.target.value);
                  e.target.value = '';
                }
              }}
              className="text-xs p-2 border border-slate-300 rounded-md bg-white font-medium text-slate-700 focus:ring-2 focus:ring-blue-600"
              defaultValue=""
            >
              <option value="" disabled>Choose scheme...</option>
              {remainingSchemes.map(s => (
                <option key={s.id} value={s.id}>{s.shortName}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Comparison Table Container */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs border-collapse min-w-[700px]">
          {/* Header Row: Scheme Titles */}
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 w-48 font-bold text-slate-700 bg-slate-100/60 sticky left-0 z-10">
                Statutory Parameters
              </th>
              {comparedSchemes.map(scheme => (
                <th key={scheme.id} className="p-4 font-bold text-slate-900 min-w-[220px] align-top">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[11px] font-semibold text-blue-900 uppercase">
                        {scheme.categoryTag}
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                        {scheme.shortName}
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                        {scheme.ministry}
                      </div>
                    </div>
                    {effectiveIds.length > 2 && (
                      <button
                        onClick={() => removeScheme(scheme.id)}
                        className="text-slate-400 hover:text-red-600 p-1"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body: Key Comparison Rows */}
          <tbody className="divide-y divide-slate-200">
            {/* Assistance Type */}
            <tr>
              <td className="p-3.5 font-semibold text-slate-800 bg-slate-50/70 sticky left-0">
                Assistance Type
              </td>
              {comparedSchemes.map(s => (
                <td key={s.id} className="p-3.5 text-slate-700">
                  {s.assistanceType}
                </td>
              ))}
            </tr>

            {/* Maximum Loan Amount */}
            <tr>
              <td className="p-3.5 font-semibold text-slate-800 bg-slate-50/70 sticky left-0">
                Maximum Loan Amount
              </td>
              {comparedSchemes.map(s => (
                <td key={s.id} className="p-3.5 font-mono font-bold text-blue-950 text-sm">
                  {formatINR(s.maxLoanAmount)}
                </td>
              ))}
            </tr>

            {/* Interest Rate */}
            <tr>
              <td className="p-3.5 font-semibold text-slate-800 bg-slate-50/70 sticky left-0">
                Interest Rate (p.a.)
              </td>
              {comparedSchemes.map(s => (
                <td key={s.id} className="p-3.5 font-mono font-bold text-slate-900">
                  {s.interestRate.displayText}
                  {s.interestRate.note && (
                    <span className="block font-sans text-[11px] text-slate-500 font-normal mt-0.5">
                      {s.interestRate.note}
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Subsidy / Subvention */}
            <tr>
              <td className="p-3.5 font-semibold text-slate-800 bg-slate-50/70 sticky left-0">
                Government Subsidy
              </td>
              {comparedSchemes.map(s => (
                <td key={s.id} className="p-3.5">
                  {s.subsidyInfo.hasSubsidy ? (
                    <span className="inline-block p-1.5 bg-emerald-50 text-emerald-900 rounded font-semibold border border-emerald-200 text-[11px]">
                      {s.subsidyInfo.percentageText || 'Eligible for Subsidy'}
                    </span>
                  ) : (
                    <span className="text-slate-500">Nil (Credit Guarantee covered)</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Moratorium */}
            <tr>
              <td className="p-3.5 font-semibold text-slate-800 bg-slate-50/70 sticky left-0">
                Moratorium Period
              </td>
              {comparedSchemes.map(s => (
                <td key={s.id} className="p-3.5 text-slate-800 font-mono font-medium">
                  {s.moratoriumPeriod}
                </td>
              ))}
            </tr>

            {/* Repayment Tenure */}
            <tr>
              <td className="p-3.5 font-semibold text-slate-800 bg-slate-50/70 sticky left-0">
                Repayment Tenure
              </td>
              {comparedSchemes.map(s => (
                <td key={s.id} className="p-3.5 text-slate-800 font-mono">
                  {s.repaymentTenure}
                </td>
              ))}
            </tr>

            {/* Collateral Security */}
            <tr>
              <td className="p-3.5 font-semibold text-slate-800 bg-slate-50/70 sticky left-0">
                Collateral Required
              </td>
              {comparedSchemes.map(s => (
                <td key={s.id} className="p-3.5 font-semibold text-emerald-700">
                  {s.eligibility.collateralRequired ? 'Yes' : 'Zero Collateral (Guaranteed by CGFMU/CGTMSE)'}
                </td>
              ))}
            </tr>

            {/* Target Audience */}
            <tr>
              <td className="p-3.5 font-semibold text-slate-800 bg-slate-50/70 sticky left-0">
                Target Beneficiaries
              </td>
              {comparedSchemes.map(s => (
                <td key={s.id} className="p-3.5 text-slate-700">
                  {s.eligibility.targetAudience.join(', ')}
                </td>
              ))}
            </tr>

            {/* Actions Row */}
            <tr className="bg-slate-50/50">
              <td className="p-3.5 font-semibold text-slate-800 bg-slate-100/60 sticky left-0">
                Action Tools
              </td>
              {comparedSchemes.map(s => (
                <td key={s.id} className="p-3.5">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => onCalculateEMI(s.id)}
                      className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-[11px] font-semibold bg-white border border-slate-300 hover:bg-slate-100 rounded text-slate-800 transition-colors"
                    >
                      <Calculator className="w-3.5 h-3.5 text-slate-600" />
                      <span>Calculate EMI</span>
                    </button>
                    <button
                      onClick={() => onFindPartners(s.id)}
                      className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-[11px] font-semibold bg-blue-900 text-white hover:bg-blue-950 rounded transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Find Partners</span>
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
