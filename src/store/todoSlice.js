import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fatchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}?_limit=10`);
      if (!response.ok) {
        throw new Error('Server error: ' + response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Can't delete Todo. Server error");
      }
      dispatch(removeTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  todos: [],
  status: null,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,

  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: new Date().toISOString(),
        title: action.payload.text,
        completed: false,
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodoCompleted: (state, action) => {
      const currentTodo = state.todos.find((todo) => todo.id === action.payload.id);
      currentTodo.completed = !currentTodo.completed;
    },
  },
  extraReducers: {
    [fatchTodos.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fatchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.todos = action.payload;
      state.error = null;
    },
    [fatchTodos.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { addTodo, removeTodo, toggleTodoCompleted } = todoSlice.actions;

export default todoSlice.reducer;
