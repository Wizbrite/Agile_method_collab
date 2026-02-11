import api from './client.js';

/**
 * Task API
 * Handles task CRUD operations
 */

/**
 * Get all tasks with optional filters
 * @param {Object} filters - { status, priority, categoryId, search }
 */
export const getTasks = async (filters = {}) => {
    // TODO: Implement task fetching with filters (SB03)
    const params = new URLSearchParams();

    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.categoryId) params.append('categoryId', filters.categoryId);
    if (filters.search) params.append('search', filters.search);

    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data.tasks;
};

/**
 * Get single task by ID
 * @param {number} taskId
 */
export const getTask = async (taskId) => {
    // TODO: Implement single task fetch (SB03)
    const response = await api.get(`/tasks/${taskId}`);
    return response.data.task;
};

/**
 * Create new task
 * @param {Object} taskData - { title, description, status, priority, deadline, categoryId }
 */
export const createTask = async (taskData) => {
    // TODO: Implement task creation (SB02)
    const response = await api.post('/tasks', taskData);
    return response.data.task;
};

/**
 * Update task
 * @param {number} taskId
 * @param {Object} updates
 */
export const updateTask = async (taskId, updates) => {
    // TODO: Implement task update (SB04)
    const response = await api.put(`/tasks/${taskId}`, updates);
    return response.data.task;
};

/**
 * Delete task
 * @param {number} taskId
 */
export const deleteTask = async (taskId) => {
    // TODO: Implement task deletion (SB05)
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
};
