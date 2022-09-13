import { createSlice } from "@reduxjs/toolkit"
import { DataTypes, DurationTypes, ObservationTypes } from "./../config"

const initialState = {
	data: {},
}

export const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		addData: (state, action) => {
			const { id, fillingRate, surface, volume } = action.payload

			console.log({ id, fillingRate, surface, volume })
			if (!state.data[id]) {
				state.data[id] = {
					[DataTypes.FILLING_RATE]: {
						[DurationTypes.DAY]: {
							raw: fillingRate.DAY.day,
							year: fillingRate.DAY.dayByYear,
						},
						[DurationTypes.PERIOD]: {
							raw: fillingRate.PERIOD.period,
							year: fillingRate.PERIOD.periodByYear,
						},
					},
					[DataTypes.SURFACE]: {
						[DurationTypes.DAY]: {
							raw: surface.DAY.day,
							year: surface.DAY.dayByYear,
						},
						[DurationTypes.PERIOD]: {
							raw: surface.PERIOD.period,
							year: surface.PERIOD.periodByYear,
						},
					},
					[DataTypes.VOLUME]: {
						[DurationTypes.DAY]: {
							raw: volume.DAY.day,
							year: volume.DAY.dayByYear,
							full: volume.DAY.dayFull,
						},
						[DurationTypes.PERIOD]: {
							raw: volume.PERIOD.period,
							year: volume.PERIOD.periodByYear,
							full: volume.PERIOD.periodFull,
						},
					},
				}
			}
		},
	},
})

export const { addData } = dataSlice.actions

export default dataSlice.reducer
