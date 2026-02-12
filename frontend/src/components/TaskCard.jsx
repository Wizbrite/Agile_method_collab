/**
 * Task Card Component
 * Displays individual task in list
 * Referenced in Sprint Backlog: SB03, SB05, SB09
 */
function TaskCard({ task, onDelete, onEdit }) {
    // TODO: Implement overdue visual indicator (SB09)
    const isOverdue = task.isOverdue || (task.deadline && new Date(task.deadline) < new Date());

    const priorityClasses = {
        low: 'bg-success',
        medium: 'bg-warning',
        high: 'bg-error'
    };

    return (
        <div className={`card relative overflow-hidden ${isOverdue ? 'border-error' : 'border-border'}`}>
            {isOverdue && (
                <div className="absolute top-0 left-0 w-1 h-full bg-error" />
            )}

            <div className="flex justify-between items-start">
                <div>
                    <h3 className="mb-2">{task.title}</h3>
                    <p className="text-text-muted text-[0.95rem] mb-4">
                        {task.description}
                    </p>

                    <div className="flex gap-3 flex-wrap">
                        <span className="px-3 py-1.5 rounded-full bg-bg-input text-[10px] font-bold uppercase tracking-wider">
                            {task.status.replace('_', ' ')}
                        </span>

                        <span className={`px-3 py-1.5 rounded-full ${priorityClasses[task.priority]} text-white text-[10px] font-bold uppercase`}>
                            {task.priority}
                        </span>

                        {task.category && (
                            <span
                                className="px-3 py-1.5 rounded-full text-[10px] font-bold"
                                style={{
                                    backgroundColor: task.category.color + '33',
                                    color: task.category.color,
                                    border: `1px solid ${task.category.color}`
                                }}
                            >
                                {task.category.name}
                            </span>
                        )}
                    </div>

                    {task.deadline && (
                        <p className={`mt-4 text-xs ${isOverdue ? 'text-error' : 'text-text-muted'} flex items-center gap-2`}>
                            <span>{isOverdue ? '🚨 Overdue' : '⏰ Deadline'}:</span>
                            <span className="font-bold">
                                {new Date(task.deadline).toLocaleDateString()}
                            </span>
                        </p>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => onEdit(task.id)}
                        className="px-3 py-1.5 text-xs bg-bg-input text-text-dark shadow-none hover:bg-slate-100"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="px-3 py-1.5 text-xs bg-transparent text-error border border-error shadow-none hover:bg-error/10"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;
