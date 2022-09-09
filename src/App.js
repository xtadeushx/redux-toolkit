import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { InputField } from './components/InputField';
import { TodoList } from './components/TodoList';
import { addTodo } from './store/todoSlice';

function App() {
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  // const addTodo = (title) => {
  //   if (text.trim().length) {
  //     setTodos((prev) => {
  //       return [
  //         ...prev,
  //         {
  //           id: new Date().toISOString(),
  //           title,
  //           completed: false,
  //         },
  //       ];
  //     });
  //     setText('');
  //   }
  // };

  // const removeTodo = (todoId) => setTodos((prev) => prev.filter((todo) => todo.id !== todoId));

  // const toggleTodoCompleted = (todoId) => {
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id !== todoId) return todo;

  //       return {
  //         ...todo,
  //         completed : !todo.completed,
  //       }

  //     }),
  //   );
  // };
  
  const handleSubmit = () => {
    dispatch(addTodo(text));
    setText('');
  };

  return (
    <div className="App">
      <InputField text={text} handleInput={setText} handleSubmit={handleSubmit} />
      <TodoList
        todos={todos}
        // removeTodo={removeTodo}
        // toggleTodoCompleted={toggleTodoCompleted}
      />
    </div>
  );
}

export default App;
