export const config = {
  baseDir: "/src/data/series/",
  delimitter: "_",
  attributes: {
    fillingRate: {
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.4,
      pointRadius: 0,
      label: "Filling rate",
      filePath: "filling_rate",
      unit: "%",
    },
    surface: {
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      tension: 0.4,
      pointRadius: 0,
      filePath: "surface",
      label: "Surface",
      filePath: "surface",
      unit: "ha",
    },
    volume: {
      borderColor: "rgb(127, 255, 0)",
      backgroundColor: "rgba(127, 255, 0, 0.5)",
      tension: 0.4,
      pointRadius: 0,
      label: "Volume",
      filePath: "volume",
      unit: "hm³",
    },
  },
  observationTypes: {
    optic: {
      abbr: "MO",
      label: "Optic",
    },
    radar: {
      abbr: "MR",
      label: "Radar",
    },
  },
  duration: {
    day: {
      abbr: "1",
      label: "1 day",
    },
    period: {
      abbr: "2",
      label: "10 days",
    },
  },
}
