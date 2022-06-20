import { config } from "@/config"
import { useSelector } from "react-redux"

export default function useChartHook(obsTypes) {
  const [dates, setDates] = useState([])
  const [dataSets, setDataSets] = useState([])
  const [labelTitle, setLabelTitle] = useState([])
  const chart = useSelector(state => state.chart)
  const form = useSelector(state => state.form)
  const { chartData, lakeName } = chart.chart
  const { idConfig } = form.attributes

  useEffect(() => {
    const arr = []
    chartData.forEach((item, index) => {
      const data = setDataLines(item, obsTypes[index], index)
      arr.push(data)
      setLabelsDate(item)
    }),
      setDataSets(arr)
  }, [chartData])

  const handleValue = (value, unit) => {
    if (unit === "hm³") {
      return (1 * value) / 1_000_000
    } else if (unit === "ha") {
      return (1 * value) / 10_000
    } else if (unit === "%") {
      return value
    }
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: chartData.length ? `${lakeName} - ${labelTitle}` : "",
        position: "top",
        font: {
          size: 16,
        },
        padding: {
          top: 10,
        },
      },
      // tooltip: {
      //   callbacks: {
      //     label(context) {
      //       const label = context.dataset.label || ""
      //       const labelStartWith = label
      //         .slice(0, label.indexOf(" "))
      //         .toLowerCase()

      //       const labelWithoutExtension = label
      //         .split(" ")
      //         .slice(0, -1)
      //         .join(" ")
      //       if (context.parsed.y !== null) {
      //         if (labelStartWith === "filling")
      //           return `${labelWithoutExtension} : ${context.parsed.y.toFixed(
      //             3
      //           )} %`
      //         else if (labelStartWith === "surface")
      //           return `${labelWithoutExtension} : ${context.parsed.y.toFixed(
      //             3
      //           )} ha`
      //         else if (labelStartWith === "volume")
      //           return `${labelWithoutExtension} : ${context.parsed.y.toFixed(
      //             3
      //           )} hm³`
      //       }
      //       return labelWithoutExtension
      //     },
      //   },
      // },
      legend: {
        position: "top",
        labels: { font: { size: 14 } },
      },
      zoom: {
        pan: {
          enabled: true,
          modifierKey: "ctrl",
          // onPanStart: chart => {
          //   chart.event.changedPointers[0].target.style.cursor = "grab"
          // },
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          drag: {
            enabled: true,
            backgroundColor: "rgba(0,204,255,0.15)",
            borderColor: "rgba(0,204,255,1.00)",
            borderWidth: 1,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
        limits: {
          y: { min: 0, max: "original" },
        },
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  }

  const setDataLines = (item, obsType, index) => {
    if (!item) return
    const value = item
      ?.filter(el => !isNaN(el.value) && el.date !== "" && el.value !== "0")
      .map(el => el.value)
    const { label, unit, borderWidth, tension, pointRadius } =
      config.attributes[idConfig]
    setLabelTitle(label)
    const { borderColor, backgroundColor, pointBackgroundColor } =
      config.attributes[idConfig].style[index]

    return {
      label: `${lakeName} ${label} ${obsType}`,
      data: value.map(el => handleValue(el, unit)),
      borderColor,
      backgroundColor,
      borderWidth,
      pointBackgroundColor,
      tension,
      pointRadius,
    }
  }

  const setLabelsDate = item => {
    if (!item) return
    const dateFiltered = item
      ?.filter(el => !isNaN(el.value) && el.date !== "" && el.value !== "0")
      .map(el => el.date)

    setDates([...dateFiltered])
  }

  const data = {
    labels: dates,
    datasets: dataSets,
  }

  return {
    data,
    options,
  }
}
