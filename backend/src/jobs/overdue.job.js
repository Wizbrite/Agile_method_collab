import cron from 'node-cron';
import * as taskService from '../services/task.service.js';

/**
 * Overdue Task Detection Job
 * Runs periodically to check for overdue tasks
 */

/**
 * Check and update overdue tasks
 * This function is called by the cron scheduler
 */
const checkOverdueTasks = async () => {
    try {
        console.log('[CRON] Checking for overdue tasks...');

        // TODO: Implement overdue check (SB09)
        const count = await taskService.updateOverdueTasks();

        console.log(`[CRON] Marked ${count} tasks as overdue`);
    } catch (error) {
        console.error('[CRON] Error checking overdue tasks:', error);
    }
};

/**
 * Start the overdue detection cron job
 * Runs every hour by default
 */
export const startOverdueJob = () => {
    // TODO: Adjust cron schedule as needed (SB09)
    // Current: Every hour at minute 0
    // Format: minute hour day month weekday
    // Examples:
    //   '0 * * * *' = Every hour
    //   '*/30 * * * *' = Every 30 minutes
    //   '0 0 * * *' = Daily at midnight

    const job = cron.schedule('0 * * * *', checkOverdueTasks);

    console.log('✅ Overdue task detection job started (runs every hour)');

    return job;
};

// Export for manual testing
export { checkOverdueTasks };
