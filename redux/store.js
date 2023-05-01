import { configureStore } from "@reduxjs/toolkit";
import { formReducer } from "./form";
import { stockReducer } from "./stock";
import { modelReducer } from "./model";
export const store = configureStore({
  reducer: {
    form: formReducer,
    stock: stockReducer,
    model: modelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
