import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: {},
  activeLakes: [],
  activeYears: {
    2018: {
      id: 2018,
      name: "2018",
      selected: false,
      chartVisible: true,
      index: 0,
    },
    2019: {
      id: 2019,
      name: "2019",
      selected: false,
      chartVisible: true,
      index: 1,
    },
    2020: {
      id: 2020,
      name: "2020",
      selected: false,
      chartVisible: true,
      index: 2,
    },
  },
  loadedLakes: [],
  coordinatesLakeToCenter: [],
}
export const lakesSlice = createSlice({
  name: "lakes",
  initialState,
  reducers: {
    addLake: (state, action) => {
      const { lakeId, dataType, lakeData, lakeDataByYear, seriePath } =
        action.payload
      if (state.data[lakeId]) {
        state.data[lakeId] = {
          ...state.data[lakeId],
          [dataType]: {
            raw: lakeData,
            byYear: lakeDataByYear,
            seriePath,
          },
        }
      }

      if (!state.data[lakeId]) {
        state.data[lakeId] = {
          [dataType]: {
            raw: lakeData,
            byYear: { lakeDataByYear },
            seriePath,
          },
        }
      }

      if (!state.loadedLakes.includes(lakeId)) {
        state.loadedLakes.push(lakeId)
      }
    },
    updateActiveLakes: (state, action) => {
      const { lakeId, lakeName, lakeCoord } = action.payload
      if (!state.activeLakes.map(lake => lake.id).includes(lakeId)) {
        state.activeLakes = [
          ...state.activeLakes,
          {
            id: lakeId,
            name: lakeName,
            coordinates: lakeCoord,
            chartVisible: true,
          },
        ]
        const lastIndex = state.activeLakes.length - 1
        state.activeLakes[lastIndex].index = lastIndex
      }
      state.activeLakes = state.activeLakes.map(lake => {
        return {
          ...lake,
          selected: false,
        }
      })
    },
    desactiveLake: (state, action) => {
      const { lakeId } = action.payload
      if (state.activeLakes.map(lake => lake.id).includes(lakeId)) {
        state.activeLakes = state.activeLakes.filter(lake => lake.id !== lakeId)
      }
    },
    toggleLakeChartVisibility: (state, action) => {
      const { lakeId } = action.payload
      if (state.activeLakes.map(lake => lake.id).includes(lakeId)) {
        state.activeLakes = state.activeLakes.map(lake => {
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
      state.activeLakes = state.activeLakes.map(lake => {
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
      console.log("toggleYearSelection", yearId)
      if (state.activeYears[yearId]) {
        state.activeYears[yearId].selected = !state.activeYears[yearId].selected
      }
    },
  },
})

export const {
  updateActiveLakes,
  addLake,
  desactiveLake,
  setCoordinatesLakeToCenter,
  toggleLakeChartVisibility,
  setSelectedLake,
  toggleYearsChartVisibility,
  toggleYearSelection,
} = lakesSlice.actions

export default lakesSlice.reducer
