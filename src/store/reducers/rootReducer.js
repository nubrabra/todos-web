import { combineReducers } from '@reduxjs/toolkit';

import todoReducer from 'src/store/slices/todoSlice';

// รวม Reducers ทั้งหมดไว้ที่นี่
const rootReducer = combineReducers({
  todos: todoReducer,
});

export default rootReducer;
