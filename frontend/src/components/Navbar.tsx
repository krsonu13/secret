import React, { useState } from 'react';
import { Heart, Sparkles, Lock } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

interface Props {
  sisterName: string;
}

export const Navbar: React.FC<Props> = ({ sisterName }) => {
  const [clickCount, setClickCount] = useState(0);
  const [secretShown, setSecretShown] = useState(false);

  const handleHeartClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    triggerConfetti();

    if (next >= 5 && !secretShown) {
      setSecretShown(true);
      alert("P.S. You’re stuck with me forever as your brother. 😂❤️");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-midnight-900/60 border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={handleHeartClick}>
        <Heart className="text-rose-glow fill-rose-glow animate-pulse" size={22} />
        <span className="font-serif font-bold tracking-wide text-white text-base sm:text-lg">
          For {sisterName}
        </span>
        <Sparkles className="text-gold-warm" size={16} />
      </div>

      <div className="flex items-center gap-4 text-sm font-medium">
        <a href="#memories" className="text-white/70 hover:text-white transition-colors hidden sm:inline">
          Memories
        </a>
        <a href="#timeline" className="text-white/70 hover:text-white transition-colors hidden sm:inline">
          Our Story
        </a>
        <a href="#reasons" className="text-white/70 hover:text-white transition-colors hidden sm:inline">
          Why You're Special
        </a>
        <a href="#wishes" className="text-white/70 hover:text-white transition-colors hidden sm:inline">
          Wishes
        </a>
        <a
          href="/admin/login"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white text-xs transition-all"
          title="Admin Panel"
        >
          <Lock size={12} />
          <span>Admin</span>
        </a>
      </div>
    </nav>
  );
};
