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
        <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px'
        }}>
            <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                    Status:
                    <select
                        value={filters.status || ''}
                        onChange={(e) => handleChange('status', e.target.value)}
                        style={{ display: 'block', padding: '0.5rem' }}
                    >
                        <option value="">All</option>
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </label>
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                    Priority:
                    <select
                        value={filters.priority || ''}
                        onChange={(e) => handleChange('priority', e.target.value)}
                        style={{ display: 'block', padding: '0.5rem' }}
                    >
                        <option value="">All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </label>
            </div>

            {/* TODO: Add category filter (SB06) */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                    Search:
                    <input
                        type="text"
                        value={filters.search || ''}
                        onChange={(e) => handleChange('search', e.target.value)}
                        placeholder="Search tasks..."
                        style={{ display: 'block', padding: '0.5rem' }}
                    />
                </label>
            </div>
        </div>
    );
}

export default TaskFilter;
