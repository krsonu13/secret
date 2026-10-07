import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Memory } from '../types';

interface Props {
  memory: Memory | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<Props> = ({ memory, onClose, onNext, onPrev }) => {
  if (!memory) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
      >
        <X size={24} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
      >
        <ChevronRight size={28} />
      </button>

      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={memory.imageUrl}
          alt={memory.title}
          className="max-h-[65vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
        />
        <div className="mt-5 text-center max-w-xl">
          <span className="text-xs uppercase tracking-widest text-gold-warm font-semibold">
            {memory.memoryDate || 'Cherished Sister Memory'}
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
            {memory.title}
          </h3>
          <p className="text-rose-soft font-handwriting text-xl mt-1">
            "{memory.caption}"
          </p>
          {memory.description && (
            <p className="text-sm text-white/70 mt-2 font-sans leading-relaxed">
              {memory.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
