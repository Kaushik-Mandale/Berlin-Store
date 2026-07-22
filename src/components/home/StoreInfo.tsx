'use client';

import Link from 'next/link';
import { MapPin, Clock, Phone, Navigation, MessageCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function StoreInfo() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="section-py"
      style={{ background: 'var(--off-white)' }}
    >
      <div className="container-fluid">
        {/* Header */}
        <div className="text-center mb-14">
          <div data-reveal className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#B8962E]" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#B8962E]">
              Find Us
            </span>
            <div className="h-px w-8 bg-[#B8962E]" />
          </div>
          <h2 data-reveal className="font-display font-bold text-4xl lg:text-5xl text-[var(--text)] mb-4">
            Visit Our Store
          </h2>
          <p data-reveal className="text-[var(--text-muted)] text-base max-w-md mx-auto">
            Experience fashion in person at our premium showroom.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Info Cards */}
          <div data-reveal className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: MapPin, title: 'Location', content: 'Ground Floor, Premium Mall\nMG Road, Pune 411001\nMaharashtra, India' },
              { icon: Clock, title: 'Store Hours', content: 'Mon – Sat: 10:00 – 21:00\nSunday: 11:00 – 20:00\nPublic Holidays: 11:00 – 19:00' },
            ].map(({ icon: Icon, title, content }) => (
              <div key={title} className="bg-white dark:bg-[#1A1A1A] border border-[var(--border)] rounded-2xl p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F7F5F0] dark:bg-[#252525] mb-4">
                  <Icon size={18} className="text-[#B8962E]" />
                </div>
                <h3 className="font-semibold text-sm text-[var(--text)] mb-2">{title}</h3>
                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed whitespace-pre-line">{content}</p>
              </div>
            ))}

            {/* Contact */}
            <div className="sm:col-span-2 bg-[#1C1C1C] dark:bg-[#252525] rounded-2xl p-6 flex items-center gap-4 flex-wrap">
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] mb-1">Get in Touch</div>
                <div className="font-display font-semibold text-lg text-white mb-0.5">+91 98765 43210</div>
                <div className="text-[13px] text-white/60">info@berlinstore.in</div>
              </div>
              <div className="ml-auto flex gap-3">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-xs px-5 py-3 rounded-full transition-colors duration-200"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-3 rounded-full transition-colors duration-200"
                >
                  <Phone size={14} /> Call
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div data-reveal className="rounded-2xl overflow-hidden border border-[var(--border)] h-[360px] lg:h-full min-h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.234682617673!2d73.87788731489286!3d18.51961138740155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c080fffffffd%3A0x55fdfa99da1ca47b!2sMG%20Road%2C%20Pune!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 300 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Berlin Store Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
