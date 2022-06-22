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
  loadedLakes: [],
}
export const lakesSlice = createSlice({
  name: "lakes",
  initialState,
  reducers: {
    addLake: (state, action) => {
      const { lakeId, dataType, lakeData } = action.payload
      console.log({ action })
      if (!state.data[lakeId]) {
        state.data[lakeId] = {
          [dataType]: lakeData,
        }
      }
      // if (state.data[lakeId]) {
      //   state.data[lakeId] = {
      //     ...state.data[lakeId].dataType,
      //     [dataType]: data,
      //   }
      // }
      if (!state.loadedLakes.includes(lakeId)) {
        state.loadedLakes.push(lakeId)
      }
    },
  },
})

export const { addLake } = lakesSlice.actions

export default lakesSlice.reducer

