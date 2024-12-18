import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// import store from 'src/store/store';
import todoReducer from 'src/store/slices/todoSlice';
import TodoForm from 'src/components/Todo/TodoForm';

const dataCreateTodo = {
  todo: 'Learn Testing',
  userId: '1234',
};

// Mock ฟังก์ชัน addTodo
jest.mock('src/services/todoService', () => ({
  addTodoToAPI: jest.fn().mockResolvedValue({
    id: '1',
    todo: dataCreateTodo.todo,
    userId: dataCreateTodo.userId,
    completed: true,
  }),
}));

describe('TodoForm Component', () => {
  let store;

  beforeAll(() => {
    store = configureStore({
      reducer: { todos: todoReducer },
    });
    jest.spyOn(store, 'dispatch'); // Mock Dispatch
  });

  it('TodoForm : Snapshot.', async () => {
    // Render Component พร้อม Provider
    render(
      <Provider store={store}>
        <TodoForm />
      </Provider>
    );

    await waitFor(() => {
      expect(screen).toMatchSnapshot();
    });
  });

  it('TodoForm : Open the dialog when clicking New Todos', () => {
    render(
      <Provider store={store}>
        <TodoForm />
      </Provider>
    );

    // เปิด Dialog
    fireEvent.click(screen.getByTestId('button-open-dialog'));

    // ตรวจสอบว่า Dialog เปิดขึ้น
    expect(screen.getByText(/add new todos/i)).toBeInTheDocument();
  });

  it('TodoForm : Validate required fields and shows errors', async () => {
    render(
      <Provider store={store}>
        <TodoForm />
      </Provider>
    );

    // เปิด Dialog
    fireEvent.click(screen.getByTestId('button-open-dialog'));

    // คลิก Submit
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(async () => {
      // ตรวจสอบ Error Messages
      expect(await screen.findByText(/todo is required/i)).toBeInTheDocument();
      expect(screen.getByText(/user id is required/i)).toBeInTheDocument();
    });
  });

  it('TodoForm : Validate userId pattern (non-numeric or > 8 digits)', async () => {
    render(
      <Provider store={store}>
        <TodoForm />
      </Provider>
    );

    // เปิด Dialog
    fireEvent.click(screen.getByTestId('button-open-dialog'));

    // กรอกข้อมูลผิดใน User ID : required number.
    fireEvent.input(screen.getByLabelText(/user id/i), { target: { value: 'abcd12345' } });

    // คลิก Submit
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(async () => {
      // ตรวจสอบ Validation Message
      expect(await screen.findByText(/user id must be a number and up to 8 digits/i)).toBeInTheDocument();
    });
  });

  it('TodoForm : Dispatch addTodo with correct input values', async () => {
    render(
      <Provider store={store}>
        <TodoForm />
      </Provider>
    );

    // เปิด Dialog
    fireEvent.click(screen.getByTestId('button-open-dialog'));

    // กรอกข้อมูล
    fireEvent.input(screen.getByTestId('input-todo'), { target: { value: dataCreateTodo.todo } });
    fireEvent.input(screen.getByTestId('input-userId'), { target: { value: dataCreateTodo.userId } });

    // คลิก Submit
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    // ตรวจสอบว่า Dispatch ถูกเรียก
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  it('TodoForm : Close the dialog when clicking Cancel', async () => {
    render(
      <Provider store={store}>
        <TodoForm />
      </Provider>
    );

    // เปิด Dialog
    fireEvent.click(screen.getByTestId('button-open-dialog'));

    // คลิก Cancel
    fireEvent.click(screen.getByTestId('button-close-dialog'));

    // ตรวจสอบว่า Dispatch ถูกเรียก
    await waitFor(() => {
      // ตรวจสอบว่า Dialog ถูกปิด
      expect(screen.queryByText(/add new todos/i)).not.toBeInTheDocument();
    });
  });
});
