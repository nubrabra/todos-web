import { cloneDeep, findIndex, get, set } from 'lodash';

export const updateStatusTodo = ({ todos = [], id = '', status = false }) => {
  const newTodos = cloneDeep(todos);
  const index = findIndex(newTodos, (todo) => todo.id === id);
  if (index >= 0) {
    const currentTodo = get(todos, index, {});
    set(newTodos, index, { ...currentTodo, completed: status });
  }

  return newTodos;
};
