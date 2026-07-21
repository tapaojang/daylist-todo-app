import { useClock } from '../hooks/useClock';
// import './DeskClock.css';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const pad = (n) => String(n).padStart(2, '0');

export default function DeskClock() {
  const now = useClock();
  const h = pad(now.getHours());
  const m = pad(now.getMinutes());
  const s = pad(now.getSeconds());

  return (
    <div className="flex items-center gap-5 flex-wrap rounded-lg border border-border
              bg-background text-foreground shadow-sm px-6 py-5 max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-3">
      <div className="flex flex-col gap-0.5 pr-5 border-r border-dashed border-gray-300
              max-[560px]:border-r-0 max-[560px]:pr-0">
        <span className="font-semibold text-[15px]">{WEEKDAYS[now.getDay()]}</span>
        <span className="text-[12px] text-muted-foreground">
          {now.getDate()} {MONTHS[now.getMonth()]} {now.getFullYear()}
        </span>
      </div>
      <div aria-label="Current time" 
          className="flex items-baseline font-mono text-[28px] font-semibold tracking-tight tabular-nums
                    text-pink-700 max-[560px]:text-[24px]" >
        <span className="bg-pink-100 rounded-lg px-1.5 py-0.5 min-w-[1.6em] text-center">{h}</span>
        <span className="mx-0.75 opacity-40 text-muted-foreground">:</span>
        <span className="bg-pink-100 rounded-lg px-1.5 py-0.5 min-w-[1.6em] text-center">{m}</span>
        <span className="mx-0.75 opacity-40 text-muted-foreground">:</span>
        <span className="bg-violet-100 text-violet-700 rounded-lg px-1.5 py-0.5 min-w-[1.6em] text-center">{s}</span>
      </div>
    </div>
  );
}
