import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  lake: {
    idSwot: "",
    isSelected: false,
    mainUse: "",
    name: "",
    position: [],
  },
  selectionOfLakes: [
    {
      idSwot: "",
      isSelected: false,
      mainUse: "",
      name: "",
      position: [],
    },
  ],
  groupOfLakes: [
    {
      idSwot: "",
      isSelected: false,
      group: "",
      mainUse: "",
      name: "",
      position: [],
    },
  ],
}

export const lakesSlice = createSlice({
  name: "lakes",
  initialState,
  reducers: {
    addLake: (state, action) => {
      state.lake = action.payload
    },
    addSelectionOfLakes: (state, action) => {
      state.selectionOfLakes = !state.selectionOfLakes[0].idSwot
        ? [action.payload]
        : [...state.selectionOfLakes, action.payload]
    },
  },
})
export const { addLake, addSelectionOfLakes } = lakesSlice.actions

export default lakesSlice.reducer
