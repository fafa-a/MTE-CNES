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
      const { lakeId, dataType, lakeData, lakeName, lakeCoord } = action.payload

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

      if (!state.activeLakes.map(lake => lake.id).includes(lakeId)) {
        state.activeLakes = [
          ...state.activeLakes,
          { id: lakeId, name: lakeName, coordinates: lakeCoord },
        ]
      }
    },
    desactiveLake: (state, action) => {
      const { lakeId } = action.payload
      if (state.activeLakes.map(lake => lake.id).includes(lakeId)) {
        state.activeLakes = state.activeLakes.filter(lake => lake.id !== lakeId)
      }
    },
    setCoordinatesLakeToCenter: (state, action) => {
      const { coordinates } = action.payload
      state.coordinatesLakeToCenter = coordinates
    },
  },
})

export const { addLake, desactiveLake, setCoordinatesLakeToCenter } = lakesSlice.actions

export default lakesSlice.reducer
