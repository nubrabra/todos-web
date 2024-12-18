import '@testing-library/jest-dom';
import React from 'react';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import { mockTodos } from 'src/__mocks__';
import store from 'src/store/store';
import * as todoService from 'src/services/todoService';
import TodoList from 'src/components/Todo/TodoList';

// Mock ฟังก์ชัน fetchTodosFromAPI
jest.mock('src/services/todoService', () => ({
  fetchTodosFromAPI: jest.fn().mockResolvedValue({ todos: mockTodos, total: mockTodos.length }),
}));

describe('TodoList Component', () => {
  it('TodoList : Snapshot.', async () => {
    // Render Component พร้อม Provider
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen).toMatchSnapshot();
    });
  });

  it('TodoList : Check list todo item is render correct.', async () => {
    // Render Component พร้อม Provider
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    await waitFor(() => {
      mockTodos.forEach((todo, index) => {
        expect(screen.getByTestId(`todo_item_${todo.id}_id`)).toHaveTextContent(todo.id);
        expect(screen.getByTestId(`todo_item_${todo.id}_todo`)).toHaveTextContent(todo.todo);
        expect(screen.getByTestId(`todo_item_${todo.id}_userId`)).toHaveTextContent(todo.userId);
        const statusIcon = screen.getByTestId(`todo_item_${todo.id}_status_tooltip`);
        const expectedLabel = todo.completed ? 'Completed' : 'Uncompleted';
        expect(statusIcon).toHaveAttribute('aria-label', expectedLabel);
      });
    });
  });

  it('TodoList : Search todos by userId', async () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    // ป้อนค่าในช่อง Search
    const searchInput = screen.getByPlaceholderText('User id');
    fireEvent.change(searchInput, { target: { value: '1' } });

    // คลิกปุ่ม Search
    fireEvent.click(screen.getByLabelText('search'));

    // ตรวจสอบว่า fetchTodos ถูกเรียกพร้อมกับ userId
    await waitFor(() => {
      expect(todoService.fetchTodosFromAPI).toHaveBeenCalledWith({ limit: 10, page: 1, userId: '1' });
    });
  });

  it('TodoList : Clear search input and fetches todos again', async () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    // ป้อนค่าในช่อง Search
    const searchInput = screen.getByPlaceholderText('User id');
    fireEvent.change(searchInput, { target: { value: '1' } });

    // คลิกปุ่ม Clear
    fireEvent.click(screen.getByLabelText('clear_search_text'));

    // ตรวจสอบช่อง Search ว่าว่างเปล่า
    expect(searchInput.value).toBe('');

    // ตรวจสอบว่า fetchTodos ถูกเรียกอีกครั้ง
    await waitFor(() => {
      expect(todoService.fetchTodosFromAPI).toHaveBeenCalledWith({ limit: 10, page: 1 });
    });
  });

  it('TodoList : Change page and dispatches setPage action', async () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    await waitFor(() => {
      // กดปุ่มไปหน้าที่ 2
      const nextButton = screen.getByLabelText('Go to next page');
      fireEvent.click(nextButton);

      // ตรวจสอบการ Dispatch setPage
      expect(store.getState().todos.page).toBe(2);
    });
  });

  it('TodoList : Change rows per page and dispatches setLimit action', async () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    await waitFor(async () => {
      // เลือก Dropdown "Rows per page"
      const rowsPerPageDropdown = screen.getByRole('combobox');
      fireEvent.mouseDown(rowsPerPageDropdown); // เปิด Dropdown ด้วย mouseDown

      // เลือกค่า "25" จาก Dropdown ที่แสดงขึ้นมา
      const option = await screen.findByRole('option', { name: '25' });
      fireEvent.click(option);

      // ตรวจสอบว่า setLimit และ setPage ถูก Dispatch
      expect(store.getState().todos.limit).toBe(25);
      expect(store.getState().todos.page).toBe(1);
    });
  });
});
