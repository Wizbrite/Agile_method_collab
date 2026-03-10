import express from 'express';
import * as categoryController from '../controllers/category.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * Category Routes
 * /api/categories
 */

router.get('/', authenticateToken, categoryController.getCategories);
router.post('/', authenticateToken, categoryController.createCategory);
router.put('/:id', authenticateToken, categoryController.updateCategory);
router.delete('/:id', authenticateToken, categoryController.deleteCategory);

export default router;

//validated category routes with authentication middleware. All routes require a valid token to access.
