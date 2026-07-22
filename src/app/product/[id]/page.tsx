'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Star, Heart, ShoppingBag, Share2, ChevronLeft, ChevronRight, Truck, RefreshCw, Shield, Plus, Minus, Check } from 'lucide-react';
import { getProductById, PRODUCTS } from '@/lib/products';
import { useCartStore } from '@/store/cartStore';

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = getProductById(id);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0]?.name || '');
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [wished, setWished] = useState(false);
  const [addState, setAddState] = useState<'idle' | 'adding' | 'done'>('idle');
  const [sizeError, setSizeError] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const openCart = useCartStore(s => s.openCart);

  if (!product) notFound();

  const discount = product.offerPrice
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  const related = PRODUCTS.filter(p => p.id !== product.id && (p.gender === product.gender || p.brand === product.brand)).slice(0, 4);

  const handleAddToCart = async () => {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2000); return; }
    setAddState('adding');
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedSize, selectedColor);
    }
    await new Promise(r => setTimeout(r, 800));
    setAddState('done');
    setTimeout(() => setAddState('idle'), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2000); return; }
    addItem(product, selectedSize, selectedColor, qty);
    openCart();
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: 'var(--cream)' }}>
        <div className="container-fluid py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#7A7571] mb-8">
            <Link href="/" className="hover:text-[#B8962E] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#B8962E] transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-[#1C1C1C] dark:text-[#F0EDE8] truncate max-w-[200px]">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {/* ── Gallery ─────────────────────────────── */}
            <div className="space-y-4">
              {/* Main image */}
              <div className="relative aspect-[3/4] bg-[#F0EDE8] dark:bg-[#1A1A1A] rounded-3xl overflow-hidden group">
                <Image
                  src={product.images[imgIdx] || product.thumbnail}
                  alt={product.name}
                  fill
                  quality={90}
                  className="object-cover transition-all duration-700"
                  priority
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-full">
                    -{discount}% OFF
                  </div>
                )}
                {product.images.length > 1 && (
                  <>
                    <button onClick={() => setImgIdx(i => (i - 1 + product.images.length) % product.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition-all opacity-0 group-hover:opacity-100">
                      <ChevronLeft size={18} />
                    </button>
                    <button onClick={() => setImgIdx(i => (i + 1) % product.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition-all opacity-0 group-hover:opacity-100">
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setImgIdx(i)}
                      className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${imgIdx === i ? 'border-[#B8962E]' : 'border-transparent'}`}>
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Details ─────────────────────────────── */}
            <div className="flex flex-col gap-6">
              {/* Brand + Share */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#B8962E]">{product.brand}</span>
                <div className="flex gap-2">
                  <button onClick={() => setWished(w => !w)}
                    className="w-10 h-10 rounded-full border border-[#E2DDD6] dark:border-[#2E2E2E] flex items-center justify-center hover:border-red-300 transition-colors">
                    <Heart size={16} className={wished ? 'fill-red-500 stroke-red-500' : 'stroke-[#7A7571]'} />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-[#E2DDD6] dark:border-[#2E2E2E] flex items-center justify-center hover:border-[#B8962E] transition-colors">
                    <Share2 size={16} className="text-[#7A7571]" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-display font-bold text-3xl lg:text-4xl text-[#1C1C1C] dark:text-[#F0EDE8] leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className={i < Math.floor(product.rating) ? 'fill-[#B8962E] stroke-none' : 'stroke-[#D0C9BC] fill-none'} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#1C1C1C] dark:text-[#F0EDE8]">{product.rating}</span>
                <span className="text-sm text-[#7A7571]">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display font-bold text-4xl text-[#1C1C1C] dark:text-[#F0EDE8]">
                  ₹{(product.offerPrice || product.price).toLocaleString('en-IN')}
                </span>
                {product.offerPrice && product.offerPrice < product.price && (
                  <span className="text-xl text-[#7A7571] line-through">₹{product.price.toLocaleString('en-IN')}</span>
                )}
                {discount > 0 && (
                  <span className="text-lg font-bold text-green-600">You save ₹{(product.price - (product.offerPrice || 0)).toLocaleString('en-IN')}</span>
                )}
              </div>

              {/* Color picker */}
              {product.colors.length > 0 && (
                <div>
                  <div className="text-sm font-semibold text-[#1C1C1C] dark:text-[#F0EDE8] mb-2">
                    Colour: <span className="font-normal text-[#7A7571]">{selectedColor}</span>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map(c => (
                      <button key={c.name} onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                        className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${selectedColor === c.name ? 'border-[#B8962E] scale-110' : 'border-[#E2DDD6] dark:border-[#2E2E2E]'}`}
                        style={{ background: c.hex }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Size picker */}
              <div>
                <div className={`text-sm font-semibold mb-2 transition-colors ${sizeError ? 'text-red-500' : 'text-[#1C1C1C] dark:text-[#F0EDE8]'}`}>
                  {sizeError ? '⚠ Please select a size' : 'Size'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(({ size, stock }) => (
                    <button key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false); }}
                      disabled={stock === 0}
                      className={`min-w-[52px] h-11 px-4 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] border-[#1C1C1C] dark:border-[#F0EDE8]'
                          : stock === 0
                          ? 'border-[#E2DDD6] dark:border-[#2E2E2E] text-[#D0C9BC] cursor-not-allowed line-through'
                          : 'border-[#E2DDD6] dark:border-[#2E2E2E] text-[#1C1C1C] dark:text-[#F0EDE8] hover:border-[#B8962E]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Buttons */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-xl overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-11 h-12 flex items-center justify-center hover:bg-[#F0EDE8] dark:hover:bg-[#252525] transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-11 h-12 flex items-center justify-center hover:bg-[#F0EDE8] dark:hover:bg-[#252525] transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 font-bold text-sm py-4 rounded-2xl transition-all duration-300 ${
                    addState === 'done'
                      ? 'bg-green-500 text-white'
                      : 'bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] hover:bg-[#333] dark:hover:bg-white'
                  }`}
                >
                  {addState === 'done' ? <><Check size={18} /> Added!</> : addState === 'adding' ? 'Adding…' : <><ShoppingBag size={18} /> Add to Cart</>}
                </button>
              </div>
              <button
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 font-bold text-sm py-4 rounded-2xl border-2 border-[#B8962E] text-[#B8962E] hover:bg-[#B8962E] hover:text-white transition-all duration-300"
              >
                Buy Now
              </button>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#E2DDD6] dark:border-[#2E2E2E]">
                {[
                  { icon: Truck, text: 'Free shipping\nover ₹999' },
                  { icon: RefreshCw, text: '15-day easy\nreturns' },
                  { icon: Shield, text: '100%\nauthenticity' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1.5 text-center p-2">
                    <Icon size={18} className="text-[#B8962E]" />
                    <span className="text-[10px] text-[#7A7571] leading-tight whitespace-pre-line">{text}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="border-t border-[#E2DDD6] dark:border-[#2E2E2E] pt-4">
                <h3 className="font-semibold text-sm text-[#1C1C1C] dark:text-[#F0EDE8] mb-2">About this product</h3>
                <p className="text-sm text-[#7A7571] leading-relaxed">{product.description}</p>
                {product.material && (
                  <p className="text-sm text-[#7A7571] mt-2"><strong>Material:</strong> {product.material}</p>
                )}
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="border-t border-[#E2DDD6] dark:border-[#2E2E2E] pt-12">
              <h2 className="font-display font-bold text-2xl text-[#1C1C1C] dark:text-[#F0EDE8] mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map(p => (
                  <Link key={p.id} href={`/product/${p.id}`} className="group block">
                    <div className="relative aspect-[3/4] bg-[#F0EDE8] dark:bg-[#1A1A1A] rounded-2xl overflow-hidden mb-3">
                      <Image src={p.thumbnail} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#B8962E]">{p.brand}</p>
                    <p className="font-medium text-sm text-[#1C1C1C] dark:text-[#F0EDE8] line-clamp-2 mt-0.5 group-hover:text-[#B8962E] transition-colors">{p.name}</p>
                    <p className="font-bold text-sm mt-1">₹{(p.offerPrice || p.price).toLocaleString('en-IN')}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
