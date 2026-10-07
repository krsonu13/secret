import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { soundSynth } from '../utils/soundSynth';

interface Props {
  sisterName: string;
  heroTitle: string;
  heroSubtitle: string;
}

export const HeroSection: React.FC<Props> = ({ sisterName, heroTitle, heroSubtitle }) => {
  const handleOpenSurprise = () => {
    triggerConfetti();
    soundSynth.playChime();
    const el = document.getElementById('countdown');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-gold-warm text-xs sm:text-sm font-semibold tracking-wider mb-6"
      >
        <Sparkles size={16} />
        <span>A little surprise made just for you ✨</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-tight"
      >
        Happy Birthday, <br />
        <span className="bg-gradient-to-r from-rose-glow via-rose-soft to-gold-warm bg-clip-text text-transparent">
          {sisterName || 'My Dear Sister'}
        </span>{' '}
        <span className="inline-block animate-pulse">❤️</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-6 text-base sm:text-xl text-white/80 max-w-2xl font-sans font-light leading-relaxed"
      >
        {heroSubtitle || "Today isn’t just another day… it’s the day someone very special came into this world."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-10"
      >
        <button
          onClick={handleOpenSurprise}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-glow via-rose-soft to-violet-mystic text-white font-semibold text-lg shadow-2xl shadow-rose-glow/40 hover:scale-105 transition-all duration-300"
        >
          <Gift className="group-hover:rotate-12 transition-transform duration-300" size={24} />
          <span>Open Your Surprise 🎁</span>
          <Heart className="text-gold-warm fill-gold-warm group-hover:scale-125 transition-transform" size={18} />
        </button>
      </motion.div>
    </section>
  );
};
