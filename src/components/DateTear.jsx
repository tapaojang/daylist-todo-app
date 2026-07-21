import { useClock } from '../hooks/useClock';
// import './DateTear.css';

const WEEKDAYS_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS_SHORT = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export default function DateTear() {
  const now = useClock();

  return (
    <div className="relative flex flex-col items-center justify-center w-21 h-24
          shrink-0 overflow-hidden rounded-md shadow-sm text-white bg-[linear-gradient(160deg,#F2A9C4_0%,#EA93B4_100%)]
          
          before:content-['']
          before:absolute
          before:top-6.5
          before:left-0
          before:right-0
          before:border-t-[1.5px]
          before:border-dashed
          before:border-white/55">
      <span className="mt-2 font-mono text-[10px] font-bold tracking-[0.08em] opacity-90">{MONTHS_SHORT[now.getMonth()]}</span>
      <span className="mt-1.5 text-[32px] font-bold leading-none">{String(now.getDate()).padStart(2, '0')}</span>
      <span className="mt-1 mb-2 font-mono text-[10px] font-semibold tracking-widest opacity-90">{WEEKDAYS_SHORT[now.getDay()]}</span>
    </div>
  );
}
