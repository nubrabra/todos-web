import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { find } from 'lodash';

import { mockTodos } from 'src/__mocks__';
import { fetchTodosFromAPI, addTodoToAPI, updateTodoInAPI, deleteTodoFromAPI, API_URL } from 'src/services/todoService';

describe('Services Todo.', () => {
  it('Services : fetch all todos -> fetchTodosFromAPI', async () => {
    const mock = new MockAdapter(axios);
    const attrs = { limit: 10, page: 1 };
    const skip = (attrs.page - 1) * attrs.limit;

    const data = { todos: mockTodos, total: mockTodos.length };
    mock.onGet(`${API_URL}?limit=${attrs.limit}&skip=${skip}`).reply(200, data);

    const resultFetchTodos = await fetchTodosFromAPI(attrs);

    expect(resultFetchTodos.todos).toEqual(mockTodos);
    expect(resultFetchTodos.total).toEqual(mockTodos.length);
  });

  it('Services : fetch todos with userId -> fetchTodosFromAPI', async () => {
    const mock = new MockAdapter(axios);
    const dataTodo = mockTodos[1];
    const userId = dataTodo.userId;
    const attrs = { limit: 10, page: 1, userId };
    const skip = (attrs.page - 1) * attrs.limit;

    const mockDataTodos = find(mockTodos, (todo) => todo.userId === userId);
    const dataResult = { todos: mockDataTodos, total: mockDataTodos.length };
    mock.onGet(`${API_URL}/user/${userId}?limit=${attrs.limit}&skip=${skip}`).reply(200, dataResult);

    const resultFetchTodos = await fetchTodosFromAPI(attrs);

    expect(resultFetchTodos.todos).toEqual(mockDataTodos);
    expect(resultFetchTodos.total).toEqual(mockDataTodos.length);
  });

  it('Services : create new todo -> addTodoToAPI', async () => {
    const mock = new MockAdapter(axios);
    const mockDataTodos = mockTodos[1];

    const attrs = { todo: mockDataTodos.todo, userId: mockDataTodos.userId };
    mock.onPost(`${API_URL}/add`, { ...attrs, completed: false }).reply(200, mockDataTodos);

    const resultCreateTodo = await addTodoToAPI(attrs);

    expect(resultCreateTodo).toEqual(mockDataTodos);
  });

  it('Services : mark todo as completed -> updateTodoInAPI', async () => {
    const mock = new MockAdapter(axios);
    const mockDataTodos = mockTodos[1];

    const attrs = { id: mockDataTodos.id, completed: true };
    const newDataTodo = { ...mockTodos[1], completed: true };
    mock.onPut(`${API_URL}/${mockDataTodos.id}`, { completed: attrs.completed }).reply(200, newDataTodo);

    const resultUpdateTodo = await updateTodoInAPI(attrs);

    expect(resultUpdateTodo.completed).toEqual(true);
  });

  it('Services : mark todo as uncompleted -> updateTodoInAPI', async () => {
    const mock = new MockAdapter(axios);
    const mockDataTodos = mockTodos[2];

    const attrs = { id: mockDataTodos.id, completed: false };
    const newDataTodo = { ...mockTodos[1], completed: false };
    mock.onPut(`${API_URL}/${mockDataTodos.id}`, { completed: attrs.completed }).reply(200, newDataTodo);

    const resultUpdateTodo = await updateTodoInAPI(attrs);

    expect(resultUpdateTodo.completed).toEqual(false);
  });

  it('Services : delete todo -> deleteTodoFromAPI', async () => {
    const mock = new MockAdapter(axios);
    const mockDataTodos = mockTodos[2];

    const attrs = { id: mockDataTodos.id };
    const newDataTodo = { ...mockTodos[1], isDeleted: true };
    mock.onDelete(`${API_URL}/${mockDataTodos.id}`).reply(200, newDataTodo);

    const resultUpdateTodo = await deleteTodoFromAPI(attrs);

    expect(resultUpdateTodo.isDeleted).toEqual(true);
  });
});
