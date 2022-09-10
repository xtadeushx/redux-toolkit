import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InputField } from './components/InputField';
import { TodoList } from './components/TodoList';
import { addTodo, fatchTodos } from './store/todoSlice';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const { status, error, todos } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fatchTodos());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(addTodo({ text }));
    setText('');
  };

  return (
    <div className="App">
      <InputField text={text} handleInput={setText} handleSubmit={handleSubmit} />
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      {todos.length ? <TodoList /> : <h2>You haven't Todos for today!!! </h2>}
    </div>
  );
}

export default App;
