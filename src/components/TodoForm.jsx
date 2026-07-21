import { useState } from 'react';
import { STATUS, PRIORITY, toDateKey } from '../data/mockData';
// import './TodoForm.css';

const CATEGORIES = ['Work', 'Personal', 'Learning', 'Career', 'Health'];

export default function TodoForm({ initialDate, initialValues, onSubmit, onCancel, onDelete }) {
  const isEditing = Boolean(initialValues);

  const [title, setTitle] = useState(initialValues?.title || '');
  const [notes, setNotes] = useState(initialValues?.notes || '');
  const [date, setDate] = useState(initialValues?.date || toDateKey(initialDate));
  const [time, setTime] = useState(initialValues?.time || '09:00');
  const [status, setStatus] = useState(initialValues?.status || STATUS.PENDING);
  const [priority, setPriority] = useState(initialValues?.priority || PRIORITY.MEDIUM);
  const [category, setCategory] = useState(initialValues?.category || CATEGORIES[0]);
  const [error, setError] = useState('');

  const inputClass = 'w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text.sm outline-none transition focus:border-pink-500';
  const labelClass = "text-[12.5px] font-semibold text-gray-600";
  const buttonBase =
    "inline-flex items-center justify-center gap-1.5 rounded-md px-[18px] py-[10px] text-[13.5px] font-semibold transition active:scale-95";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Give the task a title before saving.');
      return;
    }
    onSubmit({ title: title.trim(), notes: notes.trim(), date, time, status, priority, category });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className={labelClass}>Task title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError(''); }}
          placeholder="e.g. Review pull request"
          autoFocus
          className={inputClass}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="notes" className={labelClass}>Notes (optional)</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any extra detail…"
          rows={3}
          className={`${inputClass} resize-y`}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="date" className={labelClass}>Date</label>
          <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} 
            className={inputClass}/>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="time" className={labelClass}>Time</label>
          <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass}/>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="category" className={labelClass}>Category</label>
          <select id="category" className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="priority" className={labelClass}>Priority</label>
          <select id="priority" className={inputClass} value={priority} onChange={(e) => setPriority(e.target.value)}>
            {Object.values(PRIORITY).map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="status" className={labelClass}>Status</label>
        <select id="status" className={inputClass} value={status} onChange={(e) => setStatus(e.target.value)}>
          {Object.values(STATUS).map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        {isEditing && (
          <button
            type="button"
            className={`${buttonBase} bg-red-100 text-red-600 hover:bg-red-200`}
            onClick={() => onDelete(initialValues.id)}
          >
            Delete task
          </button>
        )}
        <div className="ml-auto flex gap-2">
          <button type="button" className={`${buttonBase} bg-gray-100 text-gray-700 hover:bg-gray-200`} onClick={onCancel}>Cancel</button>
          <button type="submit" className={`${buttonBase} bg-pink-500 text-white hover:bg-pink-600`}>{isEditing ? 'Save changes' : 'Add task'}</button>
        </div>
      </div>
    </form>
  );
}
