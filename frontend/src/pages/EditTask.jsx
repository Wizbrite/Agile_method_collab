import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as taskApi from '../api/task.api.js';
import TaskForm from '../components/TaskForm.jsx';

/**
 * Edit Task Page
 * Form for editing existing tasks
 * Referenced in Sprint Backlog: SB04
 */
function EditTask() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadTask();
    }, [id]);

    const loadTask = async () => {
        try {
            // TODO: Implement task loading (SB04)
            const data = await taskApi.getTask(id);
            setTask(data);
        } catch (err) {
            setError('Failed to load task');
        }
    };

    const handleSubmit = async (taskData) => {
        setError('');
        setLoading(true);

        try {
            // TODO: Implement task update (SB04)
            await taskApi.updateTask(id, taskData);
            navigate('/tasks');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update task');
            setLoading(false);
        }
    };

    if (!task) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="container-custom max-w-[600px]">
            <h1>Edit Task</h1>

            {error && (
                <div className="error-message mb-4">
                    {error}
                </div>
            )}

            <TaskForm
                initialData={task}
                onSubmit={handleSubmit}
                onCancel={() => navigate('/tasks')}
                loading={loading}
            />
        </div>
    );
}

export default EditTask;
