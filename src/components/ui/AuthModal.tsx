'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUIStore } from '@/store/uiStore';
import toast from 'react-hot-toast';

export default function AuthModal() {
  const { isAuthModalOpen, authModalTab, closeAuthModal } = useUIStore();
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(authModalTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await signIn(email, password);
        toast.success('Welcome back to Berlin Store!');
        closeAuthModal();
      } else if (mode === 'signup') {
        await signUp(email, password, name);
        toast.success('Account created! Please verify your email.');
        closeAuthModal();
      } else if (mode === 'forgot') {
        await resetPassword(email);
        toast.success('Password reset email sent! Check your inbox.');
        setMode('login');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Signed in with Google!');
      closeAuthModal();
    } catch (error: any) {
      console.error('Google Auth error:', error);
      toast.error('Google sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuthModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[350]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-brand-charcoal rounded-3xl z-[360] shadow-2xl p-8 border border-brand-gray-100 dark:border-brand-gray-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-brand-black dark:text-white">
                  {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
                </h3>
                <p className="text-brand-gray-400 text-xs mt-1">
                  {mode === 'login' ? 'Sign in to access your orders & wishlist' : mode === 'signup' ? 'Join Berlin Store VIP Club today' : 'Enter your email to receive reset link'}
                </p>
              </div>
              <button onClick={closeAuthModal} className="p-2 rounded-full hover:bg-brand-gray-100 dark:hover:bg-brand-gray-700">
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-brand-gray-600 dark:text-brand-gray-300 uppercase tracking-wider mb-1">Full Name</label>
                  <div className="relative flex items-center">
                    <User size={16} className="absolute left-4 text-brand-gray-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-brand-gray-50 dark:bg-brand-gray-800 border border-brand-gray-200 dark:border-brand-gray-700 rounded-xl pl-11 pr-4 py-3 text-sm text-brand-black dark:text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-brand-gray-600 dark:text-brand-gray-300 uppercase tracking-wider mb-1">Email</label>
                <div className="relative flex items-center">
                  <Mail size={16} className="absolute left-4 text-brand-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-brand-gray-50 dark:bg-brand-gray-800 border border-brand-gray-200 dark:border-brand-gray-700 rounded-xl pl-11 pr-4 py-3 text-sm text-brand-black dark:text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-brand-gray-600 dark:text-brand-gray-300 uppercase tracking-wider">Password</label>
                    {mode === 'login' && (
                      <button type="button" onClick={() => setMode('forgot')} className="text-xs text-brand-gold hover:underline">
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <Lock size={16} className="absolute left-4 text-brand-gray-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-brand-gray-50 dark:bg-brand-gray-800 border border-brand-gray-200 dark:border-brand-gray-700 rounded-xl pl-11 pr-4 py-3 text-sm text-brand-black dark:text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-black font-bold py-3.5 rounded-xl transition-all duration-300 hover:shadow-glow-gold text-sm mt-2"
              >
                {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
              </button>
            </form>

            {/* Google Sign-in */}
            {mode !== 'forgot' && (
              <>
                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-brand-gray-200 dark:border-brand-gray-700" />
                  <span className="px-3 text-xs text-brand-gray-400">OR</span>
                  <div className="flex-1 border-t border-brand-gray-200 dark:border-brand-gray-700" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-brand-gray-50 dark:bg-brand-gray-800 hover:bg-brand-gray-100 dark:hover:bg-brand-gray-700 border border-brand-gray-200 dark:border-brand-gray-700 text-brand-black dark:text-white font-medium py-3 rounded-xl transition-colors text-sm"
                >
                  <Globe size={18} className="text-red-500" /> Continue with Google
                </button>
              </>
            )}

            {/* Footer switcher */}
            <div className="mt-6 text-center text-xs text-brand-gray-500">
              {mode === 'login' ? (
                <>Don't have an account? <button onClick={() => setMode('signup')} className="text-brand-gold font-semibold hover:underline">Sign Up</button></>
              ) : (
                <>Already have an account? <button onClick={() => setMode('login')} className="text-brand-gold font-semibold hover:underline">Sign In</button></>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
