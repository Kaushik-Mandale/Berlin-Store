'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getTotalItems } = useCartStore();
  const subtotal = getSubtotal();
  const freeShippingAt = 999;
  const shippingProgress = Math.min((subtotal / freeShippingAt) * 100, 100);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] bg-white dark:bg-[#0D0D0D] flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E2DDD6] dark:border-[#2E2E2E]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[#1C1C1C] dark:text-[#F0EDE8]" />
            <h2 className="font-display font-semibold text-lg text-[#1C1C1C] dark:text-[#F0EDE8]">
              Your Cart ({getTotalItems()})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F0EDE8] dark:hover:bg-[#252525] transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free shipping progress */}
        {subtotal < freeShippingAt && (
          <div className="px-6 py-3 bg-[#F7F5F0] dark:bg-[#1A1A1A] border-b border-[#E2DDD6] dark:border-[#2E2E2E]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#7A7571]">Add ₹{(freeShippingAt - subtotal).toLocaleString('en-IN')} more for free shipping</span>
              <span className="font-semibold text-[#B8962E]">₹999</span>
            </div>
            <div className="h-1.5 bg-[#E2DDD6] dark:bg-[#2E2E2E] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#B8962E] rounded-full transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}
        {subtotal >= freeShippingAt && (
          <div className="px-6 py-2.5 bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800 text-center text-xs font-semibold text-green-700 dark:text-green-400">
            🎉 You&apos;ve unlocked free shipping!
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#F0EDE8] dark:bg-[#252525] flex items-center justify-center">
                <ShoppingBag size={32} className="text-[#D0C9BC]" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-[#1C1C1C] dark:text-[#F0EDE8] mb-1">Your cart is empty</h3>
                <p className="text-sm text-[#7A7571]">Add some products to get started.</p>
              </div>
              <button
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#333] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <div className="relative w-20 h-24 flex-shrink-0 bg-[#F0EDE8] dark:bg-[#1A1A1A] rounded-xl overflow-hidden">
                  <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-bold tracking-widest uppercase text-[#B8962E] mb-0.5">{item.product.brand}</p>
                      <h4 className="font-medium text-sm text-[#1C1C1C] dark:text-[#F0EDE8] leading-snug line-clamp-2">{item.product.name}</h4>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A7571] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#7A7571]">
                    <span>Size: {item.size}</span>
                    {item.color && <><span>·</span><span>{item.color}</span></>}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    {/* Qty controls */}
                    <div className="flex items-center border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#F0EDE8] dark:hover:bg-[#252525] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#F0EDE8] dark:hover:bg-[#252525] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-bold text-sm text-[#1C1C1C] dark:text-[#F0EDE8]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E2DDD6] dark:border-[#2E2E2E] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#7A7571]">Subtotal</span>
              <span className="font-bold text-lg text-[#1C1C1C] dark:text-[#F0EDE8]">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-[#7A7571]">Taxes and shipping calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] font-semibold py-4 rounded-2xl hover:bg-[#333] dark:hover:bg-white transition-colors duration-200"
            >
              Checkout <ArrowRight size={16} />
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="flex items-center justify-center w-full border border-[#E2DDD6] dark:border-[#2E2E2E] text-[#1C1C1C] dark:text-[#F0EDE8] font-semibold py-3.5 rounded-2xl hover:border-[#1C1C1C] dark:hover:border-[#F0EDE8] transition-colors duration-200 text-sm"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
