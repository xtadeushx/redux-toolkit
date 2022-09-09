import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { InputField } from './components/InputField';
import { TodoList } from './components/TodoList';
import { addTodo } from './store/todoSlice';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSubmit = () => {
    dispatch(addTodo({ text }));
    setText('');
  };

  return (
    <div className="App">
      <InputField text={text} handleInput={setText} handleSubmit={handleSubmit} />
      <TodoList />
    </div>
  );
}

export default App;
