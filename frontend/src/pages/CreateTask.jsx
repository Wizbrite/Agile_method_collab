import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as taskApi from '../api/task.api.js';
import TaskForm from '../components/TaskForm.jsx';

/**
 * Create Task Page
 * Form for creating new tasks
 * Referenced in Sprint Backlog: SB02
 */
function CreateTask() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (taskData) => {
        setError('');
        setLoading(true);

        try {
            // TODO: Implement task creation (SB02)
            await taskApi.createTask(taskData);
            navigate('/tasks');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create task');
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Create New Task</h1>

            {error && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <TaskForm
                onSubmit={handleSubmit}
                onCancel={() => navigate('/tasks')}
                loading={loading}
            />
        </div>
    );
}

export default CreateTask;
