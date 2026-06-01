import express from 'express';
import multer from 'multer';
import { upload } from '../middlewares/upload.js';
import { authenticateToken } from '../middlewares/auth.js';
import { uploadImage } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/', authenticateToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Multer upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, uploadImage);

export default router;
