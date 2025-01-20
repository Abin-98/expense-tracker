import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = { darkTheme: false, activated: false};

const themeSlice = createSlice({
    name: "theme",
    initialState: initialThemeState,
    reducers: {
      toggleTheme(state) {
        state.darkTheme = !state.darkTheme;
      },
      toggleActivate(state){
        state.activated=!state.activated
      }
    },
  });


export default themeSlice.reducer
export const themeActions = themeSlice.actions;