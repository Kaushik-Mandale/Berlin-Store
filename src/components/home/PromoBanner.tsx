'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';

const SALE_END = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000);

function useCountdown(target: Date) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    setMounted(true);
    const calc = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      return {
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      };
    };
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return { ...time, mounted };
}

function Pad({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[64px]">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl w-14 h-14 flex items-center justify-center">
        <span className="font-display font-bold text-2xl text-white" suppressHydrationWarning>
          {String(n).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/50 mt-1">{label}</span>
    </div>
  );
}

export default function PromoBanner() {
  const { d, h, m, s, mounted } = useCountdown(SALE_END);

  return (
    <section
      className="section-py relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #111 0%, #2D2016 50%, #111 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(184,150,46,0.1) 0%, transparent 70%)' }}
      />
      <div className="container-fluid relative z-10 text-center">
        <div
          className="inline-flex items-center gap-2 bg-[#B8962E]/20 border border-[#B8962E]/30 rounded-full px-5 py-2 mb-8"
          style={{ opacity: 0, animation: 'fadeInUp 0.6s ease forwards 0.2s' }}
        >
          <Zap size={14} className="text-[#D4AF37]" />
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#D4AF37]">Limited Time Offer</span>
        </div>

        <h2
          className="font-display font-bold text-4xl lg:text-6xl text-white mb-4 leading-tight"
          style={{ opacity: 0, animation: 'fadeInUp 0.6s ease forwards 0.35s' }}
        >
          Summer Sale — Up To{' '}
          <span className="text-gold-gradient">50% Off</span>
        </h2>
        <p
          className="text-white/60 text-base lg:text-lg mb-12 max-w-xl mx-auto"
          style={{ opacity: 0, animation: 'fadeInUp 0.6s ease forwards 0.5s' }}
        >
          Handpicked styles from your favourite brands. Sale ends when the timer hits zero.
        </p>

        {mounted && (
          <div
            className="flex items-center justify-center gap-3 mb-12 flex-wrap"
            style={{ opacity: 0, animation: 'fadeInUp 0.6s ease forwards 0.65s' }}
          >
            <Pad n={d} label="Days" />
            <span className="text-white/30 text-2xl font-light pb-4">:</span>
            <Pad n={h} label="Hours" />
            <span className="text-white/30 text-2xl font-light pb-4">:</span>
            <Pad n={m} label="Min" />
            <span className="text-white/30 text-2xl font-light pb-4">:</span>
            <Pad n={s} label="Sec" />
          </div>
        )}

        <div style={{ opacity: 0, animation: 'fadeInUp 0.6s ease forwards 0.8s' }}>
          <Link
            href="/shop?filter=sale"
            className="inline-flex items-center gap-3 bg-[#B8962E] hover:bg-[#D4AF37] text-white font-bold text-sm tracking-wide px-10 py-4 rounded-full transition-all duration-300 shadow-lg"
          >
            Shop the Sale <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
