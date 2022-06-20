import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  chart: {
    chartData: [],
    lakeName: "",
    observationType: [],
  },
}
export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    addChartData: (state, action) => {
      const { chartData, lakeName, observationType } = action.payload
      state.chart.chartData = chartData
      state.chart.lakeName = lakeName
      state.chart.observationType = observationType
    },
  },
})

export const { addChartData } = chartSlice.actions

export default chartSlice.reducer
