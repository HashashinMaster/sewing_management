import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "payload",
  initialState: { check: false, isClicked: false },
  reducers: {
    toggleCheck: (state) => {
      state.check = !state.check;
    },
    clicked: (state) => {
      state.isClicked = true;
    },
  },
});

export const { toggleCheck, clicked } = formSlice.actions;
export const formReducer = formSlice.reducer;
