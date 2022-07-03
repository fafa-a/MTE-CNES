import { createSlice } from "@reduxjs/toolkit"
import { DataTypes, ObservationTypes } from "../config"

const initialState = {
  style: {
    default: {
      borderWidth: 1.2,
    },
    selected: {
      borderWidth: 2.2,
    },
  },
  [DataTypes.FILLING_RATE]: {
    style: {
      [ObservationTypes.OPTIC]: [
        {
          borderColor: "rgba(255, 0, 0)",
          backgroundColor: "rgba(255, 0, 0)",
          pointBackgroundColor: "rgb(255, 0, 0)",
        },
        {
          borderColor: "rgba(0, 255, 0)",
          backgroundColor: "rgba(0, 255, 0)",
          pointBackgroundColor: "rgb(0, 255, 0)",
        },
        {
          borderColor: "rgba(0, 0, 255)",
          backgroundColor: "rgba(0, 0, 255)",
          pointBackgroundColor: "rgb(0, 0, 255)",
        },
        {
          borderColor: "rgba(255, 255, 0)",
          backgroundColor: "rgba(255, 255, 0)",
          pointBackgroundColor: "rgb(255, 255, 0)",
        },
        {
          borderColor: "rgba(0, 255, 255)",
          backgroundColor: "rgba(0, 255, 255)",
          pointBackgroundColor: "rgb(0, 255, 255)",
        },
        {
          borderColor: "rgba(255, 0, 255)",
          backgroundColor: "rgba(255, 0, 255)",
          pointBackgroundColor: "rgb(255, 0, 255)",
        },
      ],
      [ObservationTypes.RADAR]: [
        {
          borderColor: "rgba(126, 0, 0 )",
          backgroundColor: "rgba(126, 0, 0 )",
          pointBackgroundColor: "rgb(126, 0, 0)",
        },
        {
          borderColor: "rgba(0, 126, 0)",
          backgroundColor: "rgba(0, 126, 0)",
          pointBackgroundColor: "rgb(0, 126, 0)",
        },
        {
          borderColor: "rgba(0, 0, 126)",
          backgroundColor: "rgba(0, 0, 126)",
          pointBackgroundColor: "rgb(0, 0, 126)",
        },
        {
          borderColor: "rgba(126, 126, 0)",
          backgroundColor: "rgba(126, 126, 0)",
          pointBackgroundColor: "rgb(126, 126, 0)",
        },
        {
          borderColor: "rgba(0, 126, 126)",
          backgroundColor: "rgba(0, 126, 126)",
          pointBackgroundColor: "rgb(0, 126, 126)",
        },
        {
          borderColor: "rgba(126, 0, 126)",
          backgroundColor: "rgba(126, 0, 126)",
          pointBackgroundColor: "rgb(126, 0, 126)",
        },
      ],
    },
  },
  [DataTypes.SURFACE]: {
    style: {
      [ObservationTypes.OPTIC]: [
        {
          borderColor: "rgba(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235)",
          pointBackgroundColor: "rgb(53, 162, 235)",
        },
        {
          borderColor: "rgba(255, 159, 64)",
          backgroundColor: "rgba(255, 159, 64)",
          pointBackgroundColor: "rgb(255, 159, 64)",
        },
        {
          borderColor: "rgba(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
        },
        {
          borderColor: "rgba(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192)",
          pointBackgroundColor: "rgb(75, 192, 192)",
        },
        {
          borderColor: "rgba(153, 102, 255)",
          backgroundColor: "rgba(153, 102, 255)",
          pointBackgroundColor: "rgb(153, 102, 255)",
        },
        {
          borderColor: "rgba(255,199,132)",
          backgroundColor: "rgba(255,199,132)",
          pointBackgroundColor: "rgb(255,199,132)",
        },
      ],
      [ObservationTypes.RADAR]: [
        {
          borderColor: "rgba(155, 100, 186)",
          backgroundColor: "rgba(155, 100, 186)",
          pointBackgroundColor: "rgb(155, 100, 186)",
        },
        {
          borderColor: "rgba(0, 100, 186)",
          backgroundColor: "rgba(0, 100, 186)",
          pointBackgroundColor: "rgb(0, 100, 186)",
        },
        {
          borderColor: "rgba(0, 186, 186)",
          backgroundColor: "rgba(0, 186, 186)",
          pointBackgroundColor: "rgb(0, 186, 186)",
        },
        {
          borderColor: "rgba(186, 100, 186)",
          backgroundColor: "rgba(186, 100, 186)",
          pointBackgroundColor: "rgb(186, 100, 186)",
        },
        {
          borderColor: "rgba(0, 186, 100)",
          backgroundColor: "rgba(0, 186, 100)",
          pointBackgroundColor: "rgb(0, 186, 100)",
        },
        {
          borderColor: "rgba(186, 0, 100)",
          backgroundColor: "rgba(186, 0, 100)",
          pointBackgroundColor: "rgb(186, 0, 100)",
        },
      ],
    },
  },
  [DataTypes.VOLUME]: {
    style: {
      [ObservationTypes.OPTIC]: [
        {
          borderColor: "rgba(127, 255, 0)",
          backgroundColor: "rgba(127, 255, 0)",
          pointBackgroundColor: "rgb(127, 255, 0)",
        },
        {
          borderColor: "rgba(0, 255, 127)",
          backgroundColor: "rgba(0, 255, 127)",
          pointBackgroundColor: "rgb(0, 255, 127)",
        },
        {
          borderColor: "rgba(0, 127, 255)",
          backgroundColor: "rgba(0, 127, 255)",
          pointBackgroundColor: "rgb(0, 127, 255)",
        },
        {
          borderColor: "rgba(255, 127, 0)",
          backgroundColor: "rgba(255, 127, 0)",
          pointBackgroundColor: "rgb(255, 127, 0)",
        },
        {
          borderColor: "rgba(127, 0, 255)",
          backgroundColor: "rgba(127, 0, 255)",
          pointBackgroundColor: "rgb(127, 0, 255)",
        },
        {
          borderColor: "rgba(255, 0, 127)",
          backgroundColor: "rgba(255, 0, 127)",
          pointBackgroundColor: "rgb(255, 0, 127)",
        },
      ],
      [ObservationTypes.RADAR]: [
        {
          borderColor: "rgba(222, 237, 25)",
          backgroundColor: "rgba(222, 237, 25)",
          pointBackgroundColor: "rgb(222, 237, 25)",
        },
        {
          borderColor: "rgba(0, 237, 222)",
          backgroundColor: "rgba(0, 237, 222)",
          pointBackgroundColor: "rgb(0, 237, 222)",
        },
        {
          borderColor: "rgba(0, 222, 237)",
          backgroundColor: "rgba(0, 222, 237)",
          pointBackgroundColor: "rgb(0, 222, 237)",
        },
        {
          borderColor: "rgba(237, 222, 0)",
          backgroundColor: "rgba(237, 222, 0)",
          pointBackgroundColor: "rgb(237, 222, 0)",
        },
        {
          borderColor: "rgba(222, 0, 237)",
          backgroundColor: "rgba(222, 0, 237)",
          pointBackgroundColor: "rgb(222, 0, 237)",
        },
        {
          borderColor: "rgba(137, 190, 222)",
          backgroundColor: "rgba(137, 190, 222)",
          pointBackgroundColor: "rgb(137, 190, 222)",
        },
      ],
    },
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
  },
})

export const { addChartData } = chartSlice.actions

export default chartSlice.reducer
