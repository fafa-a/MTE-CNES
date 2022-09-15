import { configureStore } from "@reduxjs/toolkit"
import formReducer from "@stores/formSlice"
import lakesReducer from "@stores/lakesSlice"
import chartReducer from "@stores/chartSlice"
import staticLakeSlice from "@stores/staticLakeSlice"
import stateLakeSlice from "@stores/stateLakeSlice"
import dataSlice from "@stores/dataSlice"
import lakesChartOptionsSlice from "@stores/lakesChartOptionsSlice"

export const store = configureStore({
	reducer: {
		form: formReducer,
		lakes: lakesReducer,
		chart: chartReducer,
		information: staticLakeSlice,
		stateLake: stateLakeSlice,
		data: dataSlice,
		lakesChartOptions: lakesChartOptionsSlice,
		devTools: true,
	},
})
