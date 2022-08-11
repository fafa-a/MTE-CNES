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
	const [fullDataOfVolume, setFullDataOfVolume] = useState([])
	const [showLakeInfo, setShowLakeInfo] = useState(false)
	const [isOneLakeActive, setIsOneLakeActive] = useState(false)
	const [theme, setTheme] = useState("dark")
	const [lastDataType, setLastDataType] = useState(DataTypes.FILLING_RATE)
	const [noDataLake, setNodataLake] = useState(false)
  const [obsDepth, setObsDepth] = useState(DurationTypes.PERIOD)
	const [lastObsDepth, setLastObsDepth] = useState(DurationTypes.PERIOD)
	const form = useSelector((state) => state.form)
	const { activeLakes, lakeIdToDesactivate, dataLakes } = useSelector(
		(state) => state.lakes
	)
	const { lakes } = useSelector((state) => state)
	const { OPTIC, RADAR, DAY, PERIOD, REFERENCE, YEAR, dataType } = form
	const { getSeriePath, getTimeseriesPath } = SeriePathUtils
	const dispatch = useDispatch()
	const { unit } = AppConfig.attributes[dataType]
	const toggleTheme = useCallback(() => {
		setTheme(theme === "dark" ? "light" : "dark")
	})
	useEffect(() => {
		if (DAY) {
			setObsDepth(DurationTypes.DAY)
		}
		if (PERIOD) {
			setObsDepth(DurationTypes.PERIOD)
		}
		setLastObsDepth(obsDepth)
	}, [DAY, PERIOD])

	useEffect(() => {
		if (lastObsDepth !== obsDepth) {
			setLakeData([])
			setLakeDataWithReference([])
			setLakeDataByYear([])
			setFullDataOfVolume([])
			setTmpFillingRateReference([])
			setFillingRateReference([])
			setSurfaceReference([])
			setVolumeReference([])
		}
	}, [lastObsDepth, obsDepth])

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
		if (dataType !== lastDataType) {
			setLakeData([])
			setLakeDataByYear([])
		}
		setLastDataType(dataType)
	}, [dataType])

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
			const path = getSeriePath(
				id,
				name,
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
		const allActiveLakes = activeLakes.map((lake) => {
			return { id: lake.id, name: lake.name }
		})

		for (const lake of allActiveLakes) {
			if (!dataLakes[lake.id]?.[dataType]?.[obsDepth]) {
				const lakeName = lake.name.replace(/\s/g, "_")
				const seriePathByday = getSeriePathByDay(lake.id, lakeName)
				const seriePathByPeriod = getSeriePathByPeriod(lake.id, lakeName)
				const referencePath = getTimeseriesPath(lake.id, lakeName)
				seriePathTmp.push([
					...seriePathByday,
					...seriePathByPeriod,
					referencePath,
				])
			}
		}
		if (JSON.stringify(seriePathTmp) === JSON.stringify(seriePath)) return
		setSeriePath(seriePathTmp)
	}, [dataType, obsDepth, REFERENCE, activeLakes])

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
		if (YEAR && dataLakes[activeLakes.at(-1).id][dataType]?.[obsDepth].byYear)
			return

		lakeDataWithReference.forEach((obs) => {
			let dataYear = []
			obs.forEach((data) => {
				dataYear.push(extractDataByYear(data))
			})
			const dataByYear = groupDataByYear(dataYear)

			lakeDataTmp.push(dataByYear)
		})
		setLakeDataByYear(lakeDataTmp)
	}, [lakeDataWithReference])

	const fetchData = useCallback(async () => {
		const arrTmp = []
		for (const lake of seriePath) {
			const dataTmp = []
			let id
			for (const path of lake) {
				id = path
					.split("/")
					[path.split("/").length - 1].split(".")[0]
					.match(/^[^_]+/)[0]
				try {
					const data = await csv(path)
					if (data[0].date) {
						dataTmp.push(data)
					}
				} catch (error) {}
			}
			if (dataTmp.length === 0) {
				dispatch(desactiveLake({ lakeId: id }))
				setNodataLake(true)
			}
			arrTmp.push([dataTmp])
		}
		return arrTmp
	}, [seriePath, dispatch])

	const handleSetNoDataLake = useCallback(() => {
		setNodataLake(false)
	}, [])

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
		if (
			dataType === DataTypes.FILLING_RATE &&
			arrTmp[0].at(-1).length > 0 &&
			JSON.stringify(arrTmp[0].at(-1)) ===
				JSON.stringify(lakeDataWithReference[0]?.at(-1))
		)
			return
		setLakeDataWithReference(arrTmp)
	}, [lakeData, surfaceReference, volumeReference, fillingRateReference])

	const handleFetchData = useCallback(async () => {
		const dataRaw = await fetchData()
		const data = await formatValue(dataRaw)
		if (dataType === DataTypes.VOLUME) {
			if (seriePath.length > 1) {
				let dataTmp = []
				for (const lake of data) {
					const dataFullDates = fillEmptyDataOfDate([lake])
					dataTmp.push(dataFullDates[0])
				}
				setFullDataOfVolume(dataTmp)
			} else {
				const dataFullDates = fillEmptyDataOfDate(data)
				setFullDataOfVolume(dataFullDates)
			}
		}
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

	const getStartDate = useCallback((arr) => {
		const firstDate = arr[0]
			?.map((el) => {
				return el[0].date
			})
			.sort((a, b) => (new Date(a) < new Date(b) ? -1 : 1))
		return firstDate
	}, [])

	const getLastDate = useCallback((arr) => {
		const lastDate = arr[0]
			?.map((el) => {
				return el.at(-1).date
			})
			.sort((a, b) => (new Date(a) < new Date(b) ? -1 : 1))[0]
		return lastDate
	}, [])

	const fillEmptyDataOfDate = useCallback(
		(arr) => {
			const arrOfDates = []
			const newData = []
			const startingDate = getStartDate(arr)
			const endingDate = new Date(getLastDate(arr))
			for (
				let d = new Date(startingDate[0]);
				d <= endingDate;
				d.setDate(d.getDate() + 1)
			) {
				arrOfDates.push(new Date(d).toISOString().slice(0, 10))
			}
			let value = ""
			let arrTmp = []
			const obsTypes = arr[0]?.map((obs) => obs)
			const obsTypesDateFiltered = obsTypes.map((obs, index) => {
				return obs.filter((el) => {
					if (index === 2) {
						return (
							el.date >= new Date(startingDate[0]).toISOString().slice(0, 10) &&
							el.date <= endingDate.toISOString().slice(0, 10) &&
							el.hour === "00:00:00"
						)
					}
					return (
						el.date >= new Date(startingDate[0]).toISOString().slice(0, 10) &&
						el.date <= endingDate.toISOString().slice(0, 10)
					)
				})
			})

			obsTypesDateFiltered.forEach((obs, index) => {
				arrOfDates.forEach((date) => {
					if (obs.map((el) => el.date).includes(date)) {
						value = obs
							.filter((el) => el.date === date)
							.map((el) => (index === 2 ? el.volume : el.value))[0]
					}
					arrTmp.push({
						date,
						value,
					})
				})

				newData.push(
					arrTmp.filter((el) => {
						return (
							el.date >=
								new Date(startingDate.at(-1)).toISOString().slice(0, 10) &&
							el.date <= endingDate.toISOString().slice(0, 10)
						)
					})
				)
				arrTmp = []
			})
			return [newData]
		},
		[getStartDate, getLastDate]
	)
	const formatValue = useCallback(
		(data) => {
			return data.map((obs) => {
				return obs[0].map((data, index) => {
					// index 2 = ZSV
					return data.map((el) => {
						return index === 2
							? {
									date: el.date,
									hour: el.hour,
									volume: handleValue(el.volume, "hm³"),
									area: handleValue(el.area, "ha"),
							  }
							: {
									date: el.date,
									value: unit === "%" ? el.value : handleValue(el.value, unit),
							  }
					})
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
		if (lakeDataWithReference.length === 0) return
		if (lakeDataWithReference.length !== lakeDataByYear.length) return
		if (
			dataType === DataTypes.VOLUME &&
			lakeDataWithReference.length !== fullDataOfVolume.length
		)
			return
		lakeDataWithReference.forEach((data, index) => {
			dispatch(
				addLake({
					lakeId:
						lakeDataWithReference.length === 1
							? activeLakes.at(-1).id
							: activeLakes[index].id,
					dataType,
					lakeData: data,
					byYear: lakeDataByYear[index],
					byVolume: dataType === DataTypes.VOLUME && fullDataOfVolume[index],
					seriePath: seriePath[index],
					obsDepth,
				})
			)
		})
	}, [
		lakeDataWithReference,
		lakeDataByYear,
		// dataType,
		dispatch,
		//seriePath,
		fullDataOfVolume,
	])

	return {
		showLakeInfo,
		isOneLakeActive,
		theme,
		toggleTheme,
		noDataLake,
		handleSetNoDataLake,
	}
}