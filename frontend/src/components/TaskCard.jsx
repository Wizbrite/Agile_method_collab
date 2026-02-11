/**
 * Task Card Component
 * Displays individual task in list
 * Referenced in Sprint Backlog: SB03, SB05, SB09
 */
function TaskCard({ task, onDelete, onEdit }) {
    // TODO: Implement overdue visual indicator (SB09)
    const isOverdue = task.isOverdue || (task.deadline && new Date(task.deadline) < new Date());

    // TODO: Add better styling and priority colors (SB07)
    const priorityColors = {
        low: '#22c55e',
        medium: '#f59e0b',
        high: '#ef4444'
    };

    return (
        <div
            style={{
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: isOverdue ? '#fee2e2' : 'white'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            backgroundColor: '#e5e7eb',
                            fontSize: '0.875rem'
                        }}>
                            {task.status.replace('_', ' ').toUpperCase()}
                        </span>

                        <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            backgroundColor: priorityColors[task.priority],
                            color: 'white',
                            fontSize: '0.875rem'
                        }}>
                            {task.priority.toUpperCase()}
                        </span>

                        {task.category && (
                            <span style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                backgroundColor: task.category.color,
                                color: 'white',
                                fontSize: '0.875rem'
                            }}>
                                {task.category.name}
                            </span>
                        )}
                    </div>

                    {task.deadline && (
                        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: isOverdue ? '#dc2626' : '#6b7280' }}>
                            {isOverdue ? '⚠️ ' : '📅 '}
                            Deadline: {new Date(task.deadline).toLocaleString()}
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => onEdit(task.id)}>Edit</button>
                    <button onClick={() => onDelete(task.id)} style={{ color: 'red' }}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;
