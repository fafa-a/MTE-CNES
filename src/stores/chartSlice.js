import { createSlice } from "@reduxjs/toolkit"
import { CompareTypes, DataTypes, ObservationTypes } from "../config"

const initialState = {
  style: {
    default: {
      borderWidth: 1.2,
    },
    selected: {
      borderWidth: 2.5,
    },
  },
  [CompareTypes.REFERENCE]: {
    style: {
      borderColor: "rgb(63, 78, 79)",
      backgroundColor: "rgba(63, 78, 79)",
      pointBackgroundColor: "rgba(63, 78, 79)",
    },
  },
  [CompareTypes.YEAR]: {
    style: {
      x2018: {
        [ObservationTypes.OPTIC]: {
          backgroundColor: "rgba(255, 0, 0,0.33)",
          borderColor: "rgba(255, 0, 0,0.33)",
          pointBackgroundColor: "rgba(255, 0, 0,0.33)",
        },
        [ObservationTypes.RADAR]: {
          backgroundColor: "rgba(255, 0, 0,0.66)",
          borderColor: "rgb(255, 0, 0,0.66)",
          pointBackgroundColor: "rgb(255, 0, 0,0.66)",
        },
        [CompareTypes.REFERENCE]: {
          backgroundColor: "rgba(255, 0, 0)",
          borderColor: "rgb(255, 0, 0)",
          pointBackgroundColor: "rgb(255, 0, 0)",
        },
      },
      x2019: {
        [ObservationTypes.OPTIC]: {
          backgroundColor: "rgba(255, 125, 0,0.33)",
          borderColor: "rgba(255, 125, 0,0.33)",
          pointBackgroundColor: "rgba(255, 125, 0,0.33)",
        },
        [ObservationTypes.RADAR]: {
          backgroundColor: "rgb(255, 125, 0,0.66)",
          borderColor: "rgb(255, 125, 0,0.66)",
          pointBackgroundColor: "rgb(255, 125, 0,0.66)",
        },
        [CompareTypes.REFERENCE]: {
          backgroundColor: "rgba(255, 125, 0)",
          borderColor: "rgb(255, 125, 0)",
          pointBackgroundColor: "rgb(255, 125, 0)",
        },
      },
      x2020: {
        [ObservationTypes.OPTIC]: {
          backgroundColor: "rgba(0, 0, 255,0.33)",
          borderColor: "rgba(0, 0, 255,0.33)",
          pointBackgroundColor: "rgba(0, 0, 255,0.33)",
        },
        [ObservationTypes.RADAR]: {
          backgroundColor: "rgb(0, 0, 255,0.66)",
          borderColor: "rgb(0, 0, 255,0.66)",
          pointBackgroundColor: "rgb(0, 0, 255,0.66)",
        },
        [CompareTypes.REFERENCE]: {
          backgroundColor: "rgba(0, 0, 250)",
          borderColor: "rgb(0, 0, 255)",
          pointBackgroundColor: "rgb(0, 0, 255)",
        },
      },
    },
  },
  [DataTypes.FILLING_RATE]: {
    style: {
      [ObservationTypes.OPTIC]: [
        {
          borderColor: "rgba(255, 0, 0,0.33)",
          backgroundColor: "rgba(255, 0, 0,0.33)",
          pointBackgroundColor: "rgb(255, 0, 0,0.33)",
        },
        {
          borderColor: "rgba(0, 255, 0,0.33)",
          backgroundColor: "rgba(0, 255, 0,0.33)",
          pointBackgroundColor: "rgb(0, 255, 0,0.33)",
        },
        {
          borderColor: "rgba(0, 0, 255,0.33)",
          backgroundColor: "rgba(0, 0, 255,0.33)",
          pointBackgroundColor: "rgb(0, 0, 255,0.33)",
        },
        {
          borderColor: "rgba(255, 255, 0,0.33)",
          backgroundColor: "rgba(255, 255, 0,0.33)",
          pointBackgroundColor: "rgb(255, 255, 0,0.33)",
        },
        {
          borderColor: "rgba(0, 255, 255,0.33)",
          backgroundColor: "rgba(0, 255, 255,0.33)",
          pointBackgroundColor: "rgb(0, 255, 255,0.33)",
        },
        {
          borderColor: "rgba(255, 0, 255,0.33)",
          backgroundColor: "rgba(255, 0, 255,0.33)",
          pointBackgroundColor: "rgb(255, 0, 255,0.33)",
        },
        {
          borderColor: "rgba(0, 100, 255 ,0.33)",
          backgroundColor: "rgba(0, 100, 255 ,0.33)",
          pointBackgroundColor: "rgb(0, 100, 255 ,0.33)",
        },
        {
          borderColor: "rgba(255, 100, 0,0.33)",
          backgroundColor: "rgba(255, 100, 0,0.33)",
          pointBackgroundColor: "rgb(255, 100, 0,0.33)",
        },
        {
          borderColor: "rgba(0, 255, 100,0.33)",
          backgroundColor: "rgba(0, 255, 100,0.33)",
          pointBackgroundColor: "rgb(0, 255, 100,0.33)",
        },
        {
          borderColor: "rgba(255, 0, 100,0.33)",
          backgroundColor: "rgba(255, 0, 100,0.33)",
          pointBackgroundColor: "rgb(255, 0, 100,0.33)",
        },
      ],
      [ObservationTypes.RADAR]: [
        {
          borderColor: "rgba(255, 0, 0,0.66)",
          backgroundColor: "rgba(255, 0, 0,0.66)",
          pointBackgroundColor: "rgb(255, 0, 0,0.66)",
        },
        {
          borderColor: "rgba(0, 255, 0,0.66)",
          backgroundColor: "rgba(0, 255, 0,0.66)",
          pointBackgroundColor: "rgb(0, 255, 0,0.66)",
        },
        {
          borderColor: "rgba(0, 0, 255,0.66)",
          backgroundColor: "rgba(0, 0, 255,0.66)",
          pointBackgroundColor: "rgb(0, 0, 255,0.66)",
        },
        {
          borderColor: "rgba(255, 255, 0,0.66)",
          backgroundColor: "rgba(255, 255, 0,0.66)",
          pointBackgroundColor: "rgb(255, 255, 0,0.66)",
        },
        {
          borderColor: "rgba(0, 255, 255,0.66)",
          backgroundColor: "rgba(0, 255, 255,0.66)",
          pointBackgroundColor: "rgb(0, 255, 255,0.66)",
        },
        {
          borderColor: "rgba(255, 0, 255,0.66)",
          backgroundColor: "rgba(255, 0, 255,0.66)",
          pointBackgroundColor: "rgb(255, 0, 255,0.66)",
        },
        {
          borderColor: "rgba(0, 100, 255,0.66)",
          backgroundColor: "rgba(0, 100, 255,0.66)",
          pointBackgroundColor: "rgb(0, 100, 255,0.66)",
        },
        {
          borderColor: "rgba(255, 100, 0,0.66)",
          backgroundColor: "rgba(255, 100, 0,0.66)",
          pointBackgroundColor: "rgb(255, 100, 0,0.66)",
        },
        {
          borderColor: "rgba(0, 255, 100,0.66)",
          backgroundColor: "rgba(0, 255, 100,0.66)",
          pointBackgroundColor: "rgb(0, 255, 100,0.66)",
        },
        {
          borderColor: "rgba(255, 0, 100,0.66)",
          backgroundColor: "rgba(255, 0, 100,0.66)",
          pointBackgroundColor: "rgb(255, 0, 100,0.66)",
        },
      ],
      [CompareTypes.REFERENCE]: [
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
        {
          borderColor: "rgba(0, 100, 255)",
          backgroundColor: "rgba(0, 100, 255)",
          pointBackgroundColor: "rgb(0, 100, 255)",
        },
        {
          borderColor: "rgba(255, 100, 0)",
          backgroundColor: "rgba(255, 100, 0)",
          pointBackgroundColor: "rgb(255, 100, 0)",
        },
        {
          borderColor: "rgba(0, 255, 100)",
          backgroundColor: "rgba(0, 255, 100)",
          pointBackgroundColor: "rgb(0, 255, 100)",
        },
        {
          borderColor: "rgba(255, 0, 100)",
          backgroundColor: "rgba(255, 0, 100)",
          pointBackgroundColor: "rgb(255, 0, 100)",
        },
      ],
    },
  },
  [DataTypes.SURFACE]: {
    style: {
      [ObservationTypes.OPTIC]: [
        {
          borderColor: "rgba(155, 100, 186,0.33)",
          backgroundColor: "rgba(155, 100, 186,0.33)",
          pointBackgroundColor: "rgb(155, 100, 186,0.33)",
        },
        {
          borderColor: "rgba(0, 100, 186,0.33)",
          backgroundColor: "rgba(0, 100, 186,0.33)",
          pointBackgroundColor: "rgb(0, 100, 186,0.33)",
        },
        {
          borderColor: "rgba(0, 186, 186,0.33)",
          backgroundColor: "rgba(0, 186, 186,0.33)",
          pointBackgroundColor: "rgb(0, 186, 186,0.33)",
        },
        {
          borderColor: "rgba(186, 100, 186,0.33)",
          backgroundColor: "rgba(186, 100, 186,0.33)",
          pointBackgroundColor: "rgb(186, 100, 186,0.33)",
        },
        {
          borderColor: "rgba(0, 186, 100,0.33)",
          backgroundColor: "rgba(0, 186, 100,0.33)",
          pointBackgroundColor: "rgb(0, 186, 100,0.33)",
        },
        {
          borderColor: "rgba(186, 0, 100,0.33)",
          backgroundColor: "rgba(186, 0, 100,0.33)",
          pointBackgroundColor: "rgb(186, 0, 100,0.33)",
        },
        {
          borderColor: "rgba(0, 186, 0,0.33)",
          backgroundColor: "rgba(0, 186, 0,0.33)",
          pointBackgroundColor: "rgb(0, 186, 0,0.33)",
        },
        {
          borderColor: "rgba(186, 0, 0,0.33)",
          backgroundColor: "rgba(186, 0, 0,0.33)",
          pointBackgroundColor: "rgb(186, 0, 0,0.33)",
        },
        {
          borderColor: "rgba(0, 186, 186,0.33)",
          backgroundColor: "rgba(0, 186, 186,0.33)",
          pointBackgroundColor: "rgb(0, 186, 186,0.33)",
        },
        {
          borderColor: "rgba(186, 0, 186,0.33)",
          backgroundColor: "rgba(186, 0, 186,0.33)",
          pointBackgroundColor: "rgb(186, 0, 186,0.33)",
        },
      ],
      [ObservationTypes.RADAR]: [
        {
          borderColor: "rgba(155, 100, 186,0.66)",
          backgroundColor: "rgba(155, 100, 186,0.66)",
          pointBackgroundColor: "rgb(155, 100, 186,0.66)",
        },
        {
          borderColor: "rgba(0, 100, 186,0.66)",
          backgroundColor: "rgba(0, 100, 186,0.66)",
          pointBackgroundColor: "rgb(0, 100, 186,0.66)",
        },
        {
          borderColor: "rgba(0, 186, 186,0.66)",
          backgroundColor: "rgba(0, 186, 186,0.66)",
          pointBackgroundColor: "rgb(0, 186, 186,0.66)",
        },
        {
          borderColor: "rgba(186, 100, 186,0.66)",
          backgroundColor: "rgba(186, 100, 186,0.66)",
          pointBackgroundColor: "rgb(186, 100, 186,0.66)",
        },
        {
          borderColor: "rgba(0, 186, 100,0.66)",
          backgroundColor: "rgba(0, 186, 100,0.66)",
          pointBackgroundColor: "rgb(0, 186, 100,0.66)",
        },
        {
          borderColor: "rgba(186, 0, 100,0.66)",
          backgroundColor: "rgba(186, 0, 100,0.66)",
          pointBackgroundColor: "rgb(186, 0, 100,0.66)",
        },
        {
          borderColor: "rgba(0, 186, 0,0.66)",
          backgroundColor: "rgba(0, 186, 0,0.66)",
          pointBackgroundColor: "rgb(0, 186, 0,0.66)",
        },
        {
          borderColor: "rgba(186, 0, 0,0.66)",
          backgroundColor: "rgba(186, 0, 0,0.66)",
          pointBackgroundColor: "rgb(186, 0, 0,0.66)",
        },
        {
          borderColor: "rgba(0, 186, 186,0.66)",
          backgroundColor: "rgba(0, 186, 186,0.66)",
          pointBackgroundColor: "rgb(0, 186, 186,0.66)",
        },
        {
          borderColor: "rgba(186, 0, 186,0.66)",
          backgroundColor: "rgba(186, 0, 186,0.66)",
          pointBackgroundColor: "rgb(186, 0, 186,0.66)",
        },
      ],
      [CompareTypes.REFERENCE]: [
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
        {
          borderColor: "rgba(0, 186, 0)",
          backgroundColor: "rgba(0, 186, 0)",
          pointBackgroundColor: "rgb(0, 186, 0)",
        },
        {
          borderColor: "rgba(186, 0, 0)",
          backgroundColor: "rgba(186, 0, 0)",
          pointBackgroundColor: "rgb(186, 0, 0)",
        },
        {
          borderColor: "rgba(0, 186, 186)",
          backgroundColor: "rgba(0, 186, 186)",
          pointBackgroundColor: "rgb(0, 186, 186)",
        },
        {
          borderColor: "rgba(186, 0, 186)",
          backgroundColor: "rgba(186, 0, 186)",
          pointBackgroundColor: "rgb(186, 0, 186)",
        },
      ],
    },
  },
  [DataTypes.VOLUME]: {
    style: {
      [ObservationTypes.OPTIC]: [
        {
          borderColor: "rgba(222, 237, 25,0.33)",
          backgroundColor: "rgba(222, 237, 25,0.33)",
          pointBackgroundColor: "rgb(222, 237, 25,0.33)",
        },
        {
          borderColor: "rgba(0, 237, 222,0.33)",
          backgroundColor: "rgba(0, 237, 222,0.33)",
          pointBackgroundColor: "rgb(0, 237, 222,0.33)",
        },
        {
          borderColor: "rgba(0, 222, 237,0.33)",
          backgroundColor: "rgba(0, 222, 237,0.33)",
          pointBackgroundColor: "rgb(0, 222, 237,0.33)",
        },
        {
          borderColor: "rgba(237, 222, 0,0.33)",
          backgroundColor: "rgba(237, 222, 0,0.33)",
          pointBackgroundColor: "rgb(237, 222, 0,0.33)",
        },
        {
          borderColor: "rgba(222, 0, 237,0.33)",
          backgroundColor: "rgba(222, 0, 237,0.33)",
          pointBackgroundColor: "rgb(222, 0, 237,0.33)",
        },
        {
          borderColor: "rgba(137, 190, 222,0.33)",
          backgroundColor: "rgba(137, 190, 222,0.33)",
          pointBackgroundColor: "rgb(137, 190, 222,0.33)",
        },
        {
          borderColor: "rgba(222, 137, 190,0.33)",
          backgroundColor: "rgba(222, 137, 190,0.33)",
          pointBackgroundColor: "rgb(222, 137, 190,0.33)",
        },
        {
          borderColor: "rgba(190, 137, 222,0.33)",
          backgroundColor: "rgba(190, 137, 222,0.33)",
          pointBackgroundColor: "rgb(190, 137, 222,0.33)",
        },
        {
          borderColor: "rgba(222, 190, 137,0.33)",
          backgroundColor: "rgba(222, 190, 137,0.33)",
          pointBackgroundColor: "rgb(222, 190, 137,0.33)",
        },
        {
          borderColor: "rgba(190, 222, 137,0.33)",
          backgroundColor: "rgba(190, 222, 137,0.33)",
          pointBackgroundColor: "rgb(190, 222, 137,0.33)",
        },
      ],
      [ObservationTypes.RADAR]: [
        {
          borderColor: "rgba(222, 237, 25,0.66)",
          backgroundColor: "rgba(222, 237, 25,0.66)",
          pointBackgroundColor: "rgb(222, 237, 25,0.66)",
        },
        {
          borderColor: "rgba(0, 237, 222,0.66)",
          backgroundColor: "rgba(0, 237, 222,0.66)",
          pointBackgroundColor: "rgb(0, 237, 222,0.66)",
        },
        {
          borderColor: "rgba(0, 222, 237,0.66)",
          backgroundColor: "rgba(0, 222, 237,0.66)",
          pointBackgroundColor: "rgb(0, 222, 237,0.66)",
        },
        {
          borderColor: "rgba(237, 222, 0,0.66)",
          backgroundColor: "rgba(237, 222, 0,0.66)",
          pointBackgroundColor: "rgb(237, 222, 0,0.66)",
        },
        {
          borderColor: "rgba(222, 0, 237,0.66)",
          backgroundColor: "rgba(222, 0, 237,0.66)",
          pointBackgroundColor: "rgb(222, 0, 237,0.66)",
        },
        {
          borderColor: "rgba(137, 190, 222,0.66)",
          backgroundColor: "rgba(137, 190, 222,0.66)",
          pointBackgroundColor: "rgb(137, 190, 222,0.66)",
        },
        {
          borderColor: "rgba(222, 137, 190,0.66)",
          backgroundColor: "rgba(222, 137, 190,0.66)",
          pointBackgroundColor: "rgb(222, 137, 190,0.66)",
        },
        {
          borderColor: "rgba(190, 137, 222,0.66)",
          backgroundColor: "rgba(190, 137, 222,0.66)",
          pointBackgroundColor: "rgb(190, 137, 222,0.66)",
        },
        {
          borderColor: "rgba(222, 190, 137,0.66)",
          backgroundColor: "rgba(222, 190, 137,0.66)",
          pointBackgroundColor: "rgb(222, 190, 137,0.66)",
        },
        {
          borderColor: "rgba(190, 222, 137,0.66)",
          backgroundColor: "rgba(190, 222, 137,0.66)",
          pointBackgroundColor: "rgb(190, 222, 137,0.66)",
        },
      ],
      [CompareTypes.REFERENCE]: [
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
        {
          borderColor: "rgba(222, 137, 190)",
          backgroundColor: "rgba(222, 137, 190)",
          pointBackgroundColor: "rgb(222, 137, 190)",
        },
        {
          borderColor: "rgba(190, 137, 222)",
          backgroundColor: "rgba(190, 137, 222)",
          pointBackgroundColor: "rgb(190, 137, 222)",
        },
        {
          borderColor: "rgba(222, 190, 137)",
          backgroundColor: "rgba(222, 190, 137)",
          pointBackgroundColor: "rgb(222, 190, 137)",
        },
        {
          borderColor: "rgba(190, 222, 137)",
          backgroundColor: "rgba(190, 222, 137)",
          pointBackgroundColor: "rgb(190, 222, 137)",
        },
      ],
    },
  },
}

export const chartSlice = createSlice({
  name: "chart",
  initialState,
})

export const { addChartData } = chartSlice.actions

export default chartSlice.reducer
