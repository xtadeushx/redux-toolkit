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

      if (!response.ok) {
        throw new Error("Can't delete Todo. Server error");
      }
      dispatch(removeTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const toggleStatus = createAsyncThunk(
  'todos/toggleStatus',
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    console.log(todo);
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Can't toggle status. Server error");
      }

      dispatch(toggleTodoCompleted({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        userId: 1,
        title: text,
        completed: false,
      };
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error("Can't add newTodo. Server error");
      }

      const data = await response.json();

      dispatch(addTodo(data));
      console.log(data);
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

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,

  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
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
      state.error = null;
      state.todos = action.payload;
    },

    [deleteTodo.rejected]: setError,

    [toggleStatus.rejected]: setError,

    [addNewTodo.rejected]: setError,
  },
});

export const { addTodo, removeTodo, toggleTodoCompleted } = todoSlice.actions;

export default todoSlice.reducer;
