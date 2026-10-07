import { Request, Response } from 'express';
import { prisma } from '../config/db.js';
import { storageService } from '../services/storageService.js';

export const getMusic = async (_req: Request, res: Response) => {
  try {
    let music = await prisma.music.findFirst();
    if (!music) {
      music = await prisma.music.create({
        data: {
          title: 'Happy Birthday Soft Music Box',
          url: '',
          enabled: true
        }
      });
    }
    return res.json({ success: true, data: music });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch music' });
  }
};

export const updateMusic = async (req: Request, res: Response) => {
  try {
    const { title, enabled, url } = req.body;
    let musicUrl = url;

    if (req.file) {
      musicUrl = await storageService.saveFile(req.file, 'music');
    }

    let music = await prisma.music.findFirst();
    if (!music) {
      music = await prisma.music.create({
        data: {
          title: title || 'A Gentle Melody For You',
          url: musicUrl || '',
          enabled: enabled !== undefined ? enabled === 'true' || enabled === true : true
        }
      });
    } else {
      music = await prisma.music.update({
        where: { id: music.id },
        data: {
          title: title !== undefined ? title : music.title,
          url: musicUrl !== undefined ? musicUrl : music.url,
          enabled: enabled !== undefined ? enabled === 'true' || enabled === true : music.enabled
        }
      });
    }

    return res.json({ success: true, data: music, message: 'Music configuration updated' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to update music' });
  }
};
