import React, { useState } from 'react';
import { ActiveTab } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../data/languages';
import { Globe, Menu, X, ArrowRight, ShieldCheck, User, LogIn, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { currentUser, userEmail } = useAuth();

  const navLinks: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'find-scheme', label: 'Find My Scheme' },
    { id: 'scheme-results', label: 'Schemes' },
    { id: 'compare', label: 'Compare' },
    { id: 'calculator', label: 'EMI Calculator' },
    { id: 'partners', label: 'Partners' },
    { id: 'documents', label: 'Documents' },
    { id: 'profile', label: 'My Profile' },
    { id: 'dashboard', label: 'Dashboard' }
  ];

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      {/* Official Government Service Banner */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="font-semibold text-slate-100">National MSME Credit & Subsidy Linkage Portal</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">Smart India Hackathon 2026 (SIH26092)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span className="hidden md:inline text-slate-400">Deterministic Eligibility Engine</span>
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Ministry Gazette Verified</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row: Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark with emblem */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-slate-700/80 flex items-center justify-center text-amber-400 font-bold text-lg shadow-xs group-hover:border-amber-400/50 transition-colors">
            <span>अ</span>
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-slate-950 leading-tight">
              ArthSetu <span className="text-blue-700 font-extrabold">AI</span>
            </div>
            <div className="text-[9.5px] text-slate-500 tracking-wider font-semibold uppercase">
              Government Credit & Subsidy Linkage
            </div>
          </div>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600" aria-label="Main Navigation">
          {navLinks.slice(0, 8).map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-1 transition-colors relative whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-blue-900 font-semibold border-b-2 border-blue-800'
                    : 'hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Language Selector & Auth Account) */}
        <div className="flex items-center gap-2.5">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
              title="Select Language"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">{currentLang.nativeName}</span>
            </button>

            {langDropdownOpen && (
              <div
                className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-50 text-xs"
                onMouseLeave={() => setLangDropdownOpen(false)}
              >
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Language
                </div>
                {SUPPORTED_LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                      selectedLanguage === lang.code ? 'font-semibold text-blue-700 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Account / Login Button */}
          {currentUser ? (
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 py-1 px-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-blue-800 bg-blue-50 text-blue-900'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-800'
              }`}
              title={`Logged in as ${currentUser.email}`}
            >
              <div className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-[11px]">
                {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email?.[0].toUpperCase() || 'U'}
              </div>
              <span className="hidden md:inline max-w-[120px] truncate">
                {currentUser.displayName || currentUser.email?.split('@')[0]}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Synchronized with Mail ID" />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('login')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-600" />
              <span>Login</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => setActiveTab('find-scheme')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 active:scale-98 rounded transition-all shadow-xs cursor-pointer"
          >
            <span>Find Scheme</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {navLinks.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm rounded cursor-pointer ${
                activeTab === item.id ? 'bg-blue-50 font-semibold text-blue-900' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            {!currentUser ? (
              <button
                onClick={() => {
                  setActiveTab('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login to Account</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-blue-900 bg-blue-50 rounded"
              >
                <User className="w-3.5 h-3.5" />
                <span>My Profile ({currentUser.email})</span>
              </button>
            )}
            <button
              onClick={() => {
                setActiveTab('find-scheme');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-blue-900 rounded"
            >
              <span>Find My Scheme</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
