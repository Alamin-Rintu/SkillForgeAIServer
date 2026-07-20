import { Router } from 'express';
import { registerUser, loginUser, demoLogin } from '../controllers/authController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/demo-login', demoLogin);

export default router;
