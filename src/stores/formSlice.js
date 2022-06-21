import { createSlice } from "@reduxjs/toolkit"
import { DataTypes, ObservationTypes, DurationTypes } from "@/config"

const initialState = {
  [ObservationTypes.OPTIC]: true,
  [ObservationTypes.RADAR]: true,
  [DurationTypes.DAY]: false,
  [DurationTypes.PERIOD]: true,
  dataType: DataTypes.FILLING_RATE,
}

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    toggleOptic: state => {
      state.OPTIC = !state.OPTIC
    },
    toggleRadar: state => {
      state.RADAR = !state.RADAR
    },
    toggleDay: state => {
      state.DAY = !state.DAY
    },
    togglePeriod: state => {
      state.PERIOD = !state.PERIOD
    },
    setAttributeValue: (state, action) => {
      const { value } = action.payload
      state.dataType = value
    },
    cleanForm: state => {
      state.OPTIC = false
      state.RADAR = false
      state.DAY = false
      state.PERIOD = false
      state.dataType = DataTypes.FILLING_RATE
    },
  },
})

export const {
  cleanForm,
  toggleOptic,
  toggleRadar,
  toggleDay,
  togglePeriod,
  setAttributeValue,
} = formSlice.actions

export default formSlice.reducer
