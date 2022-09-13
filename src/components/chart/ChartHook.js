/* eslint-disable no-undef */
import { AppConfig } from "@/config"
import { useSelector, useDispatch } from "react-redux"
import { DataTypes, DurationTypes, ObservationTypes } from "../../config"
import { useEffect, useState, useCallback, useRef } from "react"
import { handleResetZoom } from "../../stores/chartSlice"
import {
	getChartStartDateCurrentMonth,
	getChartFirstDateNextMonth,
} from "../../utils/date"
import {
	handleDataSetsBooleanOption,
	handleDataSetsBorderWidthOption,
} from "../../utils/chart"

export default function useChartHook() {
	const [chartData, setChartData] = useState([])
	const [dataSets, setDataSets] = useState([])
	const [dateMin, setDateMin] = useState()
	const [dateMax, setDateMax] = useState()
	const [obsTypes, setObsTypes] = useState([])
	const [lastDataType, setLastDataType] = useState("")
	const [lastObstypes, setLastObstypes] = useState([])
	const [obsDepth, setObsDepth] = useState()
	const [lastObsDepth, setLastObsDepth] = useState("")
	const [scales, setScales] = useState()
	const [options, setOptions] = useState()
	const [datesOfYear, setDatesOfYear] = useState({})
	const form = useSelector((state) => state.form)
	const { activeLakes, activeYears, dataLakes, totalVolume, yearsVisible } =
		useSelector((state) => state.lakes)
	const chart = useSelector((state) => state.chart)
	const { zoomReset } = chart
	const {
		dataType,
		OPTIC,
		RADAR,
		DAY,
		PERIOD,
		REFERENCE,
		YEAR,
		VOLUME,
		charType,
	} = form

	const { label, unit } = AppConfig.attributes[dataType]
	const { active } = useSelector((state) => state.stateLake)
	const { data } = useSelector((state) => state.data)

	const chartRef = useRef()
	const dispatch = useDispatch()
	useEffect(() => {
		if (dataLakes.length === 0) return
		if (OPTIC) {
			setObsTypes([ObservationTypes.OPTIC])
		}
		if (RADAR) {
			setObsTypes([ObservationTypes.RADAR])
		}
		if (REFERENCE) {
			setObsTypes([ObservationTypes.REFERENCE])
		}
		if (OPTIC && RADAR) {
			setObsTypes([ObservationTypes.OPTIC, ObservationTypes.RADAR])
		}
		if (OPTIC && REFERENCE) {
			setObsTypes([ObservationTypes.OPTIC, ObservationTypes.REFERENCE])
		}
		if (RADAR && REFERENCE) {
			setObsTypes([ObservationTypes.RADAR, ObservationTypes.REFERENCE])
		}
		if (OPTIC && RADAR && REFERENCE) {
			setObsTypes([
				ObservationTypes.OPTIC,
				ObservationTypes.RADAR,
				ObservationTypes.REFERENCE,
			])
		}
		if (!OPTIC && !RADAR && !REFERENCE) {
			setObsTypes([])
			setChartData([])
		}
		if (!DAY && !PERIOD) {
			setChartData([])
		}
		if (YEAR && chartData.length > 1) {
			setChartData([])
		}
		if (DAY) {
			setObsDepth(DurationTypes.DAY)
		}
		if (PERIOD) {
			setObsDepth(DurationTypes.PERIOD)
		}
		if (YEAR && !yearsVisible) {
			setDataSets([])
		}
		if (activeLakes.length === 0) {
			setChartData([])
			setDataSets([])
		}
		if (VOLUME && activeLakes.length === 0) {
			setDataSets([])
		}
	}, [DAY, OPTIC, PERIOD, RADAR, REFERENCE, YEAR, activeLakes, yearsVisible])

	useEffect(() => {
		if (dataType === lastDataType) return
		if (
			dataType !== lastDataType ||
			JSON.stringify(obsTypes) !== JSON.stringify(lastObstypes)
		) {
			setChartData([])
		}
	}, [dataType, lastDataType, obsTypes, lastObstypes])

	useEffect(() => {
		if (zoomReset) {
			chartRef.current.resetZoom()
			dispatch(handleResetZoom({ zoom: false }))
		}
	}, [zoomReset])

	useEffect(() => {
		if (active.length > 0 && data[active.at(-1)]) {
			let dataTmp = []
			if (
				(lastDataType && lastObsDepth && dataType !== lastDataType) ||
				obsTypes !== lastObstypes
			) {
				console.log({ lastDataType, lastObsDepth, dataType, obsDepth })
				for (const id of active) {
					if (!YEAR) {
						console.log("old", dataLakes[id][dataType][obsDepth].raw)
						console.log("new", data[id][dataType][obsDepth].raw)
						const dataActualized = handleObsType(
							data[id][dataType][obsDepth].raw,
							OPTIC,
							RADAR,
							REFERENCE
						)
						dataTmp.push([dataActualized[0]])
					}
					if (YEAR) {
						const dataYear = Object.values(data[id][dataType][obsDepth].year)
						const dataYearActualized = handleObsTypeYearMode(
							dataYear,
							OPTIC,
							RADAR,
							REFERENCE
						)
						dataTmp.push(dataYearActualized)
					}
				}

				setChartData(dataTmp)
			} else {
				const id = active.at(-1)
				if (!YEAR) {
					const dataActualized = handleObsType(
						data[id][dataType][obsDepth].raw,
						OPTIC,
						RADAR,
						REFERENCE
					)
					dataTmp.push([dataActualized[0]])
				}
				if (YEAR) {
					const dataYear = Object.values(data[id][dataType][obsDepth].year)
					console.log(
						"old data",
						Object.values(dataLakes[id][dataType][obsDepth].byYear)
					)
					console.log("year 1", dataYear)
					const dataYearActualized = handleObsTypeYearMode(
						dataYear,
						OPTIC,
						RADAR,
						REFERENCE
					)
					console.log("year 2", dataYearActualized)
					dataTmp.push(dataYearActualized)
				}
        if (JSON.stringify(dataTmp) !== JSON.stringify(chartData)) {
          if (YEAR || chartData.length === 1) {
            setChartData(dataTmp)
            console.log("solo")
          } else {
            setChartData([...chartData, ...dataTmp])
            console.log("last set chart data")
          }
        }
      }
			setLastDataType(dataType)
			setLastObstypes(obsTypes)
			setLastObsDepth(obsDepth)
		}
	}, [
		active,
		data,
		dataType,
		obsDepth,
		obsTypes,
		YEAR,
		OPTIC,
		RADAR,
		REFERENCE,
	])

	const handleObsType = (data, optic, radar, reference) => {
		let dataTmp = []
		if (optic && radar && reference) {
			dataTmp.push([data])
		}
		if (optic && !radar && !reference) {
			dataTmp.push([data.slice(0, 1)])
		}

		if (optic && !radar && reference) {
			if (data[2].length === 0) {
				dataTmp.push([data.slice(0, 1)])
			}
			dataTmp.push([data.slice(0, -1)])
		}

		if (!optic && radar && !reference) {
			dataTmp.push([data.slice(1, 2)])
		}

		if (!optic && radar && reference) {
			dataTmp.push([data.slice(1, data.length)])
		}

		if (optic && radar && !reference) {
			dataTmp.push([data.slice(0, 2)])
		}

		if (!optic && !radar && reference) {
			if (data.length < 3) return
			dataTmp.push([[data.at(-1)]])
		}
		return dataTmp[0]
	}

	const handleObsTypeYearMode = (data, optic, radar, reference) => {
		let dataTmp = []
		if (optic && radar && reference) {
			dataTmp.push(data)
		}

		if (optic && !radar && !reference) {
			dataTmp.push(data.map((obs) => obs.slice(0, 1)))
		}

		if (optic && !radar && reference) {
			if (data[0].length === 2) {
				dataTmp.push(data.map((obs) => obs.slice(0, 1)))
			}
			if (data[0].length === 3) {
				dataTmp.push(data.map((obs) => [obs.slice(0, 1)[0], obs.at(-1)]))
			}
		}

		if (!optic && radar && !reference) {
			dataTmp.push(data.map((obs) => obs.slice(1, 2)))
		}

		if (!optic && radar && reference) {
			dataTmp.push(data.map((obs) => obs.slice(1, 3)))
		}

		if (optic && radar && !reference) {
			dataTmp.push(data.map((obs) => obs.slice(0, 2)))
		}

		if (!optic && !radar && reference) {
			if (data[0].length === 2) return
			dataTmp.push(data.map((obs) => obs.at(-1)))
		}
		return dataTmp[0]
	}

	useEffect(() => {
		console.log("chartData", chartData)
	}, [chartData])

	// useEffect(() => {
	// 	if (activeLakes.length === 0) return
	// 	if (!Object.values(dataLakes).length) return
	// 	const dataTmp = []
	// 	if (!YEAR) {
	// 		if (VOLUME) {
	// 			if (OPTIC && RADAR && REFERENCE) {
	// 				dataTmp.push([totalVolume])
	// 			}

	// 			if (OPTIC && !RADAR && !REFERENCE) {
	// 				dataTmp.push([totalVolume.slice(0, 1)])
	// 			}

	// 			if (OPTIC && !RADAR && REFERENCE) {
	// 				dataTmp.push([totalVolume.slice(0, -1)])
	// 			}

	// 			if (!OPTIC && RADAR && !REFERENCE) {
	// 				dataTmp.push([totalVolume.slice(1, 2)])
	// 			}

	// 			if (!OPTIC && RADAR && REFERENCE) {
	// 				dataTmp.push([totalVolume.slice(1, totalVolume.length)])
	// 			}

	// 			if (OPTIC && RADAR && !REFERENCE) {
	// 				dataTmp.push([totalVolume.slice(0, 2)])
	// 			}

	// 			if (!OPTIC && !RADAR && REFERENCE) {
	// 				dataTmp.push([[totalVolume.at(-1)]])
	// 			}
	// 		}
	// 		if (!VOLUME) {
	// 			let i = 0
	// 			for (const lake of activeLakes) {
	// 				const { id } = lake
	// 				if (!dataLakes[id][dataType]?.[obsDepth]) return
	// 				if (!dataLakes[id][dataType]?.[obsDepth].raw) continue
	// 				const dataRaw = dataLakes[id][dataType][obsDepth].raw
	// 				if (OPTIC && RADAR && REFERENCE) {
	// 					dataTmp.push([dataRaw])
	// 				}
	// 				if (OPTIC && !RADAR && !REFERENCE) {
	// 					dataTmp.push([dataRaw.slice(0, 1)])
	// 				}

	// 				if (OPTIC && !RADAR && REFERENCE) {
	// 					if (dataRaw[2].length === 0) {
	// 						dataTmp.push([dataRaw.slice(0, 1)])
	// 					}
	// 					dataTmp.push([dataRaw.slice(0, -1)])
	// 				}

	// 				if (!OPTIC && RADAR && !REFERENCE) {
	// 					dataTmp.push([dataRaw.slice(1, 2)])
	// 				}

	// 				if (!OPTIC && RADAR && REFERENCE) {
	// 					dataTmp.push([dataRaw.slice(1, dataRaw.length)])
	// 				}

	// 				if (OPTIC && RADAR && !REFERENCE) {
	// 					dataTmp.push([dataRaw.slice(0, 2)])
	// 				}

	// 				if (!OPTIC && !RADAR && REFERENCE) {
	// 					if (dataRaw.length < 3) return
	// 					dataTmp.push([[dataRaw.at(-1)]])
	// 				}
	// 			}
	// 		}
	// 	}
	// 	if (YEAR && yearsVisible) {
	// 		const { id } = Object.values(activeLakes).at(-1)

	// 		if (!dataLakes[id][dataType]?.[obsDepth].byYear) return
	// 		const dataByYear = Object.values(dataLakes[id][dataType][obsDepth].byYear)
	// 		if (OPTIC && RADAR && REFERENCE) {
	// 			dataTmp.push(dataByYear)
	// 		}

	// 		if (OPTIC && !RADAR && !REFERENCE) {
	// 			dataTmp.push(dataByYear.map((obs) => obs.slice(0, 1)))
	// 		}

	// 		if (OPTIC && !RADAR && REFERENCE) {
	// 			if (dataByYear[0].length === 2) {
	// 				dataTmp.push(dataByYear.map((obs) => obs.slice(0, 1)))
	// 			}
	// 			if (dataByYear[0].length === 3) {
	// 				dataTmp.push(
	// 					dataByYear.map((obs) => [obs.slice(0, 1)[0], obs.at(-1)])
	// 				)
	// 			}
	// 		}

	// 		if (!OPTIC && RADAR && !REFERENCE) {
	// 			dataTmp.push(dataByYear.map((obs) => obs.slice(1, 2)))
	// 		}

	// 		if (!OPTIC && RADAR && REFERENCE) {
	// 			dataTmp.push(dataByYear.map((obs) => obs.slice(1, 3)))
	// 		}

	// 		if (OPTIC && RADAR && !REFERENCE) {
	// 			dataTmp.push(dataByYear.map((obs) => obs.slice(0, 2)))
	// 		}

	// 		if (!OPTIC && !RADAR && REFERENCE) {
	// 			if (dataByYear[0].length === 2) return
	// 			dataTmp.push(dataByYear.map((obs) => obs.at(-1)))
	// 		}
	// 	}
	// 	if (
	// 		dataTmp.length > 0 &&
	// 		JSON.stringify(dataTmp) !== JSON.stringify(chartData)
	// 	) {
	// 		console.log("dataTmp", dataTmp)
	// 		setChartData(dataTmp)
	// 		setLastDataTypes(dataType)
	// 		setLastObstypes(obsTypes)
	// 	}
	// }, [dataLakes, YEAR, dataType, obsTypes, VOLUME, totalVolume])

	const setDataLines = useCallback(
		(item, obsType, index, lakeName, indexColor) => {
			if (!item) return
			const { borderWidth } = chart.style.default
			let { tension, pointRadius } = AppConfig.attributes[dataType]
			let backgroundColor
			let borderColor
			let pointBackgroundColor

			if (["OPTIC", "RADAR", "REFERENCE"].includes(obsType)) {
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
			if (YEAR) {
				xAxisID = `x${index}`
			}
			if (YEAR && obsType === "OPTIC") {
				backgroundColor = chart.YEAR.style[xAxisID].OPTIC.backgroundColor
				borderColor = chart.YEAR.style[xAxisID].OPTIC.borderColor
				pointBackgroundColor =
					chart.YEAR.style[xAxisID].OPTIC.pointBackgroundColor
			}
			if (YEAR && obsType === "RADAR") {
				backgroundColor = chart.YEAR.style[xAxisID].RADAR.backgroundColor
				borderColor = chart.YEAR.style[xAxisID].RADAR.borderColor
				pointBackgroundColor =
					chart.YEAR.style[xAxisID].RADAR.pointBackgroundColor
			}
			if (YEAR && obsType === "REFERENCE") {
				backgroundColor = chart.YEAR.style[xAxisID].REFERENCE.backgroundColor
				borderColor = chart.YEAR.style[xAxisID].REFERENCE.borderColor
				pointBackgroundColor =
					chart.YEAR.style[xAxisID].REFERENCE.pointBackgroundColor
			}

			if (!YEAR) {
				xAxisID = "x"
			}
			const isHidden = () => {
				if (VOLUME && lakeName !== undefined) {
					return true
				}
				if (VOLUME && lakeName === undefined) {
					return false
				}
				if (!YEAR && !VOLUME) {
					return !Object.values(activeLakes)[indexColor]?.chartVisible
				}
				if (YEAR && !VOLUME) {
					return !Object.values(activeYears)[indexColor].chartVisible
				}
			}
			return {
				backgroundColor,
				borderColor,
				pointBackgroundColor,
				borderWidth,
				data: item,
				index,
				label: `${obsType}`,
				lakeName: `${lakeName}`,
				pointRadius,
				tension,
				xAxisID,
				hidden: isHidden(),
			}
		},
		[chart, charType, dataType, obsTypes, unit, YEAR]
	)

	useEffect(() => {
		if (chartData.length === 0) return
		if (!Object.values(dataLakes).length && chartData[0].length === 0) return
		const arr = []
		const allDates = []
		let allDatesSorted = []
		if (!YEAR) {
			chartData.forEach((key, index) => {
				key.forEach((item) => {
					item.forEach((itm, idx) => {
						const data = setDataLines(
							itm,
							obsTypes[idx],
							idx,
							VOLUME
								? activeLakes.map((lake) => lake.name)[index - 1]
								: activeLakes.map((lake) => lake.name)[index],
							index
						)
						const itemDates = itm.map((el) => el.date)
						allDates.push(...itemDates)
						arr.push(data)
					})
				})
			})
			allDatesSorted = allDates.sort((a, b) => new Date(a) - new Date(b))
			const firstDateGraph = getChartStartDateCurrentMonth(allDatesSorted[0])
			setDateMin(firstDateGraph)
			const lastDateGraph = getChartFirstDateNextMonth(allDatesSorted.at(-1))
			setDateMax(lastDateGraph)
		}

		if (
			YEAR &&
			Object.entries(
				dataLakes[activeLakes.at(-1).id][dataType]?.[obsDepth].byYear
			).length === chartData[0].length
		) {
			const arrFistDate = []
			const arrLastDate = []
			const arrDate = []
			chartData.forEach((year) => {
				Object.values(year).forEach((obs, index) => {
					obs.forEach((itm, idx) => {
						const data = setDataLines(
							itm[0],
							obsTypes[idx],
							index,
							activeLakes.at(-1).name,
							index
						)

						arrFistDate.push(itm[0][0].date)
						arrLastDate.push(itm[0].at(-1).date)
						const dateBegin = itm[0][0].date
						const dateEnd = itm[0].at(-1).date
						arrDate.push({ dateBegin, dateEnd })
						arr.push(data)
					})
				})
			})
			const firstDate = arrFistDate.sort((a, b) => new Date(a) - new Date(b))[0]

			const allYears = arrFistDate.map((date) => new Date(date).getFullYear())
			const allYearsDates = allYears.map((year) =>
				arrDate.filter(
					(date) => new Date(date.dateBegin).getFullYear() === year
				)
			)
			const allFirstDates = allYearsDates
				.map((year) => {
					return year.map((el) => el.dateBegin)
				})
				.map((year) => year.sort((a, b) => new Date(a) - new Date(b))[0])
			const uniqueFirstDate = Array.from(new Set(allFirstDates))
			const years = uniqueFirstDate.map((date) => new Date(date).getFullYear())
			const allLastDates = allYearsDates
				.map((year) => {
					return year.map((el) => el.dateEnd)
				})
				.map((year) => year.sort((a, b) => new Date(a) - new Date(b)).at(-1))
			const uniqueLastDate = Array.from(new Set(allLastDates))

			const obj = {}
			const objAllDatesByYear = () => {
				years.map((year, index) => {
					return (obj[year] = {
						start: uniqueFirstDate[index],
						end: uniqueLastDate[index],
					})
				})
			}
			objAllDatesByYear()

			setDatesOfYear(obj)
		}
		if (JSON.stringify([...arr]) !== JSON.stringify(dataSets)) {
			setDataSets([...arr])
		}

		arr.length = 0
	}, [YEAR, chartData, charType])

	const makesScalesForyear = useCallback((isDisplay, startDate, endDate) => {
		const obj = {
			type: "time",
			parsing: false,
			display: isDisplay,
			min: startDate,
			max: endDate,
			time: {
				displayFormats: {
					month: "MMM yyyy",
					day: "dd MMM",
				},
				tooltipFormat: "dd MMM yyyy",
			},
		}
		return obj
	}, [])

	useEffect(() => {
		if (Object.entries(datesOfYear).length === 0) return
		const scalesYearsTmp = {}
		Object.entries(datesOfYear).forEach((year, index) => {
			const yearScales = makesScalesForyear(
				index === 0 ? true : false,
				getChartStartDateCurrentMonth(year[1].start),
				getChartFirstDateNextMonth(year[1].end)
			)
			scalesYearsTmp[`x${index}`] = yearScales
		})

		const y = { beginAtZero: true }
		scalesYearsTmp.y = y
		setScales(scalesYearsTmp)
	}, [datesOfYear])

	useEffect(() => {
		if (!YEAR) {
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
				y: {
					beginAtZero: true,
				},
			})
		}
	}, [dateMin, dateMax])

	useEffect(() => {
		const chartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			interaction: {
				intersect: false,
				mode: "nearest",
			},
			plugins: {
				title: {
					display: true,
					text: `${label}  ${unit}`,
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
							if (VOLUME) return
							const { lakeName } = context[0].dataset
							return `${lakeName}`
						},
						beforeBody(context) {
							const { label } = context[0].dataset
							return `Observation: ${label}`
						},
						label(context) {
							const { formattedValue } = context
							if (!VOLUME) {
								return ` ${label}: ${formattedValue} ${unit}`
							}
							if (VOLUME) {
								return ` Total ${label}: ${formattedValue} ${unit}`
							}
						},
						afterLabel(context) {
							if (!VOLUME) return
							if (VOLUME) {
								const { date } = context.raw
								const { index } = context.dataset
								const allId = activeLakes.map((lake) => lake.id)
								const allValue = allId.map((id) => {
									return dataLakes[id][DataTypes.VOLUME]?.[obsDepth].byVolume[
										index
									]
										.filter((item) => item.date === date)
										.map((item) => item.value)
								})
								return allValue.map((val, index) => {
									const { name } = Object.values(activeLakes)[index]
									const value = val[0].toFixed(3)
									return ` ${name}: ${value} ${unit}`
								})
							}
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
		setOptions(chartOptions)
	}, [scales, label, unit, VOLUME])

	useEffect(() => {
		if (YEAR || dataSets.length !== activeLakes.length * obsTypes.length) return
		const toggleChartVisibilty = handleDataSetsBooleanOption(
			dataSets,
			activeLakes,
			"chartVisible",
			"hidden",
			obsTypes
		)
		setDataSets(toggleChartVisibilty)
	}, [activeLakes])

	useEffect(() => {
		if (YEAR || dataSets.length !== activeLakes.length * obsTypes.length) return
		const toggleBoldGraph = handleDataSetsBorderWidthOption(
			dataSets,
			activeLakes,
			"selected",
			"borderWidth",
			obsTypes,
			chart
		)
		setDataSets(toggleBoldGraph)
	}, [activeLakes])

	useEffect(() => {
		if (!YEAR && activeLakes.length === 0) return
		const arrActiveYears = Object.values(activeYears)

		const toggleYearChartVisibilty = handleDataSetsBooleanOption(
			dataSets,
			arrActiveYears,
			"chartVisible",
			"hidden",
			obsTypes
		)
		setDataSets(toggleYearChartVisibilty)
	}, [activeYears])

	useEffect(() => {
		if (!YEAR && dataSets.length === 0) return
		const arrActiveYears = Object.values(activeYears)
		const toggleYearBoldGraph = handleDataSetsBorderWidthOption(
			dataSets,
			arrActiveYears,
			"selected",
			"borderWidth",
			obsTypes,
			chart
		)
		setDataSets(toggleYearBoldGraph)
	}, [activeYears])

	const dataChart = {
		datasets: dataSets,
	}

	return {
		dataChart,
		options,
		form,
		charType,
		chartRef,
	}
}
