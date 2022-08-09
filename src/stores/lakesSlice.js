import { createSlice, current } from "@reduxjs/toolkit"
import { DataTypes } from "../config"
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
	totalVolume: [],
	lakeIdToDesactivate: "",
	coordinatesLakeToCenter: [],
}
let lastByVolume
let lastLakeData
let lastDataTypes
let lastId
let lastObsDepth
export const lakesSlice = createSlice({
	name: "lakes",
	initialState,
	reducers: {
		addLake: (state, action) => {
			const {
				lakeId,
				dataType,
				lakeData,
				byYear,
				byVolume,
				seriePath,
				obsDepth,
			} = action.payload
			if (
				lakeId === lastId &&
				dataType === lastDataTypes &&
				lastObsDepth === obsDepth
			)
				return
			if (lastLakeData === JSON.stringify(lakeData)) return
			if (!byYear) return

			if (!state.dataLakes[lakeId][dataType]) {
				state.dataLakes[lakeId][dataType] = {
					[obsDepth]: {
						raw: lakeData,
						byYear,
						byVolume,
						seriePath,
					},
				}
			}

			// if (state.dataLakes[lakeId][dataType]) {
			// 	state.dataLakes[lakeId][dataType] = {
			// 		...state.dataLakes[lakeId][dataType],
			// 		[obsDepth]: {
			// 			raw: lakeData,
			// 			byYear,
			// 			byVolume,
			// 			seriePath,
			// 		},
			// 	}
			// }

			if (state.dataLakes[lakeId][dataType]) {
				if (
					dataType === DataTypes.VOLUME &&
					JSON.stringify(byVolume) === lastByVolume
				)
					return

				state.dataLakes[lakeId][dataType] = {
					...state.dataLakes[lakeId][dataType],
					[obsDepth]: {
						raw: lakeData,
						byYear,
						byVolume,
						seriePath,
					},
				}
			}

			lastLakeData = JSON.stringify(lakeData)
			lastDataTypes = dataType
			lastId = lakeId
			lastObsDepth = obsDepth
			lastByVolume = JSON.stringify(byVolume)

			if (dataType === DataTypes.VOLUME) {
				if (state.totalVolume.length === 0) {
					state.totalVolume = byVolume
				} else {
					if (byVolume[0].length >= state.totalVolume[0]?.length) {
						const firstDate = state.totalVolume[0][0].date
						const lastDate = state.totalVolume[0].at(-1).date
						byVolume.map((obs) => {
							return obs.filter((el) => {
								return el.date >= firstDate && el.date <= lastDate
							})
						})
						state.totalVolume = state.totalVolume.map((obs, index) => {
							return obs.map((el, i) => {
								const { date, value } = byVolume[index][i]
								if (el.date === date) {
									return {
										date: el.date,
										value: el.value + value,
									}
								}
							})
						})
					}
					if (state.totalVolume[0]?.length > byVolume[0].length) {
						const firstDate = byVolume[0][0].date
						const lastDate = byVolume[0].at(-1).date
						state.totalVolume = state.totalVolume.map((obs) => {
							return obs.filter((el) => {
								return el.date >= firstDate && el.date <= lastDate
							})
						})
						state.totalVolume = state.totalVolume.map((obs, index) => {
							return obs.map((el, i) => {
								const { date, value } = byVolume[index][i]
								if (el.date === date) {
									return {
										date: el.date,
										value: el.value + value,
									}
								}
							})
						})
					}
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
			if (state.activeLakes.length === 0) {
				state.totalVolume = []
			}
			if (state.activeLakes.length > 0) {
				state.totalVolume = state.totalVolume.map((obs, index) => {
					return obs.map((el, i) => {
						const { date, value } =
							state.dataLakes[lakeId][DataTypes.VOLUME].byVolume[index][i]
						if (el.date === date) {
							return {
								date: el.date,
								value: el.value - value,
							}
						}
					})
				})
			}
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
