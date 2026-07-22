'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';

const HERO_WORDS = ['Fashion.', 'Luxury.', 'Style.'];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    // GSAP-style stagger on mount — using CSS keyframes + stagger delays
    const elements = containerRef.current?.querySelectorAll('[data-hero]');
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${0.1 + i * 0.12}s`;
      (el as HTMLElement).style.animationFillMode = 'forwards';
    });

    // Rotating word
    const interval = setInterval(() => {
      setWordIdx(i => (i + 1) % HERO_WORDS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 12,
    });
    setCursorVisible(true);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: 'linear-gradient(145deg, #F7F5F0 0%, #EDE8DF 40%, #F0EDE8 100%)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCursorVisible(false)}
    >
      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(184,150,46,0.08) 0%, transparent 70%)', animation: 'floatSlow 8s ease-in-out infinite' }} />
        <div className="absolute bottom-[15%] right-[8%] w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(184,150,46,0.06) 0%, transparent 70%)', animation: 'floatSlow 10s ease-in-out infinite reverse' }} />
        {/* Geometric lines */}
        <svg className="absolute top-0 right-0 w-[45%] h-full opacity-[0.04]" viewBox="0 0 400 800" fill="none" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="400" y2="800" stroke="#1C1C1C" strokeWidth="1" />
          <line x1="100" y1="0" x2="400" y2="600" stroke="#1C1C1C" strokeWidth="1" />
          <line x1="200" y1="0" x2="400" y2="400" stroke="#1C1C1C" strokeWidth="1" />
        </svg>
      </div>

      {/* Cursor follower */}
      {cursorVisible && (
        <div
          className="fixed w-6 h-6 rounded-full border-2 border-[#B8962E] pointer-events-none z-50 mix-blend-multiply transition-transform duration-100"
          style={{ transform: `translate(calc(-50%), calc(-50%))`, left: 0, top: 0, position: 'fixed' }}
        />
      )}

      <div className="container-fluid w-full pt-24 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen">
          {/* ── Text Content ─────────────────────── */}
          <div className="relative z-10 py-20 lg:py-0">
            {/* Eyebrow */}
            <div
              data-hero
              className="inline-flex items-center gap-2 mb-6 hero-enter"
              style={{ opacity: 0 }}
            >
              <div className="w-8 h-px bg-[#B8962E]" />
              <span className="text-[11px] font-black tracking-[0.5em] uppercase text-[#B8962E]">
                New Collection AW&apos;24
              </span>
            </div>

            {/* Headline — word by word */}
            <h1 className="font-display font-bold leading-tight mb-2">
              <span
                data-hero
                className="block text-5xl lg:text-6xl xl:text-7xl text-[#1C1C1C] hero-enter"
                style={{ opacity: 0 }}
              >
                Discover
              </span>
              <span
                data-hero
                className="block text-5xl lg:text-6xl xl:text-7xl text-[#1C1C1C] hero-enter"
                style={{ opacity: 0 }}
              >
                Premium
              </span>
              <div
                data-hero
                className="relative h-[72px] lg:h-[80px] xl:h-[96px] overflow-hidden hero-enter"
                style={{ opacity: 0 }}
              >
                {HERO_WORDS.map((word, i) => (
                  <span
                    key={word}
                    className="absolute inset-0 text-5xl lg:text-6xl xl:text-7xl font-bold text-gold-gradient transition-all duration-700"
                    style={{
                      transform: i === wordIdx ? 'translateY(0) scale(1)' : i < wordIdx || (wordIdx === 0 && i === HERO_WORDS.length - 1) ? 'translateY(-100%) scale(0.9)' : 'translateY(100%) scale(0.9)',
                      opacity: i === wordIdx ? 1 : 0,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </h1>

            {/* Description */}
            <p
              data-hero
              className="text-[#7A7571] text-base lg:text-lg max-w-sm leading-relaxed mb-10 hero-enter"
              style={{ opacity: 0 }}
            >
              Curated branded clothing for men, women &amp; kids. 500+ brands. Timeless minimal luxury crafted for modern living.
            </p>

            {/* CTAs */}
            <div
              data-hero
              className="flex flex-wrap items-center gap-4 mb-14 hero-enter"
              style={{ opacity: 0 }}
            >
              <Link
                href="/shop"
                className="group relative inline-flex items-center gap-3 bg-[#1C1C1C] text-white font-bold text-sm px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:bg-[#333] hover:gap-5"
              >
                <span className="relative z-10">Shop Collection</span>
                <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/shop?filter=new"
                className="group inline-flex items-center gap-3 text-sm font-bold text-[#1C1C1C] border-b-2 border-transparent hover:border-[#B8962E] pb-0.5 transition-all duration-300"
              >
                <Play size={14} className="text-[#B8962E]" fill="currentColor" />
                New Arrivals
              </Link>
            </div>

            {/* Stats */}
            <div
              data-hero
              className="flex flex-wrap gap-8 hero-enter"
              style={{ opacity: 0 }}
            >
              {[
                { value: '500+', label: 'Premium Brands' },
                { value: '10K+', label: 'Products' },
                { value: '50K+', label: 'Happy Customers' },
              ].map(({ value, label }, i) => (
                <div key={label} className="group cursor-default" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="font-display font-bold text-2xl text-[#1C1C1C] group-hover:text-[#B8962E] transition-colors duration-300">{value}</div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-[#7A7571] mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Image Panel ──────────────────────── */}
          <div
            className="relative h-[500px] lg:h-screen"
            style={{
              transform: mounted ? `perspective(1200px) rotateY(${-mousePos.x * 0.3}deg) rotateX(${mousePos.y * 0.3}deg)` : 'none',
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* Main image */}
            <div
              data-hero
              className="absolute inset-0 lg:right-[-48px] hero-enter"
              style={{ opacity: 0 }}
            >
              <Image
                src="/hero-model.png"
                alt="Premium fashion editorial"
                fill
                quality={95}
                priority
                className="object-cover object-top lg:object-center rounded-3xl lg:rounded-none"
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#F7F5F0]/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F7F5F0] via-transparent to-transparent hidden lg:block" style={{ width: '25%' }} />
            </div>

            {/* Floating product tag */}
            <div
              className="absolute bottom-24 left-6 lg:left-0 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-4 max-w-[200px] z-10"
              style={{ animation: 'floatUp 6s ease-in-out infinite', opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease 1.5s' }}
            >
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#B8962E] mb-1">Trending Now</div>
              <div className="font-display font-bold text-sm text-[#1C1C1C] mb-0.5">Charcoal Blazer</div>
              <div className="text-xs text-[#7A7571]">Zara Collection</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-sm text-[#1C1C1C]">₹3,499</span>
                <span className="text-xs text-[#7A7571] line-through">₹5,999</span>
                <span className="text-[9px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">-42%</span>
              </div>
            </div>

            {/* Season badge */}
            <div
              className="absolute top-24 right-6 lg:right-12 bg-[#1C1C1C]/90 backdrop-blur-md rounded-2xl p-4 z-10 text-center"
              style={{ animation: 'floatDown 7s ease-in-out infinite', opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease 1.8s' }}
            >
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#B8962E] mb-0.5">Season</div>
              <div className="font-display font-bold text-white text-lg">AW&apos;24</div>
              <div className="text-[10px] text-white/60">New Drops Weekly</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {mounted && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity" style={{ animation: 'pulse 2s ease-in-out infinite' }}>
          <div className="w-5 h-8 border-2 border-[#1C1C1C] rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-[#1C1C1C] rounded-full" style={{ animation: 'scrollDot 1.5s ease-in-out infinite' }} />
          </div>
          <span className="text-[10px] tracking-widest uppercase text-[#7A7571]">Scroll</span>
        </div>
      )}

      <style jsx global>{`
        .hero-enter { animation: heroFadeRise 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .text-gold-gradient {
          background: linear-gradient(135deg, #B8962E 0%, #D4AF37 50%, #B8962E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes heroFadeRise {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) translateX(0); }
          33%  { transform: translateY(-20px) translateX(10px); }
          66%  { transform: translateY(10px) translateX(-10px); }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50%  { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes floatDown {
          0%, 100% { transform: translateY(0) rotate(1deg); }
          50%  { transform: translateY(10px) rotate(-1deg); }
        }
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%  { transform: translateY(8px); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
