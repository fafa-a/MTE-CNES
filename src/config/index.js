export const config = {
  baseDir: "/src/data/series/",
  delimitter: "_",
  attributes: {
    fillingRate: {
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 1.2,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointBackgroundColor: "#650011",
      tension: 0,
      pointRadius: 1.4,
      label: "Filling rate",
      filePath: "filling_rate_raw",
      unit: "%",
      actionReducers: "setAttributes",
    },
    surface: {
      borderColor: "rgb(53, 162, 235)",
      borderWidth: 1.2,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      pointBackgroundColor: "#000F45",
      tension: 0,
      pointRadius: 1.4,
      filePath: "surface",
      label: "Surface",
      filePath: "surface_raw",
      unit: "ha",
      actionReducers: "setAttributes",
    },
    volume: {
      borderColor: "rgb(127, 255, 0)",
      borderWidth: 1.2,
      backgroundColor: "rgba(127, 255, 0, 0.5)",
      pointBackgroundColor: "#006900",
      tension: 0,
      pointRadius: 1.4,
      label: "Volume",
      filePath: "volume_raw",
      unit: "hm³",
      actionReducers: "setAttributes",
    },
  },
  observationTypes: {
    optic: {
      actionReducers: "setObservationTypes",
      abbr: "MO",
      label: "Optic",
    },
    radar: {
      actionReducers: "setObservationTypes",
      abbr: "MR",
      label: "Radar",
    },
  },
  duration: {
    day: {
      actionReducers: "setObservationDurations",
      abbr: "1",
      label: "1 day",
    },
    period: {
      actionReducers: "setObservationDurations",
      abbr: "2",
      label: "10 days",
    },
  },
}
