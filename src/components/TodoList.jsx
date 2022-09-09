import React from 'react';
import { TodoItem } from './TodoItem';

const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map((el) => (
        <TodoItem key={el.id} {...el} />
      ))}
    </ul>
  );
};

export { TodoList };
