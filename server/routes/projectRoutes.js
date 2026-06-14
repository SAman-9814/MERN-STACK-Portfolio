import express from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  togglePinProject,
  reorderProjects
} from '../controllers/projectController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', authenticateToken, createProject);
router.patch('/reorder', authenticateToken, reorderProjects);
router.put('/:id', authenticateToken, updateProject);
router.delete('/:id', authenticateToken, deleteProject);
router.patch('/:id/pin', authenticateToken, togglePinProject);

export default router;
