'use client';

import { useRef } from 'react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const BRANDS = ['Nike', 'Adidas', 'Zara', 'H&M', 'Mango', 'Fabindia', 'Tommy Hilfiger', 'Levi\'s', 'Forever 21', 'Max Fashion', 'Puma', 'Reebok', 'Raymond', 'Allen Solly', 'Van Heusen'];

export default function BrandPartners() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { visible } = useInViewAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="py-12 overflow-hidden border-y border-[#E2DDD6] dark:border-[#2E2E2E]" style={{ background: '#F7F5F0' }}>
      {/* Heading — fast fade */}
      <div
        className="text-center mb-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.5s ease',
        }}
      >
        <span className="text-[11px] font-black tracking-[0.5em] uppercase text-[#D0C9BC]">Trusted Partner Brands</span>
      </div>

      {/* Marquee row 1 — left to right */}
      <div className="relative overflow-hidden mb-4">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: 'marquee 28s linear infinite' }}
        >
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span
              key={i}
              className="font-display font-bold text-xl lg:text-2xl text-[#D0C9BC] hover:text-[#B8962E] transition-colors duration-300 cursor-default flex-shrink-0"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee row 2 — right to left, different brands, slower */}
      <div className="relative overflow-hidden">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: 'marquee 36s linear infinite reverse' }}
        >
          {[...BRANDS.slice(7), ...BRANDS.slice(0, 7), ...BRANDS.slice(7), ...BRANDS.slice(0, 7)].map((brand, i) => (
            <span
              key={i}
              className="font-display font-bold text-lg lg:text-xl text-[#E2DDD6] hover:text-[#1C1C1C] dark:hover:text-[#F0EDE8] transition-colors duration-300 cursor-default flex-shrink-0"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
