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
        <div className={`task-card group ${isOverdue ? 'ring-1 ring-error/50' : ''}`}>
            {isOverdue && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-error to-transparent opacity-70" />
            )}

            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                    <h3 className="group-hover:text-primary transition-colors">{task.title}</h3>
                    <p className="mb-4">
                        {task.description}
                    </p>

                    <div className="flex gap-2 flex-wrap">
                        <span className="tag px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            {task.status.replace('_', ' ')}
                        </span>

                        <span className={`px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase ${priorityClasses[task.priority]} shadow-sm`}>
                            {task.priority}
                        </span>

                        {task.category && (
                            <span
                                className="px-3 py-1 rounded-full text-[10px] font-bold border"
                                style={{
                                    backgroundColor: task.category.color + '22',
                                    color: task.category.color,
                                    borderColor: task.category.color + '44'
                                }}
                            >
                                {task.category.name}
                            </span>
                        )}
                    </div>

                    {task.deadline && (
                        <p className={`mt-4 text-[11px] ${isOverdue ? 'text-error font-semibold' : 'text-white/60'} flex items-center gap-2`}>
                            <span>{isOverdue ? '🚨 Overdue' : '⏰ Deadline'}:</span>
                            <span>
                                {new Date(task.deadline).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => onEdit(task.id)}
                        className="btn-ghost"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="btn-danger-outline"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
