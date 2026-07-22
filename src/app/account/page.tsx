'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { User, Package, Heart, MapPin, Bell, Settings, LogOut, ChevronRight, Star } from 'lucide-react';

const MOCK_ORDERS = [
  { id: 'BS-2024-A1K9Z', date: '18 Jul 2024', items: 2, total: 7498, status: 'Delivered', statusColor: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
  { id: 'BS-2024-X4M2Q', date: '10 Jul 2024', items: 1, total: 4299, status: 'Processing', statusColor: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
  { id: 'BS-2024-P7R3Y', date: '02 Jul 2024', items: 3, total: 8996, status: 'Shipped', statusColor: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
];

const NAV = [
  { id: 'orders', icon: Package, label: 'My Orders' },
  { id: 'wishlist', icon: Heart, label: 'Wishlist', href: '/wishlist' },
  { id: 'addresses', icon: MapPin, label: 'Addresses' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [loggedIn, setLoggedIn] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      setLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Please enter email and password');
    }
  };

  if (!loggedIn) return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--cream)' }}>
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-3xl p-8" style={{ animation: 'fadeInUp 0.5s ease' }}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#F0EDE8] dark:bg-[#252525] rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={28} className="text-[#B8962E]" />
              </div>
              <h1 className="font-display font-bold text-2xl text-[#1C1C1C] dark:text-[#F0EDE8]">Welcome Back</h1>
              <p className="text-sm text-[#7A7571] mt-1">Sign in to your Berlin Store account</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-[#7A7571] mb-1.5">Email</label>
                <input type="email" placeholder="you@email.com" value={loginForm.email}
                  onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-[#E2DDD6] dark:border-[#2E2E2E] bg-transparent rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B8962E] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-[#7A7571] mb-1.5">Password</label>
                <input type="password" placeholder="••••••••" value={loginForm.password}
                  onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full border border-[#E2DDD6] dark:border-[#2E2E2E] bg-transparent rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B8962E] transition-colors" />
              </div>
              {loginError && <p className="text-red-500 text-xs">{loginError}</p>}
              <button type="submit" className="w-full bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] font-bold py-4 rounded-2xl hover:bg-[#333] transition-colors">
                Sign In
              </button>
            </form>
            <p className="text-center text-xs text-[#7A7571] mt-4">
              No account? <button onClick={() => setLoggedIn(true)} className="text-[#B8962E] font-semibold hover:underline">Create one</button>
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </>
  );

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: 'var(--cream)' }}>
        <div className="container-fluid py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside>
              {/* Profile card */}
              <div className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-6 mb-4 text-center">
                <div className="w-16 h-16 rounded-full bg-[#B8962E] flex items-center justify-center mx-auto mb-3 text-white font-display font-bold text-2xl">A</div>
                <h2 className="font-display font-bold text-lg text-[#1C1C1C] dark:text-[#F0EDE8]">Arjun Sharma</h2>
                <p className="text-xs text-[#7A7571]">arjun@example.com</p>
                <div className="mt-3 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className={i < 4 ? 'fill-[#B8962E] stroke-none' : 'stroke-[#D0C9BC] fill-none'} />)}
                  <span className="text-xs text-[#7A7571] ml-1">Gold Member</span>
                </div>
              </div>

              {/* Nav */}
              <div className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl overflow-hidden">
                {NAV.map(({ id, icon: Icon, label, href }) => (
                  href ? (
                    <Link key={id} href={href} className="flex items-center justify-between px-5 py-4 hover:bg-[#F7F5F0] dark:hover:bg-[#252525] transition-colors border-b border-[#E2DDD6] dark:border-[#2E2E2E] last:border-0">
                      <div className="flex items-center gap-3">
                        <Icon size={16} className="text-[#7A7571]" />
                        <span className="text-sm font-medium text-[#1C1C1C] dark:text-[#F0EDE8]">{label}</span>
                      </div>
                      <ChevronRight size={14} className="text-[#D0C9BC]" />
                    </Link>
                  ) : (
                    <button key={id} onClick={() => setActiveTab(id)}
                      className={`w-full flex items-center justify-between px-5 py-4 transition-colors border-b border-[#E2DDD6] dark:border-[#2E2E2E] last:border-0 ${activeTab === id ? 'bg-[#B8962E]/10' : 'hover:bg-[#F7F5F0] dark:hover:bg-[#252525]'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} className={activeTab === id ? 'text-[#B8962E]' : 'text-[#7A7571]'} />
                        <span className={`text-sm font-medium ${activeTab === id ? 'text-[#B8962E] font-semibold' : 'text-[#1C1C1C] dark:text-[#F0EDE8]'}`}>{label}</span>
                      </div>
                      <ChevronRight size={14} className="text-[#D0C9BC]" />
                    </button>
                  )
                ))}
                <button onClick={() => setLoggedIn(false)}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-500">
                  <LogOut size={16} />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-3">
              {activeTab === 'orders' && (
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#1C1C1C] dark:text-[#F0EDE8] mb-6">My Orders</h2>
                  <div className="space-y-4">
                    {MOCK_ORDERS.map((order, i) => (
                      <div
                        key={order.id}
                        className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-5"
                        style={{ animation: `fadeInUp 0.4s ease forwards ${i * 80}ms`, opacity: 0 }}
                      >
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div>
                            <div className="font-bold text-sm text-[#1C1C1C] dark:text-[#F0EDE8] mb-1">{order.id}</div>
                            <div className="text-xs text-[#7A7571]">Placed on {order.date} · {order.items} item{order.items !== 1 ? 's' : ''}</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${order.statusColor}`}>{order.status}</span>
                            <span className="font-bold text-sm text-[#1C1C1C] dark:text-[#F0EDE8]">₹{order.total.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-4 pt-4 border-t border-[#E2DDD6] dark:border-[#2E2E2E]">
                          <button className="text-xs font-semibold text-[#B8962E] hover:underline">Track Order</button>
                          <button className="text-xs font-semibold text-[#7A7571] hover:text-[#B8962E] transition-colors">View Details</button>
                          {order.status === 'Delivered' && <button className="text-xs font-semibold text-[#7A7571] hover:text-[#B8962E] transition-colors">Return / Exchange</button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#1C1C1C] dark:text-[#F0EDE8] mb-6">Saved Addresses</h2>
                  <div className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#B8962E]/10 flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-[#B8962E]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-[#1C1C1C] dark:text-[#F0EDE8]">Arjun Sharma</span>
                          <span className="text-[10px] font-bold bg-[#B8962E] text-white px-2 py-0.5 rounded-full">Default</span>
                        </div>
                        <p className="text-sm text-[#7A7571]">12, Koregaon Park, Pune 411001, Maharashtra</p>
                        <p className="text-sm text-[#7A7571]">📞 +91 98765 43210</p>
                      </div>
                    </div>
                    <button className="text-sm font-semibold text-[#B8962E] hover:underline">+ Add New Address</button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#1C1C1C] dark:text-[#F0EDE8] mb-6">Notifications</h2>
                  {[
                    { icon: '📦', title: 'Order Shipped', msg: 'Your order BS-2024-X4M2Q has been shipped!', time: '2 hours ago' },
                    { icon: '🎉', title: 'Sale Alert', msg: 'Summer Sale starts tomorrow — up to 50% off!', time: '1 day ago' },
                    { icon: '✅', title: 'Order Delivered', msg: 'Your order BS-2024-A1K9Z has been delivered.', time: '3 days ago' },
                  ].map((n, i) => (
                    <div key={i} className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-5 mb-3 flex gap-4"
                      style={{ animation: `fadeInUp 0.4s ease forwards ${i * 80}ms`, opacity: 0 }}>
                      <span className="text-2xl">{n.icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-[#1C1C1C] dark:text-[#F0EDE8]">{n.title}</p>
                        <p className="text-sm text-[#7A7571]">{n.msg}</p>
                        <p className="text-xs text-[#D0C9BC] mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#1C1C1C] dark:text-[#F0EDE8] mb-6">Account Settings</h2>
                  <div className="bg-white dark:bg-[#1A1A1A] border border-[#E2DDD6] dark:border-[#2E2E2E] rounded-2xl p-6 space-y-4">
                    {[{ label: 'Full Name', val: 'Arjun Sharma' }, { label: 'Email', val: 'arjun@example.com' }, { label: 'Phone', val: '+91 98765 43210' }].map(({ label, val }) => (
                      <div key={label}>
                        <label className="block text-xs font-bold tracking-wider uppercase text-[#7A7571] mb-1.5">{label}</label>
                        <input defaultValue={val} className="w-full border border-[#E2DDD6] dark:border-[#2E2E2E] bg-transparent rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B8962E] transition-colors" />
                      </div>
                    ))}
                    <button className="bg-[#1C1C1C] dark:bg-[#F0EDE8] text-white dark:text-[#1C1C1C] font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-[#333] transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
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
