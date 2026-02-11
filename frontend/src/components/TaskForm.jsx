import { useState, useEffect } from 'react';
import CategorySelector from '../components/CategorySelector.jsx';

/**
 * Task Form Component
 * Reusable form for creating/editing tasks
 * Referenced in Sprint Backlog: SB02, SB04, SB07
 */
function TaskForm({ initialData = {}, onSubmit, onCancel, loading = false }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        deadline: '',
        categoryId: '',
        ...initialData
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={{ display: 'block', width: '100%', padding: '0.5rem' }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        style={{ display: 'block', width: '100%', padding: '0.5rem' }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label>
                    Status:
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', padding: '0.5rem' }}
                    >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </label>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label>
                    Priority:
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', padding: '0.5rem' }}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </label>
            </div>

            {/* TODO: Implement deadline picker (SB07) */}
            <div style={{ marginBottom: '1rem' }}>
                <label>
                    Deadline:
                    <input
                        type="datetime-local"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', padding: '0.5rem' }}
                    />
                </label>
            </div>

            {/* TODO: Implement category selector (SB06) */}
            <div style={{ marginBottom: '1rem' }}>
                <CategorySelector
                    value={formData.categoryId}
                    onChange={(categoryId) => setFormData({ ...formData, categoryId })}
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    type="submit"
                    disabled={loading}
                    style={{ padding: '0.5rem 1rem' }}
                >
                    {loading ? 'Saving...' : 'Save Task'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    style={{ padding: '0.5rem 1rem' }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default TaskForm;
