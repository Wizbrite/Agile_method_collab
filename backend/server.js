import app from './src/app.js';
import { testConnection, syncDatabase } from './src/config/database.js';
import { startOverdueJob } from './src/jobs/overdue.job.js';
import { startDeadlineReminderJob } from './src/jobs/deadline.job.js';

const PORT = process.env.PORT || 5000;

/**
 * Start the server
 */
const startServer = async () => {
    try {
        console.log('🚀 Starting Task Manager Server...\n');

        // Test database connection
        const dbConnected = await testConnection();
        if (!dbConnected) {
            console.error('❌ Failed to connect to database. Please check your configuration.');
            process.exit(1);
        }

        // Sync database models
        await syncDatabase();

        // Start cron jobs
        console.log('\n📅 Starting background jobs...');
        startOverdueJob();
        startDeadlineReminderJob();

        // Start Express server
        app.listen(PORT, () => {
            console.log(`\n✅ Server running on port ${PORT}`);
            console.log(`📍 API: http://localhost:${PORT}/api`);
            console.log(`💚 Health check: http://localhost:${PORT}/health`);
            console.log(`\n🔧 Environment: ${process.env.NODE_ENV || 'development'}\n`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down gracefully...');
    process.exit(0);
});

// Start the server
startServer();
