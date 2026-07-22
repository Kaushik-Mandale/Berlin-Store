'use client';

import { motion } from 'framer-motion';
import { Scissors, Gift, Sun, Globe, Store, RotateCcw, Tag, Award, CreditCard, Users, Sparkles, Briefcase, Heart, Lightbulb } from 'lucide-react';
import { staggerContainer, fadeUp } from '@/lib/utils';

const services = [
  { icon: Lightbulb, title: 'Personal Styling', desc: '1-on-1 fashion advice with expert stylists.' },
  { icon: Gift, title: 'Gift Wrapping', desc: 'Custom luxury packaging for special gifts.' },
  { icon: Sun, title: 'Seasonal Collections', desc: 'Exclusive drops for club members.' },
  { icon: Globe, title: 'Online Ordering', desc: 'Real-time order tracking & updates.' },
  { icon: Store, title: 'Store Pickup', desc: 'Order online, pick up in-store same day.' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day effortless returns policy.' },
  { icon: Scissors, title: 'Alteration Services', desc: 'In-store tailoring for perfect fit.' },
  { icon: Award, title: 'Membership', desc: 'Early access & exclusive rewards.' },
  { icon: CreditCard, title: 'Gift Cards', desc: 'Digital vouchers for loved ones.' },
  { icon: Users, title: 'Bulk Orders', desc: 'Special rates for corporate orders.' },
  { icon: Sparkles, title: 'Festival Sales', desc: 'Exclusive deals during events.' },
  { icon: Briefcase, title: 'Corporate Apparel', desc: 'Tailored business solutions.' },
  { icon: Heart, title: 'Loyalty Rewards', desc: 'Earn points on every item.' },
  { icon: Tag, title: 'Trend Consulting', desc: 'Guidance on seasonal trends.' },
];

export default function ServicesSection() {
  return (
    <section className="section-py bg-[#FAF9F6] dark:bg-[#121212]" aria-label="Our services">
      <div className="container-fluid">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="inline-block text-brand-gold text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Concierge Services
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100">
            Tailored Experiences
          </motion.h2>
          <motion.p variants={fadeUp} className="text-neutral-500 dark:text-neutral-400 mt-3 max-w-md mx-auto text-sm">
            Elevating retail fashion with premium bespoke services
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="bg-white dark:bg-[#1A1A1A] border border-neutral-200/60 dark:border-neutral-800 rounded-2xl p-4 text-center hover:-translate-y-1 transition-all duration-300 hover:shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-900/5 dark:bg-amber-100/10 text-brand-gold flex items-center justify-center mx-auto mb-2.5">
                <service.icon size={16} />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs leading-tight mb-1">{service.title}</h3>
              <p className="text-neutral-400 text-[10px] leading-normal hidden sm:block">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
