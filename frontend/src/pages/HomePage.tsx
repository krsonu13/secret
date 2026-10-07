import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { BirthdayInfo, Memory, TimelineEvent, Reason, Wish, MusicConfig } from '../types';
import {
  defaultBirthday, defaultMemories, defaultTimeline,
  defaultReasons, defaultWishes, defaultMusic
} from '../data/defaultData';
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
  const [birthday, setBirthday] = useState<BirthdayInfo>(defaultBirthday);
  const [memories, setMemories] = useState<Memory[]>(defaultMemories);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(defaultTimeline);
  const [reasons, setReasons] = useState<Reason[]>(defaultReasons);
  const [wishes, setWishes] = useState<Wish[]>(defaultWishes);
  const [music, setMusic] = useState<MusicConfig | null>(defaultMusic);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const [bData, mData, tData, rData, wData, muData] = await Promise.all([
        api.getBirthday().catch(() => null),
        api.getMemories().catch(() => null),
        api.getTimeline().catch(() => null),
        api.getReasons().catch(() => null),
        api.getWishes().catch(() => null),
        api.getMusic().catch(() => null)
      ]);

      if (bData) setBirthday(bData);
      if (mData && mData.length > 0) setMemories(mData);
      if (tData && tData.length > 0) setTimeline(tData);
      if (rData && rData.length > 0) setReasons(rData);
      if (wData && wData.length > 0) setWishes(wData);
      if (muData) setMusic(muData);
    } catch (e) {
      // Gracefully uses defaultData so it works 100% on GitHub Pages without backend
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
