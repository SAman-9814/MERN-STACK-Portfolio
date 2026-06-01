import express from 'express';
import { login, verifyToken } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/auth.js';
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 15 login requests per 15 minutes
  message: { message: 'Too many login attempts from this IP, please try again after 15 minutes.' }
});

const router = express.Router();

router.post('/login', loginLimiter, login);
router.get('/verify', authenticateToken, verifyToken);

export default router;
