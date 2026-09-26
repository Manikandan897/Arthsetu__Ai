import React from 'react';
import { ArrowRight, Search, ShieldCheck, CheckCircle2, MapPin, Calculator, Sparkles, UserCheck, Layers } from 'lucide-react';
import { ActiveTab } from '../../types';

interface HeroProps {
  setActiveTab: (tab: ActiveTab) => void;
  onQuickSample: (sampleText: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, onQuickSample }) => {
  return (
    <div className="bg-white border-b border-slate-200">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-900 rounded-md text-xs font-semibold tracking-wide mb-6 border border-blue-100/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>ArthSetu AI · SIH26092 · Government Credit & Subsidy Enablement</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
            Bridging Bharat's Entrepreneurs with the Right Government Schemes
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            A trusted national portal for marginalized entrepreneurs. Discover verified credit programs through explainable AI, calculate subsidized repayments with moratoriums, and connect directly to official channel partners.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => setActiveTab('find-scheme')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-950 active:scale-98 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <span>Find My Scheme</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('scheme-results')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-98 rounded-lg border border-slate-200 transition-all"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span>Explore All 8 Schemes</span>
            </button>
          </div>

          {/* Quick NLP Prompt Starters */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Quick Citizen Scenarios:
            </span>
            <button
              onClick={() => {
                onQuickSample("I want to start a tailoring business and need ₹1 lakh.");
                setActiveTab('find-scheme');
              }}
              className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-900 hover:border-blue-200 border border-slate-200 rounded-md text-slate-700 transition-colors cursor-pointer"
            >
              Tailoring & need ₹1 Lakh
            </button>
            <button
              onClick={() => {
                onQuickSample("I am a woman entrepreneur looking for ₹15 lakh loan to set up a food processing unit.");
                setActiveTab('find-scheme');
              }}
              className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-900 hover:border-blue-200 border border-slate-200 rounded-md text-slate-700 transition-colors cursor-pointer"
            >
              Woman entrepreneur food processing ₹15 Lakh
            </button>
            <button
              onClick={() => {
                onQuickSample("I run a street food stall and need ₹20,000 working capital.");
                setActiveTab('find-scheme');
              }}
              className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-900 hover:border-blue-200 border border-slate-200 rounded-md text-slate-700 transition-colors cursor-pointer"
            >
              Street food vendor ₹20,000 working capital
            </button>
          </div>
        </div>

        {/* Visual Flow Representation: Profile → Eligibility → Scheme Match → Financial Guidance → Partner */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">
              End-to-End Entrepreneur Assistance Pipeline
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative">
            {/* Step 1: Profile */}
            <div className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-4 text-left hover:border-blue-400 hover:bg-white transition-all shadow-2xs">
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-900 text-white flex items-center justify-center font-bold font-mono text-xs">
                  01
                </div>
                <UserCheck className="w-4 h-4 text-blue-700" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Citizen Profile</div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Enter details via guided wizard or describe naturally in your mother tongue.
              </p>
            </div>

            {/* Step 2: Eligibility */}
            <div className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-4 text-left hover:border-blue-400 hover:bg-white transition-all shadow-2xs">
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-900 text-white flex items-center justify-center font-bold font-mono text-xs">
                  02
                </div>
                <ShieldCheck className="w-4 h-4 text-blue-700" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Rule Verification</div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Deterministic rule engine validates statutory ministry gazette criteria.
              </p>
            </div>

            {/* Step 3: Scheme Match */}
            <div className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-4 text-left hover:border-blue-400 hover:bg-white transition-all shadow-2xs">
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-900 text-white flex items-center justify-center font-bold font-mono text-xs">
                  03
                </div>
                <Layers className="w-4 h-4 text-blue-700" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Scheme Matching</div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Transparent ranking with explainable "Why This Scheme?" criteria audit.
              </p>
            </div>

            {/* Step 4: Financial Guidance */}
            <div className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-4 text-left hover:border-blue-400 hover:bg-white transition-all shadow-2xs">
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-900 text-white flex items-center justify-center font-bold font-mono text-xs">
                  04
                </div>
                <Calculator className="w-4 h-4 text-blue-700" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Subsidized EMI</div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Model real cashflows with up to 18-month moratoriums and capital subsidies.
              </p>
            </div>

            {/* Step 5: Partner */}
            <div className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-4 text-left hover:border-blue-400 hover:bg-white transition-all shadow-2xs">
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-900 text-white flex items-center justify-center font-bold font-mono text-xs">
                  05
                </div>
                <MapPin className="w-4 h-4 text-blue-700" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Partner Locator</div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Direct routing to verified bank branches, DICs, KVIC desks & CSC kiosks.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Official Scheme Guidelines</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-700">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Explainable Recommendations</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Secure & Privacy First</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-700">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Location & Branch Aware</span>
          </div>
        </div>
      </div>
    </div>
  );
};
