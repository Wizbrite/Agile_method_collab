import { Task, Category } from '../models/index.js';
import { Op } from 'sequelize';

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
    // SB02: Implement task creation
    let { title, priority, deadline, categoryId } = taskData;

    // Sanitize optional fields
    if (deadline === '') deadline = null;
    if (categoryId === '') categoryId = null;

    // Validation
    if (!title || title.trim() === '') {
        throw new Error('Title is required');
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
        throw new Error('Invalid priority level');
    }

    if (deadline && isNaN(new Date(deadline).getTime())) {
        throw new Error('Invalid deadline date');
    }

    if (categoryId) {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
    }

    const task = await Task.create({
        ...taskData,
        priority, // Use sanitized value
        deadline, // Use sanitized value
        categoryId, // Use sanitized value
        userId
    });

    // Return with category relationship
    return await Task.findByPk(task.id, {
        include: [{ model: Category, as: 'category' }]
    });
};

/**
 * Get all tasks for a user with filters
 * @param {number} userId - User ID
 * @param {Object} filters - { status, priority, categoryId, search }
 * @returns {Array} List of tasks
 */
export const getTasks = async (userId, filters = {}) => {
    // SB03: Implement task listing with filters
    const where = { userId };

    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;
    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.search) {
        where[Op.or] = [
            { title: { [Op.like]: `%${filters.search}%` } },
            { description: { [Op.like]: `%${filters.search}%` } }
        ];
    }

    return await Task.findAll({
        where,
        include: [{ model: Category, as: 'category' }],
        order: [
            ['deadline', 'ASC'],
            ['createdAt', 'DESC']
        ]
    });
};

/**
 * Get single task by ID
 * @param {number} taskId - Task ID
 * @param {number} userId - User ID (for authorization)
 * @returns {Object} Task details
 */
export const getTaskById = async (taskId, userId) => {
    // SB03: Implement task retrieval
    const task = await Task.findOne({
        where: { id: taskId, userId },
        include: [{ model: Category, as: 'category' }]
    });

    if (!task) throw new Error('Task not found');
    return task;
};

/**
 * Update a task
 * @param {number} taskId - Task ID
 * @param {number} userId - User ID (for authorization)
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated task
 */
export const updateTask = async (taskId, userId, updates) => {
    // SB04: Implement task update
    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) throw new Error('Task not found');

    // Validation for updates
    // Validation for updates
    if (updates.title !== undefined && (!updates.title || updates.title.trim() === '')) {
        throw new Error('Title cannot be empty');
    }

    if (updates.priority && !['low', 'medium', 'high'].includes(updates.priority)) {
        throw new Error('Invalid priority level');
    }

    if (updates.deadline === '') updates.deadline = null;
    if (updates.deadline && isNaN(new Date(updates.deadline).getTime())) {
        throw new Error('Invalid deadline date');
    }

    if (updates.categoryId === '') updates.categoryId = null;
    if (updates.categoryId) {
        const category = await Category.findByPk(updates.categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
    }

    await task.update(updates);

    return await Task.findByPk(taskId, {
        include: [{ model: Category, as: 'category' }]
    });
};

/**
 * Delete a task
 * @param {number} taskId - Task ID
 * @param {number} userId - User ID (for authorization)
 * @returns {boolean} Success status
 */
export const deleteTask = async (taskId, userId) => {
    // SB05: Implement task deletion
    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) throw new Error('Task not found');

    await task.destroy();
    return true;
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
