import { AppConfig, ObservationTypes } from "@/config"
import { useSelector } from "react-redux"

export default function useChartHook() {
  const [chartData, setChartData] = useState([])
  const [dataSets, setDataSets] = useState([])
  const [id, setId] = useState("")
  const [dateMin, setDateMin] = useState(null)
  const [dateMax, setDateMax] = useState(null)
  const [lakesName, setLakesName] = useState([])
  const [dataType, setDataType] = useState("")
  const [labelTitle, setLabelTitle] = useState([])
  const [unit, setUnit] = useState("")

  const form = useSelector(state => state.form)
  const lakes = useSelector(state => state.lakes)

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
    console.log({ lakes })
    console.log(lakes.activeLakes)
  }, [lakes])

  useEffect(() => {
    console.log({ dataType })
  }, [dataType])

  useEffect(() => {
    console.log({ chartData })
  }, [chartData])

  // set data for one lake
  // useEffect(() => {
  //   if (!lakes.activatesLakes) return
  //   setChartData(lakes.data[lakeId][dataType])
  // }, [lakes, id, dataType])

  // set data for all lakes active
  useEffect(() => {
    if (!lakes.activeLakes) return
    for (const lakeId of Object.keys(lakes.activeLakes)) {
      const { name } = lakes.activeLakes[lakeId]
      if (!lakesName.includes(name)) {
        setLakesName([...lakesName, name])
      }
      setChartData([...chartData, [lakes.data[lakeId][dataType]]])
    }
  }, [lakes])

  useEffect(() => {
    const arr = []
    const allDates = []

    // setDataSets for one lake
    // chartData.forEach((item, index) => {
    //   const data = setDataLines(item, obsTypes[index], index)
    //   const itemDates = item
    //     .filter(el => !isNaN(el.value) && el.date !== "" && el.value !== "0")
    //     .map(el => el.date)
    //   allDates.push(...itemDates)
    //   arr.push(data)
    // })
    // setDataSets(arr)
    for (const key of chartData) {
      key.forEach(item => {
        item.forEach((itm, index) => {
          const data = setDataLines(itm, obsTypes[index], index)
          const itemDates = itm
            .filter(
              el => !isNaN(el.value) && el.date !== "" && el.value !== "0"
            )
            .map(el => el.date)
          allDates.push(...itemDates)
          if (arr.includes(data)) {
            console.log("data exists")
          }
          arr.push(data)
        })
      })
    }
    setDataSets([...arr])
    arr.length = 0
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
          afterTitle() {
            return `${lakesName}` || "To Fix"
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
        display: chartData.length === 1,
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
    animation: true,
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
