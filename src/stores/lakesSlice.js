import { createSlice } from "@reduxjs/toolkit"

// Initial state
// {
//   dataLakes:{
//     $idSwot:{
//       $dataType:[$data],
//     }
//   }
//   loadedLakes:[$idSwot,$idSwot,$idSwot]
// }

const initialState = {
  data: {},
  activeLakes: [],
  loadedLakes: [],
  coordinatesLakeToCenter: [],
}
export const lakesSlice = createSlice({
  name: "lakes",
  initialState,
  reducers: {
    addLake: (state, action) => {
      const { lakeId, dataType, lakeData } = action.payload

      if (state.data[lakeId]) {
        state.data[lakeId] = {
          ...state.data[lakeId],
          [dataType]: lakeData,
        }
      }

      if (!state.data[lakeId]) {
        state.data[lakeId] = {
          [dataType]: lakeData,
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
  },
})

export const {
  updateActiveLakes,
  addLake,
  desactiveLake,
  setCoordinatesLakeToCenter,
  toggleLakeChartVisibility,
  setSelectedLake,
} = lakesSlice.actions

export default lakesSlice.reducer
