import { useEffect, useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addLake } from "./stores/lakesSlice"
import { addColor } from "./stores/chartSlice"
import {
	AppConfig,
	SeriePathUtils,
	ObservationTypes,
	DurationTypes,
	DataTypes,
} from "./config"
import { csv } from "d3"
import { extractDataByYear, groupDataByYear } from "./utils"
import { desactiveLake } from "@stores/lakesSlice"

export function useAppHook() {
	const [seriePath, setSeriePath] = useState([])
	const [lakeData, setLakeData] = useState([])
	const [dataReference, setDataReference] = useState([])
	const [lakeDataWithReference, setLakeDataWithReference] = useState([])
	const [tmpFillingRateReference, setTmpFillingRateReference] = useState([])
	const [fillingRateReference, setFillingRateReference] = useState([])
	const [surfaceReference, setSurfaceReference] = useState([])
	const [volumeReference, setVolumeReference] = useState([])
	const [lakeDataByYear, setLakeDataByYear] = useState([])
	const [showLakeInfo, setShowLakeInfo] = useState(false)
	const [isOneLakeActive, setIsOneLakeActive] = useState(false)
	const [theme, setTheme] = useState("dark")
	const form = useSelector((state) => state.form)
	const { activeLakes, lakeIdToDesactivate, dataLakes } = useSelector(
		(state) => state.lakes
	)
	const { lakes } = useSelector((state) => state)
	const { OPTIC, RADAR, DAY, PERIOD, REFERENCE, YEAR, dataType, charType } =
		form
	const { getSeriePath, getTimeseriesPath } = SeriePathUtils
	const dispatch = useDispatch()
	const { unit } = AppConfig.attributes[dataType]
	const toggleTheme = useCallback(() => {
		setTheme(theme === "dark" ? "light" : "dark")
	})

	useEffect(() => {
		if (!Object.values(activeLakes)) return

		const showInfo = Object.values(activeLakes)
			.filter((lake) => lake.showInfo === true)
			.map((lake) => lake.showInfo)[0]
		if (showInfo) setShowLakeInfo(showInfo)
		else setShowLakeInfo(false)
		if (Object.values(activeLakes).length > 0) setIsOneLakeActive(true)
	}, [activeLakes])

	useEffect(() => {
		if (!lakeIdToDesactivate) return
		const index = activeLakes
			.filter((lake) => lake.id === lakeIdToDesactivate)
			.map((lake) => lake.index)[0]
		setLakeDataWithReference([
			...lakeDataWithReference.slice(0, index),
			...lakeDataWithReference.slice(index + 1),
		])
		dispatch(desactiveLake({ lakeId: lakeIdToDesactivate }))
	}, [dispatch, lakeIdToDesactivate])

	const handleSeriePath = useCallback(
		(id, name, dataType, obs, duration) => {
			if (!id) return
			const lakeName = name.replace(/\s/g, "_")
			const path = getSeriePath(
				id,
				lakeName,
				AppConfig.attributes[dataType].filePath,
				AppConfig.observationTypes[obs].abbr,
				AppConfig.duration[duration].abbr
			)
			return path
		},
		[getSeriePath]
	)

	const getSeriePathByDay = useCallback(
		(id, name) => {
			const arrTmp = []
			if (OPTIC && DAY) {
				const path = handleSeriePath(
					id,
					name,
					dataType,
					ObservationTypes.OPTIC,
					DurationTypes.DAY
				)
				arrTmp.push(path)
			}

			if (RADAR && DAY) {
				const path = handleSeriePath(
					id,
					name,
					dataType,
					ObservationTypes.RADAR,
					DurationTypes.DAY
				)
				arrTmp.push(path)
			}

			return arrTmp
		},
		[OPTIC, DAY, RADAR, handleSeriePath, dataType]
	)

	const getSeriePathByPeriod = useCallback(
		(id, name) => {
			const arrTmp = []
			if (OPTIC && PERIOD) {
				const path = handleSeriePath(
					id,
					name,
					dataType,
					ObservationTypes.OPTIC,
					DurationTypes.PERIOD
				)
				arrTmp.push(path)
			}

			if (RADAR && PERIOD) {
				const path = handleSeriePath(
					id,
					name,
					dataType,
					ObservationTypes.RADAR,
					DurationTypes.PERIOD
				)
				arrTmp.push(path)
			}

			return arrTmp
		},
		[OPTIC, PERIOD, RADAR, handleSeriePath, dataType]
	)

	useEffect(() => {
		if (activeLakes.length === 0) return
		const seriePathTmp = []
		activeLakes
			.map((lake) => {
				return { id: lake.id, name: lake.name }
			})
			.forEach((lake) => {
				const seriePathByday = getSeriePathByDay(lake.id, lake.name)
				const seriePathByPeriod = getSeriePathByPeriod(lake.id, lake.name)
				const referencePath = getTimeseriesPath(lake.id, "andalousie")
				seriePathTmp.push([
					...seriePathByday,
					...seriePathByPeriod,
					referencePath,
				])
			})
		if (JSON.stringify(seriePathTmp) === JSON.stringify(seriePath)) return
		setSeriePath(seriePathTmp)
	}, [
		dataType,
		OPTIC,
		RADAR,
		DAY,
		PERIOD,
		charType,
		REFERENCE,
		activeLakes,
		seriePath,
		getSeriePathByDay,
		getSeriePathByPeriod,
		getTimeseriesPath,
	])

	useEffect(() => {
		if (lakeData[0]?.length === 0) return
		const dataRefDateFiltered = []
		lakeData.forEach((lake) => {
			dataRefDateFiltered.push(
				lake
					.at(-1)
					.filter(
						(data) =>
							data.hour === "00:00:00" &&
							data.date >= "2018-01-01" &&
							data.date <= "2020-12-31"
					)
			)
		})
		setDataReference(dataRefDateFiltered)
	}, [lakeData])

	useEffect(() => {
		let lakeDataTmp = []
		if (YEAR && dataLakes[activeLakes.at(-1).id][dataType]?.byYear) return
		lakeDataWithReference.forEach((obs) => {
			obs.forEach((data) => {
				const dataYear = extractDataByYear(data)
				lakeDataTmp.push(dataYear)
			})
			const dataByYear = groupDataByYear(lakeDataTmp)
			lakeDataTmp = []
			lakeDataTmp.push(dataByYear)
		})
		setLakeDataByYear(lakeDataTmp)
	}, [lakeDataWithReference])

	const fetchData = useCallback(async () => {
		const arrTmp = []
		for (const lake of seriePath) {
			const dataTmp = []
			for (const path of lake) {
				const data = await csv(path)
				dataTmp.push(data)
			}
			arrTmp.push([dataTmp])
		}
		return arrTmp
	}, [seriePath])

	useEffect(() => {
		if (!dataReference.length) return
		if (dataType === DataTypes.SURFACE) {
			const surfaceRef = dataReference.map((lake) => {
				return lake.map((data) => {
					return {
						date: data.date,
						value: data.area,
					}
				})
			})
			setSurfaceReference(surfaceRef)
		}
		if (dataType === DataTypes.VOLUME || dataType === DataTypes.FILLING_RATE) {
			const volumeRef = dataReference.map((lake) => {
				return lake.map((data) => {
					return {
						date: data.date,
						value: data.volume,
					}
				})
			})
			setVolumeReference(volumeRef)
			setTmpFillingRateReference(volumeRef)
		}
	}, [dataReference, dataType])

	const calculateFillingRate = useCallback(() => {
		const rateRef = tmpFillingRateReference.map((days) => {
			const max = days.reduce((acc, curr) => {
				return acc.value > curr.value ? acc : curr
			}, 0)
			return max.value
		})
		return rateRef
	}, [tmpFillingRateReference])

	useEffect(() => {
		if (!tmpFillingRateReference.length) return
		const rateRef = calculateFillingRate()
		const fillingRateTmp = []
		tmpFillingRateReference.map((lake, index) => {
			fillingRateTmp.push(
				lake.map((data) => {
					return {
						date: data.date,
						value: (data.value / rateRef[index]) * 100,
					}
				})
			)
		})
		setFillingRateReference(fillingRateTmp)
	}, [calculateFillingRate, tmpFillingRateReference])

	useEffect(() => {
		if (!lakeData.length) return
		if (
			dataType === DataTypes.SURFACE &&
			surfaceReference.length !== lakeData.length
		)
			return
		if (
			dataType === DataTypes.VOLUME &&
			volumeReference.length !== lakeData.length
		)
			return
		if (
			dataType === DataTypes.FILLING_RATE &&
			fillingRateReference.length !== lakeData.length
		)
			return
		const arrTmp = []
		lakeData.forEach((lake, index) => {
			let data = []

			if (!OPTIC || !RADAR) {
				data = [lake[0]]
			}

			if (OPTIC && RADAR) {
				data = [lake[0], lake[1]]
			}
			if (!OPTIC && !RADAR && REFERENCE) {
				data = []
			}
			if (dataType === DataTypes.FILLING_RATE && REFERENCE) {
				data = [...data, fillingRateReference[index]]
			}
			if (dataType === DataTypes.SURFACE && REFERENCE) {
				data = [...data, surfaceReference[index]]
			}
			if (dataType === DataTypes.VOLUME && REFERENCE) {
				data = [...data, volumeReference[index]]
			}
			arrTmp.push(data)
		})
		setLakeDataWithReference(arrTmp)
	}, [
		surfaceReference,
		volumeReference,
		fillingRateReference,
		lakeData,
		dataType,
		OPTIC,
		RADAR,
		REFERENCE,
	])

	const handleFetchData = useCallback(async () => {
		const dataRaw = await fetchData()
		const data = await getCleanData(dataRaw)
		setLakeData(data)
	}, [fetchData])

	const handleValue = useCallback(
		(value, unit) => {
			if (unit === "hm³") {
				return (1 * value) / 1_000_000
			}
			if (unit === "ha") {
				return (1 * value) / 10_000
			}
		},
		[unit]
	)

	const getCleanData = useCallback(
		(data) => {
			return data.map((obs) => {
				return obs[0].map((data, index) => {
					// TODO : fix swtitch between ZSV and other csv
					if (data.length > 2000) {
						return data.map((el) => {
							return {
								date: el.date,
								hour: el.hour,
								volume: (1 * el.volume) / 1_000_000,
								area: (1 * el.area) / 10_000,
							}
						})
					} else {
						return data
							.filter((el) => {
								return (
									!isNaN(el.value) &&
									el.value !== "nan" &&
									el.date !== "" &&
									el.value !== "0"
								)
							})
							.map((el) => {
								return {
									date: el.date,
									value: unit === "%" ? el.value : handleValue(el.value, unit),
								}
							})
					}
				})
			})
		},
		[handleValue, unit]
	)
	const addChartColor = useCallback(() => {
		const randomColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
			Math.random() * 255
		)}, ${Math.floor(Math.random() * 255)}, 1)`
		dispatch(
			addColor({
				dataType,
				obsType: ObservationTypes.OPTIC,
				color: randomColor,
			})
		)
		let newColor = randomColor.replace(/,[^,]+$/, ",0.66)")
		dispatch(
			addColor({
				dataType,
				obsType: ObservationTypes.RADAR,
				color: newColor,
			})
		)
		newColor = randomColor.replace(/,[^,]+$/, ",0.33)")
		dispatch(
			addColor({
				dataType,
				obsType: ObservationTypes.REFERENCE,
				color: newColor,
			})
		)
	}, [dataType])

	useEffect(() => {
		if (activeLakes.length > 10) {
			addChartColor()
		}
	}, [activeLakes, addChartColor])

	useEffect(() => {
		handleFetchData()
	}, [fetchData, handleFetchData])

	useEffect(() => {
		if (!lakeData || activeLakes.length === 0) return
		if (dataType === DataTypes.FILLING_RATE && !fillingRateReference.length)
			return

		lakeDataWithReference.forEach((data, index) => {
			dispatch(
				addLake({
					lakeId: activeLakes[index].id,
					dataType,
					lakeData: data,
					byYear: lakeDataByYear[0],
					seriePath: seriePath[index],
				})
			)
		})
	}, [
		lakeDataWithReference,
		lakeDataByYear,
		lakeData,
		dataType,
		fillingRateReference.length,
		dispatch,
		seriePath,
		activeLakes,
	])

	return {
		showLakeInfo,
		isOneLakeActive,
		toggleTheme,
		theme,
	}
}
