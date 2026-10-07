import { Router } from 'express';
import { login, logout, getMe } from '../controllers/authController.js';
import { getBirthdayInfo, updateBirthdayInfo } from '../controllers/birthdayController.js';
import { getMemories, createMemory, updateMemory, deleteMemory } from '../controllers/memoryController.js';
import { getTimeline, createTimelineEvent, updateTimelineEvent, deleteTimelineEvent } from '../controllers/timelineController.js';
import { getReasons, createReason, updateReason, deleteReason } from '../controllers/reasonController.js';
import { getPublicWishes, submitWish, getAdminWishes, approveWish, rejectWish, deleteWish } from '../controllers/wishController.js';
import { getMusic, updateMusic } from '../controllers/musicController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { uploadImage, uploadAudio } from '../middleware/upload.js';
import { wishSubmissionLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// --- PUBLIC ROUTES ---
router.get('/birthday', getBirthdayInfo);
router.get('/memories', getMemories);
router.get('/timeline', getTimeline);
router.get('/reasons', getReasons);
router.get('/wishes', getPublicWishes);
router.post('/wishes', wishSubmissionLimiter, submitWish);
router.get('/music', getMusic);

// --- AUTH ROUTES ---
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.get('/auth/me', authenticateAdmin, getMe);

// --- PROTECTED ADMIN ROUTES ---
router.put('/admin/birthday', authenticateAdmin, updateBirthdayInfo);

router.post('/admin/memories', authenticateAdmin, uploadImage.single('image'), createMemory);
router.put('/admin/memories/:id', authenticateAdmin, uploadImage.single('image'), updateMemory);
router.delete('/admin/memories/:id', authenticateAdmin, deleteMemory);

router.post('/admin/timeline', authenticateAdmin, uploadImage.single('image'), createTimelineEvent);
router.put('/admin/timeline/:id', authenticateAdmin, uploadImage.single('image'), updateTimelineEvent);
router.delete('/admin/timeline/:id', authenticateAdmin, deleteTimelineEvent);

router.post('/admin/reasons', authenticateAdmin, createReason);
router.put('/admin/reasons/:id', authenticateAdmin, updateReason);
router.delete('/admin/reasons/:id', authenticateAdmin, deleteReason);

router.get('/admin/wishes', authenticateAdmin, getAdminWishes);
router.patch('/admin/wishes/:id/approve', authenticateAdmin, approveWish);
router.patch('/admin/wishes/:id/reject', authenticateAdmin, rejectWish);
router.delete('/admin/wishes/:id', authenticateAdmin, deleteWish);

router.put('/admin/music', authenticateAdmin, uploadAudio.single('musicFile'), updateMusic);

export default router;
