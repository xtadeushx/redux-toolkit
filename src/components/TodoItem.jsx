import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodoCompleted } from '../store/todoSlice';

const TodoItem = ({ id, completed, title }) => {
  const dispatch = useDispatch();
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleTodoCompleted({ id }))}
      />
      <span>{title}</span>
      <button onClick={() => dispatch(deleteTodo(id))} className="delete" disabled={!completed}>
        &times;
      </button>
    </li>
  );
};

export { TodoItem };
