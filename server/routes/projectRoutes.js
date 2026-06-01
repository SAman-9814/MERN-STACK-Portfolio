import express from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  togglePinProject
} from '../controllers/projectController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', authenticateToken, createProject);
router.put('/:id', authenticateToken, updateProject);
router.delete('/:id', authenticateToken, deleteProject);
router.patch('/:id/pin', authenticateToken, togglePinProject);

export default router;
