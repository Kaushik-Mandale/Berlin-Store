'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, CheckCircle2, CreditCard, Smartphone, Package } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

type Step = 'address' | 'payment' | 'confirm';

const STATES = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'West Bengal', 'Uttar Pradesh'];

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>('address');
  const [payMethod, setPayMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [processing, setProcessing] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [orderId] = useState(() => `BS-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`);

  const [addr, setAddr] = useState({
    fullName: '', phone: '', email: '',
    line1: '', line2: '', city: '', state: 'Maharashtra', pin: '',
  });

  const subtotal = getSubtotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2200));
    setProcessing(false);
    setOrdered(true);
    clearCart();
  };

  if (ordered) return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6" style={{ animation: 'zoomIn 0.5s ease' }}>
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h1 className="font-display font-bold text-3xl text-[#1C1C1C] dark:text-[#F0EDE8] mb-3">Order Placed! 🎉</h1>
          <p className="text-[#7A7571] mb-2">Thank you for shopping with The Berlin Store.</p>
          <p className="text-sm font-semibold text-[#B8962E] mb-8">Order ID: {orderId}</p>
          <div className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-5 text-left text-sm mb-8">
            <p className="font-semibold text-[#1C1C1C] dark:text-[#F0EDE8] mb-3">What&apos;s next?</p>
            {['Order confirmation email sent', 'Processing and packing in 24hrs', 'Delivery within 3–5 business days'].map((t, i) => (
              <div key={i} className="flex items-center gap-3 mb-2 last:mb-0">
                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={12} className="text-green-500" />
                </div>
                <span className="text-[#7A7571]">{t}</span>
              </div>
            ))}
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] font-bold px-8 py-4 rounded-full hover:bg-[#333] transition-colors">
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </main>
      <Footer />
      <style jsx global>{`@keyframes zoomIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
    </>
  );

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: 'var(--cream)' }}>
        <div className="container-fluid py-10">
          <h1 className="font-display font-bold text-3xl text-[#1C1C1C] dark:text-[#F0EDE8] mb-8">Checkout</h1>

          {/* Steps indicator */}
          <div className="flex items-center gap-4 mb-10">
            {(['address', 'payment', 'confirm'] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step === s ? 'bg-[#B8962E] text-white scale-110' : i < (['address','payment','confirm'] as Step[]).indexOf(step) ? 'bg-green-500 text-white' : 'bg-[#E2DDD6] dark:bg-[#2E2E2E] text-[#7A7571]'
                }`}>{i + 1}</div>
                <span className={`text-sm font-medium capitalize ${step === s ? 'text-[#1C1C1C] dark:text-[#F0EDE8]' : 'text-[#7A7571]'}`}>{s}</span>
                {i < 2 && <div className="w-12 lg:w-24 h-px bg-[#E2DDD6] dark:bg-[#2E2E2E]" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left form */}
            <div className="lg:col-span-2">
              {/* STEP 1: Address */}
              {step === 'address' && (
                <div className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-6 space-y-4" style={{ animation: 'fadeInUp 0.4s ease' }}>
                  <h2 className="font-display font-bold text-xl text-[#1C1C1C] dark:text-[#F0EDE8] mb-2">Delivery Address</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: 'fullName', label: 'Full Name', col: 1 },
                      { key: 'phone', label: 'Mobile Number', col: 1 },
                      { key: 'email', label: 'Email Address', col: 2 },
                      { key: 'line1', label: 'Address Line 1', col: 2 },
                      { key: 'line2', label: 'Address Line 2 (optional)', col: 2 },
                      { key: 'city', label: 'City', col: 1 },
                      { key: 'pin', label: 'PIN Code', col: 1 },
                    ].map(({ key, label, col }) => (
                      <div key={key} className={col === 2 ? 'sm:col-span-2' : ''}>
                        <label className="block text-xs font-bold tracking-wider uppercase text-[#7A7571] mb-1.5">{label}</label>
                        <input
                          value={addr[key as keyof typeof addr]}
                          onChange={e => setAddr(a => ({ ...a, [key]: e.target.value }))}
                          className="w-full border border-[#E2DDD6] dark:border-[#2E2E2E] bg-transparent rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B8962E] transition-colors"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-bold tracking-wider uppercase text-[#7A7571] mb-1.5">State</label>
                      <select
                        value={addr.state}
                        onChange={e => setAddr(a => ({ ...a, state: e.target.value }))}
                        className="w-full border border-[#E2DDD6] dark:border-[#2E2E2E] bg-transparent dark:bg-[#1A1A1A] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B8962E] transition-colors"
                      >
                        {STATES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep('payment')}
                    disabled={!addr.fullName || !addr.phone || !addr.line1 || !addr.city || !addr.pin}
                    className="mt-2 flex items-center gap-2 bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] font-bold px-8 py-4 rounded-2xl disabled:opacity-40 hover:bg-[#333] transition-colors"
                  >
                    Continue to Payment <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* STEP 2: Payment */}
              {step === 'payment' && (
                <div className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-6" style={{ animation: 'fadeInUp 0.4s ease' }}>
                  <h2 className="font-display font-bold text-xl text-[#1C1C1C] dark:text-[#F0EDE8] mb-6">Payment Method</h2>
                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'upi' as const, icon: Smartphone, label: 'UPI / BHIM', desc: 'Pay via GPay, PhonePe, Paytm' },
                      { id: 'card' as const, icon: CreditCard, label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                      { id: 'cod' as const, icon: Package, label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
                    ].map(({ id, icon: Icon, label, desc }) => (
                      <label key={id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${payMethod === id ? 'border-[#B8962E] bg-[#B8962E]/5' : 'border-[#E2DDD6] dark:border-[#2E2E2E] hover:border-[#B8962E]/50'}`}>
                        <input type="radio" name="pay" value={id} checked={payMethod === id} onChange={() => setPayMethod(id)} className="sr-only" />
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${payMethod === id ? 'bg-[#B8962E] text-white' : 'bg-[#F0EDE8] dark:bg-[#252525] text-[#7A7571]'}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-[#1C1C1C] dark:text-[#F0EDE8]">{label}</p>
                          <p className="text-xs text-[#7A7571]">{desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep('address')} className="px-6 py-3.5 rounded-2xl border border-[#E2DDD6] dark:border-[#2E2E2E] text-sm font-semibold hover:border-[#1C1C1C] transition-colors">
                      ← Back
                    </button>
                    <button onClick={() => setStep('confirm')} className="flex-1 flex items-center justify-center gap-2 bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] font-bold py-3.5 rounded-2xl hover:bg-[#333] transition-colors">
                      Review Order <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Confirm */}
              {step === 'confirm' && (
                <div className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-6 space-y-6" style={{ animation: 'fadeInUp 0.4s ease' }}>
                  <h2 className="font-display font-bold text-xl text-[#1C1C1C] dark:text-[#F0EDE8]">Confirm Your Order</h2>
                  <div className="space-y-3">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-14 h-16 flex-shrink-0 bg-[#F0EDE8] dark:bg-[#252525] rounded-lg overflow-hidden">
                          <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#1C1C1C] dark:text-[#F0EDE8] line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-[#7A7571]">Size {item.size} · Qty {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-sm">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[#E2DDD6] dark:border-[#2E2E2E] pt-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-[#7A7571]">Deliver to</span><span className="font-medium text-right max-w-[200px]">{addr.fullName}, {addr.city}, {addr.pin}</span></div>
                    <div className="flex justify-between"><span className="text-[#7A7571]">Payment</span><span className="font-medium capitalize">{payMethod === 'upi' ? 'UPI' : payMethod === 'card' ? 'Card' : 'Cash on Delivery'}</span></div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep('payment')} className="px-6 py-3.5 rounded-2xl border border-[#E2DDD6] dark:border-[#2E2E2E] text-sm font-semibold hover:border-[#1C1C1C] transition-colors">
                      ← Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={processing}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#B8962E] hover:bg-[#D4AF37] text-white font-bold py-4 rounded-2xl transition-all duration-300 disabled:opacity-70"
                    >
                      {processing ? (
                        <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing…</>
                      ) : (
                        <>Place Order · ₹{total.toLocaleString('en-IN')}</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order summary sidebar */}
            <div>
              <div className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-6 sticky top-24">
                <h3 className="font-display font-bold text-lg text-[#1C1C1C] dark:text-[#F0EDE8] mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm mb-4">
                  {items.map(i => (
                    <div key={i.id} className="flex justify-between">
                      <span className="text-[#7A7571] truncate max-w-[160px]">{i.product.name} ×{i.quantity}</span>
                      <span className="font-medium ml-2">₹{(i.price * i.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                  <div className="border-t border-[#E2DDD6] dark:border-[#2E2E2E] pt-2 mt-2 space-y-1.5">
                    <div className="flex justify-between"><span className="text-[#7A7571]">Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
                    <div className="flex justify-between"><span className="text-[#7A7571]">GST (18%)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t border-[#E2DDD6] dark:border-[#2E2E2E]">
                      <span>Total</span><span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs text-[#7A7571]">🔒 256-bit SSL secured</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}
