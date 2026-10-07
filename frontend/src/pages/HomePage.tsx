import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { BirthdayInfo, Memory, TimelineEvent, Reason, Wish, MusicConfig } from '../types';
import { FloatingParticles } from '../components/FloatingParticles';
import { HeartCursorTrail } from '../components/HeartCursorTrail';
import { ScrollProgress } from '../components/ScrollProgress';
import { MusicPlayer } from '../components/MusicPlayer';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../sections/HeroSection';
import { CountdownSection } from '../sections/CountdownSection';
import { PersonalMessageSection } from '../sections/PersonalMessageSection';
import { GallerySection } from '../sections/GallerySection';
import { TimelineSection } from '../sections/TimelineSection';
import { ReasonsSection } from '../sections/ReasonsSection';
import { SurpriseGiftSection } from '../sections/SurpriseGiftSection';
import { CakeWishSection } from '../sections/CakeWishSection';
import { WishesSection } from '../sections/WishesSection';
import { FinalMessageSection } from '../sections/FinalMessageSection';

export const HomePage: React.FC = () => {
  const [birthday, setBirthday] = useState<BirthdayInfo | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [music, setMusic] = useState<MusicConfig | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [bData, mData, tData, rData, wData, muData] = await Promise.all([
        api.getBirthday().catch(() => null),
        api.getMemories().catch(() => []),
        api.getTimeline().catch(() => []),
        api.getReasons().catch(() => []),
        api.getWishes().catch(() => []),
        api.getMusic().catch(() => null)
      ]);

      if (bData) setBirthday(bData);
      setMemories(mData || []);
      setTimeline(tData || []);
      setReasons(rData || []);
      setWishes(wData || []);
      setMusic(muData || null);
    } catch (e) {
      console.error('Failed to load page data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-900 flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 rounded-full border-4 border-rose-glow/30 border-t-rose-glow animate-spin mb-4" />
        <span className="font-serif text-xl tracking-wide text-gold-warm">
          Preparing Vaishnavi's Birthday Magic... ✨
        </span>
      </div>
    );
  }

  const sisterName = birthday?.sisterName || 'Vaishnavi';

  return (
    <div className="relative min-h-screen bg-midnight-900 text-white selection:bg-rose-glow selection:text-white">
      <FloatingParticles />
      <HeartCursorTrail />
      <ScrollProgress />
      <Navbar sisterName={sisterName} />

      <HeroSection
        sisterName={sisterName}
        heroTitle={birthday?.heroTitle || 'Happy Birthday, My Dear Sister'}
        heroSubtitle={birthday?.heroSubtitle || "Today isn't just another day… it's the day someone very special came into this world."}
      />

      <CountdownSection
        birthdayDateString={birthday?.birthdayDate || '2026-10-07'}
        sisterName={sisterName}
      />

      <PersonalMessageSection
        mainMessage={birthday?.mainMessage || `Having a sister like you is one of the most beautiful gifts life has given me.\n\nHappy Birthday! ❤️`}
      />

      {memories.length > 0 && <GallerySection memories={memories} />}

      {timeline.length > 0 && <TimelineSection events={timeline} />}

      {reasons.length > 0 && <ReasonsSection reasons={reasons} />}

      <SurpriseGiftSection />

      <CakeWishSection />

      <WishesSection wishes={wishes} onWishSubmitted={fetchData} />

      <FinalMessageSection
        sisterName={sisterName}
        finalMessage={birthday?.finalMessage || 'Keep smiling. Keep shining. With lots of love ❤️'}
      />

      <MusicPlayer musicConfig={music} />
    </div>
  );
};
