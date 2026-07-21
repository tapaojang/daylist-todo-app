<<<<<<< HEAD
# Daylist — Todo Dashboard (UI Prototype)

A React.js frontend for a Todo application, built with mock data only. No backend, no API calls, no authentication — everything lives in memory for the session so the UI can be reviewed and extended before wiring up a real API.

## Features

**Dashboard**
- Live date and real-time clock
- Summary of today's tasks (total, completed, in progress, pending, progress bar)
- List of today's todos with time, category, priority and status
- "Add New Todo" button opens a modal form
- Status badges (Pending / In Progress / Completed) — click a badge to cycle status

**Calendar**
- Full monthly calendar with prev/next month navigation and "Today" shortcut
- Dates with scheduled tasks show colored dots (by status), so density is visible at a glance
- Selecting a date shows that day's todos in a side panel
- Add or edit todos for any date, past or future

## Tech stack

- React 19 + Vite
- react-router-dom for the two routes (`/` and `/calendar`)
- lucide-react for icons
- Plain CSS with a token system (`src/styles/tokens.css`) — no CSS framework, so it's easy to restyle

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/     Reusable UI pieces (Sidebar, Navbar, TodoCard, TodoForm, StatusBadge, CalendarGrid, ...)
  pages/          Dashboard.jsx, CalendarPage.jsx
  context/        TodoContext.jsx — in-memory state shared across pages (add/edit/delete/cycle status)
  data/           mockData.js — seed todos and constants (STATUS, PRIORITY)
  hooks/          useClock.js — drives the real-time clock
  styles/         tokens.css — design tokens (color, type, spacing, radius, shadow)
```

## Wiring up a real backend later

All data access goes through `src/context/TodoContext.jsx`. To connect a real API:

1. Replace the `useState(initialTodos)` seed with a fetch on mount.
2. Swap `addTodo` / `updateTodo` / `deleteTodo` / `cycleStatus` to call your API, then update local state from the response (or use a data-fetching library like React Query).
3. No component outside of `TodoContext.jsx` needs to change — pages and components only consume the context.
=======
# daylist-todo-app
>>>>>>> 7184e62eaa975cf70b070e51ddeb2ef079f44051
