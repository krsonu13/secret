import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Admin User
  const passwordHash = await bcrypt.hash('SisterSurprise2026!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@birthday.com' },
    update: { passwordHash },
    create: {
      email: 'admin@birthday.com',
      passwordHash,
      role: 'ADMIN'
    }
  });
  console.log(`👤 Admin created: ${admin.email}`);

  // 2. Birthday Profile
  await prisma.birthday.deleteMany();
  const birthday = await prisma.birthday.create({
    data: {
      sisterName: 'Vaishnavi',
      birthdayDate: new Date('2026-10-07T00:00:00.000Z'),
      heroTitle: 'Happy Birthday, My Dear Sister',
      heroSubtitle: 'Today isn’t just another day… it’s the day someone very special came into this world.',
      mainMessage: `Having a sister like you is one of the most beautiful gifts life has given me. We’ve shared laughter, arguments, secrets, memories, and countless moments that I will always treasure.

No matter how much we grow, you’ll always be my little sister and someone I will always protect and care about.

On your birthday, I just want you to know how incredibly special you are to me.

Happy Birthday, Vaishnavi! ❤️`,
      finalMessage: `No matter how old we get, you’ll always be my sister, my family, and one of the most special people in my life.

Keep smiling. Keep shining. Keep being the amazing person you are. ✨

With all my love and blessings,
Your Bhaiya (Sonu) ❤️`
    }
  });
  console.log(`🎂 Birthday profile created for: ${birthday.sisterName}`);

  // 3. Memories (5 items)
  await prisma.memory.deleteMany();
  await prisma.memory.createMany({
    data: [
      {
        title: 'Where All The Chaos Began',
        caption: 'Those innocent eyes before starting our first fight! 😂',
        description: 'No matter how much we fought over tiny things, you were always the cutest little companion.',
        imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
        memoryDate: 'Childhood Days',
        displayOrder: 1
      },
      {
        title: 'Snack Partner In Crime',
        caption: 'The secret midnight maggi & ice cream raids 🍕',
        description: 'Every secret midnight treat tasted 100x better because we shared it together.',
        imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
        memoryDate: 'Unforgettable Days',
        displayOrder: 2
      },
      {
        title: 'That Unstoppable Laughter',
        caption: 'Laughing until our stomachs hurt at silly inside jokes ✨',
        description: 'Only siblings can understand jokes that make zero sense to the rest of the world.',
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
        memoryDate: 'Golden Memories',
        displayOrder: 3
      },
      {
        title: 'Conquering New Heights',
        caption: 'Watching you achieve your milestones makes me so proud 🌟',
        description: 'Seeing you grow into such a confident, brilliant young woman is an absolute joy.',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        memoryDate: 'School & College Days',
        displayOrder: 4
      },
      {
        title: 'Forever My Little Sister',
        caption: 'Always my princess, no matter how tall you grow ❤️',
        description: 'Time flies, but my promise to always stand by your side remains timeless.',
        imageUrl: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=800&q=80',
        memoryDate: 'Forever & Always',
        displayOrder: 5
      }
    ]
  });
  console.log('📸 5 Memories created');

  // 4. Timeline Events (4 chapters)
  await prisma.timelineEvent.deleteMany();
  await prisma.timelineEvent.createMany({
    data: [
      {
        title: 'Chapter 1: The Beginning 👶',
        description: 'The day our family became a little louder, a lot more special, and infinitely brighter with your arrival.',
        eventDate: 'The Start',
        displayOrder: 1
      },
      {
        title: 'Chapter 2: Childhood Chaos 😂',
        description: 'Non-stop fights over TV remotes, claiming "this is my room", stealing snacks, and running to Mom before getting caught.',
        eventDate: 'Childhood Years',
        displayOrder: 2
      },
      {
        title: 'Chapter 3: Growing Up Together 🎓',
        description: 'Somehow we grew up without realizing how quickly time passed. Late-night career talks, study stress, and sharing real advice.',
        eventDate: 'Growing Up',
        displayOrder: 3
      },
      {
        title: 'Chapter 4: Today & The Future ❤️',
        description: 'And here we are celebrating you! May your upcoming journey be full of triumph, joy, and peace. I am always in your corner.',
        eventDate: 'Today',
        displayOrder: 4
      }
    ]
  });
  console.log('⏳ 4 Timeline events created');

  // 5. Reasons Why She Is Special (5 items)
  await prisma.reason.deleteMany();
  await prisma.reason.createMany({
    data: [
      {
        title: 'Your Radiant Smile 🌸',
        description: 'Because your genuine laughter can instantly turn any bad day into a warm and happy one.',
        icon: 'smile',
        displayOrder: 1
      },
      {
        title: 'Your Crazy & Fun Side 😂',
        description: 'Life and our house would be unimaginably quiet and boring without your crazy dramatics and energy.',
        icon: 'zap',
        displayOrder: 2
      },
      {
        title: 'Your Kind Heart ❤️',
        description: 'Even when you pretend to be tough, you care deeply and selflessly for everyone in our family.',
        icon: 'heart',
        displayOrder: 3
      },
      {
        title: 'Your Strength & Courage ✨',
        description: 'You keep your chin up and keep smiling even when life gets challenging. I admire your determination.',
        icon: 'shield',
        displayOrder: 4
      },
      {
        title: 'You Being My Sister 🏠',
        description: 'Some bonds need no explanations. You are my family, my friend, and my sister forever.',
        icon: 'home',
        displayOrder: 5
      }
    ]
  });
  console.log('💖 5 Reasons created');

  // 6. Wishes (3 approved, 2 pending)
  await prisma.wish.deleteMany();
  await prisma.wish.createMany({
    data: [
      {
        name: 'Mummy & Papa',
        relationship: 'Parents',
        message: 'Happy Birthday, our dearest princess! May god shower you with health, success, and pure joy. Always stay blessed! ❤️',
        status: 'APPROVED'
      },
      {
        name: 'Sonu (Bhaiya)',
        relationship: 'Elder Brother',
        message: 'Happy Birthday, little one! Keep shining bright, eat all the cake today, and know your brother will always protect you! 🎉',
        status: 'APPROVED'
      },
      {
        name: 'Dadi & Dada',
        relationship: 'Grandparents',
        message: 'May God bless our sweetest granddaughter with boundless happiness and a long, successful life. Lots of blessings and pyaar! 🌸',
        status: 'APPROVED'
      },
      {
        name: 'Chachu & Chachi',
        relationship: 'Family',
        message: 'Wishing our dearest Vaishnavi a very Happy Birthday! Have an amazing year ahead full of achievements!',
        status: 'PENDING'
      },
      {
        name: 'Bestie Priya',
        relationship: 'Best Friend',
        message: 'Happy Birthday to my partner in crime! Can’t wait for our birthday treat! Have the best day ever! 🥳',
        status: 'PENDING'
      }
    ]
  });
  console.log('💌 Wishes created (3 approved, 2 pending)');

  // 7. Music Config
  await prisma.music.deleteMany();
  await prisma.music.create({
    data: {
      title: 'Happy Birthday Music Box',
      url: '',
      enabled: true
    }
  });
  console.log('🎵 Music config created');

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
