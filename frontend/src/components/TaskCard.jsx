/**
 * Task Card Component
 * Displays individual task in list
 * Referenced in Sprint Backlog: SB03, SB05, SB09
 */
function TaskCard({ task, onDelete, onEdit }) {
    // TODO: Implement overdue visual indicator (SB09)
    const isOverdue = task.isOverdue || (task.deadline && new Date(task.deadline) < new Date());

    const priorityColors = {
        low: 'var(--success)',
        medium: 'var(--warning)',
        high: 'var(--error)'
    };

    return (
        <div className="card" style={{
            borderColor: isOverdue ? 'var(--error)' : 'var(--border)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {isOverdue && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    backgroundColor: 'var(--error)'
                }} />
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>{task.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                        {task.description}
                    </p>

                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <span style={{
                            padding: '0.35rem 0.75rem',
                            borderRadius: '20px',
                            backgroundColor: 'var(--bg-input)',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            {task.status.replace('_', ' ')}
                        </span>

                        <span style={{
                            padding: '0.35rem 0.75rem',
                            borderRadius: '20px',
                            backgroundColor: priorityColors[task.priority],
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                        }}>
                            {task.priority}
                        </span>

                        {task.category && (
                            <span style={{
                                padding: '0.35rem 0.75rem',
                                borderRadius: '20px',
                                backgroundColor: task.category.color + '33',
                                color: task.category.color,
                                border: `1px solid ${task.category.color}`,
                                fontSize: '0.75rem',
                                fontWeight: '600'
                            }}>
                                {task.category.name}
                            </span>
                        )}
                    </div>

                    {task.deadline && (
                        <p style={{
                            marginTop: '1rem',
                            fontSize: '0.875rem',
                            color: isOverdue ? 'var(--error)' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span>{isOverdue ? '🚨 Overdue' : '⏰ Deadline'}:</span>
                            <span style={{ fontWeight: '600' }}>
                                {new Date(task.deadline).toLocaleDateString()}
                            </span>
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={() => onEdit(task.id)}
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', backgroundColor: 'var(--bg-input)', color: 'var(--text-main)' }}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', backgroundColor: 'transparent', color: 'var(--error)', border: '1px solid var(--error)', boxShadow: 'none' }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;
