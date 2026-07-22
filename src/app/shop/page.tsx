'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SlidersHorizontal, X, Star, Heart, ShoppingBag, ChevronDown, Grid2x2, List } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Product } from '@/types';

const CATEGORIES = ['All', 'men', 'women', 'kids', 'footwear', 'ethnic'];
const BRANDS = ['All', 'Nike', 'Adidas', 'Zara', 'Mango', 'H&M', 'Fabindia', 'Tommy Hilfiger'];
const SORTS = [
  { label: 'Newest', value: 'new' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Bestsellers', value: 'best' },
];

function ProductCard({ product, view }: { product: Product; view: 'grid' | 'list' }) {
  const [wished, setWished] = useState(false);
  const [adding, setAdding] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const discount = product.offerPrice ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;

  const handleAddToCart = async () => {
    setAdding(true);
    addItem(product, product.sizes[0]?.size || 'M', product.colors[0]?.name || 'Default');
    await new Promise(r => setTimeout(r, 1000));
    setAdding(false);
  };

  if (view === 'list') {
    return (
      <div className="flex gap-5 bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-4 hover:shadow-md transition-shadow duration-300 group">
        <Link href={`/product/${product.id}`} className="relative w-28 h-36 flex-shrink-0 bg-[#F0EDE8] dark:bg-[#252525] rounded-xl overflow-hidden">
          <Image src={product.thumbnail} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </Link>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase text-[#B8962E] mb-1">{product.brand}</div>
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold text-sm text-[#1C1C1C] dark:text-[#F0EDE8] hover:text-[#B8962E] transition-colors line-clamp-2 mb-2">{product.name}</h3>
            </Link>
            <p className="text-xs text-[#7A7571] line-clamp-2">{product.description}</p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-[#1C1C1C] dark:text-[#F0EDE8]">₹{(product.offerPrice || product.price).toLocaleString('en-IN')}</span>
              {product.offerPrice && <span className="text-xs text-[#7A7571] line-through">₹{product.price.toLocaleString('en-IN')}</span>}
              {discount > 0 && <span className="text-[10px] font-bold text-white bg-[#B8962E] px-2 py-0.5 rounded-full">-{discount}%</span>}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="inline-flex items-center gap-2 bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#333] transition-colors disabled:opacity-60"
            >
              <ShoppingBag size={13} /> {adding ? 'Adding…' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#F0EDE8] dark:bg-[#1A1A1A] mb-4">
        <Link href={`/product/${product.id}`}>
          <Image src={product.thumbnail} alt={product.name} fill quality={85}
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" />
        </Link>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNewArrival && <span className="text-[10px] font-bold tracking-widest uppercase bg-[#1C1C1C] text-white px-2.5 py-1 rounded-full">New</span>}
          {product.isBestSeller && <span className="text-[10px] font-bold tracking-widest uppercase bg-[#D4AF37] text-white px-2.5 py-1 rounded-full">Bestseller</span>}
          {discount > 0 && <span className="text-[10px] font-bold bg-red-500 text-white px-2.5 py-1 rounded-full">-{discount}%</span>}
        </div>
        {/* Wishlist */}
        <button onClick={() => setWished(w => !w)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white dark:bg-[#1C1C1C] flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200">
          <Heart size={15} className={wished ? 'fill-red-500 stroke-red-500' : 'stroke-[#7A7571]'} />
        </button>
        {/* Add to cart overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`w-full flex items-center justify-center gap-2 font-semibold text-xs tracking-wider py-3 rounded-xl shadow-lg transition-all duration-200 ${
              adding
                ? 'bg-[#B8962E] text-white'
                : 'bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-white hover:bg-[#1C1C1C] hover:text-white dark:hover:bg-white dark:hover:text-[#1C1C1C]'
            }`}
          >
            <ShoppingBag size={14} />
            {adding ? '✓ Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <div className="px-1">
        <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B8962E] mb-1">{product.brand}</div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-sm text-[#1C1C1C] dark:text-[#F0EDE8] line-clamp-2 hover:text-[#B8962E] transition-colors mb-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={11} className={i < Math.floor(product.rating) ? 'fill-[#B8962E] stroke-none' : 'stroke-[#D0C9BC] fill-none'} />
          ))}
          <span className="text-[11px] text-[#7A7571]">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-base text-[#1C1C1C] dark:text-[#F0EDE8]">₹{(product.offerPrice || product.price).toLocaleString('en-IN')}</span>
          {product.offerPrice && product.offerPrice < product.price && (
            <span className="text-xs text-[#7A7571] line-through">₹{product.price.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState('new');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [visible, setVisible] = useState(false);

  const urlCategory = searchParams.get('category');
  const urlFilter = searchParams.get('filter');
  const urlQ = searchParams.get('q');

  useEffect(() => {
    if (urlCategory) setSelectedCategory(urlCategory);
    setVisible(true);
  }, [urlCategory]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (urlQ) {
      const q = urlQ.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)));
    }

    if (urlFilter === 'sale') list = list.filter(p => p.offerPrice && p.offerPrice < p.price);
    if (urlFilter === 'new') list = list.filter(p => p.isNewArrival);
    if (selectedCategory !== 'All') list = list.filter(p => p.gender === selectedCategory || p.category === selectedCategory);
    if (selectedBrand !== 'All') list = list.filter(p => p.brand === selectedBrand);
    list = list.filter(p => (p.offerPrice || p.price) <= maxPrice);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price)); break;
      case 'price-desc': list.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price)); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'best': list.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return list;
  }, [urlQ, urlFilter, selectedCategory, selectedBrand, maxPrice, sort]);

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: 'var(--cream)' }}>
        {/* Page header */}
        <div className="container-fluid py-8 border-b border-[#E2DDD6] dark:border-[#2E2E2E]">
          <div
            className="transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <div className="flex items-center gap-2 text-xs text-[#7A7571] mb-2">
              <Link href="/" className="hover:text-[#B8962E]">Home</Link>
              <span>/</span>
              <span className="text-[#1C1C1C] dark:text-[#F0EDE8]">Shop</span>
              {urlFilter && <><span>/</span><span className="capitalize text-[#B8962E]">{urlFilter}</span></>}
            </div>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <h1 className="font-display font-bold text-3xl lg:text-4xl text-[#1C1C1C] dark:text-[#F0EDE8]">
                  {urlFilter === 'sale' ? '🔥 Sale' : urlFilter === 'new' ? '✨ New Arrivals' : urlQ ? `"${urlQ}"` : 'All Products'}
                </h1>
                <p className="text-sm text-[#7A7571] mt-1">{filtered.length} products found</p>
              </div>
              <div className="flex items-center gap-3">
                {/* View toggle */}
                <div className="flex border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-xl overflow-hidden">
                  <button onClick={() => setView('grid')} className={`w-9 h-9 flex items-center justify-center transition-colors ${view === 'grid' ? 'bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C]' : 'text-[#7A7571] hover:bg-[#F0EDE8] dark:hover:bg-[#252525]'}`}><Grid2x2 size={16} /></button>
                  <button onClick={() => setView('list')} className={`w-9 h-9 flex items-center justify-center transition-colors ${view === 'list' ? 'bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C]' : 'text-[#7A7571] hover:bg-[#F0EDE8] dark:hover:bg-[#252525]'}`}><List size={16} /></button>
                </div>
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="appearance-none bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-xl px-4 pr-9 py-2.5 text-sm font-medium text-[#1C1C1C] dark:text-[#F0EDE8] outline-none cursor-pointer"
                  >
                    {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7571] pointer-events-none" />
                </div>
                {/* Filter toggle */}
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-xl px-4 py-2.5 text-sm font-medium text-[#1C1C1C] dark:text-[#F0EDE8] hover:border-[#1C1C1C] dark:hover:border-[#F0EDE8] transition-colors"
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid py-8">
          <div className="flex gap-8">
            {/* Sidebar filters */}
            <aside className={`${filterOpen ? 'block' : 'hidden'} lg:block w-64 flex-shrink-0`}>
              <div className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-6 sticky top-24 space-y-6">
                {/* Category */}
                <div>
                  <h3 className="font-bold text-xs tracking-[0.3em] uppercase text-[#B8962E] mb-3">Category</h3>
                  <div className="space-y-1">
                    {CATEGORIES.map(cat => (
                      <button key={cat} onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-[#F0EDE8] dark:bg-[#252525] font-semibold text-[#1C1C1C] dark:text-[#F0EDE8]' : 'text-[#7A7571] hover:text-[#1C1C1C] dark:hover:text-[#F0EDE8]'}`}>
                        {cat === 'All' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <h3 className="font-bold text-xs tracking-[0.3em] uppercase text-[#B8962E] mb-3">Brand</h3>
                  <div className="space-y-1">
                    {BRANDS.map(brand => (
                      <button key={brand} onClick={() => setSelectedBrand(brand)}
                        className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedBrand === brand ? 'bg-[#F0EDE8] dark:bg-[#252525] font-semibold text-[#1C1C1C] dark:text-[#F0EDE8]' : 'text-[#7A7571] hover:text-[#1C1C1C] dark:hover:text-[#F0EDE8]'}`}>
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="font-bold text-xs tracking-[0.3em] uppercase text-[#B8962E] mb-3">Max Price</h3>
                  <input type="range" min={500} max={10000} step={500} value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#B8962E]" />
                  <div className="flex justify-between text-xs text-[#7A7571] mt-1">
                    <span>₹500</span><span className="font-semibold text-[#1C1C1C] dark:text-[#F0EDE8]">₹{maxPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Clear */}
                <button
                  onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setMaxPrice(10000); }}
                  className="w-full text-sm text-[#7A7571] hover:text-[#B8962E] transition-colors flex items-center gap-1"
                >
                  <X size={13} /> Clear filters
                </button>
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="font-display font-bold text-2xl text-[#1C1C1C] dark:text-[#F0EDE8] mb-2">No products found</h3>
                  <p className="text-[#7A7571]">Try adjusting your filters</p>
                </div>
              ) : view === 'grid' ? (
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7">
                  {filtered.map((product, i) => (
                    <div
                      key={product.id}
                      style={{ opacity: 0, animation: `fadeInUp 0.5s ease forwards ${i * 70}ms` }}
                    >
                      <ProductCard product={product} view="grid" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((product, i) => (
                    <div
                      key={product.id}
                      style={{ opacity: 0, animation: `slideInLeft 0.4s ease forwards ${i * 60}ms` }}
                    >
                      <ProductCard product={product} view="list" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </>
  );
}
