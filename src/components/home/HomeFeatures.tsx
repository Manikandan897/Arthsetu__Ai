import React from 'react';
import { ShieldCheck, CheckCircle2, Calculator, MapPin, Sparkles, ArrowRight, Layers, Users, ExternalLink } from 'lucide-react';
import { OFFICIAL_SCHEMES } from '../../data/schemes';
import { ActiveTab } from '../../types';
import { formatINR } from '../../services/financialCalculator';

interface HomeFeaturesProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSchemeDetails: (schemeId: string) => void;
  onCalculateEMI: (schemeId: string) => void;
}

export const HomeFeatures: React.FC<HomeFeaturesProps> = ({
  setActiveTab,
  onOpenSchemeDetails,
  onCalculateEMI
}) => {
  return (
    <div className="space-y-20 py-12">
      {/* SECTION 1: Why ArthSetu AI? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
            Why ArthSetu AI
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Designed for Trust, Explainability, and Inclusion
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Most marginalized entrepreneurs struggle not because schemes do not exist, but because guidelines are fragmented, complex, and opaque. ArthSetu AI bridges this last-mile gap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Rule Engine */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-blue-900" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Deterministic Rule Verification
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Unlike generic AI platforms that hallucinate, ArthSetu AI utilizes strict statutory rules codified from official ministry notifications. AI understands user language; the rule engine verifies legality.
            </p>
          </div>

          {/* Card 2: Financial Calculator */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center mb-4">
              <Calculator className="w-5 h-5 text-emerald-800" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Moratorium & Subvention Clarity
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Understand real cashflows before signing bank papers. Calculate exact repayment moratoriums (up to 18 months) and see net interest rates post 7%–8% government subvention.
            </p>
          </div>

          {/* Card 3: Geo-Spatial Partners */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-amber-800" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Grassroots Partner Linkages
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Connect directly with verified local channel partners: District Industries Centres (DIC), KVIC nodal desks, Public Sector Banks, and village Common Service Centres (CSC).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: 8 Official Central Government Schemes Grid */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
                Central Financial Ecosystem
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Official Government Schemes Supported
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                8 central credit programs offering subsidized capital, zero-collateral guarantees, and artisan tool vouchers.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('scheme-results')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-md transition-colors shadow-xs"
            >
              <span>Explore All Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Schemes Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {OFFICIAL_SCHEMES.map(scheme => (
              <div
                key={scheme.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-blue-900 uppercase">
                      {scheme.categoryTag}
                    </span>
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                      {scheme.interestRate.displayText}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                    {scheme.shortName}
                  </h3>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {scheme.ministry}
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {scheme.shortDescription}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Max Loan:</span>
                    <span className="font-bold text-slate-900 font-mono">
                      {formatINR(scheme.maxLoanAmount)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onCalculateEMI(scheme.id)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    EMI
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenSchemeDetails(scheme.id)}
                    className="text-xs font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1"
                  >
                    <span>Check Rules</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Smart India Hackathon Problem Statement & Demographic Focus */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-800 text-blue-100 rounded text-xs font-semibold uppercase tracking-wider mb-4">
                Smart India Hackathon 2026 · Problem Statement SIH26092
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                AI-Driven Scheme Matching for Marginalized Entrepreneurs
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Empowering India's micro-entrepreneurs: Scheduled Castes (SC), Scheduled Tribes (ST), Other Backward Classes (OBC), women enterprise founders, traditional family artisans, street vendors, and sanitation worker families with transparent, dignified access to institutional credit.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
                <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-slate-200">
                  Tailors & Artisans (PM Vishwakarma)
                </span>
                <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-slate-200">
                  SC/ST & Women (Stand-Up India)
                </span>
                <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-slate-200">
                  Rural Units 35% Subsidy (PMEGP)
                </span>
                <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-slate-200">
                  Street Vendors (PM SVANidhi)
                </span>
              </div>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-6 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Target Beneficiary Impact Pillars</span>
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Collateral-Free Credit Guarantee:</strong> Removing the mortgage barrier that holds back first-generation entrepreneurs through CGFMU & CGTMSE integration.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Language & Digital Literacy Bridge:</strong> Enabling natural language expression in native Indian tongues so anyone can describe their venture.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Anti-Exploitation Safeguards:</strong> Eliminating commission middlemen by linking applicants directly to bank desks and government CSC kiosks.
                  </span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('find-scheme')}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>Start Citizen Scheme Discovery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
