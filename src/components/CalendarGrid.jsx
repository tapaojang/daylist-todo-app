import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toDateKey } from '../data/mockData';
import clsx from "clsx";

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function buildGrid(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);

  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    cells.push(d);
  }
  return cells;
}

export default function CalendarGrid({ viewDate, onViewDateChange, selectedDate, onSelectDate, todosByDate, compact = false }) {
  const cells = buildGrid(viewDate);
  const currentMonth = viewDate.getMonth();
  const todayKey = toDateKey(new Date());
  const selectedKey = toDateKey(selectedDate);

  const goPrevMonth = () => onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const goNextMonth = () => onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  const goToday = () => {
    const t = new Date();
    onViewDateChange(new Date(t.getFullYear(), t.getMonth(), 1));
    onSelectDate(t);
  };

  return (
    <div className={clsx("bg-background border border-border rounded-lg p-5",
      compact && 'rounded-md p-4'
    )}>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className={clsx("text-[18px] font-bold", compact && "text-[15px]")}>
          <h2>{MONTHS[currentMonth]} {viewDate.getFullYear()}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className={
            clsx("px-4 py-2 rounded-md border text-sm hover:bg-muted transition",
              compact && "px-3 py-1.75 text-[12px]"
            )
          } onClick={goToday}>Today</button>
          <button type="button" className="icon-btn bg-muted w-7.5 h-7.5 rounded-md" onClick={goPrevMonth} aria-label="Previous month">
            <ChevronLeft size={16} strokeWidth={2.2} />
          </button>
          <button type="button" className="icon-btn bg-muted w-7.5 h-7.5 rounded-md" onClick={goNextMonth} aria-label="Next month">
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {WEEKDAY_LABELS.map((w) => <span className='text-center text-[11px] font-semibold uppercase tracking-[0.04em] text-muted-foreground pb-2' key={w}>{w}</span>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date) => {
          const key = toDateKey(date);
          const inMonth = date.getMonth() === currentMonth;
          const isToday = key === todayKey;
          const isSelected = key === selectedKey;
          const dayTodos = todosByDate[key] || [];
          const count = dayTodos.length;

          return (
            <button
              type="button"
              key={key}
              onClick={() => onSelectDate(date)}
              className={clsx(
                "relative flex flex-col items-center justify-start rounded-lg border border-transparent bg-transparent transition-colors hover:bg-muted",
                compact
                  ? "aspect-[1/0.72] p-[4px_2px] gap-0.5"
                  : "aspect-[1/0.82] p-[6px_4px] gap-1",
                !inMonth && "opacity-50",
                isToday && "border-primary",
                isSelected && "bg-primary border-primary"
              )}
            >
              <span
                className={clsx(
                  compact ? "text-[11.5px]" : "text-[13px]",
                  "font-semibold max-[560px]:text-[12px]",
                  !inMonth && "text-muted-foreground",
                  isToday && !isSelected && "text-primary",
                  isSelected && "text-pink-500"
                )}
              >
                {date.getDate()}
              </span>

              {count > 0 && (
                <div className="flex items-center justify-center gap-0.75 flex-wrap">
                  {dayTodos.slice(0, 3).map((t) => (
                    <span
                      key={t.id}
                      className={clsx(
                        "w-1.25 h-1.25 rounded-full",
                        isSelected
                          ? "bg-white/85"
                          : t.status === "Pending"
                          ? "bg-yellow-500"
                          : t.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      )}
                    />
                  ))}

                  {count > 3 && (
                    <span
                      className={clsx(
                        "text-[8px] font-bold",
                        isSelected ? "text-white/85" : "text-muted-foreground"
                      )}
                    >
                      +{count - 3}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
