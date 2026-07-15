import { Router } from 'express';
import { register, login, getUsers } from '../controllers/login.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticate, getUsers);

export default router;