import { Category, Task } from '../models/index.js';
import sequelize from '../config/database.js';

/**
 * Category Service
 * Handles category business logic
 */

/**
 * Get all categories
 * @returns {Array} List of categories
 */
export const getAllCategories = async () => {
    // SB06: Implement category listing with task count
    return await Category.findAll({
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM tasks AS task
                        WHERE
                            task.categoryId = Category.id
                    )`),
                    'taskCount'
                ]
            ]
        },
        order: [['name', 'ASC']]
    });
};

/**
 * Create a new category
 * @param {Object} categoryData - { name, color }
 * @returns {Object} Created category
 */
export const createCategory = async (categoryData) => {
    // SB06: Implement category creation
    const { name, color } = categoryData;
    if (!name) throw new Error('Category name is required');

    // Check for duplicate name
    const existing = await Category.findOne({ where: { name } });
    if (existing) throw new Error('Category already exists');

    return await Category.create({ name, color });
};

/**
 * Update a category
 * @param {number} categoryId - Category ID
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated category
 */
export const updateCategory = async (categoryId, updates) => {
    // SB06: Implement category update
    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error('Category not found');

    await category.update(updates);
    return category;
};

/**
 * Delete a category
 * @param {number} categoryId - Category ID
 * @returns {boolean} Success status
 */
export const deleteCategory = async (categoryId) => {
    // SB06: Implement category deletion
    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error('Category not found');

    // Check if category has tasks
    const taskCount = await Task.count({ where: { categoryId } });
    if (taskCount > 0) {
        throw new Error('Cannot delete category with associated tasks');
    }

    await category.destroy();
    return true;
};
