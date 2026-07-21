import { ListTodo, CheckCircle2, Clock3, Circle } from 'lucide-react';
// import './SummaryStats.css';
import clsx from 'clsx';

export default function SummaryStats({ todos }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.status === 'Completed').length;
  const inProgress = todos.filter((t) => t.status === 'In Progress').length;
  const pending = todos.filter((t) => t.status === 'Pending').length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  const stats = [
    { label: 'Total tasks', value: total, icon: ListTodo, color: 'bg-pink-100 text-pink-600' },
    { label: 'Completed', value: completed, icon: CheckCircle2, color: 'bg-green-100 text-green-600' },
    { label: 'In progress', value: inProgress, icon: Clock3, color: 'bg-blue-100 text-blue-600' },
    { label: 'Pending', value: pending, icon: Circle, color: 'bg-yellow-100 text-yellow-600' },
  ];

  return (
    <div className="grid gap-4 mb-6 grid-cols-2 lg:grid-cols-[repeat(4, minmax(0,1fr))_1.6fr)]">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className='flex items-center gap-3 rounded-md border border-gray-200 bg-white p-6'>
            <div className={clsx('flex h-9 w-9 items-center justify-center rounded', color)}>
              <Icon size={18} strokeWidth={2.2} />
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] font-bold leading-none">{value}</span>
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          </div>
        ))}
      
      <div className="flex flex-col justify-center gap-2 rounded-md border border-gray-200 bg-white p-6 col-span-2 lg:col-span-1">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-gray-500">Today's progress</span>
          <span className="font-mono text-[13px] font-semibold text-pink-600">{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-pink-500 transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
