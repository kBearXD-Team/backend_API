import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import novelRoutes from './novel.route';
import chapterRoutes from './chapter.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount novel routes at /novels
router.use('/novels', novelRoutes);

// mount chapter routes at /chapters
router.use('/chapters', chapterRoutes);

export default router;
