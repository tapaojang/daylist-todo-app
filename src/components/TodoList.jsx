import TodoCard from './TodoCard';
import EmptyState from './EmptyState';
// import './TodoList.css';

export default function TodoList({ todos, onCycleStatus, onEdit, onDelete, emptyLabel }) {
  if (todos.length === 0) {
    return <EmptyState label={emptyLabel} />;
  }

  return (
    <div className="flex flex-col gap-3">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onCycleStatus={onCycleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
