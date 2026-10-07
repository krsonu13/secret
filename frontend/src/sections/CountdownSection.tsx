import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { triggerFireworks } from '../utils/confetti';
import { Sparkles, Calendar } from 'lucide-react';

interface Props {
  birthdayDateString: string;
  sisterName: string;
}

export const CountdownSection: React.FC<Props> = ({ birthdayDateString, sisterName }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isToday: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const target = new Date(birthdayDateString);

      // Create birthday for current year or next year
      let birthdayThisYear = new Date(now.getFullYear(), target.getMonth(), target.getDate());
      if (birthdayThisYear.getTime() < now.getTime() && now.getDate() !== target.getDate()) {
        birthdayThisYear = new Date(now.getFullYear() + 1, target.getMonth(), target.getDate());
      }

      const diff = birthdayThisYear.getTime() - now.getTime();
      const isSameDay = now.getDate() === target.getDate() && now.getMonth() === target.getMonth();

      if (isSameDay || diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
        triggerFireworks();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isToday: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [birthdayDateString]);

  return (
    <section id="countdown" className="py-20 px-4 relative flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full text-center">
        <span className="inline-flex items-center gap-2 text-gold-warm text-xs font-semibold tracking-widest uppercase mb-3">
          <Calendar size={14} />
          {timeLeft.isToday ? 'The Moment Has Arrived' : 'Counting Down To Your Special Day'}
        </span>

        {timeLeft.isToday ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-rose-glow/30 via-violet-mystic/30 to-midnight-800 border border-rose-glow/50 shadow-2xl backdrop-blur-xl"
          >
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-4">
              IT’S YOUR DAY! 🎉❤️
            </h2>
            <p className="text-xl sm:text-2xl text-gold-warm font-handwriting">
              The universe is celebrating you today, {sisterName}! Let the magic begin! ✨
            </p>
          </motion.div>
        ) : (
          <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-8">
              Counting down to your special day…
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Minutes', val: timeLeft.minutes },
                { label: 'Seconds', val: timeLeft.seconds }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg"
                >
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-rose-soft">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-white/60 mt-1 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
