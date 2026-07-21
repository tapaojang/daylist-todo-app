import { Clock, Trash2, Pencil, Flag } from 'lucide-react';
import StatusBadge from './StatusBadge';
import clsx from 'clsx';
// import './TodoCard.css';

const PRIORITY_DOT = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-gray-500',
};

export default function TodoCard({ todo, onCycleStatus, onEdit, onDelete }) {
  const isDone = todo.status === 'Completed';

  return (
    <div className={clsx(`flex items-start gap-4 rounded-md border border-gray-200 bg-white
            p-4 transition-all hover:border-gray-300 hover:shadow-sm max-[560px]:flex-wrap`, isDone && 'opacity-60')}>
      <div className="flex shrink-0 items-center gap-1 min-w-13 pt-0.5 font-mono text-[12.5px] text-gray-500 max-[560px]:order-first">
        <Clock size={13} strokeWidth={2.2} />
        <span>{todo.time}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span title={`${todo.priority} priority`} className={clsx('h-1.75 w-1.75 shrink-0 rounded-full', PRIORITY_DOT[todo.priority])} />
          <h3 className={clsx('text-[14.5px] font-semibold leading-1.4', isDone && 'line-through decoration-gray-400')}>{todo.title}</h3>
        </div>
        {todo.notes && <p className="mt-1 text-[12.5px] leading-1.5 text-gray-600">{todo.notes}</p>}
        <div className="mt-2 flex items-center gap-3">
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500">{todo.category}</span>
          <span className="inline-flex items-center gap-0.75 text-[11px] text-gray-500">
            <Flag size={11} strokeWidth={2.2} /> {todo.priority}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2 max-[560px]:mt-2 max-[560px]:w-full
                max-[560px]:flex-row max-[560px]:items-center max-[560px]:justify-between max-[560px]:border-t max-[560px]:border-dashed
                max-[560px]:border-gray-200 max-[560px]:pt-2">
        <StatusBadge status={todo.status} interactive onClick={() => onCycleStatus(todo.id)} />
        <div className="flex gap-1">
          <button type="button" onClick={() => onEdit(todo)} aria-label="Edit task" 
                className="flex h-6.5 w-6.5 items-center justify-center rounded text-gray-500 transition-colors
                      hover:bg-gray-100 hover:text-gray-900" >
            <Pencil size={14} strokeWidth={2.2} />
          </button>
          <button type="button" onClick={() => onDelete(todo.id)} aria-label="Delete task" 
                className="flex h-6.5 w-6.5 items-center justify-center rounded text-gray-500 transition-colors
                    hover:bg-red-100 hover:text-red-600" >
            <Trash2 size={14} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </div>
  );
}
