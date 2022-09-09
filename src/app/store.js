import { configureStore } from "@reduxjs/toolkit"
import formReducer from "@stores/formSlice"
import lakesReducer from "@stores/lakesSlice"
import chartReducer from "@stores/chartSlice"
import staticLakeSlice from "@stores/staticLakeSlice"

export const store = configureStore({
  reducer: {
    form: formReducer,
    lakes: lakesReducer,
    chart: chartReducer,
    information: staticLakeSlice,
    devTools: true,
  },
})
