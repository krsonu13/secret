import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { triggerFireworks } from '../utils/confetti';

interface Props {
  sisterName: string;
  finalMessage: string;
}

export const FinalMessageSection: React.FC<Props> = ({ sisterName, finalMessage }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-white/10 via-midnight-800 to-transparent border border-white/20 shadow-2xl backdrop-blur-2xl relative"
      >
        <div className="w-16 h-16 rounded-full bg-rose-glow/20 border border-rose-glow/40 flex items-center justify-center mx-auto mb-6">
          <Heart size={30} className="text-rose-glow fill-rose-glow" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-6">
          Happy Birthday, {sisterName || 'Sister'} ❤️
        </h2>

        <div className="prose prose-invert max-w-none text-white/85 text-base sm:text-xl font-sans font-light leading-relaxed whitespace-pre-line">
          {finalMessage}
        </div>

        <div className="mt-10">
          <button
            onClick={() => triggerFireworks()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-gold-warm font-semibold text-sm transition-all shadow-lg"
          >
            <Sparkles size={18} />
            <span>Celebrate With Fireworks 🎆</span>
          </button>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-white/50 text-xs font-sans tracking-widest uppercase">
          Made with ❤️ specially for {sisterName || 'My Sister'}
        </div>
      </motion.div>
    </section>
  );
};
