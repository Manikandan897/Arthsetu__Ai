import React from 'react';
import { BookOpen, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { ActiveTab } from '../../types';

interface ApplicationGuidanceViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const ApplicationGuidanceView: React.FC<ApplicationGuidanceViewProps> = ({ setActiveTab }) => {
  const roadmapSteps = [
    {
      step: '01',
      title: 'Profile & Need Assessment',
      duration: 'Day 1–2',
      description: 'Clearly determine your capital requirements. Split total project cost between fixed machinery/tools and operational raw material working capital. Use ArthSetu AI to verify scheme compatibility.',
      actionLabel: 'Check Scheme Rules',
      actionTab: 'scheme-results' as ActiveTab
    },
    {
      step: '02',
      title: 'Vendor Quotations & Document Compilation',
      duration: 'Day 3–7',
      description: 'Obtain written proforma invoices or equipment quotations with GSTIN numbers from authorized machine suppliers. Ensure name spelling on Aadhaar matches your bank passbook and PAN card exactly.',
      actionLabel: 'View Document Checklist',
      actionTab: 'documents' as ActiveTab
    },
    {
      step: '03',
      title: 'Digital Enrolment on Central Portals',
      duration: 'Day 8–10',
      description: 'Submit your formal application through the official designated route: JanSamarth (for Mudra), KVIC e-Portal (for PMEGP), or PM Vishwakarma Portal via your nearest Common Service Centre (CSC).',
      actionLabel: 'Find Authorized CSC',
      actionTab: 'partners' as ActiveTab
    },
    {
      step: '04',
      title: 'Committee Screening & Bank Appraisal',
      duration: 'Day 11–20',
      description: 'The District Implementation Committee or Bank Credit Officer performs physical/biometric verification. You may be requested to show proof of shop/residence or present your business idea.',
      actionLabel: 'Understand Verification Rules',
      actionTab: 'scheme-results' as ActiveTab
    },
    {
      step: '05',
      title: 'Sanction Letter & Disbursement',
      duration: 'Day 21–30',
      description: 'Upon approval, the bank issues a formal Sanction Letter detailing loan amount, 5%–9.5% interest rate, and moratorium period. Funds for machinery are disbursed directly to vendor accounts.',
      actionLabel: 'Calculate Repayment Schedule',
      actionTab: 'calculator' as ActiveTab
    }
  ];

  const dos = [
    'Ensure your Aadhaar is linked to an active mobile number for biometric OTP and JanSamarth e-KYC.',
    'Obtain genuine, stamped GST quotations for all machinery and equipment to be purchased.',
    'Keep your bank account passbook updated with the last 6 months transactions visible.',
    'Register for free Udyam MSME Certificate on udyamregistration.gov.in before visiting the branch.',
    'Verify if your district or municipal ward has special camps for PM Vishwakarma or SVANidhi.'
  ];

  const donts = [
    'NEVER pay unauthorized middlemen or agents claiming guaranteed loan approval. Official registration is 100% free.',
    'Do not apply for multiple loans under competing central schemes with active default balances.',
    'Avoid submitting mismatched names or dates of birth across Aadhaar, PAN, and Bank passbook.',
    'Do not fabricate revenue figures or inflate machinery costs; banks conduct physical spot appraisals.',
    'Do not neglect the repayment schedule; timely repayments unlock higher repeat tranches up to ₹10–20 Lakhs.'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-blue-900" />
          <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
            Standard Operating Procedures
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Government Application Guidance & Rejection Safeguards
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          A definitive, step-by-step navigation playbook for first-time and marginalized entrepreneurs.
        </p>
      </div>

      {/* 5-Step Roadmap */}
      <div className="mb-12">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-5">
          End-to-End Application Roadmap
        </h3>

        <div className="space-y-4">
          {roadmapSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {step.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                    <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab(step.actionTab)}
                className="self-start md:self-auto shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors"
              >
                <span>{step.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dos and Don'ts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dos */}
        <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Essential Dos for Fast-Track Sanction</span>
          </div>
          <ul className="space-y-2.5 text-xs text-emerald-950">
            {dos.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Don'ts */}
        <div className="bg-red-50/50 border border-red-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-red-950 font-bold text-sm">
            <XCircle className="w-5 h-5 text-red-600" />
            <span>Critical Don'ts to Avoid Loan Rejection</span>
          </div>
          <ul className="space-y-2.5 text-xs text-red-950">
            {donts.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Anti-Corruption Notice */}
      <div className="mt-8 p-4 bg-slate-900 text-white rounded-xl flex items-start gap-3 text-xs">
        <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block font-bold mb-0.5">Government Transparency Commitment</strong>
          <span>
            Under directives from the Central Vigilance Commission and Ministry of MSME, no official charges or commissions are levied for scheme registration. Report any irregularities to the National Anti-Corruption Helpline: 1964 or State Lead Bank Complaints Desk.
          </span>
        </div>
      </div>
    </div>
  );
};
