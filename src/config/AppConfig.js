import DATA_TYPES from "./DataTypes"
import OBSERVATION_TYPES from "./ObservationTypes"
import DURATION_TYPES from "./DurationTypes"

const config = {
  attributes: {
    [DATA_TYPES.FILLING_RATE]: {
      style: [
        {
          borderColor: "rgb(255, 0, 0)",
          backgroundColor: "rgba(255, 0, 0)",
          // pointBackgroundColor: "#760000",
        },
        {
          borderColor: "rgb(126, 0, 0)",
          backgroundColor: "rgba(126, 0, 0 )",
          // pointBackgroundColor: "#5C0000",
        },
      ],
      borderWidth: 1.2,
      tension: 0,
      // pointRadius: 1.4,
      pointRadius: 0,
      label: "Filling rate",
      filePath: "filling_rate_raw",
      unit: "%",
      actionReducers: "setAttributes",
    },
    [DATA_TYPES.SURFACE]: {
      style: [
        {
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235)",
          // pointBackgroundColor: "#000F45",
        },
        {
          borderColor: "rgb(155, 100, 186)",
          backgroundColor: "rgba(155, 100, 186)",
          // pointBackgroundColor: "#65368C",
        },
      ],
      borderWidth: 1.2,
      tension: 0,
      pointRadius: 0,
      label: "Surface",
      filePath: "surface",
      label: "Surface",
      filePath: "surface_raw",
      unit: "ha",
    },
    [DATA_TYPES.VOLUME]: {
      style: [
        {
          borderColor: "rgb(127, 255, 0)",
          backgroundColor: "rgba(127, 255, 0)",
          // pointBackgroundColor: "#006900",
        },
        {
          borderColor: "rgb(222, 237, 25)",
          backgroundColor: "rgba(222, 237, 25)",
          // pointBackgroundColor: "#465E00",
        },
      ],
      borderWidth: 1.2,
      tension: 0,
      pointRadius: 0,
      label: "Volume",
      filePath: "volume_raw",
      unit: "hm³",
    },
  },
  observationTypes: {
    [OBSERVATION_TYPES.OPTIC]: {
      abbr: "MO",
      label: "Optic",
    },
    [OBSERVATION_TYPES.RADAR]: {
      abbr: "MR",
      label: "Radar",
    },
  },
  duration: {
    [DURATION_TYPES.DAY]: {
      abbr: "1",
      label: "1 day",
    },
    [DURATION_TYPES.PERIOD]: {
      abbr: "2",
      label: "10 days",
    },
  },
}
export default config
