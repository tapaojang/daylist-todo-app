import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { initialTodos, nextId, toDateKey, STATUS } from '../data/mockData';

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = useCallback((todo) => {
    setTodos((prev) => [
      ...prev,
      {
        id: nextId(),
        status: STATUS.PENDING,
        priority: 'Medium',
        notes: '',
        time: '09:00',
        category: 'Personal',
        ...todo,
      },
    ]);
  }, []);

  const updateTodo = useCallback((id, patch) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const cycleStatus = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const order = [STATUS.PENDING, STATUS.IN_PROGRESS, STATUS.COMPLETED];
        const next = order[(order.indexOf(t.status) + 1) % order.length];
        return { ...t, status: next };
      })
    );
  }, []);

  const todosByDate = useMemo(() => {
    const map = {};
    for (const t of todos) {
      if (!map[t.date]) map[t.date] = [];
      map[t.date].push(t);
    }
    Object.values(map).forEach((list) =>
      list.sort((a, b) => a.time.localeCompare(b.time))
    );
    return map;
  }, [todos]);

  const getTodosForDate = useCallback(
    (date) => todosByDate[toDateKey(date)] || [],
    [todosByDate]
  );

  const value = {
    todos,
    todosByDate,
    getTodosForDate,
    addTodo,
    updateTodo,
    deleteTodo,
    cycleStatus,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodos must be used within a TodoProvider');
  return ctx;
}
