import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	dataLakes: {},
	activeLakes: [],
	activeYears: {
		2018: {
			id: "2018",
			name: "2018",
			selected: false,
			chartVisible: true,
			index: 0,
		},
		2019: {
			id: "2019",
			name: "2019",
			selected: false,
			chartVisible: true,
			index: 1,
		},
		2020: {
			id: "2020",
			name: "2020",
			selected: false,
			chartVisible: true,
			index: 2,
		},
	},
	loadedLakes: [],
	lakeIdToDesactivate: "",
	coordinatesLakeToCenter: [],
}
export const lakesSlice = createSlice({
	name: "lakes",
	initialState,
	reducers: {
		addLake: (state, action) => {
			const { lakeId, dataType, lakeData, byYear, seriePath } = action.payload
			if (state.dataLakes[lakeId]) {
				state.dataLakes[lakeId] = {
					...state.dataLakes[lakeId],
					[dataType]: {
						raw: lakeData,
						byYear,
						seriePath,
					},
				}
			}

			if (!state.dataLakes[lakeId]) {
				state.dataLakes[lakeId] = {
					[dataType]: {
						raw: lakeData,
						byYear,
						seriePath,
					},
				}
			}

			if (!state.loadedLakes.includes(lakeId)) {
				state.loadedLakes.push(lakeId)
			}
		},
		addLakeInfo: (state, action) => {
			const { lakeId, info } = action.payload
			if (state.dataLakes[lakeId]) {
				state.dataLakes[lakeId] = {
					...state.dataLakes[lakeId],
					info,
				}
			}

			if (!state.dataLakes[lakeId]) {
				state.dataLakes[lakeId] = {
					info,
				}
			}
		},
		updateActiveLakes: (state, action) => {
			const { lakeId, lakeName, lakeCoord } = action.payload
			if (!state.activeLakes.map((lake) => lake.id).includes(lakeId)) {
				state.activeLakes = [
					...state.activeLakes,
					{
						id: lakeId,
						name: lakeName,
						coordinates: lakeCoord,
						chartVisible: true,
						showInfo: false,
					},
				]
				const lastIndex = state.activeLakes.length - 1
				state.activeLakes[lastIndex].index = lastIndex
			}
			state.activeLakes = state.activeLakes.map((lake) => {
				return {
					...lake,
					selected: false,
				}
			})
		},
		updateLakeIdToDesactivate: (state, action) => {
			const { lakeId } = action.payload
			state.lakeIdToDesactivate = lakeId
		},
		desactiveLake: (state, action) => {
			const { lakeId } = action.payload
			if (state.activeLakes.map((lake) => lake.id).includes(lakeId))
				state.activeLakes = state.activeLakes.filter(
					(lake) => lake.id !== lakeId
				)
			state.lakeIdToDesactivate = ""
		},
		toggleLakeChartVisibility: (state, action) => {
			const { lakeId } = action.payload
			if (state.activeLakes.map((lake) => lake.id).includes(lakeId)) {
				state.activeLakes = state.activeLakes.map((lake) => {
					if (lake.id === lakeId) {
						return {
							...lake,
							chartVisible: !lake.chartVisible,
						}
					}
					return lake
				})
			}
		},
		setCoordinatesLakeToCenter: (state, action) => {
			const { lakeId, coordinates } = action.payload
			state.coordinatesLakeToCenter = { lakeId, coordinates }
		},
		setSelectedLake: (state, action) => {
			const { lakeId } = action.payload
			state.activeLakes = state.activeLakes.map((lake) => {
				if (lake.id === lakeId) {
					return {
						...lake,
						selected: !lake.selected,
					}
				}
				return {
					...lake,
					selected: false,
				}
			})
		},
		toggleYearsChartVisibility: (state, action) => {
			const { yearId } = action.payload
			if (state.activeYears[yearId]) {
				state.activeYears[yearId].chartVisible =
					!state.activeYears[yearId].chartVisible
			}
		},
		toggleYearSelection: (state, action) => {
			const { yearId } = action.payload
			if (state.activeYears[yearId]) {
				state.activeYears[yearId].selected = !state.activeYears[yearId].selected
			}
		},
		toggleLakeShowInfo: (state, action) => {
			const { lakeId } = action.payload
			if (state.activeLakes.map((lake) => lake.id).includes(lakeId)) {
				state.activeLakes = state.activeLakes.map((lake) => {
					if (lake.id === lakeId) {
						return {
							...lake,
							showInfo: !lake.showInfo,
						}
					}
					return lake
				})
			}
		},
		clearActiveLakes: (state) => {
			state.activeLakes = []
		},
		clearActiveYears: (state, action) => {},
	},
})

export const {
	updateActiveLakes,
	updateLakeIdToDesactivate,
	addLake,
	desactiveLake,
	setCoordinatesLakeToCenter,
	toggleLakeChartVisibility,
	setSelectedLake,
	toggleYearsChartVisibility,
	toggleYearSelection,
	addLakeInfo,
	toggleLakeShowInfo,
	clearActiveLakes,
} = lakesSlice.actions

export default lakesSlice.reducer
