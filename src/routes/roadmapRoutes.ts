import { Router } from 'express';
import {
  getRoadmaps,
  getRoadmapById,
  createRoadmap,
  deleteRoadmap,
  toggleSaveRoadmap,
  getSavedRoadmaps
} from '../controllers/roadmapController';

const router = Router();

router.get('/', getRoadmaps);
router.get('/saved', getSavedRoadmaps);
router.get('/:id', getRoadmapById);
router.post('/', createRoadmap);
router.post('/save', toggleSaveRoadmap);
router.delete('/:id', deleteRoadmap);

export default router;
