import { createSlice } from "@reduxjs/toolkit"
import {
	DataTypes,
	ObservationTypes,
	DurationTypes,
	ChartTypes,
	ModeTypes,
} from "@/config"

const initialState = {
	[ObservationTypes.OPTIC]: true,
	[ObservationTypes.RADAR]: true,
	[ObservationTypes.REFERENCE]: true,
	[DurationTypes.DAY]: false,
	[DurationTypes.PERIOD]: true,
	dataType: DataTypes.FILLING_RATE,
	charType: ChartTypes.LINE,
	[ModeTypes.YEAR]: false,
	[ModeTypes.VOLUME]: false,
	isCleared: false,
}

export const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		toggleOptic: (state) => {
			state.OPTIC = !state.OPTIC
			state.isCleared = false
		},
		toggleRadar: (state) => {
			state.RADAR = !state.RADAR
			state.isCleared = false
		},
		toggleDay: (state) => {
      state.PERIOD = !state.PERIOD
			state.DAY = !state.DAY
			state.isCleared = false
		},
		togglePeriod: (state) => {
      state.DAY = !state.DAY
			state.PERIOD = !state.PERIOD
			state.isCleared = false
		},
		setAttributeValue: (state, action) => {
			const { value } = action.payload
			state.dataType = value
			state.isCleared = false
		},
		setChartType: (state, action) => {
			const { value } = action.payload
			state.charType = value
			state.isCleared = false
		},
		toggleReference: (state) => {
			state.REFERENCE = !state.REFERENCE
			state.isCleared = false
		},
		toggleYear: (state) => {
			state.YEAR = !state.YEAR
			state.isCleared = false
		},
		toggleVolume: (state) => {
			state.VOLUME = !state.VOLUME
			state.isCleared = false
		},
		cleanForm: (state) => {
			state.OPTIC = false
			state.RADAR = false
			state.DAY = false
			state.PERIOD = false
			state.dataType = DataTypes.FILLING_RATE
			state.charType = ChartTypes.LINE
			state.REFERENCE = false
			state.YEAR = false
			state.isCleared = true
		},
	},
})

export const {
	cleanForm,
	toggleOptic,
	toggleRadar,
	toggleDay,
	togglePeriod,
	setChartType,
	setAttributeValue,
	toggleReference,
	toggleYear,
	toggleVolume,
} = formSlice.actions

export default formSlice.reducer
