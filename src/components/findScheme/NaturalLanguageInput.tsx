import React, { useState } from 'react';
import { Sparkles, ArrowRight, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { UserProfile, SocialCategory, Gender, BusinessStage, BusinessType } from '../../types';
import { parseNaturalLanguageInput } from '../../services/aiService';
import { STATES_AND_DISTRICTS } from '../../data/partners';

interface NaturalLanguageInputProps {
  onApplyProfile: (profile: Partial<UserProfile>) => void;
  onProceedToResults: () => void;
  initialText?: string;
}

export const NaturalLanguageInput: React.FC<NaturalLanguageInputProps> = ({
  onApplyProfile,
  onProceedToResults,
  initialText = ''
}) => {
  const [inputText, setInputText] = useState(initialText);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasExtracted, setHasExtracted] = useState(false);

  // Editable parsed fields
  const [tradeOrActivity, setTradeOrActivity] = useState('');
  const [requiredLoanAmount, setRequiredLoanAmount] = useState<number>(100000);
  const [businessStage, setBusinessStage] = useState<BusinessStage>('New Idea / Startup');
  const [businessType, setBusinessType] = useState<BusinessType>('Traditional Artisan / Craft');
  const [socialCategory, setSocialCategory] = useState<SocialCategory>('OBC');
  const [gender, setGender] = useState<Gender>('Female');
  const [state, setState] = useState<string>('Tamil Nadu');
  const [district, setDistrict] = useState<string>('Chennai');
  const [annualHouseholdIncome, setAnnualHouseholdIncome] = useState<number>(180000);
  const [locationType, setLocationType] = useState<'Rural' | 'Semi-Urban' | 'Urban'>('Urban');

  const [missingItems, setMissingItems] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<number>(0);

  const samplePrompts = [
    "I want to start a tailoring business and need ₹1 lakh.",
    "I am an OBC woman artisan from Madurai looking for ₹2 lakh to expand my handicraft pottery shop.",
    "We are a rural women SHG starting a turmeric and spice grinding unit needing ₹5 Lakh loan with subsidy.",
    "I run a street food thela in Lucknow and need ₹20,000 for working capital and digital QR.",
    "I am an SC entrepreneur planning a greenfield manufacturing workshop needing ₹15 Lakh."
  ];

  const handleExtract = (textToProcess?: string) => {
    const text = textToProcess || inputText;
    if (!text.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const parsed = parseNaturalLanguageInput(text);
      if (parsed.tradeOrActivity) setTradeOrActivity(parsed.tradeOrActivity);
      if (parsed.requiredLoanAmount) setRequiredLoanAmount(parsed.requiredLoanAmount);
      if (parsed.businessStage) setBusinessStage(parsed.businessStage);
      if (parsed.businessType) setBusinessType(parsed.businessType);
      if (parsed.socialCategory) setSocialCategory(parsed.socialCategory);
      if (parsed.gender) setGender(parsed.gender);

      setMissingItems(parsed.missingFields);
      setConfidence(parsed.confidenceScore);
      setHasExtracted(true);
      setIsProcessing(false);
    }, 400);
  };

  const handleConfirmAndCheck = () => {
    onApplyProfile({
      tradeOrActivity,
      requiredLoanAmount,
      businessStage,
      businessType,
      socialCategory,
      gender,
      state,
      district,
      annualHouseholdIncome,
      locationType,
      businessDescription: inputText
    });
    onProceedToResults();
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-blue-100 text-blue-900 shrink-0">
            <Sparkles className="w-5 h-5 text-blue-800" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Prefer to tell us in your own words?
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Describe your business idea, what you make or sell, how much loan you require, and your background. Our NLP extractor will structure the details for rule-based verification.
            </p>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="mt-4">
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            rows={3}
            placeholder="e.g. I want to start a tailoring business and need ₹1 lakh."
            className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none text-slate-800"
          />
        </div>

        {/* Quick Samples */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium text-slate-500">Quick examples:</span>
          {samplePrompts.slice(0, 3).map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputText(prompt);
                handleExtract(prompt);
              }}
              className="text-[11px] px-2.5 py-1 bg-white hover:bg-blue-100/60 border border-slate-200 rounded text-slate-700 transition-colors"
            >
              {prompt.length > 40 ? prompt.substring(0, 40) + '...' : prompt}
            </button>
          ))}
        </div>

        {/* Extract Button */}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => handleExtract()}
            disabled={!inputText.trim() || isProcessing}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 disabled:bg-slate-300 rounded-md transition-colors"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Understanding Profile...</span>
              </>
            ) : (
              <>
                <span>Extract My Profile</span>
                <Sparkles className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* "Here's what I understood" Section */}
      {hasExtracted && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Here's what I understood
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Review and edit these fields. We never invent missing data; please provide the highlighted fields below.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded self-start sm:self-auto">
              NLP Confidence: {confidence}%
            </div>
          </div>

          {/* Editable Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Trade / Activity */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Trade / Craft <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={tradeOrActivity}
                onChange={e => setTradeOrActivity(e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="e.g. Tailoring & Garments"
              />
            </div>

            {/* Required Amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Loan Needed (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={requiredLoanAmount}
                onChange={e => setRequiredLoanAmount(Number(e.target.value))}
                step={5000}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
              />
            </div>

            {/* Business Stage */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Stage
              </label>
              <select
                value={businessStage}
                onChange={e => setBusinessStage(e.target.value as BusinessStage)}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="New Idea / Startup">New Idea / Startup (Greenfield)</option>
                <option value="Existing Enterprise (< 3 yrs)">Existing Enterprise (&lt; 3 yrs)</option>
                <option value="Expanding Enterprise (> 3 yrs)">Expanding Enterprise (&gt; 3 yrs)</option>
              </select>
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Activity Category
              </label>
              <select
                value={businessType}
                onChange={e => setBusinessType(e.target.value as BusinessType)}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="Traditional Artisan / Craft">Traditional Artisan / Craft</option>
                <option value="Manufacturing / Production">Manufacturing / Production</option>
                <option value="Services">Services & Repair</option>
                <option value="Retail / Trading">Retail Kirana / Trading</option>
                <option value="Street Vending / Micro Hawkers">Street Vending / Hawker</option>
                <option value="Agriculture Allied">Agriculture Allied (Dairy/Poultry)</option>
              </select>
            </div>

            {/* Social Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Social Category (For Subsidies)
              </label>
              <select
                value={socialCategory}
                onChange={e => setSocialCategory(e.target.value as SocialCategory)}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="OBC">Other Backward Classes (OBC)</option>
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
                <option value="General">General Category</option>
                <option value="Minority">Minority Community</option>
                <option value="Safai Karamchari">Safai Karamchari / Dependent</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value as Gender)}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="Female">Female (Eligible for Stand-Up & New Swarnima)</option>
                <option value="Male">Male</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                State
              </label>
              <select
                value={state}
                onChange={e => {
                  setState(e.target.value);
                  const districts = STATES_AND_DISTRICTS[e.target.value];
                  if (districts && districts.length > 0) {
                    setDistrict(districts[0]);
                  }
                }}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                {Object.keys(STATES_AND_DISTRICTS).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                District
              </label>
              <select
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                {(STATES_AND_DISTRICTS[state] || ['Default District']).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Area Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location Area
              </label>
              <select
                value={locationType}
                onChange={e => setLocationType(e.target.value as 'Rural' | 'Semi-Urban' | 'Urban')}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="Urban">Urban</option>
                <option value="Rural">Rural (Eligible for higher 35% PMEGP subsidy)</option>
                <option value="Semi-Urban">Semi-Urban</option>
              </select>
            </div>
          </div>

          {/* Missing Information Prompt Banner */}
          {missingItems.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Fields confirmed from default context:</span>{' '}
                Location set to {district}, {state} ({locationType}). You can refine these anytime.
              </div>
            </div>
          )}

          {/* Action to proceed to results */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Deterministic rule verification will execute upon confirmation.
            </span>
            <button
              type="button"
              onClick={handleConfirmAndCheck}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-md shadow-xs transition-all"
            >
              <span>Verify Eligibility & View Schemes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
