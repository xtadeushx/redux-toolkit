import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const addTodo = (title) => {
    if (text.trim().length) {
      setTodos((prev) => {
        return [
          ...prev,
          {
            id: new Date().toISOString(),
            title,
            completed: false,
          },
        ];
      });
      setText('');
    }
  };

  const removeTodo = (todoId) => setTodos((prev) => prev.filter((todo) => todo.id !== todoId));

  const toggleTodoCompleted = (todoId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== todoId) return todo;

        return {
          ...todo,
          completed : !todo.completed,
        }
      
      }),
    );
  };

  return (
    <div className="App">
      <label htmlFor="">
        <input
          type="text"
          placeholder="add todo"
          name="todos"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => addTodo(text)}>Add Todo</button>
      </label>
      <ul>
        {todos.map((el) => (
          <li key={el.id}>
            <input type="checkbox" checked={el.completed} onChange={()=>toggleTodoCompleted(el.id)} />
            <span>{el.title}</span>
            <span onClick={() => removeTodo(el.id)} className="delete">
              &times;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
