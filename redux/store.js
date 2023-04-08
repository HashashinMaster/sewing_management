import { configureStore } from "@reduxjs/toolkit";
import { formReducer } from "./form";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
