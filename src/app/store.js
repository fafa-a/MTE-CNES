import { configureStore } from "@reduxjs/toolkit"
import formReducer from "@stores/formSlice"
import lakesReducer from "@stores/lakesSlice"

export const store = configureStore({
  reducer: {
    form: formReducer,
    lakes: lakesReducer,
    devTools: true,
  },
})
