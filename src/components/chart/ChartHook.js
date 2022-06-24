import { AppConfig, ObservationTypes } from "@/config"
import { useSelector } from "react-redux"

export default function useChartHook({ lakeInfo }) {
  const [chartData, setChartData] = useState([])
  const [dataSets, setDataSets] = useState([])
  const [id, setId] = useState("")
  const [dateMin, setDateMin] = useState(null)
  const [dateMax, setDateMax] = useState(null)
  const [lakeName, setLakeName] = useState("")
  const [dataType, setDataType] = useState("")
  const [obsTypes, setObsTypes] = useState([])
  const [labelTitle, setLabelTitle] = useState([])
  const [unit, setUnit] = useState("")

  const form = useSelector(state => state.form)
  const lakes = useSelector(state => state.lakes)

  useEffect(() => {
    if (!form.OPTIC) {
      setObsTypes([ObservationTypes.RADAR])
    }
    if (!form.RADAR) {
      setObsTypes([ObservationTypes.OPTIC])
    }
  }, [form.OPTIC, form.RADAR])

  useEffect(() => {
    if (lakeInfo.obsTypes?.length > 0) {
      const { id, name, dataType, obsTypes } = lakeInfo
      const { label, unit } = AppConfig.attributes[dataType]
      setId(id)
      setLakeName(name)
      setDataType(dataType)
      if (!form.OPTIC) {
        setObsTypes([ObservationTypes.RADAR])
      }
      if (!form.RADAR) {
        setObsTypes([ObservationTypes.OPTIC])
      }
      if (form.OPTIC && form.RADAR) {
        setObsTypes(obsTypes)
      }
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
    const allDates = []

    chartData.forEach((item, index) => {
      const data = setDataLines(item, obsTypes[index], index)
      const itemDates = item
        .filter(el => !isNaN(el.value) && el.date !== "" && el.value !== "0")
        .map(el => el.date)
      allDates.push(...itemDates)
      arr.push(data)
    })
    const allDatesSorted = [...allDates].sort(
      (a, b) => new Date(a) - new Date(b)
    )

    const minDatevalue = new Date(allDatesSorted.shift())
    const firstDayMonth = new Date(
      minDatevalue.getFullYear(),
      minDatevalue.getMonth(),
      1
    )
    setDateMin(firstDayMonth)

    const maxDateValue = new Date(allDatesSorted.at(-1))
    const nextMonth = new Date(
      maxDateValue.getFullYear(),
      maxDateValue.getMonth() + 1,
      1
    )

    setDateMax(nextMonth)
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
        text: lakeName
          ? `${lakeName} - ${labelTitle} - ${unit}`
          : "Choose a lake and click on it",
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
      x: {
        type: "time",
        min: dateMin,
        max: dateMax,
        time: {
          unit: "year",
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

  const setDataLines = (item, obsType, index) => {
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
    const { borderColor, backgroundColor, pointBackgroundColor } =
      AppConfig.attributes[dataType].style[index]

    return {
      label: `${obsType}`,
      data: value,
      borderColor,
      backgroundColor,
      borderWidth,
      pointBackgroundColor,
      tension,
      pointRadius,
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
