export const config = {
  delimitter: "_",
  dataTypes: {
    fillingRate: {
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      label: "Filling rate",
      filePath: "filling_rate",
      unit: "%",
    },
    surface: {
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      label: "Surface",
      filePath: "surface",
      unit: "hm²",
    },
    volume: {
      borderColor: "rgb(127, 255, 0)",
      backgroundColor: "rgba(127, 255, 0, 0.5)",
      label: "Volume",
      filePath: "volume",
      unit: "hm³",
    },
  },
  observationType: {
    optic: "",
    radar: "",
  },
}
