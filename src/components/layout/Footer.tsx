import React from 'react';
import { Shield, ExternalLink, FileCheck2, Building2, HelpCircle } from 'lucide-react';
import { ActiveTab } from '../../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20 text-xs">
      {/* Statutory Non-Approval Disclaimer Banner */}
      <div className="bg-slate-950/80 border-b border-slate-800 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-slate-400">
          <div className="flex items-start sm:items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <p>
              <strong className="text-slate-200">Statutory Notice:</strong> ArthSetu AI provides explainable scheme matching and eligibility estimation based on published government guidelines. It does not sanction or approve credit. Final loan sanctions and subsidy disbursements are strictly governed by designated banks and nodal implementing agencies.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3 text-slate-400 text-[11px]">
            <span className="inline-flex items-center gap-1">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              Verified MSME Rules (2026)
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-blue-950 border border-slate-700 flex items-center justify-center text-amber-400 font-bold text-base shadow-xs">
                अ
              </div>
              <span className="text-base font-bold text-white tracking-tight">ArthSetu AI</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Bridging marginalized entrepreneurs with the right government financial opportunities through AI-driven profile understanding, rule-verified eligibility, and geo-spatial partner routing.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div className="font-medium text-slate-300">Smart India Hackathon 2026</div>
              <div>Problem Statement ID: <span className="font-mono text-amber-400">SIH26092</span></div>
              <div>Theme: Smart Governance & Financial Inclusion for Marginalized Communities</div>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <div className="text-slate-200 font-semibold text-xs tracking-wider uppercase mb-3">
              Core Platform
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('find-scheme')} className="hover:text-white transition-colors">
                  Find My Scheme Wizard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('scheme-results')} className="hover:text-white transition-colors">
                  All 8 Official Schemes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compare')} className="hover:text-white transition-colors">
                  Scheme Comparison Matrix
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-white transition-colors">
                  Repayment & Moratorium Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('partners')} className="hover:text-white transition-colors">
                  Authorized Partner Locator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('documents')} className="hover:text-white transition-colors">
                  Document Checklist
                </button>
              </li>
            </ul>
          </div>

          {/* Official Portals Directory */}
          <div>
            <div className="text-slate-200 font-semibold text-xs tracking-wider uppercase mb-3">
              Official Portals
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="https://pmvishwakarma.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span>PM Vishwakarma</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.mudra.org.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span>PMMY (MUDRA)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.kviconline.gov.in/pmegpeportal" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span>PMEGP e-Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.standupmitra.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span>Stand-Up Mitra</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://pmsvanidhi.mohua.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span>PM SVANidhi</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://udyamregistration.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span>Udyam Registration</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Integrity & Standards */}
          <div>
            <div className="text-slate-200 font-semibold text-xs tracking-wider uppercase mb-3">
              Standards & Access
            </div>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Ministry Guidelines Compliant</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Commercial Data Sharing</span>
              </li>
              <li className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Explainable AI Rule Engine</span>
              </li>
              <li className="pt-2">
                <span className="text-[11px] text-slate-500">
                  Designed for SC, ST, OBC, Women, Traditional Artisans & Micro-Entrepreneurs across Bharat.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 ArthSetu AI. Developed for Smart India Hackathon (SIH 2026).
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Accessibility Policy</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Data Privacy</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Grievance Redressal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
