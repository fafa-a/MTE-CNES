import { createSlice } from "@reduxjs/toolkit"
const colors =  [
  {
    "VOLUME" : "#bbbbbb"
  },
  {

  }
]
const initialState = {
  chart: {
    chartData: [],
    lakeName: "",
    observationType: [],
  },
}

const propal = {
  lakes: {
    16: {
      "VOLUME": "#bbbbbb"
    }
  },


}
export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    reserveLakeColors: (state, action) => {
      // je réserve 3 couleur pour l'id lake passé en paramètre
      //state.lakes.length -> nombre de lac déjà chargé
    },
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
