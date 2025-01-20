import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/authSlice'
import expenseReducer from './reducers/expenseSlice'
const store = configureStore({
  reducer: { 
    auth: authReducer, 
    expense: expenseReducer 
  },
});

export default store;
