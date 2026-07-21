import { NavLink } from 'react-router-dom';
import { LayoutGrid, CalendarDays, ListChecks } from 'lucide-react';
// import './Sidebar.css';
import clsx from 'clsx';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutGrid, end: true },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
];

export default function Sidebar() {
  return (
    <aside className="w-65 shrink-0 sticky top-0 h-screen flex flex-col bg-white border-r border-gray-200 px-4 py-6
        max-[860px]:fixed max-[860px]:bottom-0 max-[860px]:left-0 max-[860px]:top-auto max-[860px]:z-40 max-[860px]:h-auto max-[860px]:w-full
        max-[860px]:flex-row max-[860px]:items-center max-[860px]:border-r-0 max-[860px]:border-t max-[860px]:px-4 max-[860px]:py-2
        max-[860px]:shadow-[0_-4px_16px_rgba(27,33,48,0.06)]">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 mb-8 max-[860px]:hidden">
        <div className="flex items-center justify-center w-9 h-9 rounded bg-gray-900 text-white shrink-0">
          <ListChecks size={20} strokeWidth={2.4} />
        </div>

        <div className="flex flex-col leading-tight">
          <span className="font-bold text-[17px]">Daylist</span>
          <span className="text-[11px] text-gray-500">Plan your day</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 max-[860px]:flex-row max-[860px]:justify-around max-[860px]:w-full">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => clsx(`flex items-center gap-3 rounded px-3 py-3 text-[14px] font-medium text-gray-600
              transition-colors hover:bg-gray-100 hover:text-gray-900 max-[860px]:flex-col max-[860px]:gap-0.5 max-[860px]:px-4 max-[860px]:py-2 max-[860px]:text-[11px]`,
            isActive && 'bg-pink-100 text-pink-600 font-semibold')}
          >
            <Icon size={18} strokeWidth={2.2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto max-[860px]:hidden">
        <div className="rounded-md bg-gray-100 p-4">
          <p className="mb-1 text-[12.5px] font-semibold">This is a UI preview</p>
          <p className="text-[11.5px] leading-6 text-gray-500">All tasks are mock data kept in memory for this session.</p>
        </div>
      </div>
    </aside>
  );
}
