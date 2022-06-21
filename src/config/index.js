export const config = {
  baseDir: "/src/data/series/",
  delimitter: "_",
  attributes: {
    fillingRate: {
      style: [
        {
          borderColor: "rgb(255, 0, 0)",
          backgroundColor: "rgba(255, 0, 0, 0.5)",
          pointBackgroundColor: "#760000",
        },
        {
          borderColor: "rgb(255, 100, 0)",
          backgroundColor: "rgba(255, 100, 0, 0.5)",
          pointBackgroundColor: "#C43100",
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
    surface: {
      style: [
        {
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          pointBackgroundColor: "#000F45",
        },
        {
          borderColor: "rgb(155, 100, 186)",
          backgroundColor: "rgba(155, 100, 186, 0.5)",
          pointBackgroundColor: "#65368C",
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
      actionReducers: "setAttributes",
    },
    volume: {
      style: [
        {
          borderColor: "rgb(127, 255, 0)",
          backgroundColor: "rgba(127, 255, 0, 0.5)",
          pointBackgroundColor: "#006900",
        },
        {
          borderColor: "rgb(222, 237, 25)",
          backgroundColor: "rgba(222, 237, 25, 0.5)",
          pointBackgroundColor: "#465E00",
        },
      ],

      borderWidth: 1.2,
      tension: 0,
      pointRadius: 0,
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
