import { AppConfig } from "@/config"
import { useSelector } from "react-redux"
import { ObservationTypes } from "../../config"

export default function useChartHook({ compareLake }) {
  const [chartData, setChartData] = useState([])
  const [dataSets, setDataSets] = useState([])
  const [dateMin, setDateMin] = useState(null)
  const [dateMax, setDateMax] = useState(null)
  const [lakesName, setLakesName] = useState([])
  const [dataType, setDataType] = useState("")
  const [labelTitle, setLabelTitle] = useState([])
  const [unit, setUnit] = useState("")
  const [lastDataTypes, setLastDataTypes] = useState()
  const form = useSelector(state => state.form)
  const lakes = useSelector(state => state.lakes)
  const chart = useSelector(state => state.chart)
  const obsTypes = [
    AppConfig.observationTypes.OPTIC.label,
    AppConfig.observationTypes.RADAR.label,
  ]

  useEffect(() => {
    if (!lakes.activeLakes) return
    const { dataType } = form
    const { label, unit } = AppConfig.attributes[dataType]
    setDataType(dataType)
    setLabelTitle(label)
    setUnit(unit)
  }, [form])

  useEffect(() => {
    if (!lakes.activeLakes) return
    for (const lake of lakes.activeLakes) {
      const { id, name } = lake
      if (!lakesName.includes(name)) {
        setLakesName([...lakesName, name])
      }

      if (compareLake === false) {
        setChartData([[lakes.data[id][dataType]]])
      }

      if (dataType !== lastDataTypes && compareLake === true) {
        setChartData([[lakes.data[id][dataType]]])
      }

      if (dataType === lastDataTypes && compareLake === true) {
        setChartData([...chartData, [lakes.data[id][dataType]]])
      }
      setLastDataTypes(dataType)
    }
  }, [lakes])

  useEffect(() => {
    const arr = []
    const allDates = []

    chartData.forEach((key, index) => {
      key.forEach(item => {
        item.forEach((itm, idx) => {
          const data = setDataLines(
            itm,
            obsTypes[idx],
            idx,
            lakesName[index],
            index
          )
          const itemDates = itm
            .filter(
              el => !isNaN(el.value) && el.date !== "" && el.value !== "0"
            )
            .map(el => el.date)
          allDates.push(...itemDates)
          arr.push(data)
        })
      })
    })
    setDataSets([...arr])

    arr.length = 0
    const allDatesSorted = [...allDates].sort(
      (a, b) => new Date(a) - new Date(b)
    )
    const firstDateGraph = getChartStartDate(allDatesSorted)
    setDateMin(firstDateGraph)

    const lastDateGraph = getChartFirstDateNextMonth(allDatesSorted)
    setDateMax(lastDateGraph)
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

  const getChartStartDate = arr => {
    const minDatevalue = new Date(arr.shift())
    const firstDayMonth = new Date(
      minDatevalue.getFullYear(),
      minDatevalue.getMonth(),
      1
    )
    return firstDayMonth
  }

  const getChartFirstDateNextMonth = arr => {
    const maxDateValue = new Date(arr.at(-1))
    const nextMonth = new Date(
      maxDateValue.getFullYear(),
      maxDateValue.getMonth() + 1,
      1
    )
    return nextMonth
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
        text:
          chartData.length === 1
            ? `${lakesName}  ${labelTitle}  ${unit}`
            : `${labelTitle}  ${unit}`,
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
            return label
          },
          afterTitle(context) {
            const { lakeName } = context[0].dataset
            return `${lakeName}`
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
        display: false,
        // position: "top",
        // labels: { font: { size: 14 } },
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
          x: { min: "original", max: "original" },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        min: dateMin,
        max: dateMax,
        time: {
          displayFormats: {
            month: "MMM yyyy",
            day: "dd MMM",
          },
          tooltipFormat: "dd MMM yyyy",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    parsing: {
      xAxisKey: "date",
      yAxisKey: "value",
    },
    animation: false,
  }

  const setDataLines = (item, obsType, index, lakeName, indexColor) => {
    if (!item) return
    const value = item
      ?.filter(el => !isNaN(el.value) && el.date !== "" && el.value !== "0")
      .map(el => {
        return {
          date: new Date(el.date).toISOString(),
          value: handleValue(el.value, unit),
        }
      })

    const { borderWidth, tension, pointRadius } = AppConfig.attributes[dataType]
    const { backgroundColor, borderColor } =
      chart[dataType].style[Object.values(ObservationTypes)[index]][indexColor]

    return {
      backgroundColor,
      borderColor,
      borderWidth,
      data: value,
      label: `${obsType}`,
      lakeName: `${lakeName}`,
      pointRadius,
      tension,
    }
  }

  const data = {
    datasets: dataSets,
  }
  return {
    data,
    options,
  }
}
