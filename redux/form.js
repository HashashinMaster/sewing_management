import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "payload",
  initialState: {
    check: false,
    isClicked: false,
    edit: false,
    isEditing: false,
  },
  reducers: {
    toggleCheck: (state) => {
      state.check = !state.check;
    },
    clicked: (state) => {
      state.isClicked = true;
    },
    toggleEdit: (state) => {
      state.edit = !state.edit;
    },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
  },
});

export const { toggleCheck, clicked, toggleEdit, setEditing } =
  formSlice.actions;
export const formReducer = formSlice.reducer;
