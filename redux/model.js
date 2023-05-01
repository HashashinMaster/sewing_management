import { createSlice } from "@reduxjs/toolkit";

const modelSlice = createSlice({
  name: "model",
  initialState: {
    show: false,
    isEditing: false,
    data: {},
  },
  reducers: {
    togglePopUp: (state) => {
      state.show = !state.show;
      if (state.isEditing) state.isEditing = false;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
  },
});
export const { togglePopUp, setData, setIsEditing } = modelSlice.actions;
export const modelReducer = modelSlice.reducer;
