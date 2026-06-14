import express from 'express';
import multer from 'multer';
import { uploadDocument } from '../middlewares/upload.js';
import { authenticateToken } from '../middlewares/auth.js';
import { uploadResume, getLatestResume, deleteResume } from '../controllers/resumeController.js';

const router = express.Router();

// GET public route for fetching the latest resume URL
router.get('/latest', getLatestResume);

// POST protected route for uploading a new resume
router.post('/upload', authenticateToken, (req, res, next) => {
  uploadDocument.single('resume')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Multer upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, uploadResume);

// DELETE protected route for deleting the current resume
router.delete('/delete', authenticateToken, deleteResume);

export default router;
