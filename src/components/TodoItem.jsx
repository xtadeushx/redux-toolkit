import React from 'react';

const TodoItem = ({ id, completed, title, removeTodo, toggleTodoCompleted }) => {
  return (
    <li>
      {' '}
      <input type="checkbox" checked={completed} onChange={() => toggleTodoCompleted(id)} />
      <span>{title}</span>
      <span onClick={() => removeTodo(id)} className="delete">
        &times;
      </span>
    </li>
  );
};

export { TodoItem };
