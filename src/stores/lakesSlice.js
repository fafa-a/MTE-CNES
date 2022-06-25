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

      if (!state.activeLakes.includes(lakeId)) {
        state.activeLakes.push(lakeId)
      }
    },
    desactiveLake: (state, action) => {
      const { lakeId } = action.payload

      if (state.activeLakes.includes(lakeId)) {
        state.activeLakes = state.activeLakes.filter(id => id !== lakeId)
      }
    },
  },
})

export const { addLake, desactiveLake } = lakesSlice.actions

export default lakesSlice.reducer

