import rateLimit from 'express-rate-limit';

export const wishSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 wishes per IP per 15 min
  message: {
    success: false,
    message: 'Too many wishes submitted from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
