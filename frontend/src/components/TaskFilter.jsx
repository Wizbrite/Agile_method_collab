import CategorySelector from './CategorySelector.jsx';

/**
 * Task Filter Component
 * Provides filtering options for task list
 * Referenced in Sprint Backlog: SB03
 */
function TaskFilter({ filters, onFilterChange }) {
    const handleChange = (field, value) => {
        // TODO: Implement filter logic (SB03)
        onFilterChange({
            ...filters,
            [field]: value
        });
    };

    return (
        <div className="glass-filter flex gap-6 flex-wrap">
            <div className="flex-1 min-w-[150px]">
                <label>Status:</label>
                <select
                    value={filters.status || ''}
                    onChange={(e) => handleChange('status', e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="flex-1 min-w-[150px]">
                <label>Priority:</label>
                <select
                    value={filters.priority || ''}
                    onChange={(e) => handleChange('priority', e.target.value)}
                >
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="flex-1 min-w-[150px]">
                <CategorySelector
                    value={filters.categoryId}
                    onChange={(val) => handleChange('categoryId', val)}
                    showAll={true}
                />
            </div>

            <div className="flex-[2] min-w-[250px]">
                <label>Search Tasks:</label>
                <input
                    type="text"
                    value={filters.search || ''}
                    onChange={(e) => handleChange('search', e.target.value)}
                    placeholder="Search by title or description..."
                />
            </div>
        </div>
    );
}

export default TaskFilter;
