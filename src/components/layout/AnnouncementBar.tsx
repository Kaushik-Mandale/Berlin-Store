'use client';

import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

const messages = [
  '✦  Free delivery on orders above ₹999  ✦  New Collection AW\'24 Now Live',
  '✦  Use code BERLIN10 for 10% off your first order  ✦  Shop 500+ Brands',
  '✦  Easy returns within 15 days  ✦  Secure Payments  ✦  Shop Now',
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [msgIdx] = useState(0);

  if (!visible) return null;

  return (
    <div
      className="relative z-50 flex items-center justify-center px-10 py-2.5 text-center overflow-hidden"
      style={{ background: '#1C1C1C' }}
    >
      <p className="text-[11px] font-medium tracking-[0.15em] text-white/80">
        {messages[msgIdx]}
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 w-6 h-6 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors duration-200"
        aria-label="Close announcement"
      >
        <X size={12} />
      </button>
    </div>
  );
}
