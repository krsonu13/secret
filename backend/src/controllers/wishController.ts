import { Request, Response } from 'express';
import { prisma } from '../config/db.js';

// Public: Get only approved wishes
export const getPublicWishes = async (_req: Request, res: Response) => {
  try {
    const wishes = await prisma.wish.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ success: true, data: wishes });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch wishes' });
  }
};

// Public: Submit a guest wish
export const submitWish = async (req: Request, res: Response) => {
  try {
    const { name, relationship, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ success: false, message: 'Name and message are required' });
    }

    const wish = await prisma.wish.create({
      data: {
        name: name.trim(),
        relationship: relationship ? relationship.trim() : 'Family / Friend',
        message: message.trim(),
        status: 'PENDING'
      }
    });

    return res.status(201).json({
      success: true,
      data: wish,
      message: 'Your birthday wish has been submitted for approval! ❤️'
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to submit wish' });
  }
};

// Admin: Get all wishes (Pending, Approved, Rejected)
export const getAdminWishes = async (_req: Request, res: Response) => {
  try {
    const wishes = await prisma.wish.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ success: true, data: wishes });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch admin wishes' });
  }
};

// Admin: Approve wish
export const approveWish = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await prisma.wish.update({
      where: { id },
      data: { status: 'APPROVED' }
    });
    return res.json({ success: true, data: updated, message: 'Wish approved successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to approve wish' });
  }
};

// Admin: Reject wish
export const rejectWish = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await prisma.wish.update({
      where: { id },
      data: { status: 'REJECTED' }
    });
    return res.json({ success: true, data: updated, message: 'Wish rejected' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to reject wish' });
  }
};

// Admin: Delete wish
export const deleteWish = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.wish.delete({ where: { id } });
    return res.json({ success: true, message: 'Wish deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete wish' });
  }
};
