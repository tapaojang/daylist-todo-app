import { Circle, Clock3, CheckCircle2 } from 'lucide-react';
import { STATUS } from '../data/mockData';
import clsx from 'clsx';
// import './StatusBadge.css';

const CONFIG = {
  [STATUS.PENDING]: { icon: Circle, className: 'bg-yellow-100 text-yellow-700' },
  [STATUS.IN_PROGRESS]: { icon: Clock3, className: 'bg-blue-100 text-blue-700' },
  [STATUS.COMPLETED]: { icon: CheckCircle2, className: 'bg-green-100 text-green-700' },
};

export default function StatusBadge({ status, onClick, interactive = false }) {
  const cfg = CONFIG[status] || CONFIG[STATUS.PENDING];
  const Icon = cfg.icon;

  return (
    <button
      type="button"
      onClick={interactive ? onClick : undefined}
      disabled={!interactive}
      title={interactive ? 'Click to change status' : undefined}
      className={clsx(`inline-flex items-center gap-1.25 rounded-full px-2.5 pl-2 py-1.25
            text-[12px] font-semibold whitespace-nowrap transition-all`,
          cfg.className, interactive ? 'cursor-pointer hover:brightness-95 active:scale-95'
                                    : 'cursor-default')}
    >
      <Icon size={13} strokeWidth={2.4} />
      <span>{status}</span>
    </button>
  );
}
