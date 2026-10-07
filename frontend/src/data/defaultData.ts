import { BirthdayInfo, Memory, TimelineEvent, Reason, Wish, MusicConfig } from '../types';

export const defaultBirthday: BirthdayInfo = {
  id: 'default-birthday',
  sisterName: 'Vaishnavi',
  birthdayDate: '2026-10-07T00:00:00.000Z',
  heroTitle: 'Happy Birthday, My Dear Sister',
  heroSubtitle: 'Today isn’t just another day… it’s the day someone very special came into this world.',
  mainMessage: `Having a sister like you is one of the most beautiful gifts life has given me. We’ve shared laughter, arguments, secrets, memories, and countless moments that I will always treasure.

No matter how much we grow, you’ll always be my little sister and someone I will always protect and care about.

On your birthday, I just want you to know how incredibly special you are to me.

Happy Birthday, Vaishnavi! ❤️`,
  finalMessage: `No matter how old we get, you’ll always be my sister, my family, and one of the most special people in my life.

Keep smiling. Keep shining. Keep being the amazing person you are. ✨

With all my love and blessings,
Your Bhaiya Sonu ❤️`,
  createdAt: '2026-10-07T00:00:00.000Z',
  updatedAt: '2026-10-07T00:00:00.000Z'
};

export const defaultMemories: Memory[] = [
  {
    id: 'mem-1',
    title: 'Memories',
    caption: 'Lovely girl',
    description: '😘',
    imageUrl: './uploads/memories/1791370420125-333977322.jpeg',
    memoryDate: 'Exam day',
    displayOrder: 1,
    createdAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'mem-2',
    title: 'My Little Star ✨',
    caption: '“You may grow older, but you’ll always have a special place in my heart.”',
    description: 'Through every chapter of life, I’ll be there cheering for you, protecting you, and believing in you. ❤️',
    imageUrl: './uploads/memories/1791370622227-722866719.jpeg',
    memoryDate: 'Forever Special',
    displayOrder: 2,
    createdAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'mem-3',
    title: 'Forever My Little Sister',
    caption: '“No matter how much you grow, you’ll always be the little girl my heart wants to protect. ❤️”',
    description: 'Some bonds grow stronger with time, and ours is one I’ll treasure forever.',
    imageUrl: './uploads/memories/1791370666867-837923435.jpeg',
    memoryDate: 'Always In My Corner',
    displayOrder: 3,
    createdAt: '2026-10-07T00:00:00.000Z'
  }
];

export const defaultTimeline: TimelineEvent[] = [
  {
    id: 'time-1',
    title: 'Chapter 1: The Beginning',
    description: 'The day my life get a little anoying gift from RadhaRani, a lot more special, and infinitely brighter with your arrival.',
    eventDate: 'The Start',
    displayOrder: 1
  },
  {
    id: 'time-2',
    title: 'Chapter 2: The Unexpected Beginning',
    description: 'I met you in college as my junior, never knowing that this simple introduction would turn into something so special. Somewhere between college conversations, random talks, teasing, and shared moments, you slowly became more than just a junior — you became my best sister. ❤️',
    eventDate: 'College Days',
    displayOrder: 2
  },
  {
    id: 'time-3',
    title: 'Chapter 3: From Junior to Sister 🫶',
    description: 'What started as a college connection became a bond I never expected. From silly conversations and endless laughter to sharing problems, giving advice, and supporting each other, we created countless memories. You may have entered my life as a junior, but you earned a permanent place in my heart as my little sister.',
    eventDate: 'Growing Together',
    displayOrder: 3
  },
  {
    id: 'time-4',
    title: 'Chapter 4: Today & Always ❤️',
    description: 'And here we are, celebrating you and the beautiful person you’ve become! Life may take us in different directions after college, but one thing will never change — you’ll always be my little sister and one of the most special people I’ve met. May your future be filled with happiness, success, peace, and everything you dream of. I’ll always be in your corner. ❤️',
    eventDate: 'Today & The Future',
    displayOrder: 4
  }
];

export const defaultReasons: Reason[] = [
  {
    id: 'reason-1',
    title: 'Your Radiant Smile 🌸',
    description: 'Because your genuine laughter can instantly turn any bad day into a warm and happy one.',
    icon: 'smile',
    displayOrder: 1
  },
  {
    id: 'reason-2',
    title: 'Your Crazy & Fun Side 😂',
    description: 'Life and our house would be unimaginably quiet and boring without your crazy dramatics and energy.',
    icon: 'zap',
    displayOrder: 2
  },
  {
    id: 'reason-3',
    title: 'Your Kind Heart ❤️',
    description: 'Even when you pretend to be tough, you care deeply and selflessly for everyone in our family.',
    icon: 'heart',
    displayOrder: 3
  },
  {
    id: 'reason-4',
    title: 'Your Strength & Courage ✨',
    description: 'You keep your chin up and keep smiling even when life gets challenging. I admire your determination.',
    icon: 'shield',
    displayOrder: 4
  },
  {
    id: 'reason-5',
    title: 'You Being My Sister 🏠',
    description: 'Some bonds need no explanations. You are my family, my friend, and my sister forever.',
    icon: 'home',
    displayOrder: 5
  }
];

export const defaultWishes: Wish[] = [
  {
    id: 'wish-1',
    name: 'Mummy & Papa',
    relationship: 'Parents',
    message: 'Happy Birthday, our dearest princess! May god shower you with health, success, and pure joy. Always stay blessed! ❤️',
    status: 'APPROVED',
    createdAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'wish-2',
    name: 'Sonu (Bhaiya)',
    relationship: 'Elder Brother',
    message: 'Happy Birthday, little one! Keep shining bright, eat all the cake today, and know your brother will always protect you! 🎉',
    status: 'APPROVED',
    createdAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'wish-3',
    name: 'Dadi & Dada',
    relationship: 'Grandparents',
    message: 'May God bless our sweetest granddaughter with boundless happiness and a long, successful life. Lots of blessings and pyaar! 🌸',
    status: 'APPROVED',
    createdAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'wish-4',
    name: 'Bestie Priya',
    relationship: 'Best Friend',
    message: 'Happy Birthday to my partner in crime! Can’t wait for our birthday treat! Have the best day ever! 🥳',
    status: 'APPROVED',
    createdAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'wish-5',
    name: 'Chachu & Chachi',
    relationship: 'Family',
    message: 'Wishing our dearest Vaishnavi a very Happy Birthday! Have an amazing year ahead full of achievements!',
    status: 'APPROVED',
    createdAt: '2026-10-07T00:00:00.000Z'
  }
];

export const defaultMusic: MusicConfig = {
  id: 'music-1',
  title: 'Happy Birthday Soft Music Box',
  enabled: true
};
