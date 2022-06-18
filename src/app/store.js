import { configureStore } from "@reduxjs/toolkit"
import formReducer from "@stores/formSlice"

export const store = configureStore({
  reducer: {
    form: formReducer,
    devTools: true,
  },
})
