import React, { useState, useMemo } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { HomeFeatures } from './components/home/HomeFeatures';
import { FindSchemeWizard } from './components/findScheme/FindSchemeWizard';
import { SchemeResultsView } from './components/results/SchemeResultsView';
import { SchemeDetailModal } from './components/results/SchemeDetailModal';
import { SchemeComparisonView } from './components/compare/SchemeComparisonView';
import { FinancialCalculatorView } from './components/calculator/FinancialCalculatorView';
import { PartnerLocatorView } from './components/partners/PartnerLocatorView';
import { DocumentChecklistView } from './components/documents/DocumentChecklistView';
import { ApplicationGuidanceView } from './components/guidance/ApplicationGuidanceView';
import { EntrepreneurDashboardView } from './components/dashboard/EntrepreneurDashboardView';
import { ProfileView } from './components/profile/ProfileView';
import { LoginView } from './components/auth/LoginView';
import { FloatingAssistant } from './components/assistant/FloatingAssistant';
import { AuthProvider } from './context/AuthContext';

import { ActiveTab, UserProfile, Scheme } from './types';
import { OFFICIAL_SCHEMES } from './data/schemes';
import { matchSchemes } from './services/ruleEngine';
import { TRANSLATIONS } from './data/languages';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  // Default realistic profile for demo (Tailoring artisan seeking ₹1,00,000)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: 'Ramesh Sundaram',
    email: '',
    phone: '+91 98765 43210',
    age: 32,
    gender: 'Male',
    socialCategory: 'OBC',
    isDivyangjan: false,
    businessStage: 'New Idea / Startup',
    businessType: 'Traditional Artisan / Craft',
    tradeOrActivity: 'Tailoring & Garments (Darzi)',
    businessDescription: 'Setting up an independent tailoring and garment stitching workshop with 2 commercial electric sewing machines and inventory.',
    requiredLoanAmount: 100000,
    ownContribution: 10000,
    annualHouseholdIncome: 180000,
    state: 'Tamil Nadu',
    district: 'Chennai',
    locationType: 'Urban',
    pincode: '600001',
    hasUdyamRegistration: false,
    hasPriorTraining: true,
    isShgMember: false,
    isBPLOrLowIncome: true,
    hasExistingBankLoan: false,
    hasCollateral: false
  });

  // Calculate matching scores across all official schemes using rule engine
  const matchResults = useMemo(() => {
    return matchSchemes(userProfile);
  }, [userProfile]);

  // Comparison selection
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([
    'pm-vishwakarma',
    'pmmy-mudra'
  ]);

  // Modal for Scheme Details
  const [schemeDetailId, setSchemeDetailId] = useState<string | null>(null);

  // Target prefill states for calculator & partner locator
  const [calcSchemeId, setCalcSchemeId] = useState<string>('pm-vishwakarma');
  const [partnerSchemeId, setPartnerSchemeId] = useState<string>('all');
  const [sampleNlpText, setSampleNlpText] = useState<string>('');

  const currentDetailScheme: Scheme | null = useMemo(() => {
    if (!schemeDetailId) return null;
    return OFFICIAL_SCHEMES.find(s => s.id === schemeDetailId) || null;
  }, [schemeDetailId]);

  const handleOpenSchemeDetails = (schemeId: string) => {
    setSchemeDetailId(schemeId);
  };

  const handleCalculateEMI = (schemeId: string) => {
    setCalcSchemeId(schemeId);
    setActiveTab('calculator');
  };

  const handleFindPartners = (schemeId: string) => {
    setPartnerSchemeId(schemeId);
    setActiveTab('partners');
  };

  const handleQuickSample = (sampleText: string) => {
    setSampleNlpText(sampleText);
    setActiveTab('find-scheme');
  };

  const translations = TRANSLATIONS[selectedLanguage] || TRANSLATIONS['en'];

  return (
    <AuthProvider currentProfile={userProfile} onProfileLoaded={setUserProfile}>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-900 selection:text-white">
        {/* Universal 3-Zone Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* TAB 1: HOME */}
          {activeTab === 'home' && (
            <div className="space-y-0">
              <Hero
                setActiveTab={setActiveTab}
                onQuickSample={handleQuickSample}
              />
              <HomeFeatures
                setActiveTab={setActiveTab}
                onOpenSchemeDetails={handleOpenSchemeDetails}
                onCalculateEMI={handleCalculateEMI}
              />
            </div>
          )}

          {/* TAB 2: FIND MY SCHEME WIZARD */}
          {activeTab === 'find-scheme' && (
            <FindSchemeWizard
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              initialSampleText={sampleNlpText}
              onComplete={() => setActiveTab('scheme-results')}
            />
          )}

          {/* TAB 3: SCHEME RESULTS */}
          {activeTab === 'scheme-results' && (
            <SchemeResultsView
              matchResults={matchResults}
              userProfile={userProfile}
              setActiveTab={setActiveTab}
              selectedForCompare={selectedForCompare}
              setSelectedForCompare={setSelectedForCompare}
              onOpenSchemeDetails={handleOpenSchemeDetails}
              onCalculateEMI={handleCalculateEMI}
              onFindPartners={handleFindPartners}
            />
          )}

          {/* TAB 4: COMPARE SCHEMES */}
          {activeTab === 'compare' && (
            <SchemeComparisonView
              selectedSchemeIds={selectedForCompare}
              setSelectedSchemeIds={setSelectedForCompare}
              setActiveTab={setActiveTab}
              onCalculateEMI={handleCalculateEMI}
              onFindPartners={handleFindPartners}
            />
          )}

          {/* TAB 5: FINANCIAL CALCULATOR */}
          {activeTab === 'calculator' && (
            <FinancialCalculatorView
              initialSchemeId={calcSchemeId}
              initialAmount={userProfile.requiredLoanAmount}
            />
          )}

          {/* TAB 6: PARTNER LOCATOR */}
          {activeTab === 'partners' && (
            <PartnerLocatorView
              initialSchemeId={partnerSchemeId}
              initialState={userProfile.state}
              initialDistrict={userProfile.district}
              setActiveTab={setActiveTab}
            />
          )}

          {/* TAB 7: DOCUMENT CHECKLIST */}
          {activeTab === 'documents' && (
            <DocumentChecklistView />
          )}

          {/* TAB 8: APPLICATION GUIDANCE */}
          {activeTab === 'guidance' && (
            <ApplicationGuidanceView
              setActiveTab={setActiveTab}
            />
          )}

          {/* TAB 9: ENTREPRENEUR DASHBOARD */}
          {activeTab === 'dashboard' && (
            <EntrepreneurDashboardView
              userProfile={userProfile}
              setActiveTab={setActiveTab}
              onOpenSchemeDetails={handleOpenSchemeDetails}
            />
          )}

          {/* TAB 10: USER PROFILE & ACCOUNT PAGE */}
          {activeTab === 'profile' && (
            <ProfileView
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              setActiveTab={setActiveTab}
              onOpenSchemeDetails={handleOpenSchemeDetails}
            />
          )}

          {/* TAB 11: LOGIN & SIGN IN PAGE */}
          {activeTab === 'login' && (
            <LoginView
              setActiveTab={setActiveTab}
              userProfile={userProfile}
            />
          )}
        </main>

        {/* Floating Citizen Support Assistant */}
        <FloatingAssistant
          userProfile={userProfile}
          setActiveTab={setActiveTab}
          onOpenSchemeDetails={handleOpenSchemeDetails}
        />

        {/* Scheme Detail Modal with Cross-Scheme Pre-filled Details */}
        {currentDetailScheme && (
          <SchemeDetailModal
            scheme={currentDetailScheme}
            onClose={() => setSchemeDetailId(null)}
            onCalculateEMI={handleCalculateEMI}
            onFindPartners={handleFindPartners}
            userProfile={userProfile}
            setActiveTab={setActiveTab}
          />
        )}

        {/* Government-Grade Footer */}
        <Footer setActiveTab={setActiveTab} />
      </div>
    </AuthProvider>
  );
}

export default App;
