import { configureStore } from "@reduxjs/toolkit";
import { formReducer } from "./form";
import { stockReducer } from "./stock";

export const store = configureStore({
  reducer: {
    form: formReducer,
    stock: stockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
