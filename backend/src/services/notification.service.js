/**
 * Notification Service
 * Abstract notification layer - can be implemented with email, SMS, push, etc.
 */

/**
 * Send notification to user
 * @param {number} userId - User ID
 * @param {Object} notification - { title, message, type }
 */
export const sendNotification = async (userId, notification) => {
    // TODO: Implement notification sending (SB08)
    // This is an abstraction layer - implementation options:
    // 1. Email (nodemailer)
    // 2. SMS (Twilio)
    // 3. Push notifications (Firebase)
    // 4. In-app notifications (database)

    console.log(`[NOTIFICATION] User ${userId}:`, notification);

    // For now, just log. Replace with actual implementation.
    return {
        sent: false,
        message: 'Notification system not implemented - Complete this for SB08'
    };
};

/**
 * Send overdue task notification
 * @param {number} userId - User ID
 * @param {Object} task - Task object
 */
export const sendOverdueNotification = async (userId, task) => {
    return await sendNotification(userId, {
        title: 'Task Overdue',
        message: `Your task "${task.title}" is now overdue!`,
        type: 'warning',
        taskId: task.id
    });
};

/**
 * Send deadline reminder
 * @param {number} userId - User ID
 * @param {Object} task - Task object
 * @param {number} hoursUntilDeadline - Hours remaining
 */
export const sendDeadlineReminder = async (userId, task, hoursUntilDeadline) => {
    return await sendNotification(userId, {
        title: 'Upcoming Deadline',
        message: `Task "${task.title}" is due in ${hoursUntilDeadline} hours`,
        type: 'info',
        taskId: task.id
    });
};
