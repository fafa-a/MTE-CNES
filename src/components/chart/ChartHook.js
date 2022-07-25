/* eslint-disable no-undef */
import { AppConfig } from "@/config"
import { useSelector } from "react-redux"
import { CompareTypes, ObservationTypes } from "../../config"

export default function useChartHook() {
	const [chartData, setChartData] = useState([])
	const [dataSets, setDataSets] = useState([])
	const [dateMin, setDateMin] = useState()
	const [dateMax, setDateMax] = useState()
	const [obsTypes, setObsTypes] = useState([])
	const [lastDataTypes, setLastDataTypes] = useState([])
	const [lastObstypes, setLastObstypes] = useState([])
	const [scales, setScales] = useState()
	const form = useSelector((state) => state.form)
	const { charType } = form
	const { activeLakes, activeYears, dataLakes } = useSelector(
		(state) => state.lakes
	)
	const chart = useSelector((state) => state.chart)
	const { dataType, OPTIC, RADAR, DAY, PERIOD, REFERENCE, YEAR } = form
	const { label, unit } = AppConfig.attributes[dataType]

  useEffect(() => {
		console.log({ dataSets })
	}, [dataSets])

	useEffect(() => {
		if (!activeLakes) return
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
		if (!Object.values(dataLakes).length) return
		const dataTmp = []

		if (!YEAR) {
			for (const lake of activeLakes) {
				const { id } = lake
				if (!dataLakes[id][dataType]?.byYear) continue
				const dataRaw = dataLakes[id][dataType].raw
				if (!REFERENCE) {
					dataTmp.push([dataRaw.slice(0, 2)])
				}
				if (REFERENCE) {
					dataTmp.push([dataRaw])
				}
			}
		}

		if (YEAR) {
      const { id } = Object.values(activeLakes).at(-1)

			if (!dataLakes[id][dataType]?.byYear) return
			const dataByYear = Object.values(dataLakes[id][dataType].byYear)
			if (!REFERENCE) {
				const dataByYearWithoutRef = dataByYear.map((obs) => obs.slice(0, 2))
				dataTmp.push([dataByYearWithoutRef])
			}
			if (REFERENCE) {
				dataTmp.push(dataByYear)
			}
		}

		setChartData(dataTmp)
		setLastDataTypes(dataType)
		setLastObstypes(obsTypes)
	}, [dataLakes, REFERENCE, YEAR, dataType, obsTypes])

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
			return {
				backgroundColor,
				borderColor,
				pointBackgroundColor,
				borderWidth,
				data: YEAR ? item : item,
				label: `${obsType}`,
				lakeName: `${lakeName}`,
				pointRadius,
				tension,
				xAxisID,
				hidden: !YEAR
					? !Object.values(activeLakes)[indexColor].chartVisible
					: !Object.values(activeYears)[indexColor].chartVisible,
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
	}, [chart, YEAR, dataType, charType, unit])

	const getChartStartDate = useCallback((arr) => {
		const minDatevalue = new Date(arr.shift())
		const firstDayMonth = new Date(
			minDatevalue.getFullYear(),
			minDatevalue.getMonth(),
			1
		)
		return firstDayMonth
	}, [])

	const getChartFirstDateNextMonth = useCallback((arr) => {
		const maxDateValue = new Date(arr.at(-1))
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
							activeLakes.map((lake) => lake.name)[index],
							index
						)
						const itemDates = itm
							.filter(
								(el) => !isNaN(el.value) && el.date !== "" && el.value !== "0"
							)
							.map((el) => el.date)
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

		if (YEAR) {
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
						// const itemDates = item.map(el =>
						//   el
						//     .filter(el => !isNaN(el.value) && el.date !== "")
						//     .map(el => new Date(el.date))
						// )
						// const datesSorted = itemDates[0].sort((a, b) => a - b)
						// const firstDateGraph = getChartStartDate(datesSorted)
						// setDateMin(firstDateGraph)
						// const lastDateGraph = getChartFirstDateNextMonth(datesSorted)
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
						const { lakeName } = context[0].dataset
						return `${lakeName}`
					},
					beforeBody(context) {
						const { label } = context[0].dataset
						return `Observation: ${label}`
					},
					label(context) {
						const { formattedValue } = context
						return ` ${label}: ${formattedValue} ${unit}`
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

	return {
		data,
		options,
		form,
		charType,
	}
}
