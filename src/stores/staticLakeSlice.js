import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
	information: {},
	seriePath: {},
}

export const staticLakeSlice = createSlice({
	name: "information",
	initialState,
	reducers: {
		addInformation: (state, action) => {
			const { id, info } = action.payload

			state.information[id] = info
		},
		addSeriesPath: (state, action) => {
			const { id, seriePath } = action.payload

			state.seriePath[id] = seriePath
		},
	},
})

export const { addInformation } = staticLakeSlice.actions

export default staticLakeSlice.reducer
