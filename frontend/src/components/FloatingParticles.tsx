import React, { useMemo } from 'react';

export const FloatingParticles: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.2) % 96}%`,
      delay: `${(i * 0.7) % 8}s`,
      duration: `${10 + ((i * 1.5) % 12)}s`,
      size: `${14 + (i % 5) * 6}px`,
      char: ['✨', '💖', '🌸', '⭐', '🎈', '💕', '💫'][i % 7]
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Radiant ambient glow orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-glow/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-violet-mystic/20 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[450px] h-[450px] bg-gold-warm/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none opacity-40 animate-float-slow"
          style={{
            left: p.left,
            bottom: '-20px',
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
};
