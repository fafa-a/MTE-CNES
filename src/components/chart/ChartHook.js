/* eslint-disable no-undef */
import { AppConfig } from "@/config"
import { useSelector, useDispatch } from "react-redux"
import { DataTypes, DurationTypes, ObservationTypes } from "../../config"
import { useEffect, useState, useCallback, useRef } from "react"
import { handleResetZoom } from "../../stores/chartSlice"
export default function useChartHook() {
	const [chartData, setChartData] = useState([])
	const [dataSets, setDataSets] = useState([])
	const [dateMin, setDateMin] = useState()
	const [dateMax, setDateMax] = useState()
	const [obsTypes, setObsTypes] = useState([])
	const [lastDataTypes, setLastDataTypes] = useState([])
	const [lastObstypes, setLastObstypes] = useState([])
	const [obsDepth, setObsDepth] = useState()
	const [scales, setScales] = useState()
	const form = useSelector((state) => state.form)
	const { activeLakes, activeYears, dataLakes, totalVolume } = useSelector(
		(state) => state.lakes
	)
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
	const chartRef = useRef()
	const dispatch = useDispatch()
	useEffect(() => {
		if (!activeLakes) return
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
	}, [DAY, OPTIC, PERIOD, RADAR, REFERENCE, YEAR, activeLakes, form])

	useEffect(() => {
		if (
			dataType !== lastDataTypes ||
			JSON.stringify(obsTypes) !== JSON.stringify(lastObstypes)
		) {
			setChartData([])
		}
	}, [dataType, lastDataTypes, lastObstypes, obsTypes])

	useEffect(() => {
		if (zoomReset) {
			chartRef.current.resetZoom()
			dispatch(handleResetZoom({ zoom: false }))
		}
	}, [zoomReset])

	useEffect(() => {
		if (!Object.values(dataLakes).length) return
		const dataTmp = []

		if (!YEAR) {
			if (VOLUME) {
				if (OPTIC && RADAR && REFERENCE) {
					dataTmp.push([totalVolume])
				}

				if (OPTIC && !RADAR && !REFERENCE) {
					dataTmp.push([totalVolume.slice(0, 1)])
				}

				if (OPTIC && !RADAR && REFERENCE) {
					dataTmp.push([totalVolume.slice(0, -1)])
				}

				if (!OPTIC && RADAR && !REFERENCE) {
					dataTmp.push([totalVolume.slice(1, 2)])
				}

				if (!OPTIC && RADAR && REFERENCE) {
					dataTmp.push([totalVolume.slice(1, totalVolume.length)])
				}

				if (OPTIC && RADAR && !REFERENCE) {
					dataTmp.push([totalVolume.slice(0, 2)])
				}

				if (!OPTIC && !RADAR && REFERENCE) {
					dataTmp.push([[totalVolume.at(-1)]])
				}
			}
			for (const lake of activeLakes) {
				const { id } = lake
				if (!dataLakes[id][dataType]?.[obsDepth]) return
				if (!dataLakes[id][dataType]?.[obsDepth].raw) continue

				const dataRaw = VOLUME
					? dataLakes[id][dataType][obsDepth].byVolume
					: dataLakes[id][dataType][obsDepth].raw

				if (OPTIC && RADAR && REFERENCE) {
					dataTmp.push([dataRaw])
				}

				if (OPTIC && !RADAR && !REFERENCE) {
					dataTmp.push([dataRaw.slice(0, 1)])
				}

				if (OPTIC && !RADAR && REFERENCE) {
					if (dataRaw[2].length === 0) {
						dataTmp.push([dataRaw.slice(0, 1)])
					}
					dataTmp.push([dataRaw.slice(0, -1)])
				}

				if (!OPTIC && RADAR && !REFERENCE) {
					dataTmp.push([dataRaw.slice(1, 2)])
				}

				if (!OPTIC && RADAR && REFERENCE) {
					dataTmp.push([dataRaw.slice(1, dataRaw.length)])
				}

				if (OPTIC && RADAR && !REFERENCE) {
					dataTmp.push([dataRaw.slice(0, 2)])
				}

				if (!OPTIC && !RADAR && REFERENCE) {
					if (dataRaw.length < 3) return
					dataTmp.push([[dataRaw.at(-1)]])
				}
			}
		}
		if (YEAR) {
			const { id } = Object.values(activeLakes).at(-1)

			if (!dataLakes[id][dataType]?.[obsDepth].byYear) return
			const dataByYear = Object.values(dataLakes[id][dataType][obsDepth].byYear)

			if (OPTIC && RADAR && REFERENCE) {
				dataTmp.push(dataByYear)
			}

			if (OPTIC && !RADAR && !REFERENCE) {
				dataTmp.push(dataByYear.map((obs) => obs.slice(0, 1)))
			}

			if (OPTIC && !RADAR && REFERENCE) {
				if (dataByYear[0].length === 2) {
					dataTmp.push(dataByYear.map((obs) => obs.slice(0, 1)))
				}
				if (dataByYear[0].length === 3) {
					dataTmp.push(
						dataByYear.map((obs) => [obs.slice(0, 1)[0], obs.at(-1)])
					)
				}
			}

			if (!OPTIC && RADAR && !REFERENCE) {
				dataTmp.push(dataByYear.map((obs) => obs.slice(1, 2)))
			}

			if (!OPTIC && RADAR && REFERENCE) {
				dataTmp.push(dataByYear.map((obs) => obs.slice(1, 3)))
			}

			if (OPTIC && RADAR && !REFERENCE) {
				dataTmp.push(dataByYear.map((obs) => obs.slice(0, 2)))
			}

			if (!OPTIC && !RADAR && REFERENCE) {
				if (dataByYear[0].length === 2) return
				dataTmp.push(dataByYear.map((obs) => obs.at(-1)))
			}
		}
		setChartData(dataTmp)
		setLastDataTypes(dataType)
		setLastObstypes(obsTypes)
	}, [dataLakes, REFERENCE, YEAR, dataType, obsTypes, VOLUME])

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
				if (index === 0) xAxisID = "x2018"
				if (index === 1) xAxisID = "x2019"
				if (index === 2) xAxisID = "x2020"
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
		if (!dataSets.length) return
		const newData = [...dataSets]
		const activeLakesIndex = activeLakes.map((lake) => {
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
	}, [chart, YEAR, dataType, charType, unit, VOLUME])

	const getChartStartDate = useCallback((date) => {
		const minDatevalue = new Date(date)
		const firstDayMonth = new Date(
			minDatevalue.getFullYear(),
			minDatevalue.getMonth(),
			1
		)
		return firstDayMonth
	}, [])

	const getChartFirstDateNextMonth = useCallback((date) => {
		const maxDateValue = new Date(date)
		const nextMonth = new Date(
			maxDateValue.getFullYear(),
			maxDateValue.getMonth() + 1,
			1
		)
		return nextMonth
	}, [])

	useEffect(() => {
		const arr = []
		const allDates = []
		let allDatesSorted = []
		if (!Object.values(dataLakes).length && chartData[0].length === 0) return
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
			const firstDateGraph = getChartStartDate(allDatesSorted[0])
			setDateMin(firstDateGraph)
			const lastDateGraph = getChartFirstDateNextMonth(allDatesSorted.at(-1))
			setDateMax(lastDateGraph)
		}
		if (
			YEAR &&
			Object.entries(
				dataLakes[activeLakes.at(-1).id][dataType][obsDepth].byYear
			).length === chartData[0].length
		) {
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

						// const firstDateGraph = getChartStartDate(itm[0].date)
						// setDateMin(firstDateGraph)

						// const lastDateGraph = getChartFirstDateNextMonth(itm.at(-1).date)
						// setDateMax(lastDateGraph)
						arr.push(data)
					})
				})
			})
		}
		setDataSets([...arr])

		arr.length = 0
	}, [YEAR, chartData])

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
		if (YEAR) {
			setScales({
				x2018: {
					type: "time",
					parsing: false,
					min: new Date("2018-01-01"),
					max: new Date("2019-01-01"),
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
					display: false,
					min: new Date("2019-01-01"),
					max: new Date("2020-01-01"),
					time: {
						displayFormats: {
							month: "MMM yyyy",
							day: "dd MMM",
						},
						tooltipFormat: "dd MMM yyyy",
					},
				},
				x2020: {
					type: "time",
					parsing: false,
					display: false,
					min: new Date("2020-01-01"),
					max: new Date("2021-01-01"),
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
	}, [YEAR, dateMin, dateMax])

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
								return dataLakes[id][DataTypes.VOLUME][obsDepth].byVolume[index]
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

	useEffect(() => {
		if (![activeLakes].length) return
		const newData = [...dataSets]
		const selectedLakes = activeLakes.map((lake) => {
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
	}, [
		activeLakes,
		chart.style.default.borderWidth,
		chart.style.selected.borderWidth,
		obsTypes.length,
	])

	useEffect(() => {
		if (!dataSets.length) return
		const newData = [...dataSets]
		const activeLakesIndex = activeLakes.map((lake) => {
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
	}, [activeLakes])

	useEffect(() => {
		if (![activeLakes].length) return
		const newData = [...dataSets]
		const activeYearsChartVisible = Object.values(activeYears).map((year) => {
			return {
				visible: year.chartVisible,
				index: year.index,
			}
		})

		for (const lake of activeYearsChartVisible) {
			const { index, visible } = lake
			if (obsTypes.length === 1) {
				if (dataSets.length !== activeYearsChartVisible.length) return
				if (visible) {
					newData[index].hidden = false
				}
				if (!visible) {
					newData[index].hidden = true
				}
				setDataSets(newData)
			}

			if (obsTypes.length === 2) {
				if (dataSets.length !== activeYearsChartVisible.length * 2) return
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
				if (dataSets.length !== activeYearsChartVisible.length * 3) return
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
	}, [activeYears, obsTypes.length])

	useEffect(() => {
		if (![activeLakes].length) return
		const newData = [...dataSets]
		const activeYearsSelected = Object.values(activeYears).map((year) => {
			return {
				selected: year.selected,
				index: year.index,
			}
		})
		for (const year of activeYearsSelected) {
			const { index, selected } = year
			if (obsTypes.length === 1) {
				if (dataSets.length !== activeYearsSelected.length) return
				if (selected) {
					newData[index].borderWidth = chart.style.selected.borderWidth
				}
				if (!selected) {
					newData[index].borderWidth = chart.style.default.borderWidth
				}
				setDataSets(newData)
			}
			if (obsTypes.length === 2) {
				if (dataSets.length !== activeYearsSelected.length * 2) return
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
				if (dataSets.length !== activeYearsSelected.length * 3) return
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
	}, [
		activeYears,
		chart.style.default.borderWidth,
		chart.style.selected.borderWidth,
		obsTypes.length,
	])

	const data = {
		datasets: dataSets,
	}

	useEffect(() => {
		console.log({ dataSets, options })
	}, [dataSets])

	useEffect(() => {
		console.log({ chartData })
	}, [chartData])

	return {
		data,
		options,
		form,
		charType,
		chartRef,
	}
}
