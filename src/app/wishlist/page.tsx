'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Heart, ShoppingBag, Trash2, Star, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore(s => s.addItem);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart(item.product, item.product.sizes[0]?.size || 'M', item.product.colors[0]?.name || 'Default');
    setAddedIds(ids => [...ids, item.productId]);
    setTimeout(() => setAddedIds(ids => ids.filter(i => i !== item.productId)), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: 'var(--cream)' }}>
        <div className="container-fluid py-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-display font-bold text-3xl lg:text-4xl text-[#1C1C1C] dark:text-[#F0EDE8]">My Wishlist</h1>
              <p className="text-sm text-[#7A7571] mt-1">{items.length} saved item{items.length !== 1 ? 's' : ''}</p>
            </div>
            {items.length > 0 && (
              <button onClick={clearWishlist} className="text-sm text-[#7A7571] hover:text-red-500 transition-colors">
                Clear all
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 rounded-full bg-[#F0EDE8] dark:bg-[#252525] flex items-center justify-center mx-auto mb-6">
                <Heart size={40} className="text-[#D0C9BC]" />
              </div>
              <h2 className="font-display font-bold text-2xl text-[#1C1C1C] dark:text-[#F0EDE8] mb-2">No saved items yet</h2>
              <p className="text-[#7A7571] mb-8">Browse our collections and save your favourites here.</p>
              <Link href="/shop" className="inline-flex items-center gap-2 bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] font-semibold px-8 py-4 rounded-full hover:bg-[#333] transition-colors">
                Explore Collection <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item, i) => {
                const p = item.product;
                const discount = p.offerPrice ? Math.round(((p.price - p.offerPrice) / p.price) * 100) : 0;
                const added = addedIds.includes(item.productId);

                return (
                  <div
                    key={item.id}
                    className="group relative"
                    style={{ animation: `fadeInUp 0.4s ease forwards ${i * 70}ms`, opacity: 0 }}
                  >
                    <div className="relative aspect-[3/4] bg-[#F0EDE8] dark:bg-[#1A1A1A] rounded-2xl overflow-hidden mb-4">
                      <Link href={`/product/${item.productId}`}>
                        <Image src={p.thumbnail} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </Link>
                      {discount > 0 && <span className="absolute top-3 left-3 text-[10px] font-bold bg-red-500 text-white px-2.5 py-1 rounded-full">-{discount}%</span>}
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="absolute top-3 right-3 w-9 h-9 bg-white dark:bg-[#1C1C1C] rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
                      >
                        <Trash2 size={14} className="text-[#7A7571]" />
                      </button>
                    </div>
                    <div className="px-1">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-[#B8962E] mb-1">{p.brand}</p>
                      <Link href={`/product/${item.productId}`}>
                        <h3 className="font-medium text-sm text-[#1C1C1C] dark:text-[#F0EDE8] line-clamp-2 hover:text-[#B8962E] transition-colors mb-2">{p.name}</h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={10} className={i < Math.floor(p.rating) ? 'fill-[#B8962E] stroke-none' : 'stroke-[#D0C9BC] fill-none'} />
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-sm">₹{(p.offerPrice || p.price).toLocaleString('en-IN')}</span>
                        {p.offerPrice && <span className="text-xs text-[#7A7571] line-through">₹{p.price.toLocaleString('en-IN')}</span>}
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`w-full flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-xl transition-all duration-300 ${
                          added
                            ? 'bg-green-500 text-white'
                            : 'bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] hover:bg-[#333]'
                        }`}
                      >
                        <ShoppingBag size={13} />
                        {added ? '✓ Added!' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}
