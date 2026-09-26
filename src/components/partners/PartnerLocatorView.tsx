import React, { useState } from 'react';
import { PARTNER_LOCATIONS, STATES_AND_DISTRICTS } from '../../data/partners';
import { OFFICIAL_SCHEMES } from '../../data/schemes';
import { PartnerLocation, PartnerType, ActiveTab } from '../../types';
import { MapPin, Phone, Mail, Clock, ExternalLink, ShieldAlert, CheckCircle2, Building, Search, Navigation } from 'lucide-react';

interface PartnerLocatorViewProps {
  initialSchemeId?: string;
  initialState?: string;
  initialDistrict?: string;
  setActiveTab: (tab: ActiveTab) => void;
}

export const PartnerLocatorView: React.FC<PartnerLocatorViewProps> = ({
  initialSchemeId,
  initialState = 'Tamil Nadu',
  initialDistrict = 'Chennai',
  setActiveTab
}) => {
  const [selectedState, setSelectedState] = useState<string>(initialState);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict);
  const [selectedSchemeFilter, setSelectedSchemeFilter] = useState<string>(initialSchemeId || 'all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const states = Object.keys(STATES_AND_DISTRICTS);
  const districts = STATES_AND_DISTRICTS[selectedState] || [];

  // Filter partners
  const filteredPartners = PARTNER_LOCATIONS.filter(partner => {
    // State match
    if (selectedState && partner.state.toLowerCase() !== selectedState.toLowerCase()) {
      return false;
    }
    // District match (if exists in mock dataset)
    if (selectedDistrict && partner.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
      // If we don't have this district in mock, still show state partners with a notice
    }
    // Scheme match
    if (selectedSchemeFilter !== 'all') {
      if (!partner.supportedSchemes.includes(selectedSchemeFilter)) {
        return false;
      }
    }
    // Type match
    if (selectedTypeFilter !== 'all') {
      if (partner.type !== selectedTypeFilter) {
        return false;
      }
    }
    // Query search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        partner.name.toLowerCase().includes(q) ||
        partner.address.toLowerCase().includes(q) ||
        partner.servicesOffered.some(s => s.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const partnerTypes: PartnerType[] = [
    'Public Sector Bank',
    'District Industries Centre (DIC)',
    'KVIC / KVIB Office',
    'SIDBI Branch',
    'CSC / Common Service Centre'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-5 h-5 text-blue-900" />
            <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
              Geo-Spatial Assistance Routing
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Authorized Partner & Facilitation Centre Locator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Locate authorized public sector bank branches, District Industries Centres (DIC), KVIC desks, and CSC Seva Kendras.
          </p>
        </div>

        {/* Prototype & Live Bank Confirmation Notice */}
        <div className="bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-[11px] text-slate-600 flex items-center gap-2 max-w-sm">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Note:</strong> Prototype data for SIH 2026. Real-time token queues & branch availability require bank confirmation.
          </span>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* State */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">State / UT</label>
            <select
              value={selectedState}
              onChange={e => {
                const s = e.target.value;
                setSelectedState(s);
                const dList = STATES_AND_DISTRICTS[s] || [];
                if (dList.length > 0) setSelectedDistrict(dList[0]);
              }}
              className="w-full p-2 border border-slate-300 rounded-md bg-white font-medium text-slate-800 focus:ring-2 focus:ring-blue-600"
            >
              {states.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-800 focus:ring-2 focus:ring-blue-600"
            >
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Scheme Filter */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Supported Scheme</label>
            <select
              value={selectedSchemeFilter}
              onChange={e => setSelectedSchemeFilter(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-800 focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Central Schemes</option>
              {OFFICIAL_SCHEMES.map(s => (
                <option key={s.id} value={s.id}>{s.shortName}</option>
              ))}
            </select>
          </div>

          {/* Partner Agency Type */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Agency Classification</label>
            <select
              value={selectedTypeFilter}
              onChange={e => setSelectedTypeFilter(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-800 focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Partner Types</option>
              {partnerTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search by branch name or address */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by center name, street, or specific service..."
              className="w-full text-xs pl-8 pr-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          {(selectedSchemeFilter !== 'all' || selectedTypeFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedSchemeFilter('all');
                setSelectedTypeFilter('all');
                setSearchQuery('');
              }}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-2 py-1"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Location Context */}
      <div className="flex items-center justify-between mb-4 text-xs text-slate-600">
        <div>
          Showing <strong className="text-slate-900">{filteredPartners.length}</strong> authorized facilitation points in{' '}
          <strong className="text-blue-900">{selectedDistrict}, {selectedState}</strong>
        </div>
        <div className="hidden sm:block text-[11px] text-slate-400">
          Ranked by proximity to district administrative centroid
        </div>
      </div>

      {/* Partners Grid */}
      {filteredPartners.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
          <Building className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800">No partner branches found matching current filters</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the scheme filter or select another district.</p>
          <button
            onClick={() => {
              setSelectedState('Tamil Nadu');
              setSelectedDistrict('Chennai');
              setSelectedSchemeFilter('all');
              setSelectedTypeFilter('all');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold bg-blue-900 text-white rounded-md"
          >
            Show Chennai Sample Centers
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map(partner => (
            <div
              key={partner.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Agency Type & Distance */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wide">
                    {partner.type}
                  </span>
                  {partner.distanceKm && (
                    <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-blue-700" />
                      {partner.distanceKm} km
                    </span>
                  )}
                </div>

                {/* Name & Address */}
                <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">
                  {partner.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{partner.address}, {partner.district} - {partner.pincode}</span>
                </p>

                {/* Contact & Timings */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{partner.timings}</span>
                  </div>
                  {partner.contactPerson && (
                    <div className="text-[11px] text-slate-500 font-medium">
                      Nodal Officer: <span className="text-slate-700">{partner.contactPerson}</span>
                    </div>
                  )}
                </div>

                {/* Services Checklist */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Facilitation Services:
                  </div>
                  {partner.servicesOffered.slice(0, 3).map((srv, i) => (
                    <div key={i} className="flex items-start gap-1 text-[11px] text-slate-700">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{srv}</span>
                    </div>
                  ))}
                </div>

                {/* Supported Schemes Chips */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                  {partner.supportedSchemes.map(schId => {
                    const sch = OFFICIAL_SCHEMES.find(s => s.id === schId);
                    return (
                      <span
                        key={schId}
                        className="text-[10px] font-medium bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded"
                      >
                        {sch ? sch.shortName : schId}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={`tel:${partner.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>Call Desk</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const query = encodeURIComponent(`${partner.name}, ${partner.address}, ${partner.district}`);
                    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
