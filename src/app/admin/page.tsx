'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShoppingBag, Users, DollarSign, TrendingUp, Package, Tag, Settings, Plus, BarChart3, AlertCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'inventory' | 'cms'>('overview');

  return (
    <main className="min-h-screen bg-brand-cream dark:bg-brand-dark text-brand-black dark:text-white pt-24 pb-16">
      <Navbar />

      <div className="container-fluid">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold text-xs font-semibold px-3 py-1 rounded-full mb-2">
              ADMIN CONTROL PANEL
            </div>
            <h1 className="font-display text-3xl font-bold">The Berlin Store Dashboard</h1>
          </div>

          <div className="flex gap-2">
            <button className="bg-brand-gold text-brand-black font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-brand-gold-light transition-colors flex items-center gap-1.5">
              <Plus size={16} /> Add Product
            </button>
          </div>
        </div>

        {/* Dashboard Nav Tabs */}
        <div className="flex gap-2 border-b border-brand-gray-200 dark:border-brand-gray-800 pb-4 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'products', label: 'Products & Inventory', icon: Package },
            { id: 'orders', label: 'Orders & Payments', icon: ShoppingBag },
            { id: 'inventory', label: 'Stock Logs', icon: AlertCircle },
            { id: 'cms', label: 'Homepage CMS', icon: Settings },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-brand-black dark:bg-white text-white dark:text-brand-black'
                  : 'bg-white dark:bg-brand-charcoal text-brand-gray-600 dark:text-brand-gray-300 hover:bg-brand-gray-100'
              }`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-brand-charcoal p-6 rounded-3xl shadow-card">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs text-brand-gray-400 font-semibold uppercase">Total Revenue</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <DollarSign size={20} />
              </div>
            </div>
            <div className="font-display text-3xl font-bold">{formatPrice(1248900)}</div>
            <span className="text-xs text-emerald-500 font-semibold mt-2 inline-block">↑ +18.4% from last month</span>
          </div>

          <div className="bg-white dark:bg-brand-charcoal p-6 rounded-3xl shadow-card">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs text-brand-gray-400 font-semibold uppercase">Total Orders</span>
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <ShoppingBag size={20} />
              </div>
            </div>
            <div className="font-display text-3xl font-bold">1,420</div>
            <span className="text-xs text-emerald-500 font-semibold mt-2 inline-block">↑ +12.1% from last month</span>
          </div>

          <div className="bg-white dark:bg-brand-charcoal p-6 rounded-3xl shadow-card">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs text-brand-gray-400 font-semibold uppercase">Active Customers</span>
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Users size={20} />
              </div>
            </div>
            <div className="font-display text-3xl font-bold">8,950</div>
            <span className="text-xs text-emerald-500 font-semibold mt-2 inline-block">↑ +24.5% new signups</span>
          </div>

          <div className="bg-white dark:bg-brand-charcoal p-6 rounded-3xl shadow-card">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs text-brand-gray-400 font-semibold uppercase">Low Stock Alert</span>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <AlertCircle size={20} />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-amber-500">4 Items</div>
            <span className="text-xs text-amber-500 font-semibold mt-2 inline-block">Requires restock</span>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-brand-charcoal p-8 rounded-3xl shadow-card">
              <h3 className="font-display font-bold text-xl mb-6">Recent Orders</h3>
              <div className="space-y-4">
                {[
                  { id: 'BS-2024-9412', name: 'Rahul Sharma', items: 'Nike Air Force 1 (x1)', total: 5999, status: 'Processing' },
                  { id: 'BS-2024-9411', name: 'Priya Patel', items: 'Zara Wrap Dress (x1)', total: 2799, status: 'Delivered' },
                  { id: 'BS-2024-9410', name: 'Ananya Roy', items: 'H&M Oversized Shirt (x2)', total: 2998, status: 'Shipped' },
                ].map((order) => (
                  <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-brand-gray-50 dark:bg-brand-gray-800 rounded-2xl gap-2">
                    <div>
                      <div className="font-bold text-sm">{order.id} · <span className="font-normal text-brand-gray-400">{order.name}</span></div>
                      <div className="text-xs text-brand-gray-500">{order.items}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-sm">{formatPrice(order.total)}</span>
                      <span className="bg-brand-gold/10 text-brand-gold text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-brand-charcoal p-8 rounded-3xl shadow-card">
              <h3 className="font-display font-bold text-xl mb-6">Top Brands Sold</h3>
              <div className="space-y-4">
                {[
                  { brand: 'Nike', sales: '450 units', percent: 85 },
                  { brand: 'Zara', sales: '380 units', percent: 72 },
                  { brand: 'Adidas', sales: '310 units', percent: 60 },
                  { brand: 'H&M', sales: '290 units', percent: 55 },
                ].map((item) => (
                  <div key={item.brand}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold">{item.brand}</span>
                      <span className="text-xs text-brand-gray-400">{item.sales}</span>
                    </div>
                    <div className="w-full h-2 bg-brand-gray-100 dark:bg-brand-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-gold rounded-full" style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
