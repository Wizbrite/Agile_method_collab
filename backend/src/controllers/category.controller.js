import * as categoryService from '../services/category.service.js';

/**
 * Category Controller
 * Handles HTTP requests for category operations
 */

/**
 * Get all categories
 * GET /api/categories
 */
export const getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({ categories });
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Create new category
 * POST /api/categories
 */
export const createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        const category = await categoryService.createCategory(categoryData);

        res.status(201).json({
            message: 'Category created successfully',
            category
        });
    } catch (error) {
        console.error('Create category error:', error);
        res.status(400).json({ error: error.message });
    }
};

/**
 * Update category
 * PUT /api/categories/:id
 */
export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updates = req.body;

        const category = await categoryService.updateCategory(categoryId, updates);

        res.status(200).json({
            message: 'Category updated successfully',
            category
        });
    } catch (error) {
        console.error('Update category error:', error);
        res.status(400).json({ error: error.message });
    }
};

/**
 * Delete category
 * DELETE /api/categories/:id
 */
export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        await categoryService.deleteCategory(categoryId);

        res.status(200).json({
            message: 'Category deleted successfully'
        });
    } catch (error) {
        console.error('Delete category error:', error);
        res.status(400).json({ error: error.message });
    }
};
