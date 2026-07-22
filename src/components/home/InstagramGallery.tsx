'use client';

import { motion } from 'framer-motion';
import { Camera, Heart, MessageCircle } from 'lucide-react';
import { staggerContainer, fadeUp } from '@/lib/utils';

const posts = [
  { id: 1, handle: '@berlinstore', likes: '1.2k', comments: '45', height: 'h-64', bg: 'bg-gradient-to-br from-purple-600 to-pink-500', emoji: '✨' },
  { id: 2, handle: '@berlinstore', likes: '2.4k', comments: '89', height: 'h-80', bg: 'bg-gradient-to-br from-amber-500 to-rose-600', emoji: '👗' },
  { id: 3, handle: '@berlinstore', likes: '980', comments: '23', height: 'h-72', bg: 'bg-gradient-to-br from-blue-600 to-teal-500', emoji: '👟' },
  { id: 4, handle: '@berlinstore', likes: '3.1k', comments: '120', height: 'h-96', bg: 'bg-gradient-to-br from-emerald-600 to-cyan-600', emoji: '👔' },
  { id: 5, handle: '@berlinstore', likes: '1.8k', comments: '64', height: 'h-64', bg: 'bg-gradient-to-br from-rose-500 to-orange-500', emoji: '🧥' },
  { id: 6, handle: '@berlinstore', likes: '4.2k', comments: '210', height: 'h-80', bg: 'bg-gradient-to-br from-zinc-800 to-stone-900', emoji: '💎' },
];

export default function InstagramGallery() {
  return (
    <section className="section-py bg-brand-cream dark:bg-brand-dark overflow-hidden" aria-label="Instagram gallery">
      <div className="container-fluid">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-brand-gold text-xs font-semibold uppercase tracking-[0.3em] mb-3 hover:underline"
          >
            <Camera size={14} /> Follow @theberlinstore
          </motion.a>
          <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl font-bold text-brand-black dark:text-white">
            As Seen On Instagram
          </motion.h2>
        </motion.div>

        {/* Masonry Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className={`group relative rounded-2xl overflow-hidden ${post.bg} flex items-center justify-center p-6 shadow-card hover:shadow-card-hover transition-all duration-300 min-h-[220px]`}
            >
              <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{post.emoji}</span>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 text-white p-4 text-center">
                <Camera size={22} className="text-brand-gold" />
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1"><Heart size={12} className="fill-white" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={12} className="fill-white" /> {post.comments}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
