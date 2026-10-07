import { Request, Response } from 'express';
import { prisma } from '../config/db.js';
import { storageService } from '../services/storageService.js';

export const getMemories = async (_req: Request, res: Response) => {
  try {
    const memories = await prisma.memory.findMany({
      orderBy: { displayOrder: 'asc' }
    });
    return res.json({ success: true, data: memories });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch memories' });
  }
};

export const createMemory = async (req: Request, res: Response) => {
  try {
    const { title, caption, description, memoryDate, displayOrder } = req.body;
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      imageUrl = await storageService.saveFile(req.file, 'memories');
    }

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Image is required for a memory' });
    }

    const memory = await prisma.memory.create({
      data: {
        title: title || 'Precious Sister Memory',
        caption: caption || '',
        description: description || '',
        imageUrl,
        memoryDate: memoryDate || '',
        displayOrder: displayOrder ? parseInt(displayOrder, 10) : 0
      }
    });

    return res.status(201).json({ success: true, data: memory, message: 'Memory created successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to create memory' });
  }
};

export const updateMemory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, caption, description, memoryDate, displayOrder } = req.body;
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      imageUrl = await storageService.saveFile(req.file, 'memories');
    }

    const existing = await prisma.memory.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Memory not found' });
    }

    const updated = await prisma.memory.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        caption: caption ?? existing.caption,
        description: description ?? existing.description,
        imageUrl: imageUrl ?? existing.imageUrl,
        memoryDate: memoryDate ?? existing.memoryDate,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) : existing.displayOrder
      }
    });

    return res.json({ success: true, data: updated, message: 'Memory updated successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to update memory' });
  }
};

export const deleteMemory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await prisma.memory.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Memory not found' });
    }

    if (existing.imageUrl) {
      await storageService.deleteFile(existing.imageUrl);
    }

    await prisma.memory.delete({ where: { id } });
    return res.json({ success: true, message: 'Memory deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete memory' });
  }
};
