import cron from 'node-cron';
import { Task } from '../models/index.js';
import * as notificationService from '../services/notification.service.js';
import { Op } from 'sequelize';

/**
 * Deadline Reminder Job
 * Sends notifications for upcoming deadlines
 */

/**
 * Send deadline reminders
 * Checks for tasks with deadlines in next 24 hours
 */
const sendDeadlineReminders = async () => {
    try {
        console.log('[CRON] Checking for upcoming deadlines...');

        // TODO: Implement deadline reminders (SB07, SB08)
        // 1. Find tasks with deadline in next 24 hours
        // 2. Filter out already notified tasks (add notified field to model if needed)
        // 3. Send notification for each task
        // 4. Mark as notified

        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setHours(tomorrow.getHours() + 24);

        // Example query structure (needs completion):
        // const tasks = await Task.findAll({
        //   where: {
        //     deadline: {
        //       [Op.between]: [now, tomorrow]
        //     },
        //     status: { [Op.ne]: 'completed' }
        //   },
        //   include: ['user']
        // });

        // for (const task of tasks) {
        //   await notificationService.sendDeadlineReminder(
        //     task.userId,
        //     task,
        //     24
        //   );
        // }

        console.log('[CRON] Deadline reminders sent');
    } catch (error) {
        console.error('[CRON] Error sending deadline reminders:', error);
    }
};

/**
 * Start the deadline reminder cron job
 * Runs daily at 9 AM by default
 */
export const startDeadlineReminderJob = () => {
    // TODO: Adjust schedule as needed (SB07)
    // Current: Daily at 9 AM
    // '0 9 * * *' = 9:00 AM every day

    const job = cron.schedule('0 9 * * *', sendDeadlineReminders);

    console.log('✅ Deadline reminder job started (runs daily at 9 AM)');

    return job;
};

// Export for manual testing
export { sendDeadlineReminders };
