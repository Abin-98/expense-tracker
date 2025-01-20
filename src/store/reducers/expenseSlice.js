import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = { expenseList: {} };

const expenseSlice = createSlice({
    name: "expenses",
    initialState: initialExpenseState,
    reducers: {
      setExpenseList(state, action) {
        state.expenseList = {...action.payload}
      },
    },
  });

export default expenseSlice.reducer
export const expenseActions = expenseSlice.actions;