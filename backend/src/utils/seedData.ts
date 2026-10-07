import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/db.js';

export async function autoSeedIfEmpty() {
  try {
    const count = await prisma.birthday.count();
    if (count > 0) {
      console.log('✅ Database already initialized with customized data.');
      return;
    }

    console.log('🌱 Empty database detected on startup. Initializing customized data...');

    // Try reading from database_export.json
    const exportFile = path.resolve(process.cwd(), 'prisma/database_export.json');
    if (fs.existsSync(exportFile)) {
      const data = JSON.parse(fs.readFileSync(exportFile, 'utf-8'));
      if (data.users?.length) await prisma.user.createMany({ data: data.users });
      if (data.birthday?.length) await prisma.birthday.createMany({ data: data.birthday });
      if (data.memories?.length) await prisma.memory.createMany({ data: data.memories });
      if (data.timeline?.length) await prisma.timelineEvent.createMany({ data: data.timeline });
      if (data.reasons?.length) await prisma.reason.createMany({ data: data.reasons });
      if (data.wishes?.length) await prisma.wish.createMany({ data: data.wishes });
      if (data.music?.length) await prisma.music.createMany({ data: data.music });
      console.log('✅ Restored all customized data from database_export.json!');
      return;
    }

    // Fallback default
    const passwordHash = await bcrypt.hash('SisterSurprise2026!', 10);
    await prisma.user.upsert({
      where: { email: 'admin@birthday.com' },
      update: { passwordHash },
      create: { email: 'admin@birthday.com', passwordHash, role: 'ADMIN' }
    });
  } catch (error) {
    console.error('⚠️ Auto-seed check error:', error);
  }
}
