import { AppConfig } from "@/config"
import { useSelector } from "react-redux"
import { CompareTypes, ObservationTypes } from "../../config"

export default function useChartHook() {
  const [chartData, setChartData] = useState([])
  const [dataSets, setDataSets] = useState([])
  const [dataSetsTmp, setDataSetsTmp] = useState([])
  const [xAxesToDisplay, setXAxesToDisplay] = useState({})
  const [dateMin, setDateMin] = useState()
  const [dateMax, setDateMax] = useState()
  const [lakesName, setLakesName] = useState([])
  const [lakesId, setLakesId] = useState([])
  const [dataType, setDataType] = useState("")
  const [labelTitle, setLabelTitle] = useState([])
  const [unit, setUnit] = useState("")
  const [lastDataTypes, setLastDataTypes] = useState()
  const [obsTypes, setObsTypes] = useState([])
  const [lastObstypes, setLastObstypes] = useState([])
  const [reference, setReference] = useState(false)
  const [displayByYear, setDisplayByYear] = useState(false)
  const [scales, setScales] = useState()
  const form = useSelector(state => state.form)
  const { charType } = form
  const lakes = useSelector(state => state.lakes)
  const chart = useSelector(state => state.chart)

  useEffect(() => {
    if (!lakes.activeLakes) return
    const { dataType, OPTIC, RADAR, DAY, PERIOD, REFERENCE, YEAR } = form
    const { label, unit } = AppConfig.attributes[dataType]
    setDataType(dataType)
    setLabelTitle(label)
    setUnit(unit)
    setReference(REFERENCE)
    setDisplayByYear(YEAR)
    if (OPTIC) {
      setObsTypes([ObservationTypes.OPTIC])
    }
    if (RADAR) {
      setObsTypes([ObservationTypes.RADAR])
    }
    if (REFERENCE) {
      setObsTypes([CompareTypes.REFERENCE])
    }
    if (OPTIC && RADAR) {
      setObsTypes([ObservationTypes.OPTIC, ObservationTypes.RADAR])
    }
    if (OPTIC && REFERENCE) {
      setObsTypes([ObservationTypes.OPTIC, CompareTypes.REFERENCE])
    }
    if (RADAR && REFERENCE) {
      setObsTypes([ObservationTypes.RADAR, CompareTypes.REFERENCE])
    }
    if (OPTIC && RADAR && REFERENCE) {
      setObsTypes([
        ObservationTypes.OPTIC,
        ObservationTypes.RADAR,
        CompareTypes.REFERENCE,
      ])
    }
    if (!OPTIC && !RADAR) {
      setObsTypes([])
      setChartData([])
    }
    if (!DAY && !PERIOD) {
      setChartData([])
    }
  }, [form, lakes.activeLakes])

  useEffect(() => {
    if (
      dataType !== lastDataTypes ||
      JSON.stringify(obsTypes) !== JSON.stringify(lastObstypes)
    ) {
      setChartData([])
    }
  }, [dataType, obsTypes])

  useEffect(() => {
    if (!lakes.activeLakes) return
    const dataTmp = []

    for (const lake of lakes.activeLakes) {
      const { id, name } = lake
      if (!lakesName.includes(name)) {
        setLakesName([...lakesName, name])
        setLakesId([...lakesId, id])
      }
      const dataRaw = lakes.data[id][dataType].raw
      const dataByYear = Object.values(lakes.data[id][dataType].byYear)
      if (displayByYear && !reference) {
        const dataByYearWithoutRef = dataByYear.map(obs => obs.slice(0, 2))
        dataTmp.push([dataByYearWithoutRef])
      }
      if (displayByYear && reference) {
        dataTmp.push([dataByYear])
      }
      if (!reference && !displayByYear) {
        dataTmp.push([dataRaw.slice(0, 2)])
      }
      if (reference && !displayByYear) {
        dataTmp.push([dataRaw])
      }
    }
    setChartData(dataTmp)
    setLastDataTypes(dataType)
    setLastObstypes(obsTypes)
  }, [lakes.data, reference, displayByYear])

  useEffect(() => {
    console.log({ dataSets })
    console.log({ options })
    console.log({ xAxesToDisplay })
  }, [dataSets, xAxesToDisplay])

  useEffect(() => {
    const arr = []
    const allDates = []
    let allDatesSorted = []
    if (!displayByYear) {
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
      allDatesSorted = allDates.sort((a, b) => new Date(a) - new Date(b))
      const firstDateGraph = getChartStartDate(allDatesSorted)
      setDateMin(firstDateGraph)

      const lastDateGraph = getChartFirstDateNextMonth(allDatesSorted)
      setDateMax(lastDateGraph)
    }

    if (displayByYear) {
      chartData.forEach((obs, index) => {
        obs.forEach(year => {
          year.forEach(obsByYear => {
            Object.values(obsByYear).forEach((itm, idx) => {
              itm.forEach((item, index) => {
                const data = setDataLines(
                  item,
                  obsTypes[index],
                  idx,
                  lakesName[index],
                  idx
                )

                const itemDates = item.map(el =>
                  el
                    .filter(el => !isNaN(el.value) && el.date !== "")
                    .map(el => new Date(el.date))
                )

                const datesSorted = itemDates[0].sort((a, b) => a - b)
                // const firstDateGraph = getChartStartDate(datesSorted)
                // console.log({ dateMin, dateMax })
                // setDateMin(firstDateGraph)
                // const lastDateGraph = getChartFirstDateNextMonth(datesSorted)
                // setDateMax(lastDateGraph)
                arr.push(data)
              })
            })
          })
        })
      })
    }
    setDataSets([...arr])

    arr.length = 0
  }, [lakes.data, chartData, charType])

  useEffect(() => {
    console.log({ dateMin, dateMax })
  }, [dateMin, dateMax])

  const handleValue = (value, unit) => {
    if (unit === "hm³") {
      return (1 * value) / 1_000_000
    } else if (unit === "ha") {
      return (1 * value) / 10_000
    } else if (unit === "%") {
      return value
    }
  }

  useEffect(() => {
    if (!dataSets.length) return
    setDataSetsTmp([dataSets[0], dataSets[1], dataSets[2]])
  }, [dataSets])

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
  useEffect(() => {
    if (!displayByYear) {
      setScales({
        x: {
          type: "time",
          min: dateMin,
          max: dateMax,
          parsing: false,
          time: {
            displayFormats: {
              month: "MMM yyyy",
              day: "dd MMM",
            },
            tooltipFormat: "dd MMM yyyy",
          },
        },
      })
    }
    if (displayByYear) {
      setScales({
        x2018: {
          type: "time",
          max: new Date("2018-12-31"),
          time: {
            displayFormats: {
              month: "MMM yyyy",
              day: "dd MMM",
            },
            tooltipFormat: "dd MMM yyyy",
          },
        },
        x2019: {
          type: "time",
          parsing: false,
          min: new Date("2019-01-01"),
          max: new Date("2019-12-31"),
          time: {
            displayFormats: {
              month: "MMM yyyy",
              day: "dd MMM",
            },
            tooltipFormat: "dd MMM yyyy",
          },
          display: false,
        },
        x2020: {
          type: "time",
          parsing: false,
          display: false,
          min: new Date("2020-01-01"),
          max: new Date("2020-12-31"),
          time: {
            displayFormats: {
              month: "MMM yyyy",
              day: "dd MMM",
            },
            tooltipFormat: "dd MMM yyyy",
          },
        },
      })
    }
  }, [dataSets, displayByYear])

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
        text: `${labelTitle}  ${unit}`,
        position: "top",
        font: {
          size: 16,
        },
        padding: {
          top: 10,
          bottom: 10,
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
    scales,
    y: {
      beginAtZero: true,
    },
    parsing: {
      xAxisKey: "date",
      yAxisKey: "value",
    },
    animation: false,
  }

  const setDataLines = (item, obsType, index, lakeName, indexColor) => {
    if (!item) return
    let value
    if (!displayByYear) {
      value = item
        ?.filter(el => {
          return !isNaN(el.value) && el.date !== "" && el.value !== "0"
        })
        .map(el => {
          return {
            date: new Date(el.date).toISOString(),
            value: handleValue(el.value, unit),
          }
        })
    }

    if (displayByYear) {
      value = item.map(year => {
        return year
          .filter(el => {
            return !isNaN(el.value) && el.date !== "" && el.value !== "0"
          })
          .map(el => {
            return {
              date: new Date(el.date).toISOString(),
              value: handleValue(1 * el.value, unit),
            }
          })
      })
    }
    const { borderWidth } = chart.style.default

    let { tension, pointRadius } = AppConfig.attributes[dataType]

    let backgroundColor
    let borderColor
    let pointBackgroundColor

    if (obsType === "REFERENCE") {
      backgroundColor = chart.REFERENCE.style.backgroundColor
      borderColor = chart.REFERENCE.style.borderColor
      pointBackgroundColor = chart.REFERENCE.style.pointBackgroundColor
    }
    if (obsType === "OPTIC" || obsType === "RADAR") {
      backgroundColor =
        chart[dataType].style[obsType][indexColor].pointBackgroundColor
      borderColor = chart[dataType].style[obsType][indexColor].borderColor
      pointBackgroundColor =
        chart[dataType].style[obsType][indexColor].pointBackgroundColor
    }

    if (charType === "LINE") {
      pointRadius = 0
    }
    let xAxisID
    if (displayByYear) {
      if (index === 0) xAxisID = "x2018"
      if (index === 1) xAxisID = "x2019"
      if (index === 2) xAxisID = "x2020"
    }
    if (!displayByYear) {
      xAxisID = "x"
    }

    return {
      backgroundColor,
      borderColor,
      pointBackgroundColor,
      borderWidth,
      data: displayByYear ? value[0] : value,
      label: `${obsType}`,
      lakeName: `${lakeName}`,
      pointRadius,
      tension,
      xAxisID,
    }
  }

  useEffect(() => {
    if (!dataSets.length) return
    const newData = [...dataSets]
    const selectedLakes = lakes.activeLakes.map(lake => {
      return {
        selected: lake.selected,
        index: lake.index,
      }
    })
    for (const lake of selectedLakes) {
      const { index, selected } = lake
      if (obsTypes.length === 1) {
        if (dataSets.length !== selectedLakes.length) return
        if (selected) {
          newData[index].borderWidth = chart.style.selected.borderWidth
        }
        if (!selected) {
          newData[index].borderWidth = chart.style.default.borderWidth
        }
        setDataSets(newData)
      }
      if (obsTypes.length === 2) {
        if (dataSets.length !== selectedLakes.length * 2) return
        if (selected) {
          newData[index === 0 ? 0 : index * 2].borderWidth =
            chart.style.selected.borderWidth
          newData[index === 0 ? 1 : index * 2 + 1].borderWidth =
            chart.style.selected.borderWidth
        }
        if (!selected) {
          newData[index === 0 ? 0 : index * 2].borderWidth =
            chart.style.default.borderWidth
          newData[index === 0 ? 1 : index * 2 + 1].borderWidth =
            chart.style.default.borderWidth
        }
        setDataSets(newData)
      }
      if (obsTypes.length === 3) {
        if (dataSets.length !== selectedLakes.length * 3) return
        if (selected) {
          newData[index === 0 ? 0 : index * 3].borderWidth =
            chart.style.selected.borderWidth
          newData[index === 0 ? 1 : index * 3 + 1].borderWidth =
            chart.style.selected.borderWidth
          newData[index === 0 ? 2 : index * 3 + 2].borderWidth =
            chart.style.selected.borderWidth
        }
        if (!selected) {
          newData[index === 0 ? 0 : index * 3].borderWidth =
            chart.style.default.borderWidth
          newData[index === 0 ? 1 : index * 3 + 1].borderWidth =
            chart.style.default.borderWidth
          newData[index === 0 ? 2 : index * 3 + 2].borderWidth =
            chart.style.default.borderWidth
        }
        setDataSets(newData)
      }
    }
  }, [lakes.activeLakes])

  useEffect(() => {
    if (!dataSets.length) return
    const newData = [...dataSets]
    const activeLakesIndex = lakes.activeLakes.map(lake => {
      return {
        visible: lake.chartVisible,
        index: lake.index,
      }
    })

    for (const lake of activeLakesIndex) {
      const { index, visible } = lake
      if (obsTypes.length === 1) {
        if (dataSets.length !== activeLakesIndex.length) return
        if (visible) {
          newData[index].hidden = false
        }
        if (!visible) {
          newData[index].hidden = true
        }
        setDataSets(newData)
      }

      if (obsTypes.length === 2) {
        if (dataSets.length !== activeLakesIndex.length * 2) return
        if (visible) {
          newData[index === 0 ? 0 : index * 2].hidden = false
          newData[index === 0 ? 1 : index * 2 + 1].hidden = false
        }
        if (!visible) {
          newData[index === 0 ? 0 : index * 2].hidden = true
          newData[index === 0 ? 1 : index * 2 + 1].hidden = true
        }
        setDataSets(newData)
      }
      if (obsTypes.length === 3) {
        if (dataSets.length !== activeLakesIndex.length * 3) return
        if (visible) {
          newData[index === 0 ? 0 : index * 3].hidden = false
          newData[index === 0 ? 1 : index * 3 + 1].hidden = false
          newData[index === 0 ? 2 : index * 3 + 2].hidden = false
        }
        if (!visible) {
          newData[index === 0 ? 0 : index * 3].hidden = true
          newData[index === 0 ? 1 : index * 3 + 1].hidden = true
          newData[index === 0 ? 2 : index * 3 + 2].hidden = true
        }
        setDataSets(newData)
      }
    }
  }, [lakes.activeLakes])

  const data = {
    datasets: dataSets,
  }

  return {
    data,
    options,
    form,
    charType,
  }
}
