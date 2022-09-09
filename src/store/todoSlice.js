import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,

  reducers: {
    addTodo : (state, action)=>{
        state.todos = [
            ...state.todos,
            {
              id: new Date().toISOString(),
              title: action.payload,
              completed: false,
            },
          ]
    },
    removeTodo : (state, action)=>{
        state.todos =  state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodoCompleted:(state, action)=>{
        state.todos =  state.todos.map((todo) => {
            if (todo.id !==  action.payload) return todo;
    
            return {
              ...todo,
              completed : !todo.completed,
            }    
          })
    }
  },
});


export const {addTodo, removeTodo, toggleTodoCompleted} = todoSlice.actions;

export default todoSlice.reducer;
