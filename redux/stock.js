import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    isEditing: false,
    payload: {},
  },
  reducers: {
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setPayload: (state, action) => {
      state.payload = action.payload;
    },
  },
});
export const { setEditing, setPayload } = stockSlice.actions;
export const stockReducer = stockSlice.reducer;
