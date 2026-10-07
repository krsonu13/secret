import { Request, Response } from 'express';
import { prisma } from '../config/db.js';

export const getReasons = async (_req: Request, res: Response) => {
  try {
    const reasons = await prisma.reason.findMany({
      orderBy: { displayOrder: 'asc' }
    });
    return res.json({ success: true, data: reasons });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch reasons' });
  }
};

export const createReason = async (req: Request, res: Response) => {
  try {
    const { title, description, icon, displayOrder } = req.body;
    const reason = await prisma.reason.create({
      data: {
        title,
        description,
        icon: icon || 'heart',
        displayOrder: displayOrder ? parseInt(displayOrder, 10) : 0
      }
    });
    return res.status(201).json({ success: true, data: reason, message: 'Reason created' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to create reason' });
  }
};

export const updateReason = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, icon, displayOrder } = req.body;
    const updated = await prisma.reason.update({
      where: { id },
      data: {
        title,
        description,
        icon,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) : undefined
      }
    });
    return res.json({ success: true, data: updated, message: 'Reason updated' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to update reason' });
  }
};

export const deleteReason = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.reason.delete({ where: { id } });
    return res.json({ success: true, message: 'Reason deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete reason' });
  }
};
