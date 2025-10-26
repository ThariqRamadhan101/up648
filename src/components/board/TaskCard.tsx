import type { Task } from '../../types';
import { cn } from '../../utils/cn';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { formatDuration, getDurationColor } from '../../utils/formatDuration';

interface TaskCardProps {
    task: Task;
    className?: string;
}

export function TaskCard({ task, className }: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const daysInStage = Math.floor((new Date().getTime() - task.updatedAt.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                'bg-white rounded-lg shadow border border-gray-200/80 p-4 space-y-3 cursor-move hover:shadow-md transition-shadow duration-200',
                isDragging && 'opacity-50 shadow-lg rotate-3 scale-105',
                className
            )}
        >
            <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {task.title}
                    </h3>
                    <div
                        className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap',
                            getDurationColor(daysInStage)
                        )}
                        title={`In this stage for ${daysInStage} days`}
                    >
                        {formatDuration(task.updatedAt)}
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                    <div>{task.project}</div>
                    <div>{task.province}</div>
                </div>
            </div>

            <div className="flex items-center justify-between text-xs">
                <div className="text-gray-500">
                    {task.creator}
                </div>
                <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {task.sprint}
                </div>
            </div>
        </div>
    );
}