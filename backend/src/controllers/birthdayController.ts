import { Request, Response } from 'express';
import { prisma } from '../config/db.js';

export const getBirthdayInfo = async (_req: Request, res: Response) => {
  try {
    let birthday = await prisma.birthday.findFirst();
    if (!birthday) {
      birthday = await prisma.birthday.create({
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
    }

    return res.json({ success: true, data: birthday });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch birthday details' });
  }
};

export const updateBirthdayInfo = async (req: Request, res: Response) => {
  try {
    const { sisterName, birthdayDate, heroTitle, heroSubtitle, mainMessage, finalMessage } = req.body;
    let birthday = await prisma.birthday.findFirst();

    if (!birthday) {
      birthday = await prisma.birthday.create({
        data: {
          sisterName: sisterName || 'Vaishnavi',
          birthdayDate: birthdayDate ? new Date(birthdayDate) : new Date(),
          heroTitle: heroTitle || 'Happy Birthday, My Dear Sister',
          heroSubtitle: heroSubtitle || 'Today is your day!',
          mainMessage: mainMessage || 'Happy Birthday!',
          finalMessage: finalMessage || 'With lots of love!'
        }
      });
    } else {
      birthday = await prisma.birthday.update({
        where: { id: birthday.id },
        data: {
          sisterName: sisterName ?? birthday.sisterName,
          birthdayDate: birthdayDate ? new Date(birthdayDate) : birthday.birthdayDate,
          heroTitle: heroTitle ?? birthday.heroTitle,
          heroSubtitle: heroSubtitle ?? birthday.heroSubtitle,
          mainMessage: mainMessage ?? birthday.mainMessage,
          finalMessage: finalMessage ?? birthday.finalMessage
        }
      });
    }

    return res.json({ success: true, data: birthday, message: 'Birthday information updated' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Update failed' });
  }
};
