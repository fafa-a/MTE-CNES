import { AppConfig, DataTypes } from "@/config"
import { useSelector } from "react-redux"

export default function useChartHook({ lakeInfo }) {
  const [chartData, setChartData] = useState([])
  const [dates, setDates] = useState([])
  const [dataSets, setDataSets] = useState([])
  const [id, setId] = useState("")
  const [lakeName, setLakeName] = useState("")
  const [dataType, setDataType] = useState("")
  const [obsTypes, setObsTypes] = useState([])
  const [labelTitle, setLabelTitle] = useState([])
  const [unit, setUnit] = useState("")

  const chart = useSelector(state => state.chart)
  const lakes = useSelector(state => state.lakes)

  useEffect(() => {
    if (lakeInfo.obsTypes?.length > 0) {
      const { id, name, dataType, obsTypes } = lakeInfo
      const { label, unit } = AppConfig.attributes[dataType]
      setId(id)
      setLakeName(name)
      setDataType(dataType)
      setObsTypes(obsTypes)
      setLabelTitle(label)
      setUnit(unit)
    }
  }, [lakeInfo.obsTypes])

  useEffect(() => {
    if (!id) return
    setChartData(lakes.data[id][dataType])
  }, [lakes, id, dataType])

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
    interaction: {
      intersect: false,
      mode: "nearest",
    },
    plugins: {
      title: {
        display: true,
        text: lakeName ? `${lakeName} - ${labelTitle} - ${unit}` : "",
        position: "top",
        font: {
          size: 16,
        },
        padding: {
          top: 10,
        },
      },
      tooltip: {
        callbacks: {
          title(context) {
            const { label } = context[0]
            const options = { year: "numeric", month: "short", day: "numeric" }
            const date = new Intl.DateTimeFormat("en-US", options).format(
              new Date(label)
            )
            return `${date}`
          },
          afterTitle() {
            return `${lakeName}` || "To Fix"
          },
          beforeBody(context) {
            const { label } = context[0].dataset
            return `Observation: ${label}`
          },
          label(context) {
            const { formattedValue } = context
            return ` ${labelTitle}: ${formattedValue} ${unit}`
          },
        },
      },
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
        beginAtZero: true,
      },
    },
  }

  const setDataLines = (item, obsType, index) => {
    if (!item) return
    const value = item
      ?.filter(el => !isNaN(el.value) && el.date !== "" && el.value !== "0")
      .map(el => el.value)
    const { borderWidth, tension, pointRadius } = AppConfig.attributes[dataType]
    const { borderColor, backgroundColor, pointBackgroundColor } =
      AppConfig.attributes[dataType].style[index]

    return {
      label: `${obsType}`,
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
      .map(el => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" }
        const date = new Intl.DateTimeFormat("en-US", options).format(
          new Date(el.date)
        )
        return date
      })
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
