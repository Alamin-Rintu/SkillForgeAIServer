import { Router } from 'express';
import { generateRoadmap, analyzeResume, recommendCareer, interviewChat } from '../controllers/aiController';

const router = Router();

router.post('/roadmap-generator', generateRoadmap);
router.post('/resume-analyzer', analyzeResume);
router.post('/career-advisor', recommendCareer);
router.post('/interview-coach', interviewChat);

export default router;
