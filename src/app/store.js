import { configureStore } from "@reduxjs/toolkit"
import formReducer from "@stores/formSlice"
import lakesReducer from "@stores/lakesSlice"
import chartReducer from "@stores/chartSlice"

export const store = configureStore({
  reducer: {
    form: formReducer,
    lakes: lakesReducer,
    chart: chartReducer,
    devTools: true,
  },
})
