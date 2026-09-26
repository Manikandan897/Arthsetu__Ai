import React, { useState } from 'react';
import { ShieldCheck, Mail, ArrowRight, CheckCircle2, Lock, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ActiveTab, UserProfile } from '../../types';

interface LoginViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  userProfile: UserProfile;
}

export const LoginView: React.FC<LoginViewProps> = ({ setActiveTab, userProfile }) => {
  const { currentUser, userEmail, loginWithGoogle, logout, isLoading } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setErrorMsg(null);
      setInProgress(true);
      await loginWithGoogle();
      setInProgress(false);
      setActiveTab('profile');
    } catch (err: any) {
      setInProgress(false);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Sign-in popup was closed. Please try again.');
      } else {
        setErrorMsg(err.message || 'Unable to sign in. Please verify your internet connection.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb / Top label */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-900 rounded-md text-xs font-semibold mb-3 border border-blue-100">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-800" />
          <span>Unified Citizen Entrepreneur Account · SIH26092</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {currentUser ? 'Your ArthSetu Account' : 'Sign in to ArthSetu AI'}
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
          Save your business details under your mail ID. Enter your profile once and have it automatically pre-filled across all 8 central government loan and subsidy schemes.
        </p>
      </div>

      {currentUser ? (
        /* ALREADY LOGGED IN STATE */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white font-bold text-2xl flex items-center justify-center mx-auto shadow-sm">
            {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email?.[0].toUpperCase() || 'U'}
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Signed In & Cloud Synchronized</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {currentUser.displayName || 'Entrepreneur Account'}
            </h2>
            <p className="text-sm font-medium text-slate-600 mt-0.5">
              {currentUser.email}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Saved Profile Name:</span>
              <span className="font-semibold text-slate-900">{userProfile.fullName || 'Not configured'}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Registered Business:</span>
              <span className="font-semibold text-slate-900">{userProfile.tradeOrActivity || 'Craft/Vocation'}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Required Loan Assistance:</span>
              <span className="font-semibold text-slate-900">₹{userProfile.requiredLoanAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>State & District:</span>
              <span className="font-semibold text-slate-900">{userProfile.district}, {userProfile.state}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center">
            <button
              onClick={() => setActiveTab('profile')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-sm rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <span>Manage Profile & Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => logout()}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        /* LOGIN / SIGN IN STATE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Benefits & Trust */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400 font-serif">
                  अ
                </div>
                <span className="text-base font-bold text-white tracking-tight">One Citizen Account · All Schemes</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Applying for government entrepreneurship programs shouldn't require re-entering the same project details, machinery estimates, and caste certificates over and over again.
              </p>

              <div className="mt-6 space-y-3.5 text-xs text-slate-200">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Saved directly to your Mail ID:</strong> Secure cloud storage guarantees your draft project reports and financial profiles are never lost.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Instant Cross-Scheme Autofill:</strong> When you switch between PM Vishwakarma, PMEGP, or Mudra, your trade, equipment costs, and personal information pre-fill automatically.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Agent / Middleman Exploitation:</strong> Your credentials connect you straight to official branch officers and verified DIC nodal desks.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900">
              <Lock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                Protected under Indian Digital Personal Data Protection (DPDP) principles. Your enterprise figures are encrypted and accessible only by you.
              </span>
            </div>
          </div>

          {/* Right Column: Google Sign In Card */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Sign in to your account</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Authenticate securely using your Google or Google Workspace email address.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading || inProgress}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-semibold text-sm rounded-xl border border-slate-300 shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-60"
                >
                  {inProgress ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-900" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  )}
                  <span>Continue with Google</span>
                </button>
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400 font-medium">Or continue as guest</span>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className="text-xs font-semibold text-blue-900 hover:text-blue-950 underline underline-offset-4 cursor-pointer"
                >
                  Continue with Demo Account (Save locally in session)
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed text-center">
                By continuing, you agree to official government identity verification standards under Ministry of MSME guidelines.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
