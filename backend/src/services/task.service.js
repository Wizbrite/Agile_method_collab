import { Task, Category } from '../models/index.js';

/**
 * Task Service
 * Handles task business logic
 */

/**
 * Create a new task
 * @param {number} userId - ID of user creating the task
 * @param {Object} taskData - { title, description, status, priority, deadline, categoryId }
 * @returns {Object} Created task
 */
export const createTask = async (userId, taskData) => {
    // TODO: Implement task creation (SB02)
    // 1. Validate input data
    // 2. Create task with userId
    // 3. Return task with category relationship

    throw new Error('Not implemented - Complete this for SB02');
};

/**
 * Get all tasks for a user with filters
 * @param {number} userId - User ID
 * @param {Object} filters - { status, priority, categoryId, search }
 * @returns {Array} List of tasks
 */
export const getTasks = async (userId, filters = {}) => {
    // TODO: Implement task listing with filters (SB03)
    // 1. Build query with filters
    // 2. Include category relationship
    // 3. Sort by deadline or priority
    // 4. Return tasks array

    throw new Error('Not implemented - Complete this for SB03');
};

/**
 * Get single task by ID
 * @param {number} taskId - Task ID
 * @param {number} userId - User ID (for authorization)
 * @returns {Object} Task details
 */
export const getTaskById = async (taskId, userId) => {
    // TODO: Implement task retrieval (SB03)
    // 1. Find task by ID
    // 2. Verify ownership
    // 3. Include category

    throw new Error('Not implemented - Complete this for SB03');
};

/**
 * Update a task
 * @param {number} taskId - Task ID
 * @param {number} userId - User ID (for authorization)
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated task
 */
export const updateTask = async (taskId, userId, updates) => {
    // TODO: Implement task update (SB04)
    // 1. Find task and verify ownership
    // 2. Validate status transitions
    // 3. Update task
    // 4. Return updated task

    throw new Error('Not implemented - Complete this for SB04');
};

/**
 * Delete a task
 * @param {number} taskId - Task ID
 * @param {number} userId - User ID (for authorization)
 * @returns {boolean} Success status
 */
export const deleteTask = async (taskId, userId) => {
    // TODO: Implement task deletion (SB05)
    // 1. Find task and verify ownership
    // 2. Delete task (soft or hard delete)
    // 3. Return success

    throw new Error('Not implemented - Complete this for SB05');
};

/**
 * Check and update overdue tasks
 * @returns {number} Number of tasks marked as overdue
 */
export const updateOverdueTasks = async () => {
    // TODO: Implement overdue detection (SB09)
    // 1. Find tasks with deadline < now and isOverdue = false
    // 2. Update isOverdue flag
    // 3. Trigger notifications
    // 4. Return count

    throw new Error('Not implemented - Complete this for SB09');
};
