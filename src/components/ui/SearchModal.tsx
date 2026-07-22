'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Search, TrendingUp, ArrowRight } from 'lucide-react';
import { searchProducts } from '@/lib/products';
import { Product } from '@/types';

const POPULAR = ['Nike Sneakers', 'Zara Blazer', 'Silk Saree', 'Linen Kurta', 'Kids Dungaree'];

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchProducts(query).slice(0, 5));
    } else {
      setResults([]);
    }
  }, [query]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <div
        className="bg-white dark:bg-[#0D0D0D] w-full animate-in slide-in-from-top duration-300"
        style={{ maxHeight: '85vh', overflowY: 'auto' }}
      >
        {/* Input row */}
        <div className="container-fluid py-5 flex items-center gap-4 border-b border-[#E2DDD6] dark:border-[#2E2E2E]">
          <Search size={20} className="text-[#7A7571] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for brands, styles, categories…"
            className="flex-1 text-lg font-medium bg-transparent outline-none text-[#1C1C1C] dark:text-[#F0EDE8] placeholder:text-[#D0C9BC]"
          />
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F0EDE8] dark:hover:bg-[#252525] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="container-fluid py-6">
          {/* Results */}
          {results.length > 0 ? (
            <div className="space-y-2">
              {results.map(p => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F7F5F0] dark:hover:bg-[#1A1A1A] transition-colors group"
                >
                  <div className="relative w-14 h-16 flex-shrink-0 bg-[#F0EDE8] dark:bg-[#1A1A1A] rounded-lg overflow-hidden">
                    <Image src={p.thumbnail} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#B8962E]">{p.brand}</p>
                    <p className="font-medium text-sm text-[#1C1C1C] dark:text-[#F0EDE8] truncate">{p.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">₹{(p.offerPrice || p.price).toLocaleString('en-IN')}</span>
                      {p.offerPrice && p.offerPrice < p.price && (
                        <span className="text-xs text-[#7A7571] line-through">₹{p.price.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-[#D0C9BC] group-hover:text-[#B8962E] transition-colors" />
                </Link>
              ))}
              <Link
                href={`/shop?q=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="flex items-center justify-center gap-2 mt-4 py-3 border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-xl text-sm font-semibold text-[#1C1C1C] dark:text-[#F0EDE8] hover:border-[#1C1C1C] dark:hover:border-[#F0EDE8] transition-colors"
              >
                View all results for &quot;{query}&quot; <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={14} className="text-[#B8962E]" />
                <span className="text-xs font-bold tracking-widest uppercase text-[#7A7571]">Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-sm font-medium px-4 py-2 rounded-full border border-[#E2DDD6] dark:border-[#2E2E2E] text-[#1C1C1C] dark:text-[#F0EDE8] hover:border-[#B8962E] hover:text-[#B8962E] transition-colors duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
}
