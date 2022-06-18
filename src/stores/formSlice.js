import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  observationTypes: {
    optic: {
      value: "MO",
      active: true,
    },
    radar: {
      value: "MR",
      active: true,
    },
  },
  observationDurations: {
    day: {
      value: "1",
      active: false,
    },
    period: {
      value: "2",
      active: true,
    },
  },
  attributes: {
    value: "filling_rate_raw",
    active: true,
  },
}

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setObservationTypes: (state, action) => {
      const { id, active } = action.payload
      state.observationTypes[id].active = active
    },
    setObservationDuration: (state, action) => {
      const { id, active } = action.payload
      state.observationDurations[id].active = active
    },
    setAttributes: (state, action) => {
      const { value } = action.payload
      state.attributes.value = value
      state.attributes.active = true
    },
    cleanForm: (state, action) => {
      state.observationTypes.optic.active = false
      state.observationTypes.radar.active = false
      state.observationDurations.day.active = false
      state.observationDurations.period.active = false
      state.attributes.value = ""
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
