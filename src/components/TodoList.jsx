import React from 'react';
import { TodoItem } from './TodoItem';

const TodoList = ({ todos, removeTodo, toggleTodoCompleted }) => {
  return (
    <ul>
      {todos.map((el) => (
        <TodoItem
          key={el.id}
          {...el}
          removeTodo={removeTodo}
          toggleTodoCompleted={toggleTodoCompleted}
        />
      ))}
    </ul>
  );
};

export { TodoList };
