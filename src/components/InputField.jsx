import React from 'react';

const InputField = ({ text, handleInput, handleSubmit }) => {
  return (
    <label htmlFor="">
      <input
        type="text"
        placeholder="add todo"
        name="todos"
        value={text}
        onChange={(e) => handleInput(e.target.value)}
      />
      <button onClick={() => handleSubmit(text)}>Add Todo</button>
    </label>
  );
};

export { InputField };
