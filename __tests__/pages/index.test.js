import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { map } from 'lodash';

import { mockTodos } from 'src/__mocks__';
// import { store } from 'src/store/store';
import TodoPage from 'src/pages/index';
import * as todoService from 'src/services/todoService'; // นำ API มา Mock
import todoReducer from 'src/store/slices/todoSlice'; // Path ไปยัง reducer ของคุณ

// Mock ฟังก์ชัน fetchTodosFromAPI
jest.mock('src/services/todoService', () => ({
  fetchTodosFromAPI: jest.fn(),
}));

// สร้าง Store จำลอง
// const mockStore = createStore(mockReducer);
export const mockStore = configureStore({
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
  reducer: {
    todos: todoReducer,
  },
});

describe('Page main', () => {
  it('renders page', async () => {
    // Mock การทำงานของ fetchTodosFromAPI
    todoService.fetchTodosFromAPI.mockResolvedValue(mockTodos);

    // Render Component พร้อม Provider
    render(
      <Provider store={mockStore}>
        <TodoPage />
      </Provider>
    );

    // ตรวจสอบว่าข้อมูล Mock ถูกแสดงในหน้า
    await waitFor(() => {
      expect(screen).toMatchSnapshot();
    });
  });
});
