import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as taskApi from '../api/task.api.js';
import TaskCard from '../components/TaskCard.jsx';
import TaskFilter from '../components/TaskFilter.jsx';

/**
 * Task List Page
 * Displays all tasks with filtering
 * Referenced in Sprint Backlog: SB03
 */
function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadTasks();
    }, [filters]);

    const loadTasks = async () => {
        try {
            setLoading(true);
            // TODO: Implement task loading with filters (SB03)
            const data = await taskApi.getTasks(filters);
            setTasks(data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (taskId) => {
        // TODO: Implement task deletion with confirmation (SB05)
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskApi.deleteTask(taskId);
                loadTasks();
            } catch (err) {
                alert('Failed to delete task');
            }
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1>My Tasks</h1>
                <button onClick={() => navigate('/tasks/new')}>
                    + New Task
                </button>
            </div>

            <TaskFilter filters={filters} onFilterChange={setFilters} />

            {error && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            {loading ? (
                <p>Loading tasks...</p>
            ) : tasks.length === 0 ? (
                <p>No tasks found. Create your first task!</p>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={handleDelete}
                            onEdit={(id) => navigate(`/tasks/${id}/edit`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TaskList;
