'use client';

import { useState, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { visible } = useInViewAnimation(sectionRef);
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setState('loading');
    await new Promise(r => setTimeout(r, 1200));
    setState('done');
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F7F5F0 0%, #EDE8DF 100%)' }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #B8962E22 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF3733 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="container-fluid relative z-10">
        <div
          className="max-w-2xl mx-auto text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(48px)',
            transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-full bg-[#B8962E]/10 flex items-center justify-center mx-auto mb-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)',
              transition: 'all 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.2s',
            }}
          >
            <Sparkles size={24} className="text-[#B8962E]" />
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-[#B8962E]/50" />
            <span className="text-[11px] font-black tracking-[0.5em] uppercase text-[#B8962E]">Stay in the loop</span>
            <div className="w-10 h-px bg-[#B8962E]/50" />
          </div>

          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#1C1C1C] mb-4 leading-tight">
            Get Early Access to<br />
            <span style={{
              background: 'linear-gradient(135deg, #B8962E, #D4AF37)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Exclusive Deals
            </span>
          </h2>
          <p className="text-[#7A7571] text-sm lg:text-base mb-10 max-w-md mx-auto">
            Subscribe for weekly style tips, flash sale alerts, and members-only discounts. Unsubscribe anytime.
          </p>

          {state === 'done' ? (
            <div
              className="inline-flex items-center gap-3 bg-white border border-green-200 text-green-700 font-semibold px-8 py-4 rounded-full shadow-sm"
              style={{ animation: 'zoomIn 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
            >
              <span className="text-xl">✓</span> You&apos;re subscribed! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-white border border-[#E2DDD6] rounded-full px-5 py-4 text-sm outline-none focus:border-[#B8962E] focus:shadow-[0_0_0_3px_rgba(184,150,46,0.1)] transition-all duration-300 text-[#1C1C1C] placeholder:text-[#D0C9BC]"
                />
              </div>
              <button
                type="submit"
                disabled={state === 'loading'}
                className="flex-shrink-0 flex items-center gap-2 bg-[#B8962E] hover:bg-[#D4AF37] text-white font-bold text-sm px-7 py-4 rounded-full transition-all duration-300 disabled:opacity-60 hover:scale-105 hover:shadow-lg"
              >
                {state === 'loading' ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={15} />
                )}
                Subscribe
              </button>
            </form>
          )}

          <p className="text-xs text-[#D0C9BC] mt-4">By subscribing you agree to our Privacy Policy. No spam, ever.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes zoomIn {
          from { transform: scale(0.7); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
