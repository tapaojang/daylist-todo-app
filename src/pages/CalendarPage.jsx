import { useState } from 'react';
import { Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import CalendarGrid from '../components/CalendarGrid';
import TodoList from '../components/TodoList';
import Modal from '../components/Modal';
import TodoForm from '../components/TodoForm';
import { useTodos } from '../context/TodoContext';
import { toDateKey } from '../data/mockData';

const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatLong(date) {
  return `${WEEKDAYS_LONG[date.getDay()]}, ${date.getDate()} ${MONTHS_LONG[date.getMonth()]} ${date.getFullYear()}`;
}

export default function CalendarPage() {
  const { todosByDate, getTodosForDate, addTodo, updateTodo, deleteTodo, cycleStatus } = useTodos();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [modalMode, setModalMode] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  const selectedTodos = getTodosForDate(selectedDate);
  const isToday = toDateKey(selectedDate) === toDateKey(new Date());

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

  return (
    <div className="w-full max-w-270 mx-auto px-8 pt-8 pb-16 max-[860px]:px-4 max-[860px]:pt-5 max-[860px]:pb-25 max-[560px]:px-3 max-[560px]:pt-4 max-[560px]:pb-24">
      <Navbar eyebrow="Plan ahead" title="Calendar" />

      <div className="grid grid-cols-[1.3fr_1fr] gap-6 items-start max-[980px]:grid-cols-1">
        <CalendarGrid
          viewDate={viewDate}
          onViewDateChange={setViewDate}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          todosByDate={todosByDate}
        />

        <div className="bg-background border rounded-lg p-5 sticky top-6 max-[980px]:static">
          <div className="flex items-start justify-between gap-3 mb-5 flex-wrap">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-blue-600">{isToday ? 'Today' : 'Selected date'}</span>
              <h2 className="text-base font-bold mt-0.5 leading-[1.3]">{formatLong(selectedDate)}</h2>
            </div>
            <button type="button" className="btn btn-primary px-3.5 py-2 text-[12.5px] shrink-0" onClick={openAdd}>
              <Plus size={15} strokeWidth={2.4} />
              Add task
            </button>
          </div>

          <TodoList
            todos={selectedTodos}
            onCycleStatus={cycleStatus}
            onEdit={openEdit}
            onDelete={handleDelete}
            emptyLabel="No tasks for this date yet. Add one to start planning."
          />
        </div>
      </div>

      {modalMode && (
        <Modal title={modalMode === 'edit' ? 'Edit task' : 'Add task'} onClose={closeModal}>
          <TodoForm
            initialDate={selectedDate}
            initialValues={editingTodo}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            onDelete={handleDelete}
          />
        </Modal>
      )}
    </div>
  );
}
