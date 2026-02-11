import api from './client.js';

/**
 * Category API
 * Handles category operations
 */

/**
 * Get all categories
 */
export const getCategories = async () => {
    // TODO: Implement category fetching (SB06)
    const response = await api.get('/categories');
    return response.data.categories;
};

/**
 * Create new category
 * @param {Object} categoryData - { name, color }
 */
export const createCategory = async (categoryData) => {
    // TODO: Implement category creation (SB06)
    const response = await api.post('/categories', categoryData);
    return response.data.category;
};

/**
 * Update category
 * @param {number} categoryId
 * @param {Object} updates
 */
export const updateCategory = async (categoryId, updates) => {
    // TODO: Implement category update (SB06)
    const response = await api.put(`/categories/${categoryId}`, updates);
    return response.data.category;
};

/**
 * Delete category
 * @param {number} categoryId
 */
export const deleteCategory = async (categoryId) => {
    // TODO: Implement category deletion (SB06)
    const response = await api.delete(`/categories/${categoryId}`);
    return response.data;
};
