import { Category } from '../models/index.js';

/**
 * Category Service
 * Handles category business logic
 */

/**
 * Get all categories
 * @returns {Array} List of categories
 */
export const getAllCategories = async () => {
    // TODO: Implement category listing (SB06)
    // 1. Fetch all categories
    // 2. Include task count
    // 3. Return categories

    throw new Error('Not implemented - Complete this for SB06');
};

/**
 * Create a new category
 * @param {Object} categoryData - { name, color }
 * @returns {Object} Created category
 */
export const createCategory = async (categoryData) => {
    // TODO: Implement category creation (SB06)
    // 1. Validate name and color
    // 2. Check for duplicate name
    // 3. Create category

    throw new Error('Not implemented - Complete this for SB06');
};

/**
 * Update a category
 * @param {number} categoryId - Category ID
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated category
 */
export const updateCategory = async (categoryId, updates) => {
    // TODO: Implement category update (SB06)
    // 1. Find category
    // 2. Update fields
    // 3. Return updated category

    throw new Error('Not implemented - Complete this for SB06');
};

/**
 * Delete a category
 * @param {number} categoryId - Category ID
 * @returns {boolean} Success status
 */
export const deleteCategory = async (categoryId) => {
    // TODO: Implement category deletion (SB06)
    // 1. Check if category has tasks
    // 2. Handle task reassignment or prevent deletion
    // 3. Delete category

    throw new Error('Not implemented - Complete this for SB06');
};
