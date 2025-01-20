import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { idToken: localStorage.getItem('idToken') || ''};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
      setIdToken(state, action) {
        state.idToken = action.payload;
      },
    },
  });


export default authSlice.reducer
export const authActions = authSlice.actions;