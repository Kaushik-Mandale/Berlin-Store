'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const CATEGORIES = [
  {
    label: 'Men',
    sub: 'Crafted for the modern gentleman',
    href: '/shop?category=men',
    image: '/cat-men.png',
    from: '₹799',
    color: '#1C1C1C',
  },
  {
    label: 'Women',
    sub: 'Timeless elegance for every moment',
    href: '/shop?category=women',
    image: '/cat-women.png',
    from: '₹899',
    color: '#8B6C42',
  },
  {
    label: 'Kids',
    sub: 'Bright, comfy styles for little ones',
    href: '/shop?category=kids',
    image: '/cat-kids.png',
    from: '₹499',
    color: '#5B7A6B',
  },
];

export default function FeaturedCategories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { visible } = useInViewAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="section-py" style={{ background: '#FFFFFF' }}>
      <div className="container-fluid">
        {/* Header — slides in from left */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-px bg-[#B8962E]" />
              <span className="text-[11px] font-black tracking-[0.4em] uppercase text-[#B8962E]">Shop By Category</span>
            </div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#1C1C1C]">
              Find Your<br />Perfect Style
            </h2>
          </div>
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s',
            }}
          >
            <Link href="/shop" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#1C1C1C] hover:text-[#B8962E] transition-colors">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Cards — staggered scale-in from below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATEGORIES.map(({ label, sub, href, image, from, color }, i) => (
            <Link
              key={label}
              href={href}
              className="group relative overflow-hidden rounded-3xl aspect-[3/4] block"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.94)',
                transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.15}s`,
              }}
            >
              {/* Background image with parallax-ish zoom */}
              <Image
                src={image}
                alt={label}
                fill
                quality={85}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width:768px) 100vw, 33vw"
              />

              {/* Gradient overlay — changes on hover */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{ background: `linear-gradient(to top, ${color}EE 0%, ${color}40 50%, transparent 100%)` }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to top, ${color}FF 20%, ${color}70 60%, transparent 100%)` }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="text-white/70 text-xs font-bold tracking-[0.3em] uppercase mb-2">From {from}</div>
                <h3 className="font-display font-bold text-3xl lg:text-4xl text-white mb-1 group-hover:translate-x-1 transition-transform duration-300">{label}</h3>
                <p className="text-white/70 text-sm mb-5 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-400">{sub}</p>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-5 py-2.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400 delay-75">
                  Shop Now <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
