import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music as MusicIcon } from 'lucide-react';
import { soundSynth } from '../utils/soundSynth';
import { MusicConfig } from '../types';

interface Props {
  musicConfig?: MusicConfig | null;
}

export const MusicPlayer: React.FC<Props> = ({ musicConfig }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    // If a custom audio file is uploaded
    if (musicConfig?.url && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
          // fallback to synth
          const synthState = soundSynth.toggleMelody();
          setIsPlaying(synthState);
        });
      }
    } else {
      // fallback to audio synth
      const synthState = soundSynth.toggleMelody();
      setIsPlaying(synthState);
    }
  };

  useEffect(() => {
    return () => {
      soundSynth.stopMelody();
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {musicConfig?.url && (
        <audio ref={audioRef} src={musicConfig.url} loop preload="auto" />
      )}
      <button
        onClick={toggleMusic}
        className={`flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-xl ${
          isPlaying
            ? 'bg-rose-glow/30 border-rose-glow text-white shadow-rose-glow/30'
            : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
        }`}
        title={isPlaying ? 'Pause Birthday Melody' : 'Play Birthday Melody'}
      >
        <span className="p-1 rounded-full bg-rose-glow text-white">
          {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </span>
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          {musicConfig?.title || 'Birthday Melody'}
        </span>
        {isPlaying && (
          <div className="flex items-end gap-1 h-3">
            <span className="w-1 bg-gold-warm rounded-full animate-bounce h-2" />
            <span className="w-1 bg-rose-soft rounded-full animate-bounce h-3" style={{ animationDelay: '0.15s' }} />
            <span className="w-1 bg-gold-warm rounded-full animate-bounce h-1.5" style={{ animationDelay: '0.3s' }} />
          </div>
        )}
      </button>
    </div>
  );
};
