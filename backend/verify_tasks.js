
import { createTask, getTasks, deleteTask } from './src/services/task.service.js';
import { User, Task } from './src/models/index.js';
import sequelize from './src/config/database.js';

// Mock user for testing
const TEST_EMAIL = 'verify_test@example.com';

async function runVerification() {
    try {
        console.log(' Starting verification...');

        // Ensure DB connection
        await sequelize.authenticate();
        console.log(' Connected to database');

        // Create or find a test user
        let user = await User.findOne({ where: { email: TEST_EMAIL } });
        if (!user) {
            user = await User.create({
                username: 'VerifyTest',
                email: TEST_EMAIL,
                password: 'hashed_password_placeholder'
            });
            console.log(' Created test user');
        }

        const userId = user.id;

        // 1. Create Task with High Priority and Future Deadline
        console.log('\nTEST 1: Create valid task with High Priority');
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 7); // 1 week from now

        const task1 = await createTask(userId, {
            title: 'Test High Priority Task',
            priority: 'high',
            deadline: futureDate,
            status: 'todo'
        });
        console.log(`Created task: ${task1.title} (Priority: ${task1.priority})`);

        // 2. Test Priority Validation
        console.log('\nTEST 2: Create task with invalid priority');
        try {
            await createTask(userId, {
                title: 'Invalid Priority Task',
                priority: 'invalid_priority'
            });
            console.error(' Failed! Should have thrown error for invalid priority');
        } catch (error) {
            console.log(`Caught expected error: ${error.message}`);
        }

        // 3. Test Title Validation
        console.log('\nTEST 3: Create task with empty title');
        try {
            await createTask(userId, {
                title: '',
                priority: 'low'
            });
            console.error('Failed! Should have thrown error for empty title');
        } catch (error) {
            console.log(`Caught expected error: ${error.message}`);
        }

        // 4. Verify Sorting (Deadline)
        console.log('\nTEST 4: Verify Sorting');
        const nearFuture = new Date();
        nearFuture.setDate(nearFuture.getDate() + 1); // 1 day from now

        await createTask(userId, {
            title: 'Test Urgent Task',
            priority: 'high',
            deadline: nearFuture
        });

        const tasks = await getTasks(userId);

        // We expect "Test Urgent Task" (tomorrow) to be before "Test High Priority Task" (next week)
        // Filtering our test tasks
        const testTasks = tasks.filter(t => t.title.startsWith('Test'));

        if (testTasks.length >= 2) {
            console.log('Retrieved tasks order:');
            testTasks.forEach(t => console.log(`- ${t.title}: ${new Date(t.deadline).toISOString()}`));

            // Simple check if first one is earlier than second one
            const first = new Date(testTasks[0].deadline).getTime();
            const second = new Date(testTasks[1].deadline).getTime();

            if (first <= second) {
                console.log('Sorting by deadline appears correct (earlier date first)');
            } else {
                console.warn('Sorting might be incorrect?');
            }
        }

        // Cleanup
        console.log('\nCleaning up test data...');
        for (const t of testTasks) {
            await deleteTask(t.id, userId);
        }
        await user.destroy();
        console.log('Cleanup complete');

    } catch (error) {
        console.error('Verification failed:', error);
    } finally {
        await sequelize.close();
    }
}

runVerification();
