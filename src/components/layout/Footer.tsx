'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

// Inline SVGs for social icons (not available in all lucide versions)
interface IconProps {
  size?: number;
  className?: string;
}

const SocialIcons = {
  Instagram: ({ size = 14, className = "" }: IconProps) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Facebook: ({ size = 14, className = "" }: IconProps) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Twitter: ({ size = 14, className = "" }: IconProps) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
    </svg>
  ),
  Youtube: ({ size = 14, className = "" }: IconProps) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
};

const footerLinks = {
  Shop: [
    { label: "Men's Collection", href: '/shop?category=men' },
    { label: "Women's Collection", href: '/shop?category=women' },
    { label: "Kids' Collection", href: '/shop?category=kids' },
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'Sale', href: '/shop?filter=sale' },
  ],
  Help: [
    { label: 'Track Order', href: '/track' },
    { label: 'Returns & Exchange', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const social: Array<{ icon: React.ComponentType<IconProps>; href: string; label: string }> = [
  { icon: SocialIcons.Instagram, href: '#', label: 'Instagram' },
  { icon: SocialIcons.Facebook, href: '#', label: 'Facebook' },
  { icon: SocialIcons.Twitter, href: '#', label: 'Twitter' },
  { icon: SocialIcons.Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0D0D0D', color: '#F0EDE8' }}>
      <div className="container-fluid py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="font-display font-bold text-2xl mb-4">THE BERLIN STORE</div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              A premium fashion destination bringing you the world's most coveted brands. Luxury meets accessibility.
            </p>
            {/* Contact */}
            <div className="flex flex-col gap-3 mb-7">
              {[
                { icon: MapPin, text: 'MG Road, Pune 411001, Maharashtra' },
                { icon: Phone, text: '+91 98765 43210' },
                { icon: Mail, text: 'info@berlinstore.in' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-white/50">
                  <Icon size={14} className="text-[#B8962E] flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#B8962E] hover:bg-[#B8962E]/10 transition-all duration-200"
                >
                  <Icon size={14} className="text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-bold text-[11px] tracking-[0.3em] uppercase text-[#B8962E] mb-5">{heading}</h4>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} The Berlin Store. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Cookies'].map((label) => (
              <Link key={label} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
