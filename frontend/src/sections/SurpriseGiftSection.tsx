import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, X } from 'lucide-react';
import { triggerConfetti, triggerFireworks } from '../utils/confetti';
import { soundSynth } from '../utils/soundSynth';

export const SurpriseGiftSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    triggerFireworks();
    triggerConfetti();
    soundSynth.playChime();
  };

  return (
    <section className="py-24 px-4 flex flex-col items-center justify-center text-center relative">
      <div className="max-w-xl">
        <span className="inline-flex items-center gap-2 text-gold-warm text-xs font-semibold tracking-widest uppercase mb-3">
          <Sparkles size={14} />
          A Secret Moment
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
          There is still one more surprise… 🎁
        </h2>
        <p className="text-white/70 text-sm sm:text-base mb-8 font-sans font-light">
          A little promise meant to be kept for a lifetime.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <button
            onClick={handleOpen}
            className="group relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-rose-glow via-rose-soft to-violet-mystic shadow-2xl shadow-rose-glow/40 border border-white/20 flex flex-col items-center gap-4 cursor-pointer"
          >
            <span className="text-6xl sm:text-7xl animate-bounce">🎁</span>
            <span className="text-white font-serif font-bold text-xl sm:text-2xl tracking-wide group-hover:text-gold-warm transition-colors">
              Tap To Open Surprise
            </span>
          </button>
        </motion.div>
      </div>

      {/* Fullscreen Surprise Reveal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-midnight-800 via-midnight-900 to-black border border-rose-glow/50 shadow-2xl shadow-rose-glow/30 text-center relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 rounded-full bg-rose-glow/20 border border-rose-glow/40 flex items-center justify-center mx-auto mb-6 text-rose-glow">
                <Heart size={32} className="fill-rose-glow" />
              </div>

              <span className="text-gold-warm uppercase tracking-widest text-xs font-semibold">
                An Eternal Sibling Promise
              </span>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-3 mb-6 leading-snug">
                “No matter where life takes us, you’ll always have someone cheering for you, annoying you, protecting you, and standing beside you.”
              </h3>

              <p className="font-handwriting text-3xl sm:text-4xl text-rose-soft mt-6">
                Happy Birthday, Sister. ❤️
              </p>

              <div className="mt-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/15"
                >
                  Close Promise ✨
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
