import { Router } from 'express';
import { getAnalytics, getUserStats } from '../controllers/analyticsController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAnalytics);
router.get('/user-stats', authenticateToken, getUserStats);

export default router;
