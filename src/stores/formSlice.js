import { createSlice, createReducer } from "@reduxjs/toolkit"

const initialState = {
  observationTypes: ["MO", "MR"],
  observationDurations: "2",
  attributes: "filling_rate_raw",
}

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setObservationTypes: (state, action) => {
      if (state.observationTypes.includes(action.payload)) {
        state.observationTypes = state.observationTypes.filter(
          observationType => observationType !== action.payload
        )
      } else {
        state.observationTypes = [...state.observationTypes, action.payload]
      }
    },
    setObservationDuration: (state, action) => {
      state.observationDurations = action.payload
    },
    setAttributes: (state, action) => {
      state.attributes = action.payload
    },
    cleanForm: state => {
      state.observationTypes = []
      state.observationDurations = ""
      state.attributes = ""
    },
  },
})

export const {
  cleanForm,
  setObservationTypes,
  setObservationDuration,
  setAttributes,
} = formSlice.actions

export default formSlice.reducer
