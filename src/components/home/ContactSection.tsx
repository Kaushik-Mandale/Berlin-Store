'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import toast from 'react-hot-toast';
import { staggerContainer, fadeUp } from '@/lib/utils';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...formData,
        isRead: false,
        isReplied: false,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      toast.success('Message sent successfully!');
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-py bg-brand-cream dark:bg-brand-dark" aria-label="Contact us">
      <div className="container-fluid">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="inline-block text-brand-gold text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            Get In Touch
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl font-bold text-brand-black dark:text-white">
            We'd Love to Hear From You
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white dark:bg-brand-charcoal rounded-3xl p-8 sm:p-12 shadow-card"
        >
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle2 size={56} className="text-emerald-500 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-brand-black dark:text-white mb-2">Thank You!</h3>
              <p className="text-brand-gray-500 text-sm mb-6">Your message has been received. Our team will get back to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="text-brand-gold font-semibold text-sm hover:underline">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-brand-gray-600 dark:text-brand-gray-300 uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full bg-brand-gray-50 dark:bg-brand-gray-800 border border-brand-gray-200 dark:border-brand-gray-700 rounded-xl px-4 py-3 text-sm text-brand-black dark:text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-gray-600 dark:text-brand-gray-300 uppercase tracking-wider mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-brand-gray-50 dark:bg-brand-gray-800 border border-brand-gray-200 dark:border-brand-gray-700 rounded-xl px-4 py-3 text-sm text-brand-black dark:text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-brand-gray-600 dark:text-brand-gray-300 uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-brand-gray-50 dark:bg-brand-gray-800 border border-brand-gray-200 dark:border-brand-gray-700 rounded-xl px-4 py-3 text-sm text-brand-black dark:text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-gray-600 dark:text-brand-gray-300 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Order Query, Feedback, etc."
                    className="w-full bg-brand-gray-50 dark:bg-brand-gray-800 border border-brand-gray-200 dark:border-brand-gray-700 rounded-xl px-4 py-3 text-sm text-brand-black dark:text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-gray-600 dark:text-brand-gray-300 uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full bg-brand-gray-50 dark:bg-brand-gray-800 border border-brand-gray-200 dark:border-brand-gray-700 rounded-xl px-4 py-3 text-sm text-brand-black dark:text-white focus:outline-none focus:border-brand-gold resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-bold py-4 rounded-2xl transition-all duration-300 hover:shadow-glow-gold text-sm"
              >
                {loading ? 'Sending...' : <>Send Message <Send size={16} /></>}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
