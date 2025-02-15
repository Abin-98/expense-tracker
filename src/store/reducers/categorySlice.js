import { createSlice } from "@reduxjs/toolkit";

const initialCategoryState = {
  hardCodedList: [
    "Food",
    "Petrol",
    "Entertainment",
    "Travel",
    "Education",
    "Rent",
    "Clothes",
    "Furniture",
    "Hospital-bills",
    "Donation",
    "Investment",
    "Groceries",
    "Kitchen-utensils",
    "Maintenance",
    "Repair",
    "Assets-Profit",
    "Savings",
    "Salary",
  ],
  optionsList: {},
};

const categorySlice = createSlice({
  name: "categories",
  initialState: initialCategoryState,
  reducers: {
    setOptionsList(state, action) {
      state.optionsList = {...action.payload}
    }
  },
});

export default categorySlice.reducer;
export const categoryActions = categorySlice.actions;
