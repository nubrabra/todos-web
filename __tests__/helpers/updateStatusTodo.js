import { get, find, cloneDeep, set, findIndex } from 'lodash';

import { updateStatusTodo } from 'src/helpers';
import { mockTodos } from 'src/__mocks__';

describe('test updateStatusTodo method', () => {
  it('Should success when update status completed from false => true', () => {
    const id = 14; // this id has completed is false.
    const index = findIndex(mockTodos, (todo) => todo.id === id);
    const currentTodo = get(mockTodos, index, {});
    const currentStatus = currentTodo.completed;

    // Check current status is false.
    expect(currentStatus).toEqual(false);

    // Call function updateStatusTodo.
    const res = updateStatusTodo({ todos: mockTodos, id, status: true });

    const expectDataTodos = cloneDeep(mockTodos);
    set(expectDataTodos, `[${index}].completed`, true);

    // Check new status is true.
    expect(res).toEqual(expectDataTodos);
  });
  it('Should success when update status completed from true => false', () => {
    const id = 2; // this id has completed is true.
    const index = findIndex(mockTodos, (todo) => todo.id === id);
    const currentTodo = get(mockTodos, index, {});
    const currentStatus = currentTodo.completed;

    // Check current status is false.
    expect(currentStatus).toEqual(true);

    // Call function updateStatusTodo.
    const res = updateStatusTodo({ todos: mockTodos, id, status: false });

    const expectDataTodos = cloneDeep(mockTodos);
    set(expectDataTodos, `[${index}].completed`, false);

    // Check new status is true.
    expect(res).toEqual(expectDataTodos);
  });
});
