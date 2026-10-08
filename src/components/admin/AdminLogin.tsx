import React, { useState } from 'react';
import { api, AdminUser } from '../../services/api';
import { SchoolLogo } from '../SchoolLogo';
import { Lock, Mail, Key, ShieldCheck, AlertCircle, ArrowLeft, Loader2, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToSite: () => void;
  isDark: boolean;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite, isDark }) => {
  const [email, setEmail] = useState('admin@skmhighschool.in');
  const [password, setPassword] = useState('admin@skm1956');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.login(email, password);
      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Server connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100' 
        : 'bg-gradient-to-br from-slate-50 via-amber-50/40 to-blue-50/40 text-slate-900'
    }`}>
      {/* Background Decorative Circles */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <button
          onClick={onBackToSite}
          className={`flex items-center gap-2 mb-6 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
            isDark 
              ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800' 
              : 'bg-white/80 hover:bg-white text-slate-700 shadow-sm border border-slate-200'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Public School Portal
        </button>

        {/* Login Card */}
        <div className={`rounded-3xl p-8 border backdrop-blur-xl shadow-2xl transition-all ${
          isDark 
            ? 'bg-slate-900/90 border-slate-800 shadow-blue-950/40' 
            : 'bg-white/95 border-amber-100 shadow-amber-900/5'
        }`}>
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4 p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30">
              <SchoolLogo size={52} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              SKM High School CMS
            </h1>
            <p className={`text-xs mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Sarvoday Kelavani Mandal, Kanodar • Est. 1956
            </p>
            <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Authorized Staff Administration
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-400">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@skmhighschool.in"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 ${
                    isDark 
                      ? 'bg-slate-950/60 border-slate-800 text-slate-100 focus:border-amber-500 focus:ring-amber-500/20' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-600 focus:ring-amber-500/20 focus:bg-white'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-400">
                Master Security Password
              </label>
              <div className="relative">
                <Key className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 ${
                    isDark 
                      ? 'bg-slate-950/60 border-slate-800 text-slate-100 focus:border-amber-500 focus:ring-amber-500/20' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-600 focus:ring-amber-500/20 focus:bg-white'
                  }`}
                />
              </div>
            </div>

            {/* Quick Demo Credentials Help Pill */}
            <div className={`p-3 rounded-xl border text-xs ${
              isDark ? 'bg-slate-950/40 border-slate-800/80 text-slate-400' : 'bg-amber-50/50 border-amber-100 text-amber-900/80'
            }`}>
              <p className="font-semibold flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5" /> Demo Staff Credentials:
              </p>
              <p className="mt-1">
                Email: <code className="font-mono font-bold">admin@skmhighschool.in</code><br />
                Password: <code className="font-mono font-bold">admin@skm1956</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In to School Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Secured with SHA-256 / JWT Authentication • Digital Guru
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
