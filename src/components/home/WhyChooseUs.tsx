'use client';

import { useRef } from 'react';
import { Shield, Zap, RefreshCw, Headphones, Award, Truck } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const FEATURES = [
  {
    icon: Award,
    title: '100% Authentic Brands',
    desc: 'Every product is sourced directly from official brand distributors. Zero counterfeits.',
    color: '#B8962E',
    delay: 0,
    direction: 'up' as const,
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    desc: 'Fast, reliable shipping to every corner of India. Same-day delivery in Pune.',
    color: '#5B7A6B',
    delay: 0.1,
    direction: 'up' as const,
  },
  {
    icon: RefreshCw,
    title: '15-Day Easy Returns',
    desc: 'Not happy? Return or exchange within 15 days, no questions asked.',
    color: '#8B6C42',
    delay: 0.2,
    direction: 'up' as const,
  },
  {
    icon: Headphones,
    title: 'Personal Styling Help',
    desc: 'Our fashion experts are available 9AM–9PM to help you find your perfect look.',
    color: '#6B5B7E',
    delay: 0.3,
    direction: 'up' as const,
  },
  {
    icon: Zap,
    title: 'Flash Sales Every Week',
    desc: 'Exclusive members-only flash deals on premium brands — up to 70% off.',
    color: '#C0392B',
    delay: 0.4,
    direction: 'up' as const,
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    desc: 'All transactions are 256-bit SSL encrypted. Pay via UPI, cards, or COD.',
    color: '#2C7873',
    delay: 0.5,
    direction: 'up' as const,
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { visible } = useInViewAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="section-py" style={{ background: '#FFFFFF' }}>
      <div className="container-fluid">
        {/* Heading — scale in from centre */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.88)',
            transition: 'all 0.7s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-[#D0C9BC]" />
            <span className="text-[11px] font-black tracking-[0.5em] uppercase text-[#B8962E]">Why Berlin Store</span>
            <div className="w-12 h-px bg-[#D0C9BC]" />
          </div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#1C1C1C]">
            The Berlin Promise
          </h2>
          <p className="text-[#7A7571] text-sm lg:text-base mt-3 max-w-md mx-auto">
            Premium fashion backed by service you can trust. Every single time.
          </p>
        </div>

        {/* Feature cards — each with a different bounce entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {FEATURES.map(({ icon: Icon, title, desc, color, delay }, i) => (
            <div
              key={title}
              className="group relative p-7 rounded-2xl border border-[#E2DDD6] hover:border-transparent transition-all duration-500 cursor-default overflow-hidden"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : `translateY(${50 + (i % 2 === 0 ? 20 : -20)}px)`,
                transition: `all 0.75s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
              }}
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(ellipse 80% 70% at 30% 30%, ${color}12 0%, transparent 70%)` }}
              />

              {/* Icon — spins in on hover */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: `${color}18` }}
              >
                <Icon size={22} style={{ color }} />
              </div>

              <h3 className="font-display font-bold text-lg text-[#1C1C1C] mb-2 group-hover:text-[#1C1C1C] transition-colors">{title}</h3>
              <p className="text-sm text-[#7A7571] leading-relaxed">{desc}</p>

              {/* Bottom accent line — extends on hover */}
              <div
                className="absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-500 w-0 group-hover:w-full"
                style={{ background: color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
