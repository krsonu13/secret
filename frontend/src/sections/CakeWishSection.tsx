import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wind } from 'lucide-react';
import { triggerFireworks, triggerConfetti } from '../utils/confetti';
import { soundSynth } from '../utils/soundSynth';

export const CakeWishSection: React.FC = () => {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      soundSynth.playBlowCandle();
      setTimeout(() => {
        triggerFireworks();
        triggerConfetti();
        soundSynth.playChime();
      }, 300);
    } else {
      setCandlesBlown(false);
      soundSynth.playTone(600, 0.2);
    }
  };

  return (
    <section className="py-24 px-4 flex flex-col items-center justify-center text-center">
      <div className="max-w-2xl w-full p-8 sm:p-14 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
        <span className="inline-flex items-center gap-2 text-rose-soft text-xs font-semibold tracking-widest uppercase mb-2">
          <Sparkles size={14} />
          A Magical Tradition
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
          Close Your Eyes &amp; Make A Wish ✨
        </h2>

        <p className="text-white/70 text-sm sm:text-base font-sans font-light mb-10">
          Whisper your secret wish to your heart, then tap to blow out your birthday candles!
        </p>

        {/* 3D-styled Interactive Cake Visual */}
        <div className="relative flex flex-col items-center justify-center my-6 py-4 cursor-pointer" onClick={handleBlowCandles}>
          {/* Candles */}
          <div className="flex gap-6 mb-[-6px] z-20">
            {[1, 2, 3].map((candle) => (
              <div key={candle} className="flex flex-col items-center relative">
                {/* Flame */}
                <motion.div
                  animate={candlesBlown ? { scale: 0, opacity: 0 } : { scale: [1, 1.15, 0.95, 1], rotate: [-2, 2, -1, 1] }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                  className="w-4 h-7 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-white shadow-lg shadow-orange-500/80 mb-[-2px]"
                />
                {/* Smoke on blown */}
                {candlesBlown && (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -30 }}
                    transition={{ duration: 1 }}
                    className="absolute -top-6 w-3 h-3 rounded-full bg-white/40 blur-sm"
                  />
                )}
                {/* Wick */}
                <div className="w-0.5 h-2 bg-black" />
                {/* Candle body */}
                <div className={`w-3.5 h-12 rounded-t-sm shadow-md ${
                  candle === 2 ? 'bg-gradient-to-b from-gold-warm to-amber-500' : 'bg-gradient-to-b from-rose-soft to-rose-glow'
                }`} />
              </div>
            ))}
          </div>

          {/* Top Layer */}
          <div className="w-48 h-14 rounded-2xl bg-gradient-to-b from-pink-200 to-rose-400 shadow-xl flex items-center justify-center text-rose-900 font-serif font-bold text-sm tracking-wider border-b-2 border-rose-500 z-10">
            Vaishnavi ✨
          </div>

          {/* Bottom Layer */}
          <div className="w-64 h-18 rounded-3xl bg-gradient-to-b from-violet-300 to-violet-700 shadow-2xl flex items-center justify-center text-white/90 font-serif text-xs uppercase tracking-widest mt-[-8px]">
            Pure Love &amp; Smiles
          </div>

          {/* Cake Plate */}
          <div className="w-72 h-3 rounded-full bg-white/30 backdrop-blur-md shadow-2xl mt-1" />
        </div>

        <div className="mt-10">
          <button
            onClick={handleBlowCandles}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-warm via-amber-400 to-rose-glow text-midnight-900 font-bold text-base shadow-xl shadow-gold-warm/20 hover:scale-105 transition-all duration-300"
          >
            <Wind size={20} />
            <span>{candlesBlown ? 'Relight Candles 🕯️' : 'Blow Out The Candles 🎂'}</span>
          </button>
        </div>

        {candlesBlown && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-2xl bg-gold-warm/15 border border-gold-warm/30 text-gold-warm"
          >
            <p className="font-handwriting text-2xl sm:text-3xl">
              “May every wish you make today find its way to you. ❤️”
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
