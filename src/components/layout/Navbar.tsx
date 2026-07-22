'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, Heart, Sun, Moon } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import CartDrawer from '@/components/ui/CartDrawer';
import SearchModal from '@/components/ui/SearchModal';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Men', href: '/shop?category=men' },
  { label: 'Women', href: '/shop?category=women' },
  { label: 'Kids', href: '/shop?category=kids' },
  { label: 'Sale', href: '/shop?filter=sale', accent: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const totalItems = useCartStore(s => s.getTotalItems());
  const openCart = useCartStore(s => s.openCart);
  const isCartOpen = useCartStore(s => s.isOpen);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'bg-white/95 dark:bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#E2DDD6] dark:border-[#2E2E2E] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container-fluid flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link
            href="/"
            className={`font-display font-bold text-xl lg:text-2xl tracking-tight transition-colors duration-300 ${
              transparent ? 'text-[#1C1C1C]' : 'text-[#1C1C1C] dark:text-[#F0EDE8]'
            }`}
          >
            THE BERLIN STORE
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href, accent }) => {
              const active = pathname === href.split('?')[0];
              return (
                <Link
                  key={label}
                  href={href}
                  className={`text-[13px] font-semibold tracking-wider transition-colors duration-200 relative group ${
                    accent
                      ? 'text-[#B8962E]'
                      : transparent
                      ? 'text-[#1C1C1C] hover:text-[#B8962E]'
                      : 'text-[#1C1C1C] dark:text-[#F0EDE8] hover:text-[#B8962E] dark:hover:text-[#D4AF37]'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#B8962E] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            {/* Dark toggle — desktop only */}
            <button
              onClick={() => setDark(d => !d)}
              className={`hidden lg:flex w-9 h-9 items-center justify-center rounded-full transition-colors duration-200 ${
                transparent ? 'hover:bg-black/5' : 'hover:bg-[#F0EDE8] dark:hover:bg-[#252525]'
              }`}
              aria-label="Toggle dark mode"
            >
              {dark
                ? <Sun size={17} className="text-[#D4AF37]" />
                : <Moon size={17} className={transparent ? 'text-[#1C1C1C]' : 'text-[#1C1C1C] dark:text-[#F0EDE8]'} />
              }
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 ${
                transparent ? 'hover:bg-black/5' : 'hover:bg-[#F0EDE8] dark:hover:bg-[#252525]'
              }`}
              aria-label="Search"
            >
              <Search size={18} className={transparent ? 'text-[#1C1C1C]' : 'text-[#1C1C1C] dark:text-[#F0EDE8]'} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className={`hidden sm:flex w-9 h-9 items-center justify-center rounded-full transition-colors duration-200 ${
                transparent ? 'hover:bg-black/5' : 'hover:bg-[#F0EDE8] dark:hover:bg-[#252525]'
              }`}
              aria-label="Wishlist"
            >
              <Heart size={18} className={transparent ? 'text-[#1C1C1C]' : 'text-[#1C1C1C] dark:text-[#F0EDE8]'} />
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className={`relative w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 ${
                transparent ? 'hover:bg-black/5' : 'hover:bg-[#F0EDE8] dark:hover:bg-[#252525]'
              }`}
              aria-label="Cart"
            >
              <ShoppingBag size={18} className={transparent ? 'text-[#1C1C1C]' : 'text-[#1C1C1C] dark:text-[#F0EDE8]'} />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#B8962E] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Account */}
            <Link
              href="/account"
              className={`hidden lg:flex w-9 h-9 items-center justify-center rounded-full transition-colors duration-200 ${
                transparent ? 'hover:bg-black/5' : 'hover:bg-[#F0EDE8] dark:hover:bg-[#252525]'
              }`}
              aria-label="Account"
            >
              <User size={18} className={transparent ? 'text-[#1C1C1C]' : 'text-[#1C1C1C] dark:text-[#F0EDE8]'} />
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X size={20} className="text-[#1C1C1C] dark:text-[#F0EDE8]" />
                : <Menu size={20} className={transparent ? 'text-[#1C1C1C]' : 'text-[#1C1C1C] dark:text-[#F0EDE8]'} />
              }
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      <div
        className={`fixed inset-0 z-40 bg-white dark:bg-[#0D0D0D] flex flex-col pt-20 transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-2 px-8 mt-8">
          {NAV_LINKS.map(({ label, href, accent }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`font-display font-bold text-3xl py-3 border-b border-[#E2DDD6] dark:border-[#2E2E2E] transition-all duration-300 ${
                accent ? 'text-[#B8962E]' : 'text-[#1C1C1C] dark:text-[#F0EDE8] hover:text-[#B8962E]'
              }`}
              style={{ transitionDelay: `${i * 60}ms`, transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)', opacity: mobileOpen ? 1 : 0 }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 px-8 flex flex-col gap-4">
          <Link href="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-semibold text-[#7A7571]">
            <User size={16} /> My Account
          </Link>
          <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-sm font-semibold text-[#7A7571]">
            <Heart size={16} /> Wishlist
          </Link>
          <button onClick={() => setDark(d => !d)} className="flex items-center gap-3 text-sm font-semibold text-[#7A7571]">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Search Modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
