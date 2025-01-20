import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/authSlice'
import expenseReducer from './reducers/expenseSlice'
import themeReducer from './reducers/themeSlice'

const store = configureStore({
  reducer: { 
    auth: authReducer, 
    expense: expenseReducer,
    theme: themeReducer
  },
});

export default store;
