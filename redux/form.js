import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "payload",
  initialState: { check: false, payload: [], isClicked: false, allGood: false },
  reducers: {
    toggleCheck: (state) => {
      state.check = !state.check;
    },
    setPayload: (state, action) => {
      state.payload = action.payload;
    },
    clicked: (state) => {
      state.isClicked = true;
    },
    setAllGood: (state, action) => {
      state.allGood = action.payload;
    },
  },
});

export const { setPayload, toggleCheck, clicked, setAllGood } =
  formSlice.actions;
export const formReducer = formSlice.reducer;
