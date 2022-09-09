import React from 'react';
import { useSelector } from 'react-redux';
import { TodoItem } from './TodoItem';

const TodoList = () => {
  const getTodos = (state) => state.todos;
  const { todos } = useSelector(getTodos);

  return (
    <ul>
      {todos.map((el) => (
        <TodoItem key={el.id} {...el} />
      ))}
    </ul>
  );
};

export { TodoList };
