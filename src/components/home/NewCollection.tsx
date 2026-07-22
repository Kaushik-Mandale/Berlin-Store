'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

export default function NewCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { visible } = useInViewAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="section-py overflow-hidden" style={{ background: '#F7F5F0' }}>
      <div className="container-fluid">
        {/* Section header — clip-path reveal */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            clipPath: visible ? 'inset(0 0 0 0)' : 'inset(0 50% 0 50%)',
            transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-px bg-[#D0C9BC]" />
            <span className="text-[11px] font-black tracking-[0.5em] uppercase text-[#B8962E]">New Collection</span>
            <div className="w-16 h-px bg-[#D0C9BC]" />
          </div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#1C1C1C] dark:text-[#F0EDE8]">
            Sophistication Meets Seasonality
          </h2>
          <p className="text-[#7A7571] text-sm lg:text-base mt-3 max-w-lg mx-auto">
            Fresh drops from the most coveted brands — curated for the modern wardrobe.
          </p>
        </div>

        {/* Asymmetric magazine layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7">
          {/* Left hero card — slides from left */}
          <div
            className="lg:col-span-5 group relative overflow-hidden rounded-3xl aspect-[4/5]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0) rotate(0deg)' : 'translateX(-60px) rotate(-2deg)',
              transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s',
            }}
          >
            <Image src="/cat-women.png" alt="Minimal Elegance Collection" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.85) 0%, transparent 55%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-9">
              <span className="inline-block text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4AF37] border border-[#D4AF37]/40 px-3 py-1 rounded-full mb-3">Women&apos;s</span>
              <h3 className="font-display font-bold text-2xl lg:text-3xl text-white mb-2 leading-tight">Minimal Elegance Collection</h3>
              <p className="text-white/60 text-sm mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">Timeless pieces for the modern woman</p>
              <Link href="/shop?category=women&filter=new"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-white hover:text-[#1C1C1C] transition-all duration-300">
                Explore <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Right column — two stacked cards */}
          <div className="lg:col-span-7 flex flex-col gap-5 lg:gap-7">
            {/* Card 1 — slides from right, delayed */}
            <div
              className="group relative overflow-hidden rounded-3xl aspect-[16/10] lg:flex-1"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0) rotate(0deg)' : 'translateX(60px) rotate(1deg)',
                transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s',
              }}
            >
              <Image src="/cat-men.png" alt="Sharp & Contemporary" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(28,28,28,0.7) 0%, transparent 60%)' }} />
              <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
                <span className="inline-block text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4AF37] border border-[#D4AF37]/40 px-3 py-1 rounded-full mb-2">Men&apos;s</span>
                <h3 className="font-display font-bold text-xl lg:text-2xl text-white mb-3">Sharp &amp; Contemporary</h3>
                <Link href="/shop?category=men&filter=new"
                  className="inline-flex items-center gap-2 bg-[#B8962E] text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#D4AF37] transition-colors duration-300 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all">
                  Shop Now <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Card 2 — slides up */}
            <div
              className="group relative overflow-hidden rounded-3xl aspect-[16/10] lg:flex-1"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) rotate(0deg)' : 'translateY(60px) rotate(1deg)',
                transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s',
              }}
            >
              <Image src="/cat-kids.png" alt="Playful & Bright" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(91,122,107,0.8) 0%, transparent 60%)' }} />
              <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
                <span className="inline-block text-[10px] font-bold tracking-[0.4em] uppercase text-white/80 border border-white/30 px-3 py-1 rounded-full mb-2">Kids&apos;</span>
                <h3 className="font-display font-bold text-xl lg:text-2xl text-white mb-3">Playful &amp; Bright</h3>
                <Link href="/shop?category=kids&filter=new"
                  className="inline-flex items-center gap-2 bg-white text-[#1C1C1C] text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#1C1C1C] hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all">
                  Shop Now <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
