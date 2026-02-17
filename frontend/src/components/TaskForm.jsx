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

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors(prev => ({ ...prev, [name]: null }));
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title || formData.title.trim().length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        }

        if (formData.deadline) {
            const date = new Date(formData.deadline);
            if (isNaN(date.getTime())) {
                newErrors.deadline = 'Invalid date';
            } else if (date < new Date()) {
                // Optional: Warn if deadline is in the past, or strictly forbid it?
                // For now, let's just allow it but maybe the user meant it. 
                // Let's stick to "Future only" for new tasks if user wants strictness, 
                // but usually editing allows past dates. 
                // Let's just validate it's a valid date.
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='glass-form max-w-2xl mx-auto'>
            <h2 className="text-2xl text-white mb-6 font-bold border-b border-white/10 pb-4">
                {initialData.id ? 'Edit Task' : 'Create New Task'}
            </h2>

            <div className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block mb-2 text-sm font-semibold text-white/90">Task Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Complete Sprint Report"
                        className={`w-full p-3 bg-white/10 border ${errors.title ? 'border-red-500' : 'border-purple-500/30'} 
                        rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                        required
                    />
                    {errors.title && <span className="text-red-400 text-xs mt-1 block">{errors.title}</span>}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-2 text-sm font-semibold text-white/90">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Add details about this task..."
                        className="w-full p-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                    />
                </div>

                {/* Grid for Selects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Status */}
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-white/90">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full p-3 bg-white/10 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all [&>option]:text-gray-900"
                        >
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-white/90">Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full p-3 bg-white/10 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all [&>option]:text-gray-900"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                {/* Grid for Deadline & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Deadline */}
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-white/90">Deadline</label>
                        <input
                            type="datetime-local"
                            name="deadline"
                            value={formData.deadline || ''}
                            onChange={handleChange}
                            className={`w-full p-3 bg-white/10 border ${errors.deadline ? 'border-red-500' : 'border-purple-500/30'} 
                            rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all scheme-dark`}
                        />
                        {errors.deadline && <span className="text-red-400 text-xs mt-1 block">{errors.deadline}</span>}
                    </div>

                    {/* Category */}
                    <div>
                        <CategorySelector
                            value={formData.categoryId}
                            onChange={(categoryId) => setFormData({ ...formData, categoryId })}
                        />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-8 pt-4 border-t border-white/10 justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold 
                    shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                            Saving...
                        </span>
                    ) : (
                        'Save Task'
                    )}
                </button>
            </div>
        </form>
    );
}

export default TaskForm;
