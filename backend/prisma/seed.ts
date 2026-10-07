import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding with customized records...');
  const exportFile = path.resolve(__dirname, 'database_export.json');

  if (fs.existsSync(exportFile)) {
    const data = JSON.parse(fs.readFileSync(exportFile, 'utf-8'));

    await prisma.wish.deleteMany();
    await prisma.reason.deleteMany();
    await prisma.timelineEvent.deleteMany();
    await prisma.memory.deleteMany();
    await prisma.birthday.deleteMany();
    await prisma.music.deleteMany();
    await prisma.user.deleteMany();

    if (data.users?.length) await prisma.user.createMany({ data: data.users });
    if (data.birthday?.length) await prisma.birthday.createMany({ data: data.birthday });
    if (data.memories?.length) await prisma.memory.createMany({ data: data.memories });
    if (data.timeline?.length) await prisma.timelineEvent.createMany({ data: data.timeline });
    if (data.reasons?.length) await prisma.reason.createMany({ data: data.reasons });
    if (data.wishes?.length) await prisma.wish.createMany({ data: data.wishes });
    if (data.music?.length) await prisma.music.createMany({ data: data.music });

    console.log('✅ Successfully seeded all customized memories, timeline, and wishes!');
  } else {
    console.log('⚠️ database_export.json not found, skipping custom import.');
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
