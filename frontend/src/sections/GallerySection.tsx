import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Maximize2 } from 'lucide-react';
import { Memory } from '../types';
import { LightboxModal } from '../components/LightboxModal';

interface Props {
  memories: Memory[];
}

export const GallerySection: React.FC<Props> = ({ memories }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedIdx !== null && memories.length > 0) {
      setSelectedIdx((selectedIdx + 1) % memories.length);
    }
  };

  const handlePrev = () => {
    if (selectedIdx !== null && memories.length > 0) {
      setSelectedIdx((selectedIdx - 1 + memories.length) % memories.length);
    }
  };

  return (
    <section id="memories" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 text-rose-soft text-xs font-semibold tracking-widest uppercase mb-2">
          <Camera size={14} />
          Our Little Memory Lane
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Snapshots of Our Journey 📸
        </h2>
        <p className="mt-3 text-white/60 font-sans max-w-lg mx-auto text-sm sm:text-base">
          Every picture holds a secret laugh, an unforgettable story, and a bond that only siblings can share.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {memories.map((mem, idx) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => setSelectedIdx(idx)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-rose-glow/50"
          >
            <div className="aspect-[4/5] overflow-hidden relative">
              <img
                src={mem.imageUrl}
                alt={mem.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/90 via-midnight-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity text-white">
                <Maximize2 size={16} />
              </div>

              <div className="absolute bottom-0 left-0 p-6 w-full">
                <span className="text-xs uppercase font-semibold text-gold-warm tracking-wider">
                  {mem.memoryDate || 'Sibling Days'}
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">
                  {mem.title}
                </h3>
                <p className="font-handwriting text-rose-soft text-xl mt-1 line-clamp-1">
                  "{mem.caption}"
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <LightboxModal
        memory={selectedIdx !== null ? memories[selectedIdx] : null}
        onClose={() => setSelectedIdx(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
