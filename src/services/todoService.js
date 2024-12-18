import axios from 'axios';

export const API_URL = '/api/todos'; // Proxy Backend URL

export const fetchTodosFromAPI = async ({ limit = 10, page = 1, userId = '' }) => {
  let url = API_URL;
  if (userId) {
    url += `/user/${userId}`;
  }
  const skip = (page - 1) * limit; // คำนวณ skip สำหรับ pagination
  const response = await axios.get(`${url}?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const addTodoToAPI = async ({ todo, userId }) => {
  const response = await axios.post(`${API_URL}/add`, {
    todo,
    userId,
    completed: false,
  });
  return response.data;
};

export const updateTodoInAPI = async ({ id, completed }) => {
  const response = await axios.put(`${API_URL}/${id}`, { completed });
  return response.data;
};

export const deleteTodoFromAPI = async ({ id }) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
