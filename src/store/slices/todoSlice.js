import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';

import { fetchTodosFromAPI, addTodoToAPI, deleteTodoFromAPI, updateTodoInAPI } from 'src/services/todoService';
import { updateStatusTodo } from 'src/helpers';

// Thunk Actions
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async ({ limit, page, userId }) => {
  const data = await fetchTodosFromAPI({ limit, page, userId });
  return data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async ({ todo, userId }) => {
  return await addTodoToAPI({ todo, userId });
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async ({ id }) => {
  return await deleteTodoFromAPI({ id });
});

export const markTodoCompleted = createAsyncThunk('todos/markTodoCompleted', async ({ id }) => {
  return await updateTodoInAPI({ id, completed: true });
});

export const markTodoUnCompleted = createAsyncThunk('todos/markTodoUnCompleted', async ({ id }) => {
  return await updateTodoInAPI({ id, completed: false });
});

// Slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    total: 0, // จำนวนรายการทั้งหมด
    limit: 10, // จำนวนรายการต่อหน้า
    page: 1, // หน้าปัจจุบัน
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload; // อัปเดตหมายจำนวนข้อมูล
    },
    setSuccess(state, action) {
      state.success = action.payload; // อัปเดตหมายจำนวนข้อมูล
    },
    setError(state, action) {
      state.error = action.payload; // อัปเดตหมายจำนวนข้อมูล
    },
    setPage(state, action) {
      state.page = action.payload; // อัปเดตหมายเลขหน้า
    },
    setLimit(state, action) {
      state.limit = action.payload; // อัปเดตหมายจำนวนข้อมูล
    },
    onClearAlert(state, action) {
      // เคลียข้อความ alert
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos; // อัปเดตรายการ todos
        state.total = action.payload.total; // อัปเดตรวมรายการ
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = `Cannot get todo list : ${action.error.message}`;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        const currentTodos = cloneDeep(state.todos);
        state.todos = [action.payload, ...currentTodos];
        state.success = 'Create todo success.';
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = `Create todo fail: ${action.error.message}`;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
        state.success = 'Delete todo success.';
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = `Delete todo fail : ${action.error.message}`;
      })
      .addCase(markTodoCompleted.pending, (state) => {
        state.loading = true;
      })
      .addCase(markTodoCompleted.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.id;
        const newTodos = updateStatusTodo({
          todos: state.todos,
          id,
          status: true,
        });
        state.todos = newTodos;
        state.success = 'Mark as todo completed success.';
      })
      .addCase(markTodoCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = `Mark as todo completed fail : ${action.error.message}`;
      })
      .addCase(markTodoUnCompleted.pending, (state) => {
        state.loading = true;
      })
      .addCase(markTodoUnCompleted.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.id;
        const newTodos = updateStatusTodo({
          todos: state.todos,
          id,
          status: false,
        });
        state.todos = newTodos;
        state.success = 'Mark as todo uncompleted success.';
      })
      .addCase(markTodoUnCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = `Mark as todo uncompleted fail : ${action.error.message}`;
      });
  },
});

export const { setLoading, setSuccess, setError, setPage, setLimit, onClearAlert } = todoSlice.actions;

// Export Reducer
export default todoSlice.reducer;
