import React, { useState, useEffect } from 'react';
import { calculateRepayment, formatINR } from '../../services/financialCalculator';
import { OFFICIAL_SCHEMES } from '../../data/schemes';
import { FinancialCalculationResult } from '../../types';
import { Calculator, ShieldAlert, Sparkles, ChevronDown, ChevronUp, Info, HelpCircle } from 'lucide-react';

interface FinancialCalculatorViewProps {
  initialSchemeId?: string;
  initialAmount?: number;
}

export const FinancialCalculatorView: React.FC<FinancialCalculatorViewProps> = ({
  initialSchemeId,
  initialAmount = 100000
}) => {
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(initialSchemeId || 'pm-vishwakarma');
  const [loanAmount, setLoanAmount] = useState<number>(initialAmount);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(5.0);
  const [tenureYears, setTenureYears] = useState<number>(3);
  const [moratoriumMonths, setMoratoriumMonths] = useState<number>(6);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  // Sync when preset selected
  const applySchemePreset = (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    const scheme = OFFICIAL_SCHEMES.find(s => s.id === schemeId);
    if (!scheme) return;

    if (scheme.id === 'pm-vishwakarma') {
      setLoanAmount(100000);
      setAnnualInterestRate(5.0);
      setTenureYears(2);
      setMoratoriumMonths(6);
    } else if (scheme.id === 'pmmy-mudra') {
      setLoanAmount(300000);
      setAnnualInterestRate(9.5);
      setTenureYears(4);
      setMoratoriumMonths(6);
    } else if (scheme.id === 'pmegp-kvic') {
      setLoanAmount(1000000);
      setAnnualInterestRate(9.0);
      setTenureYears(5);
      setMoratoriumMonths(12);
    } else if (scheme.id === 'standup-india') {
      setLoanAmount(2500000);
      setAnnualInterestRate(8.5);
      setTenureYears(7);
      setMoratoriumMonths(18);
    } else if (scheme.id === 'pm-svanidhi') {
      setLoanAmount(20000);
      setAnnualInterestRate(2.5); // effective subsidized
      setTenureYears(1.5);
      setMoratoriumMonths(0);
    } else if (scheme.id === 'nsfdc-term-loan' || scheme.id === 'nbcfdc-swarnima') {
      setLoanAmount(150000);
      setAnnualInterestRate(5.0);
      setTenureYears(3);
      setMoratoriumMonths(6);
    }
  };

  useEffect(() => {
    if (initialSchemeId) {
      applySchemePreset(initialSchemeId);
    }
  }, [initialSchemeId]);

  const result: FinancialCalculationResult = calculateRepayment(
    loanAmount,
    annualInterestRate,
    tenureYears,
    moratoriumMonths
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="w-5 h-5 text-blue-900" />
          <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
            Financial Guidance Engine
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Government Loan Repayment & Moratorium Calculator
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Estimate monthly installments (EMI), interest accruals, and cashflow relief during the initial moratorium period.
        </p>
      </div>

      {/* Prominent Statutory Estimation Disclaimer */}
      <div className="mb-6 p-3.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Statutory Notice: Estimated Calculation.</strong> Real-world bank sanction terms, exact monthly EMIs, and applicable interest subventions depend on the lending bank’s benchmark lending rate (MCLR/EBLR) and credit appraisal.
        </div>
      </div>

      {/* Quick Scheme Presets */}
      <div className="mb-8">
        <div className="text-xs font-semibold text-slate-700 mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Apply Official Scheme Benchmark Presets:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {OFFICIAL_SCHEMES.slice(0, 6).map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => applySchemePreset(s.id)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-all ${
                selectedSchemeId === s.id
                  ? 'bg-blue-900 text-white border-blue-900 font-semibold shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {s.shortName} ({s.interestRate.displayText})
            </button>
          ))}
        </div>
      </div>

      {/* Calculator Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-6">
          {/* 1. Loan Amount */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800">
                Loan Principal Amount (₹)
              </label>
              <span className="text-base font-bold text-blue-900 font-mono">
                {formatINR(loanAmount)}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={5000000}
              step={10000}
              value={loanAmount}
              onChange={e => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>₹10,000</span>
              <span>₹10,00,000</span>
              <span>₹50,00,000</span>
            </div>
          </div>

          {/* 2. Annual Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800">
                Annual Interest Rate (% p.a.)
              </label>
              <span className="text-base font-bold text-slate-900 font-mono">
                {annualInterestRate.toFixed(2)}%
              </span>
            </div>
            <input
              type="range"
              min={2.0}
              max={14.0}
              step={0.25}
              value={annualInterestRate}
              onChange={e => setAnnualInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>2.0% (SVANidhi)</span>
              <span>5.0% (Vishwakarma)</span>
              <span>9.5% (Mudra)</span>
              <span>14.0%</span>
            </div>
          </div>

          {/* 3. Tenure Years */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800">
                Repayment Tenure (Years)
              </label>
              <span className="text-base font-bold text-slate-900 font-mono">
                {tenureYears} Years ({Math.round(tenureYears * 12)} Months)
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={8}
              step={0.5}
              value={tenureYears}
              onChange={e => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>6 Months</span>
              <span>3 Years</span>
              <span>5 Years</span>
              <span>8 Years</span>
            </div>
          </div>

          {/* 4. Moratorium Months */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span>Moratorium / Grace Period (Months)</span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </label>
              <span className="text-base font-bold text-emerald-800 font-mono">
                {moratoriumMonths} Months
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={18}
              step={1}
              value={moratoriumMonths}
              onChange={e => setMoratoriumMonths(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>0 Months</span>
              <span>6 Months</span>
              <span>12 Months</span>
              <span>18 Months (Stand-Up)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              During moratorium, zero principal is repaid. Small enterprises only service simple interest or defer it to allow stabilization.
            </p>
          </div>
        </div>

        {/* Right Output Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 text-white rounded-xl p-6 shadow-sm border border-slate-800">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>Estimated Summary</span>
              <span className="font-mono text-amber-400 text-[11px]">Formula: Reducing Balance</span>
            </div>

            {/* Estimated Monthly EMI Callout */}
            <div className="mb-6 p-4 rounded-lg bg-slate-800/80 border border-slate-700 text-center">
              <div className="text-xs font-medium text-slate-300">
                Estimated Monthly Repayment (EMI)
              </div>
              <div className="text-3xl font-extrabold text-white font-mono mt-1.5 tabular-nums">
                {formatINR(result.monthlyEmi)}
                <span className="text-xs text-slate-400 font-normal"> / mo</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Post {moratoriumMonths}-month moratorium
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-3.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <div className="flex items-center justify-between">
                <span>Principal Loan:</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  {formatINR(result.loanAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Estimated Interest:</span>
                <span className="font-mono font-bold text-amber-300 tabular-nums">
                  {formatINR(result.totalInterest)}
                </span>
              </div>
              {result.interestDuringMoratorium > 0 && (
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Interest during Moratorium:</span>
                  <span className="font-mono tabular-nums">
                    {formatINR(result.interestDuringMoratorium)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-sm">
                <span className="font-bold text-white">Total Repayment Amount:</span>
                <span className="font-mono font-bold text-emerald-400 text-base tabular-nums">
                  {formatINR(result.totalRepayment)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="text-xs text-blue-300 hover:text-white inline-flex items-center gap-1 font-medium transition-colors"
            >
              <span>{showSchedule ? 'Hide' : 'Show'} First 12-Month Amortization Schedule</span>
              {showSchedule ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Amortization Table */}
      {showSchedule && (
        <div className="mt-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs animate-in fade-in duration-200">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              12-Month Repayment Schedule (Sample Cashflow)
            </h4>
            <span className="text-[11px] text-slate-500">
              Numbers formatted in Indian Rupees (INR)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 border-b border-slate-200 font-semibold text-slate-700">
                <tr>
                  <th className="p-3">Month</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 font-mono">EMI (₹)</th>
                  <th className="p-3 font-mono">Principal (₹)</th>
                  <th className="p-3 font-mono">Interest (₹)</th>
                  <th className="p-3 font-mono">Balance (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                {result.schedule.slice(0, 12).map(row => (
                  <tr key={row.month} className={row.isMoratorium ? 'bg-amber-50/40 text-amber-900' : ''}>
                    <td className="p-3 font-bold font-sans">Month {row.month}</td>
                    <td className="p-3 font-sans">
                      {row.isMoratorium ? (
                        <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded font-medium">
                          Moratorium
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium">
                          Active EMI
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-bold text-slate-900 tabular-nums">{formatINR(row.emi)}</td>
                    <td className="p-3 tabular-nums">{formatINR(row.principal)}</td>
                    <td className="p-3 text-slate-500 tabular-nums">{formatINR(row.interest)}</td>
                    <td className="p-3 font-bold tabular-nums">{formatINR(row.remainingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
