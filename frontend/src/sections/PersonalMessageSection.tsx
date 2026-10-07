import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface Props {
  mainMessage: string;
}

export const PersonalMessageSection: React.FC<Props> = ({ mainMessage }) => {
  return (
    <section className="py-24 px-4 relative flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 shadow-2xl backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-40 h-40 bg-rose-glow/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-2 text-rose-soft text-sm font-semibold tracking-wider uppercase mb-3">
          <Heart size={18} className="fill-rose-soft" />
          <span>A Message From My Heart</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
          To My Dearest Sister ❤️
        </h2>

        <div className="prose prose-invert max-w-none text-white/85 text-base sm:text-lg leading-relaxed whitespace-pre-line font-sans font-light">
          {mainMessage}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-gold-warm font-handwriting text-2xl">
          <span>Forever &amp; Always,</span>
          <span>Your Brother ❤️</span>
        </div>
      </motion.div>
    </section>
  );
};
