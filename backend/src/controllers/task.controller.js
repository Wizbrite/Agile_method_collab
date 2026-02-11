import * as taskService from '../services/task.service.js';

/**
 * Task Controller
 * Handles HTTP requests for task operations
 */

/**
 * Create new task
 * POST /api/tasks
 */
export const createTask = async (req, res) => {
    try {
        const userId = req.user?.id; // Set by auth middleware
        const taskData = req.body;

        const task = await taskService.createTask(userId, taskData);

        res.status(201).json({
            message: 'Task created successfully',
            task
        });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(400).json({ error: error.message });
    }
};

/**
 * Get all tasks for current user
 * GET /api/tasks
 */
export const getTasks = async (req, res) => {
    try {
        const userId = req.user?.id;
        const filters = {
            status: req.query.status,
            priority: req.query.priority,
            categoryId: req.query.categoryId,
            search: req.query.search
        };

        const tasks = await taskService.getTasks(userId, filters);

        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get single task by ID
 * GET /api/tasks/:id
 */
export const getTask = async (req, res) => {
    try {
        const userId = req.user?.id;
        const taskId = req.params.id;

        const task = await taskService.getTaskById(taskId, userId);

        res.status(200).json({ task });
    } catch (error) {
        console.error('Get task error:', error);
        res.status(404).json({ error: error.message });
    }
};

/**
 * Update task
 * PUT /api/tasks/:id
 */
export const updateTask = async (req, res) => {
    try {
        const userId = req.user?.id;
        const taskId = req.params.id;
        const updates = req.body;

        const task = await taskService.updateTask(taskId, userId, updates);

        res.status(200).json({
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        console.error('Update task error:', error);
        res.status(400).json({ error: error.message });
    }
};

/**
 * Delete task
 * DELETE /api/tasks/:id
 */
export const deleteTask = async (req, res) => {
    try {
        const userId = req.user?.id;
        const taskId = req.params.id;

        await taskService.deleteTask(taskId, userId);

        res.status(200).json({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(400).json({ error: error.message });
    }
};
