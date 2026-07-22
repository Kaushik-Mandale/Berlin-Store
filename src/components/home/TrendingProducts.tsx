'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { PRODUCTS } from '@/lib/products';
import { useCartStore } from '@/store/cartStore';

const FEATURED = PRODUCTS.filter(p => p.isFeatured || p.isTrending).slice(0, 4);

export default function TrendingProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { visible } = useInViewAnimation(sectionRef);
  const addItem = useCartStore(s => s.addItem);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleAdd = (product: typeof FEATURED[0]) => {
    addItem(product, product.sizes[0]?.size || 'M', product.colors[0]?.name || 'Default');
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section ref={sectionRef} className="section-py" style={{ background: 'var(--cream)' }}>
      <div className="container-fluid">
        {/* Header — fade up with number */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-14">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-px bg-[#B8962E]" />
              <span className="text-[11px] font-black tracking-[0.4em] uppercase text-[#B8962E]">Trending Now</span>
            </div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#1C1C1C] dark:text-[#F0EDE8]">
              Most Loved<br />This Season
            </h2>
          </div>
          <div
            className="lg:text-right"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s',
            }}
          >
            <p className="text-[#7A7571] text-sm max-w-xs lg:ml-auto mb-4">
              Our most popular pieces — handpicked for style, comfort, and unbeatable value.
            </p>
            <Link href="/shop?filter=trending" className="inline-flex items-center gap-2 text-sm font-bold text-[#1C1C1C] dark:text-[#F0EDE8] hover:text-[#B8962E] transition-colors group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Products — flip cards with 3D transform */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
          {FEATURED.map((product, i) => {
            const discount = product.offerPrice ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;
            const isAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0) rotateX(0deg)' : 'translateY(48px) rotateX(8deg)',
                  transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.1 + 0.1}s`,
                  perspective: '600px',
                }}
              >
                <div
                  className="group relative"
                  style={{
                    transform: hoveredId === product.id ? 'translateY(-6px)' : 'translateY(0)',
                    transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] bg-[#F0EDE8] dark:bg-[#1A1A1A] rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                    <Link href={`/product/${product.id}`}>
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        quality={85}
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                        style={{ transform: hoveredId === product.id ? 'scale(1.08)' : 'scale(1)' }}
                        sizes="(max-width:640px) 50vw, 25vw"
                      />
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.isNewArrival && (
                        <span className="text-[9px] font-black tracking-[0.25em] uppercase bg-[#1C1C1C] text-white px-2.5 py-1 rounded-full" style={{ backdropFilter: 'blur(4px)' }}>NEW</span>
                      )}
                      {discount > 0 && (
                        <span className="text-[9px] font-black bg-red-500 text-white px-2.5 py-1 rounded-full">-{discount}%</span>
                      )}
                    </div>

                    {/* Wishlist heart — appears on hover */}
                    <button
                      className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
                    >
                      <Heart size={14} className="text-[#7A7571] hover:text-red-500 hover:fill-red-500 transition-colors" />
                    </button>

                    {/* Add to cart — slides up from bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
                      <button
                        onClick={() => handleAdd(product)}
                        className={`w-full flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-lg ${
                          isAdded
                            ? 'bg-green-500 text-white scale-105'
                            : 'bg-white/95 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white'
                        }`}
                        style={{ transform: isAdded ? 'scale(1.03)' : 'scale(1)' }}
                      >
                        <ShoppingBag size={13} />
                        {isAdded ? '✓ Added to Cart!' : 'Quick Add'}
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-1">
                    <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B8962E] mb-1">{product.brand}</div>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-medium text-sm text-[#1C1C1C] dark:text-[#F0EDE8] line-clamp-2 hover:text-[#B8962E] transition-colors mb-2 leading-snug">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={10} className={j < Math.floor(product.rating) ? 'fill-[#B8962E] stroke-none' : 'stroke-[#D0C9BC] fill-none'} />
                      ))}
                      <span className="text-[11px] text-[#7A7571] ml-0.5">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-[#1C1C1C] dark:text-[#F0EDE8]">₹{(product.offerPrice || product.price).toLocaleString('en-IN')}</span>
                      {product.offerPrice && product.offerPrice < product.price && (
                        <span className="text-xs text-[#7A7571] line-through">₹{product.price.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
