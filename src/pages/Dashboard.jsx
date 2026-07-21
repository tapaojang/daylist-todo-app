import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, BookOpen, Clapperboard, CalendarDays } from 'lucide-react';
import {
  Box,
  Button,
  Stack,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { X } from 'lucide-react';

import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import DateTear from '../components/DateTear';
import DeskClock from '../components/DeskClock';
import SummaryStats from '../components/SummaryStats';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import ChecklistCard from '../components/ChecklistCard';
import CalendarGrid from '../components/CalendarGrid';
import HeroBannerEditorDialog from '../components/HeroBannerEditorDialog';
import { useTodos } from '../context/TodoContext';
import { initialBooks, initialMovies, nextId } from '../data/mockData';
import defaultCatMascot from '../assets/cat-mascot.svg';

const HERO_TITLE = 'journal ₊✩‧₊˚౨ৎ˚₊✩‧₊';
const HERO_BANNER_INITIAL = {
  title: HERO_TITLE,
  mascotSrc: defaultCatMascot,
  mascotAlt: 'Cute cat mascot',
};

export default function Dashboard() {
  const { todosByDate, getTodosForDate, addTodo, updateTodo, deleteTodo, cycleStatus } = useTodos();

  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [editingTodo, setEditingTodo] = useState(null);
  const [heroBanner, setHeroBanner] = useState(HERO_BANNER_INITIAL);
  const [heroEditorOpen, setHeroEditorOpen] = useState(false);

  const [books, setBooks] = useState(initialBooks);
  const [movies, setMovies] = useState(initialMovies);

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const today = new Date();
  const todayTodos = getTodosForDate(today);

  const openAdd = () => { setEditingTodo(null); setModalMode('add'); };
  const openEdit = (todo) => { setEditingTodo(todo); setModalMode('edit'); };
  const closeModal = () => { setModalMode(null); setEditingTodo(null); };

  const handleSubmit = (values) => {
    if (modalMode === 'edit' && editingTodo) {
      updateTodo(editingTodo.id, values);
    } else {
      addTodo(values);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    deleteTodo(id);
    closeModal();
  };

  const openHeroEditor = () => setHeroEditorOpen(true);
  const closeHeroEditor = () => setHeroEditorOpen(false);
  const saveHeroBanner = (nextHeroBanner) => {
    setHeroBanner(nextHeroBanner);
    closeHeroEditor();
  };

  const makeListHandlers = (setList) => ({
    onToggle: (id) => setList((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i))),
    onAdd: (title) => setList((prev) => [...prev, { id: nextId(), title, done: false }]),
    onRemove: (id) => setList((prev) => prev.filter((i) => i.id !== id)),
  });

  const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <Box className="w-full max-w-270 mx-auto px-8 pt-8 pb-16 max-[860px]:px-4 max-[860px]:pt-5 max-[860px]:pb-25 max-[560px]:px-3 max-[560px]:pt-4 max-[560px]:pb-24">
      {/* Header */}
      <HeroBanner
        title={heroBanner.title}
        mascotSrc={heroBanner.mascotSrc}
        mascotAlt={heroBanner.mascotAlt}
        onEdit={openHeroEditor}
      />

      <Navbar eyebrow="Today">
        <Typography sx={{ color: 'text.secondary', fontSize: 14, mr: 1, display: { xs: 'none', sm: 'block' } }}>
          🍵 welcome to my daily journal
        </Typography>
        <Button variant="contained" startIcon={<Plus size={18} />} onClick={openAdd}>
          Add Todo
        </Button>
      </Navbar>

      <Box className="grid grid-cols-[300px_1fr] gap-12.5 items-start mt-6 max-[980px]:grid-cols-1">
        {/* Left column: clock + reading/watch lists */}
        <Stack spacing={3} className="sticky top-6 max-[980px]:static">
          <Stack direction="row" spacing={2}>
            <DateTear />
            <Box flex={1}>
              <DeskClock />
            </Box>
          </Stack>

          <Paper
            variant="outlined"
            sx={{
              p: 2.5,
              borderRadius: 1.5,
              borderStyle: 'dashed',
              borderColor: 'var(--color-border-strong)',
              background: 'var(--color-surface)',
            }}
          >
            <Stack spacing={2.5} divider={<Divider flexItem />}>
              <ChecklistCard
                title="Books to read"
                icon={<BookOpen size={15} style={{marginTop: '4px', marginRight: '8px'}}/>}
                items={books}
                {...makeListHandlers(setBooks)}
              />
              <ChecklistCard
                title="Movies & series"
                icon={<Clapperboard size={15} style={{marginTop: '1px', marginRight: '8px'}}/>}
                items={movies}
                {...makeListHandlers(setMovies)}
              />
            </Stack>
          </Paper>
        </Stack>

        {/* Right column: today's stats + tasks + month glance */}
        <Stack spacing={3} className="dashboard-col-main">
          <SummaryStats todos={todayTodos} />

          <Box>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className='text-[17px] font-bold'>Today's tasks</h2>
              <span className="text-[12.5px] text-gray-500 font-mono">{todayTodos.length} total</span>
            </div>
            <TodoList
              todos={todayTodos}
              onCycleStatus={cycleStatus}
              onEdit={openEdit}
              onDelete={handleDelete}
              emptyLabel="No tasks scheduled for today. Add one to get started."
            />
          </Box>

          <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CalendarDays size={16} />
                <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15 }}>
                  {monthLabel}
                </Typography>
              </Stack>
              <Button component={Link} to="/calendar" size="small" sx={{ fontSize: 12.5 }}>
                View full calendar
              </Button>
            </Stack>
            <CalendarGrid
              compact
              viewDate={viewDate}
              onViewDateChange={setViewDate}
              selectedDate={today}
              onSelectDate={() => {}}
              todosByDate={todosByDate}
            />
          </Box>
        </Stack>
      </Box>

      <Dialog open={Boolean(modalMode)} onClose={closeModal} fullWidth maxWidth="xs">
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {modalMode === 'edit' ? 'Edit task' : 'Add new todo'}
          <IconButton size="small" onClick={closeModal} aria-label="Close dialog">
            <X size={18} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TodoForm
            initialDate={today}
            initialValues={editingTodo}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            onDelete={handleDelete}
          />
        </DialogContent>
      </Dialog>

      <HeroBannerEditorDialog
        open={heroEditorOpen}
        initialValues={heroBanner}
        onClose={closeHeroEditor}
        onSave={saveHeroBanner}
      />
    </Box>
  );
}
