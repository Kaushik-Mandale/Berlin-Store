'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const items = textRef.current.querySelectorAll<HTMLElement>('[data-hero]');
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 140 + 200}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 140 + 200}ms`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 50);
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen flex overflow-hidden bg-[#F7F5F0] dark:bg-[#141414]">
      {/* ── Left — Text ─────────────────────────────────────────── */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-28 pt-28 pb-16 w-full lg:w-[52%] xl:w-[48%]"
      >
        {/* Pre-title */}
        <div data-hero className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-[#B8962E]" />
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#B8962E]">
            New Collection 2024
          </span>
        </div>

        {/* Main Heading */}
        <h1
          data-hero
          className="font-display font-bold text-[clamp(3rem,7vw,6.5rem)] leading-[1.04] text-[#1C1C1C] dark:text-[#F0EDE8] mb-6"
        >
          Wear What
          <br />
          <span className="font-display font-normal italic text-gold-gradient">
            Defines You.
          </span>
        </h1>

        {/* Sub */}
        <p
          data-hero
          className="text-[#7A7571] dark:text-[#8A8580] text-base sm:text-lg max-w-md leading-relaxed mb-10"
        >
          Discover curated branded clothing for men, women, and kids.
          Timeless minimal luxury crafted for modern living.
        </p>

        {/* CTAs */}
        <div data-hero className="flex items-center gap-4 flex-wrap mb-16">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] font-semibold text-sm tracking-wide px-7 py-4 rounded-full hover:bg-[#333] dark:hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Shop Collection <ArrowRight size={16} />
          </Link>
          <Link
            href="/shop?filter=new"
            className="inline-flex items-center gap-2 border border-[#D0C9BC] dark:border-[#333] text-[#1C1C1C] dark:text-[#F0EDE8] font-semibold text-sm tracking-wide px-7 py-4 rounded-full hover:border-[#1C1C1C] dark:hover:border-[#F0EDE8] transition-all duration-300"
          >
            New Arrivals
          </Link>
        </div>

        {/* Stats */}
        <div data-hero className="flex items-center gap-10 border-t border-[#E2DDD6] dark:border-[#2E2E2E] pt-8">
          {[
            { n: '500+',  l: 'Brands' },
            { n: '10K+', l: 'Products' },
            { n: '50K+', l: 'Customers' },
          ].map(({ n, l }) => (
            <div key={l}>
              <div className="font-display font-bold text-2xl text-[#1C1C1C] dark:text-[#F0EDE8]">{n}</div>
              <div className="text-[11px] uppercase tracking-widest text-[#7A7571] mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right — Model Image ─────────────────────────────────── */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[52%] xl:w-[56%]">
        {/* Image fills full panel */}
        <div className="relative w-full h-full">
          <Image
            src="/hero-model.png"
            alt="The Berlin Store — Fashion Editorial"
            fill
            priority
            quality={90}
            className="object-cover object-center"
            sizes="56vw"
          />
          {/* Overlay blend on left edge */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F7F5F0] dark:from-[#141414] to-transparent" />
        </div>

        {/* Floating product tag */}
        <div className="absolute bottom-16 left-8 bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-4 shadow-xl backdrop-blur-sm min-w-[180px]">
          <div className="text-[10px] font-bold tracking-widest uppercase text-[#B8962E] mb-1">Featured</div>
          <div className="font-display font-semibold text-sm text-[#1C1C1C] dark:text-[#F0EDE8] mb-1">Oversized Blazer</div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-[#1C1C1C] dark:text-[#F0EDE8]">₹3,499</span>
            <span className="text-[#7A7571] text-xs line-through">₹5,999</span>
          </div>
        </div>

        {/* Season badge */}
        <div className="absolute top-32 right-8 bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] rounded-2xl px-5 py-3 text-xs font-bold tracking-widest uppercase">
          AW '24
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-24 lg:translate-x-0 flex flex-col items-center gap-1 text-[#7A7571]">
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
