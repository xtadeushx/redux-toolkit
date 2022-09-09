import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodoCompleted } from '../store/todoSlice';

const TodoItem = ({ id, completed, title }) => {
  const dispatch = useDispatch();

  return (
    <li>
      {' '}
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleTodoCompleted(id))}
      />
      <span>{title}</span>
      <span onClick={() => dispatch(removeTodo(id))} className="delete">
        &times;
      </span>
    </li>
  );
};

export { TodoItem };
