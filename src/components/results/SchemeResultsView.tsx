import React, { useState } from 'react';
import { SchemeMatchResult, UserProfile, ActiveTab } from '../../types';
import { SchemeCard } from './SchemeCard';
import { WhyThisSchemeModal } from './WhyThisSchemeModal';
import { Filter, Scale, RefreshCw, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { formatINR } from '../../services/financialCalculator';

interface SchemeResultsViewProps {
  matchResults: SchemeMatchResult[];
  userProfile: UserProfile;
  setActiveTab: (tab: ActiveTab) => void;
  selectedForCompare: string[];
  setSelectedForCompare: React.Dispatch<React.SetStateAction<string[]>>;
  onOpenSchemeDetails: (schemeId: string) => void;
  onCalculateEMI: (schemeId: string) => void;
  onFindPartners: (schemeId: string) => void;
}

export const SchemeResultsView: React.FC<SchemeResultsViewProps> = ({
  matchResults,
  userProfile,
  setActiveTab,
  selectedForCompare,
  setSelectedForCompare,
  onOpenSchemeDetails,
  onCalculateEMI,
  onFindPartners
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeWhyModal, setActiveWhyModal] = useState<SchemeMatchResult | null>(null);

  const toggleCompare = (schemeId: string) => {
    if (selectedForCompare.includes(schemeId)) {
      setSelectedForCompare(prev => prev.filter(id => id !== schemeId));
    } else {
      if (selectedForCompare.length >= 4) {
        alert('You can compare up to 4 schemes simultaneously.');
        return;
      }
      setSelectedForCompare(prev => [...prev, schemeId]);
    }
  };

  const filteredResults = matchResults.filter(r => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'artisan') return r.scheme.categoryTag === 'Artisan & Craft';
    if (selectedFilter === 'micro') return r.scheme.categoryTag === 'Micro Enterprise' || r.scheme.categoryTag === 'Street Vendor';
    if (selectedFilter === 'marginalized') return r.scheme.categoryTag === 'Women / SC / ST' || r.scheme.categoryTag === 'SC/ST Special';
    if (selectedFilter === 'subsidy') return r.scheme.subsidyInfo.hasSubsidy;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Profile Context Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 mb-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
            Active Entrepreneur Profile Context
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-700">
            <span className="font-bold text-slate-900">{userProfile.fullName || 'Beneficiary'}</span>
            <span className="text-slate-300">·</span>
            <span>Trade: <strong className="text-slate-900">{userProfile.tradeOrActivity || 'Micro Business'}</strong></span>
            <span className="text-slate-300">·</span>
            <span>Requested: <strong className="text-blue-900 font-mono">{formatINR(userProfile.requiredLoanAmount)}</strong></span>
            <span className="text-slate-300">·</span>
            <span>Category: <strong className="text-slate-900">{userProfile.socialCategory} ({userProfile.gender})</strong></span>
            <span className="text-slate-300">·</span>
            <span>Location: <strong className="text-slate-900">{userProfile.district}, {userProfile.state} ({userProfile.locationType})</strong></span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('find-scheme')}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
          <span>Edit Profile / Re-evaluate</span>
        </button>
      </div>

      {/* Main Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Potential Scheme Matches ({filteredResults.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Ranked by deterministic rule compatibility. Labelled as "Profile Match" pending bank sanction.
          </p>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              selectedFilter === 'all' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Schemes ({matchResults.length})
          </button>
          <button
            onClick={() => setSelectedFilter('artisan')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              selectedFilter === 'artisan' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Artisans & Craft
          </button>
          <button
            onClick={() => setSelectedFilter('micro')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              selectedFilter === 'micro' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Micro & Vendors
          </button>
          <button
            onClick={() => setSelectedFilter('marginalized')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              selectedFilter === 'marginalized' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Women / SC / ST
          </button>
          <button
            onClick={() => setSelectedFilter('subsidy')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              selectedFilter === 'subsidy' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            With Capital Subsidy
          </button>
        </div>
      </div>

      {/* Grid of Results */}
      {filteredResults.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800">No schemes match this specific category filter</h3>
          <p className="text-xs text-slate-500 mt-1">Try switching to "All Schemes" or updating your loan amount.</p>
          <button
            onClick={() => setSelectedFilter('all')}
            className="mt-4 px-4 py-2 text-xs font-semibold bg-blue-900 text-white rounded-md"
          >
            View All Schemes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map(result => (
            <SchemeCard
              key={result.scheme.id}
              matchResult={result}
              isCompared={selectedForCompare.includes(result.scheme.id)}
              onToggleCompare={() => toggleCompare(result.scheme.id)}
              onWhyThisScheme={() => setActiveWhyModal(result)}
              onViewDetails={() => onOpenSchemeDetails(result.scheme.id)}
              onCalculateEMI={() => onCalculateEMI(result.scheme.id)}
              onFindPartners={() => onFindPartners(result.scheme.id)}
            />
          ))}
        </div>
      )}

      {/* Floating Compare Action Bar if schemes are selected */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white rounded-xl shadow-2xl px-5 py-3.5 flex items-center gap-4 border border-slate-700 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>{selectedForCompare.length} scheme(s) selected for comparison</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedForCompare([])}
              className="px-2.5 py-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Clear
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
            >
              <span>Compare Side-by-Side</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Why This Scheme Modal */}
      {activeWhyModal && (
        <WhyThisSchemeModal
          matchResult={activeWhyModal}
          onClose={() => setActiveWhyModal(null)}
          onOpenDetails={schemeId => onOpenSchemeDetails(schemeId)}
          onCalculateEMI={schemeId => onCalculateEMI(schemeId)}
        />
      )}
    </div>
  );
};
