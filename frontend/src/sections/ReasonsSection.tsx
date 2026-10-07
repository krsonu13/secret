import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Smile, Zap, Shield, Home, Sparkles } from 'lucide-react';
import { Reason } from '../types';

interface Props {
  reasons: Reason[];
}

export const ReasonsSection: React.FC<Props> = ({ reasons }) => {
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'smile': return <Smile size={26} className="text-rose-soft" />;
      case 'zap': return <Zap size={26} className="text-gold-warm" />;
      case 'shield': return <Shield size={26} className="text-violet-electric" />;
      case 'home': return <Home size={26} className="text-rose-glow" />;
      default: return <Heart size={26} className="text-rose-glow" />;
    }
  };

  return (
    <section id="reasons" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 text-rose-soft text-xs font-semibold tracking-widest uppercase mb-2">
          <Sparkles size={14} />
          Pure Sister Magic
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Things That Make You… YOU ❤️
        </h2>
        <p className="mt-3 text-white/60 font-sans max-w-lg mx-auto text-sm sm:text-base">
          Out of 8 billion people on this planet, there is truly no one quite like you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((r, idx) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl shadow-xl hover:border-gold-warm/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/15">
                {getIcon(r.icon)}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
                {r.title}
              </h3>
              <p className="text-white/75 font-sans leading-relaxed text-sm sm:text-base font-light">
                {r.description}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gold-warm font-semibold tracking-wider uppercase">
              <span>Reason #{idx + 1}</span>
              <span>Forever Loved</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
