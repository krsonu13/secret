import React, { useState } from 'react';
import { Lock, ArrowLeft, Heart } from 'lucide-react';
import { api } from '../services/api';

interface Props {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLoginPage: React.FC<Props> = ({ onLoginSuccess, onBackToHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.login({ email, password });
      onLoginSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-6 left-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-all"
        >
          <ArrowLeft size={16} />
          <span>Back To Birthday Page</span>
        </button>
      </div>

      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-rose-glow/20 border border-rose-glow/40 flex items-center justify-center mx-auto mb-6 text-rose-glow">
          <Lock size={26} />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white text-center mb-2">
          Admin Portal
        </h2>
        <p className="text-white/60 text-xs text-center mb-8">
          Manage Vaishnavi's birthday website content &amp; wishes
        </p>

        {error && (
          <div className="p-3.5 mb-6 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@birthday.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-rose-glow"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-rose-glow"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-rose-glow to-violet-mystic text-white font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-rose-glow/30 disabled:opacity-50"
          >
            <Lock size={16} />
            <span>{loading ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          Tip: Default seeded account is <br />
          <span className="text-gold-warm font-mono">admin@birthday.com / SisterSurprise2026!</span>
        </div>
      </div>
    </div>
  );
};
