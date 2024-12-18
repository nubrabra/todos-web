import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { mockTodos } from 'src/__mocks__';
// import store from 'src/store/store';
import TodoItem from 'src/components/Todo/TodoItem';
import todoReducer from 'src/store/slices/todoSlice';

describe('TodoItem Component.', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { todos: todoReducer },
    });
    jest.spyOn(store, 'dispatch'); // Mock Dispatch
  });

  it('TodoItem : Snapshot', async () => {
    render(
      <Provider store={store}>
        <table>
          <tbody>
            <TodoItem item={mockTodos[0]} />
          </tbody>
        </table>
      </Provider>
    );

    await waitFor(() => {
      expect(screen).toMatchSnapshot();
    });
  });

  it('TodoItem : Check todo item is render correct.', async () => {
    const dataTodo = mockTodos[0];

    render(
      <Provider store={store}>
        <table>
          <tbody>
            <TodoItem item={dataTodo} />
          </tbody>
        </table>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId(`todo_item_${dataTodo.id}_id`)).toHaveTextContent(dataTodo.id);
      expect(screen.getByTestId(`todo_item_${dataTodo.id}_todo`)).toHaveTextContent(dataTodo.todo);
      expect(screen.getByTestId(`todo_item_${dataTodo.id}_userId`)).toHaveTextContent(dataTodo.userId);
      const statusIcon = screen.getByTestId(`todo_item_${dataTodo.id}_status_tooltip`);
      const expectedLabel = dataTodo.completed ? 'Completed' : 'Uncompleted';
      expect(statusIcon).toHaveAttribute('aria-label', expectedLabel);
    });
  });

  it('TodoItem : Completed is false -> Check more and action Mark as completed.', async () => {
    const todoIndex = 0;
    const dataTodo = mockTodos[todoIndex];

    // Mock Service
    jest.mock('src/services/todoService', () => ({
      updateTodoInAPI: jest.fn().mockResolvedValue({
        id: mockTodos[todoIndex].id,
        todo: mockTodos[todoIndex].todo,
        userId: mockTodos[todoIndex].userId,
        completed: true,
      }),
    }));

    render(
      <Provider store={store}>
        <table>
          <tbody>
            <TodoItem item={dataTodo} />
          </tbody>
        </table>
      </Provider>
    );

    // คลิก IconButton เพื่อเปิดเมนู
    const moreButton = screen.getByLabelText(`todo_item_${dataTodo.id}_button_more`);
    fireEvent.click(moreButton);

    // ตรวจสอบ Option มีตัวเลือก "Mark as completed"
    expect(screen.getByText('Mark as completed')).toBeInTheDocument();

    // คลิก "Mark as completed"
    fireEvent.click(screen.getByText('Mark as completed'));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('TodoItem : Completed is true -> Check more and action Mark as uncompleted.', async () => {
    const todoIndex = 1;
    const dataTodo = mockTodos[todoIndex];

    // Mock Service
    jest.mock('src/services/todoService', () => ({
      updateTodoInAPI: jest.fn().mockResolvedValue({
        id: mockTodos[todoIndex].id,
        todo: mockTodos[todoIndex].todo,
        userId: mockTodos[todoIndex].userId,
        completed: false,
      }),
    }));

    render(
      <Provider store={store}>
        <table>
          <tbody>
            <TodoItem item={dataTodo} />
          </tbody>
        </table>
      </Provider>
    );

    // คลิก IconButton เพื่อเปิดเมนู
    const moreButton = screen.getByLabelText(`todo_item_${dataTodo.id}_button_more`);
    fireEvent.click(moreButton);

    // ตรวจสอบ Option มีตัวเลือก "Mark as completed"
    expect(screen.getByText('Mark as uncompleted')).toBeInTheDocument();

    // คลิก "Mark as completed"
    fireEvent.click(screen.getByText('Mark as uncompleted'));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('TodoItem : Check more and action Delete todo.', async () => {
    const todoIndex = 1;
    const dataTodo = mockTodos[todoIndex];

    // Mock Service
    jest.mock('src/services/todoService', () => ({
      deleteTodoFromAPI: jest.fn().mockResolvedValue({
        id: mockTodos[todoIndex].id,
        todo: mockTodos[todoIndex].todo,
        userId: mockTodos[todoIndex].userId,
        completed: mockTodos[todoIndex].completed,
        isDeleted: true,
      }),
    }));

    render(
      <Provider store={store}>
        <table>
          <tbody>
            <TodoItem item={dataTodo} />
          </tbody>
        </table>
      </Provider>
    );

    // คลิก IconButton เพื่อเปิดเมนู
    const moreButton = screen.getByLabelText(`todo_item_${dataTodo.id}_button_more`);
    fireEvent.click(moreButton);

    // ตรวจสอบ Option มีตัวเลือก "Mark as completed"
    expect(screen.getByText('Delete')).toBeInTheDocument();

    // คลิก "Mark as completed"
    fireEvent.click(screen.getByText('Delete'));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
