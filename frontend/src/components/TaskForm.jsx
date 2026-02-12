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
        <form onSubmit={handleSubmit} className='glass-form'>
            <div className="mb-4">
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-4">
                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                />
            </div>

            <div className="mb-4">
                <label>Status:</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="mb-4">
                <label>Priority:</label>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            {/* TODO: Implement deadline picker (SB07) */}
            <div className="mb-4">
                <label>Deadline:</label>
                <input
                    type="datetime-local"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                />
            </div>

            {/* TODO: Implement category selector (SB06) */}
            <div className="mb-4">
                <CategorySelector
                    value={formData.categoryId}
                    onChange={(categoryId) => setFormData({ ...formData, categoryId })}
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2"
                >
                    {loading ? 'Saving...' : 'Save Task'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-transparent  border-border hover:bg-slate-100"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default TaskForm;
