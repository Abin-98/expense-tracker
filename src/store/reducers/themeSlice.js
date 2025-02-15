import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = { darkTheme: false, activated: false};

const themeSlice = createSlice({
    name: "theme",
    initialState: initialThemeState,
    reducers: {
      toggleDarkTheme(state) {
        state.darkTheme = !state.darkTheme;
      },
      setDarkTheme(state, action) {
        state.darkTheme = action.payload
      },
      toggleActivate(state){
        state.activated = !state.activated
      },
      setActivate(state, action){
        state.activated = action.payload
      }
    },
  });


export default themeSlice.reducer
export const themeActions = themeSlice.actions;