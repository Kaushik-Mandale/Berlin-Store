'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

const TAX_RATE = 0.18;
const SHIPPING_THRESHOLD = 999;

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal } = useCartStore();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const subtotal = getSubtotal();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : 99;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round((subtotal - discount) * TAX_RATE);
  const total = subtotal - discount + shipping + tax;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'BERLIN10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: 'var(--cream)' }}>
        <div className="container-fluid py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-display font-bold text-3xl lg:text-4xl text-[#1C1C1C] dark:text-[#F0EDE8]">Shopping Cart</h1>
              <p className="text-sm text-[#7A7571] mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
            </div>
            {items.length > 0 && (
              <button onClick={clearCart} className="text-sm text-[#7A7571] hover:text-red-500 transition-colors">
                Clear cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 rounded-full bg-[#F0EDE8] dark:bg-[#252525] flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={40} className="text-[#D0C9BC]" />
              </div>
              <h2 className="font-display font-bold text-2xl text-[#1C1C1C] dark:text-[#F0EDE8] mb-2">Your cart is empty</h2>
              <p className="text-[#7A7571] mb-8">Looks like you haven&apos;t added anything yet.</p>
              <Link href="/shop" className="inline-flex items-center gap-2 bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] font-semibold px-8 py-4 rounded-full hover:bg-[#333] transition-colors">
                Start Shopping <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex gap-5 bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-5 group"
                    style={{ animation: `fadeInUp 0.4s ease forwards ${i * 80}ms`, opacity: 0 }}
                  >
                    <div className="relative w-24 h-28 lg:w-28 lg:h-36 flex-shrink-0 bg-[#F0EDE8] dark:bg-[#252525] rounded-xl overflow-hidden">
                      <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[10px] font-bold tracking-widest uppercase text-[#B8962E] mb-1">{item.product.brand}</p>
                          <Link href={`/product/${item.productId}`}>
                            <h3 className="font-semibold text-sm text-[#1C1C1C] dark:text-[#F0EDE8] hover:text-[#B8962E] transition-colors max-w-xs">
                              {item.product.name}
                            </h3>
                          </Link>
                          <div className="flex gap-3 mt-1 text-xs text-[#7A7571]">
                            <span>Size: {item.size}</span>
                            {item.color && <span>· {item.color}</span>}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#7A7571] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-xl overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center hover:bg-[#F0EDE8] dark:hover:bg-[#252525] transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="w-9 text-center font-semibold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-[#F0EDE8] dark:hover:bg-[#252525] transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-base text-[#1C1C1C] dark:text-[#F0EDE8]">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-[#7A7571]">₹{item.price.toLocaleString('en-IN')} each</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue shopping */}
                <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A7571] hover:text-[#B8962E] transition-colors mt-2">
                  ← Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-6 sticky top-24">
                  <h2 className="font-display font-bold text-xl text-[#1C1C1C] dark:text-[#F0EDE8] mb-6">Order Summary</h2>

                  <div className="space-y-3 text-sm mb-5">
                    <div className="flex justify-between"><span className="text-[#7A7571]">Subtotal</span><span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span></div>
                    {discount > 0 && <div className="flex justify-between text-green-600"><span>Coupon (BERLIN10)</span><span>-₹{discount.toLocaleString('en-IN')}</span></div>}
                    <div className="flex justify-between"><span className="text-[#7A7571]">Shipping</span><span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
                    <div className="flex justify-between"><span className="text-[#7A7571]">Tax (18% GST)</span><span className="font-medium">₹{tax.toLocaleString('en-IN')}</span></div>
                    <div className="border-t border-[#E2DDD6] dark:border-[#2E2E2E] pt-3 flex justify-between font-bold text-base">
                      <span>Total</span><span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Coupon */}
                  {!couponApplied ? (
                    <div className="mb-5">
                      <div className="flex gap-2">
                        <div className="flex-1 flex items-center gap-2 border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-xl px-3">
                          <Tag size={14} className="text-[#7A7571]" />
                          <input
                            value={coupon}
                            onChange={e => setCoupon(e.target.value)}
                            placeholder="Coupon code"
                            className="flex-1 text-sm py-3 bg-transparent outline-none"
                            onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                          />
                        </div>
                        <button onClick={applyCoupon} className="bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] text-sm font-semibold px-4 py-3 rounded-xl hover:bg-[#333] transition-colors">Apply</button>
                      </div>
                      {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
                      <p className="text-xs text-[#7A7571] mt-1">Try: <button onClick={() => setCoupon('BERLIN10')} className="text-[#B8962E] font-semibold hover:underline">BERLIN10</button></p>
                    </div>
                  ) : (
                    <div className="mb-5 flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 rounded-xl px-3 py-2.5">
                      ✓ BERLIN10 applied — 10% off!
                    </div>
                  )}

                  <Link href="/checkout"
                    className="flex items-center justify-center gap-2 w-full bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] font-bold py-4 rounded-2xl hover:bg-[#333] dark:hover:bg-white transition-colors mb-3">
                    Proceed to Checkout <ArrowRight size={16} />
                  </Link>
                  <p className="text-center text-xs text-[#7A7571]">🔒 Secure checkout · 15-day returns</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}
