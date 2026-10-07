import { Request, Response } from 'express';
import { prisma } from '../config/db.js';
import { storageService } from '../services/storageService.js';

export const getTimeline = async (_req: Request, res: Response) => {
  try {
    const events = await prisma.timelineEvent.findMany({
      orderBy: { displayOrder: 'asc' }
    });
    return res.json({ success: true, data: events });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch timeline' });
  }
};

export const createTimelineEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, eventDate, displayOrder } = req.body;
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      imageUrl = await storageService.saveFile(req.file, 'memories');
    }

    const event = await prisma.timelineEvent.create({
      data: {
        title,
        description,
        eventDate: eventDate || '',
        imageUrl: imageUrl || null,
        displayOrder: displayOrder ? parseInt(displayOrder, 10) : 0
      }
    });

    return res.status(201).json({ success: true, data: event, message: 'Timeline event created' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to create timeline event' });
  }
};

export const updateTimelineEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, eventDate, displayOrder } = req.body;
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      imageUrl = await storageService.saveFile(req.file, 'memories');
    }

    const existing = await prisma.timelineEvent.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const updated = await prisma.timelineEvent.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        description: description ?? existing.description,
        eventDate: eventDate ?? existing.eventDate,
        imageUrl: imageUrl ?? existing.imageUrl,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) : existing.displayOrder
      }
    });

    return res.json({ success: true, data: updated, message: 'Timeline event updated' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to update timeline event' });
  }
};

export const deleteTimelineEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.timelineEvent.delete({ where: { id } });
    return res.json({ success: true, message: 'Timeline event deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete timeline event' });
  }
};
