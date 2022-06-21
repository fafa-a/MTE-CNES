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
  dataLakes: {},
  loadedLakes: [],
}
export const lakesSlice = createSlice({
  name: "lakes",
  initialState,
  reducers: {
    addLake: (state, action) => {
      if (!state.data[action.lakeId]) {
        // load data into data
        //data[action.lakeId] = processData(...)
      }
      if (!state.activeLakes.include(action.lakeId)) {
        state.activeLakes.push(action.lakeId)
      }
    },
  },
})

export const { addLake } = lakesSlice.actions

export default lakesSlice.reducer

