/**
 * Task Card Component
 * Displays individual task in list
 * Referenced in Sprint Backlog: SB03, SB05, SB09
 */
function TaskCard({ task, onDelete, onEdit }) {
    const isOverdue = task.isOverdue || (task.deadline && new Date(task.deadline) < new Date() && task.status !== 'completed');

    const priorityColors = {
        low: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        high: 'bg-red-500/20 text-red-300 border-red-500/30'
    };

    const statusColors = {
        todo: 'text-gray-300',
        in_progress: 'text-blue-300',
        completed: 'text-green-300 line-through opacity-70'
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/20 overflow-hidden">

            {/* Top decorative line for overdue or priority */}
            <div className={`absolute top-0 left-0 w-full h-1 ${isOverdue ? 'bg-red-500' : 'bg-gradient-to-r from-purple-500 to-pink-500 opacity-50'}`} />

            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                    {/* Priority Badge */}
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${priorityColors[task.priority] || 'bg-gray-500/20'}`}>
                        {task.priority}
                    </span>

                    {/* Category Badge */}
                    {task.category && (
                        <span
                            className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border bg-purple-500/20 text-purple-300 border-purple-500/30"
                        >
                            {task.category.name}
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(task.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/20 text-white transition-colors"
                        title="Edit Task"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/30 text-red-400 transition-colors"
                        title="Delete Task"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            <h3 className={`text-xl font-bold text-white mb-2 ${task.status === 'completed' ? 'line-through opacity-60' : ''}`}>
                {task.title}
            </h3>

            <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                {task.description || <span className="italic opacity-50">No description provided</span>}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                <div className="flex items-center gap-2 text-sm">
                    <span className={`font-medium ${statusColors[task.status]}`}>
                        {task.status.replace('_', ' ').toUpperCase()}
                    </span>
                </div>

                {task.deadline && (
                    <div className={`text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5
                        ${isOverdue
                            ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                            : 'bg-white/5 text-purple-200 border border-white/10'}`}>
                        <span>{isOverdue ? '🚨' : '📅'}</span>
                        {formatDate(task.deadline)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskCard;
