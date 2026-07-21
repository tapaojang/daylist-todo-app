// Mock data layer — stands in for a future API.
// Every function here is written so it can be swapped for a real
// fetch()/axios call later without changing component code.

const toDateKey = (date) => {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const today = new Date();
const offsetDate = (days) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return toDateKey(d);
};

export const STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

export const PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

let idCounter = 1000;
export const nextId = () => String(idCounter++);

// Seed data. Dates are relative to "today" so the app always looks alive.
export const initialTodos = [
  {
    id: nextId(),
    title: 'Review pull request for checkout page',
    notes: 'Focus on the delivery-selection flow and edge cases.',
    date: offsetDate(0),
    time: '09:30',
    status: STATUS.IN_PROGRESS,
    priority: PRIORITY.HIGH,
    category: 'Work',
  },
  {
    id: nextId(),
    title: 'Stand-up meeting',
    notes: '',
    date: offsetDate(0),
    time: '10:00',
    status: STATUS.COMPLETED,
    priority: PRIORITY.MEDIUM,
    category: 'Work',
  },
  {
    id: nextId(),
    title: 'Write unit tests for JWT auth filter',
    notes: 'Aim for coverage on expired-token and bad-signature cases.',
    date: offsetDate(0),
    time: '13:00',
    status: STATUS.PENDING,
    priority: PRIORITY.HIGH,
    category: 'Work',
  },
  {
    id: nextId(),
    title: 'Grocery run',
    notes: 'Eggs, rice, coffee, basil.',
    date: offsetDate(0),
    time: '18:30',
    status: STATUS.PENDING,
    priority: PRIORITY.LOW,
    category: 'Personal',
  },
  {
    id: nextId(),
    title: 'Read one chapter of "Designing Data-Intensive Apps"',
    notes: '',
    date: offsetDate(0),
    time: '21:00',
    status: STATUS.PENDING,
    priority: PRIORITY.MEDIUM,
    category: 'Learning',
  },
  {
    id: nextId(),
    title: 'Mock interview practice — system design',
    notes: 'Focus on speaking answers out loud in English.',
    date: offsetDate(1),
    time: '11:00',
    status: STATUS.PENDING,
    priority: PRIORITY.HIGH,
    category: 'Career',
  },
  {
    id: nextId(),
    title: 'Deploy staging build',
    notes: '',
    date: offsetDate(1),
    time: '15:00',
    status: STATUS.PENDING,
    priority: PRIORITY.MEDIUM,
    category: 'Work',
  },
  {
    id: nextId(),
    title: 'Dentist appointment',
    notes: 'Bldg 4, Floor 2.',
    date: offsetDate(2),
    time: '09:00',
    status: STATUS.PENDING,
    priority: PRIORITY.MEDIUM,
    category: 'Personal',
  },
  {
    id: nextId(),
    title: 'Submit resume revisions',
    notes: 'Add GitHub links and testing tools to skills section.',
    date: offsetDate(2),
    time: '17:00',
    status: STATUS.PENDING,
    priority: PRIORITY.HIGH,
    category: 'Career',
  },
  {
    id: nextId(),
    title: 'Team retro',
    notes: '',
    date: offsetDate(4),
    time: '14:00',
    status: STATUS.PENDING,
    priority: PRIORITY.LOW,
    category: 'Work',
  },
  {
    id: nextId(),
    title: 'Update CI pipeline caching',
    notes: 'Add Maven dependency cache step.',
    date: offsetDate(5),
    time: '10:30',
    status: STATUS.PENDING,
    priority: PRIORITY.MEDIUM,
    category: 'Work',
  },
  {
    id: nextId(),
    title: 'Birthday dinner — Ploy',
    notes: 'Book table for 7pm.',
    date: offsetDate(6),
    time: '19:00',
    status: STATUS.PENDING,
    priority: PRIORITY.LOW,
    category: 'Personal',
  },
  {
    id: nextId(),
    title: 'Refactor exception handling in ControllerAdvice',
    notes: '',
    date: offsetDate(-1),
    time: '16:00',
    status: STATUS.COMPLETED,
    priority: PRIORITY.MEDIUM,
    category: 'Work',
  },
  {
    id: nextId(),
    title: 'Renew gym membership',
    notes: '',
    date: offsetDate(-2),
    time: '08:00',
    status: STATUS.COMPLETED,
    priority: PRIORITY.LOW,
    category: 'Personal',
  },
  {
    id: nextId(),
    title: 'Plan Notion journal template layout',
    notes: 'Pastel palette, weekly spread.',
    date: offsetDate(9),
    time: '20:00',
    status: STATUS.PENDING,
    priority: PRIORITY.LOW,
    category: 'Personal',
  },
];

export { toDateKey };

// --- Simple checklist seed data (books to read / movies & series to watch) ---
export const initialBooks = [
  { id: 'bk-1', title: 'Designing Data-Intensive Applications', done: false },
  { id: 'bk-2', title: 'Clean Architecture', done: true },
  { id: 'bk-3', title: 'The Pragmatic Programmer', done: false },
];

export const initialMovies = [
  { id: 'mv-1', title: 'The Bear (S3)', done: false },
  { id: 'mv-2', title: 'Spirited Away', done: true },
  { id: 'mv-3', title: 'Severance', done: false },
];
