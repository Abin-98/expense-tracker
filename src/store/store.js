import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/authSlice'
import expenseReducer from './reducers/expenseSlice'
import themeReducer from './reducers/themeSlice'
import categoryReducer from './reducers/categorySlice'

const store = configureStore({
  reducer: { 
    auth: authReducer, 
    expense: expenseReducer,
    theme: themeReducer,
    category: categoryReducer
  },
});

export default store;
