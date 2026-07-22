'use client';

import { useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const REVIEWS = [
  {
    name: 'Priya Mehta',
    location: 'Mumbai',
    rating: 5,
    review: 'Absolutely love the quality of clothes here. The Mango dress I bought is exactly as shown and the fabric feels premium. Delivery was super quick!',
    product: 'Floral Wrap Midi Dress',
    avatar: 'P',
    color: '#8B6C42',
  },
  {
    name: 'Rahul Sharma',
    location: 'Pune',
    rating: 5,
    review: 'Best shopping experience! The Zara blazer fits perfectly and the stitching quality is top-notch. Will definitely order more.',
    product: 'Structured Charcoal Blazer',
    avatar: 'R',
    color: '#1C1C1C',
  },
  {
    name: 'Ananya Rao',
    location: 'Bangalore',
    rating: 5,
    review: 'I was skeptical at first but The Berlin Store exceeded all expectations. Genuine branded products at great prices with easy returns.',
    product: 'Premium Silk Saree',
    avatar: 'A',
    color: '#B8962E',
  },
  {
    name: 'Karthik Nair',
    location: 'Chennai',
    rating: 4,
    review: 'Great collection and fast delivery. The Nike sneakers are 100% authentic. Customer service was helpful when I needed to exchange size.',
    product: 'Classic White Sneakers',
    avatar: 'K',
    color: '#5B7A6B',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { visible } = useInViewAnimation(sectionRef);
  const [active, setActive] = useState(0);

  const prev = () => setActive(a => (a - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setActive(a => (a + 1) % REVIEWS.length);

  return (
    <section ref={sectionRef} className="section-py overflow-hidden" style={{ background: '#1C1C1C' }}>
      <div className="container-fluid">
        {/* Header — fade up on dark bg */}
        <div
          className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-[#B8962E]/50" />
            <span className="text-[11px] font-black tracking-[0.5em] uppercase text-[#B8962E]">Customer Stories</span>
            <div className="w-12 h-px bg-[#B8962E]/50" />
          </div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white">
            What Our Customers Say
          </h2>
        </div>

        {/* Desktop grid — all 4 visible */}
        <div className="hidden lg:grid grid-cols-4 gap-5 mb-8">
          {REVIEWS.map(({ name, location, rating, review, product, avatar, color }, i) => (
            <div
              key={name}
              className="relative bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-500 group cursor-default"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) rotateY(0deg)' : `translateY(${40 + i * 8}px) rotateY(${i % 2 === 0 ? 8 : -8}deg)`,
                transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`,
              }}
            >
              {/* Quote icon */}
              <Quote size={22} className="text-[#B8962E]/40 mb-4 group-hover:text-[#B8962E]/70 transition-colors" />

              <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-4">&quot;{review}&quot;</p>

              <div className="text-[10px] font-bold tracking-widest uppercase text-[#B8962E]/60 mb-4">
                Purchased: {product}
              </div>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} size={12} className="fill-[#D4AF37] stroke-none" />
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
                  style={{ background: color }}
                >
                  {avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">{name}</div>
                  <div className="text-xs text-white/40">{location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <div
              className="bg-white/5 border border-white/10 rounded-2xl p-6 mx-auto max-w-sm"
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <Quote size={22} className="text-[#B8962E]/40 mb-4" />
              <p className="text-white/70 text-sm leading-relaxed mb-5">&quot;{REVIEWS[active].review}&quot;</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: REVIEWS[active].rating }).map((_, j) => (
                  <Star key={j} size={12} className="fill-[#D4AF37] stroke-none" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ background: REVIEWS[active].color }}>
                  {REVIEWS[active].avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">{REVIEWS[active].name}</div>
                  <div className="text-xs text-white/40">{REVIEWS[active].location}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#B8962E] hover:text-[#B8962E] transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-[#B8962E]' : 'w-1.5 bg-white/20'}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#B8962E] hover:text-[#B8962E] transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
