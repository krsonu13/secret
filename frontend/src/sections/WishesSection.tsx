import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, MessageCircle } from 'lucide-react';
import { Wish } from '../types';
import { api } from '../services/api';

interface Props {
  wishes: Wish[];
  onWishSubmitted?: () => void;
}

export const WishesSection: React.FC<Props> = ({ wishes, onWishSubmitted }) => {
  const [formData, setFormData] = useState({ name: '', relationship: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);
    setFeedback(null);
    try {
      const res = await api.submitWish(formData);
      setFeedback(res.message);
      setFormData({ name: '', relationship: '', message: '' });
      if (onWishSubmitted) onWishSubmitted();
    } catch (err: any) {
      setFeedback(err.response?.data?.message || 'Failed to submit wish. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wishes" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 text-rose-soft text-xs font-semibold tracking-widest uppercase mb-2">
          <Heart size={14} className="fill-rose-soft" />
          Warm Blessings
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Birthday Wishes For You 💌
        </h2>
        <p className="mt-3 text-white/60 font-sans max-w-md mx-auto text-sm sm:text-base">
          From parents, family, and lifelong friends who adore you endlessly.
        </p>
      </div>

      {/* Approved Wishes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {wishes.map((w, idx) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl hover:border-rose-glow/40 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-gold-warm">
                {w.relationship}
              </span>
              <p className="mt-4 text-white/85 text-base sm:text-lg font-serif italic leading-relaxed">
                "{w.message}"
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-white/70">
              <span className="font-semibold text-rose-soft">— {w.name}</span>
              <span className="text-xs text-white/40">❤️</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Guest Wish Submission Form */}
      <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle className="text-rose-glow" size={24} />
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">Leave A Birthday Blessing</h3>
            <p className="text-xs sm:text-sm text-white/60">Your message will appear here after approval.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Chachi / Friend"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-rose-glow"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                Relationship
              </label>
              <input
                type="text"
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                placeholder="e.g. Aunt / College Friend"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-rose-glow"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
              Your Message *
            </label>
            <textarea
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your sweet birthday message here..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-rose-glow"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-glow to-violet-mystic text-white font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-all disabled:opacity-50"
          >
            <Send size={18} />
            <span>{isSubmitting ? 'Sending...' : 'Send Birthday Wish'}</span>
          </button>
        </form>

        {feedback && (
          <div className="mt-4 p-4 rounded-xl bg-rose-glow/20 border border-rose-glow/40 text-center text-sm text-white">
            {feedback}
          </div>
        )}
      </div>
    </section>
  );
};
