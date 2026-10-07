import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import { TimelineEvent } from '../types';

interface Props {
  events: TimelineEvent[];
}

export const TimelineSection: React.FC<Props> = ({ events }) => {
  return (
    <section id="timeline" className="py-24 px-4 max-w-4xl mx-auto relative">
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 text-gold-warm text-xs font-semibold tracking-widest uppercase mb-2">
          <Clock size={14} />
          Milestones &amp; Moments
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Our Story So Far… ✨
        </h2>
        <p className="mt-3 text-white/60 font-sans max-w-md mx-auto text-sm sm:text-base">
          From tiny toddler steps to conquering the world side by side.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-10 border-l-2 border-rose-glow/30 space-y-12 ml-4 sm:ml-8">
        {events.map((ev, idx) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative"
          >
            {/* Timeline glowing dot */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-rose-glow border-4 border-midnight-900 shadow-lg shadow-rose-glow/50 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl hover:border-rose-soft/40 transition-all duration-300">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-warm">
                {ev.eventDate}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                {ev.title}
              </h3>
              <p className="mt-3 text-white/80 font-sans leading-relaxed text-sm sm:text-base font-light">
                {ev.description}
              </p>
              {ev.imageUrl && (
                <img
                  src={ev.imageUrl}
                  alt={ev.title}
                  className="mt-4 rounded-2xl max-h-56 w-auto object-cover border border-white/10"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
