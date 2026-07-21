import { Router } from 'express';
import {
  getRoadmaps,
  getRoadmapById,
  createRoadmap,
  deleteRoadmap,
  toggleSaveRoadmap,
  getSavedRoadmaps
} from '../controllers/roadmapController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getRoadmaps);
router.get('/saved', authenticateToken, getSavedRoadmaps);
router.get('/:id', authenticateToken, getRoadmapById);
router.post('/', authenticateToken, createRoadmap);
router.post('/save', authenticateToken, toggleSaveRoadmap);
router.delete('/:id', authenticateToken, deleteRoadmap);

export default router;
