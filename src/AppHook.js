import { useEffect, useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addLake } from "./stores/lakesSlice"
import { addData } from "./stores/dataSlice"
import { addColor } from "./stores/chartSlice"
import {
	AppConfig,
	SeriePathUtils,
	ObservationTypes,
	DurationTypes,
	DataTypes,
} from "./config"
import { csv } from "d3"
import {
	fillEmptyDataOfDate,
	getDataByYear,
	getFirstDateOfArrays,
	getLastDateOfArrays,
} from "./utils/date"
import {
	extractField,
	formatCSVValue,
	formatValue,
	normalizeValue,
} from "./utils/value"
import { returnHighestValue } from "./utils/math"
import { desactiveLake } from "@stores/lakesSlice"
import {
	getSeriePathByAttribute,
	getSeriePathByObsTypeAndObsDepth,
} from "./utils/seriePath"
import { getDataFormalized } from "./utils/data"
import { addLakeChartOptions } from "./stores/lakesChartOptionsSlice"

export function useAppHook() {
	const [seriePath, setSeriePath] = useState([])
	const [lakeData, setLakeData] = useState([])
	const [dataReference, setDataReference] = useState([])
	const [lakeDataWithReference, setLakeDataWithReference] = useState([])
	const [tmpFillingRateReference, setTmpFillingRateReference] = useState([])
	const [fillingRateReference, setFillingRateReference] = useState([])
	const [surfaceReference, setSurfaceReference] = useState([])
	const [volumeReference, setVolumeReference] = useState([])
	const [lastDataType, setLastDataType] = useState(DataTypes.FILLING_RATE)
	const [lakeDataByYear, setLakeDataByYear] = useState([])
	const [fullDataOfVolume, setFullDataOfVolume] = useState([])
	const [showLakeInfo, setShowLakeInfo] = useState(false)
	const [isOneLakeActive, setIsOneLakeActive] = useState(false)
	const [theme, setTheme] = useState("dark")
	const [noDataLake, setNodataLake] = useState(false)
	const [obsDepth, setObsDepth] = useState(DurationTypes.PERIOD)
	const [lastObsDepth, setLastObsDepth] = useState(DurationTypes.PERIOD)
	const [lastLakeDataByYear, setLastLakeDataByYear] = useState([])
	const [canvas, setCanvas] = useState(null)
	const form = useSelector((state) => state.form)
	const { activeLakes, lakeIdToDesactivate, dataLakes } = useSelector(
		(state) => state.lakes
	)
	const { active } = useSelector((state) => state.stateLake)
	const { seriePath: serPath } = useSelector((state) => state.information)
	const { OPTIC, RADAR, DAY, PERIOD, REFERENCE, YEAR, dataType } = form
	const { getSeriePath, getTimeseriesPath } = SeriePathUtils
	const dispatch = useDispatch()
	const { unit } = AppConfig.attributes[dataType]

	const handleData = useCallback(async () => {
		const fillingRatePath =
			AppConfig.attributes[DataTypes.FILLING_RATE].filePath
		const surfacePath = AppConfig.attributes[DataTypes.SURFACE].filePath
		const volumePath = AppConfig.attributes[DataTypes.VOLUME].filePath
		const optic = AppConfig.observationTypes[ObservationTypes.OPTIC].abbr
		const radar = AppConfig.observationTypes[ObservationTypes.RADAR].abbr
		const reference =
			AppConfig.observationTypes[ObservationTypes.REFERENCE].abbr
		const day = AppConfig.duration[DurationTypes.DAY].abbr
		const period = AppConfig.duration[DurationTypes.PERIOD].abbr
		const id = active.at(-1)
		const allSeriesPath = serPath[id]
		const fillingRateSeries = getSeriePathByAttribute(
			allSeriesPath,
			fillingRatePath
		)
		const fillingRateOpticDay = getSeriePathByObsTypeAndObsDepth(
			fillingRateSeries,
			optic,
			day
		)
		const fillingRateOpticPeriod = getSeriePathByObsTypeAndObsDepth(
			fillingRateSeries,
			optic,
			period
		)
		const fillingRateRadarDay = getSeriePathByObsTypeAndObsDepth(
			fillingRateSeries,
			radar,
			day
		)
		const fillingRateRadarPeriod = getSeriePathByObsTypeAndObsDepth(
			fillingRateSeries,
			radar,
			period
		)
		const surfaceSeries = getSeriePathByAttribute(allSeriesPath, surfacePath)
		const surfaceOpticDay = getSeriePathByObsTypeAndObsDepth(
			surfaceSeries,
			optic,
			day
		)
		const surfaceOpticPeriod = getSeriePathByObsTypeAndObsDepth(
			surfaceSeries,
			optic,
			period
		)
		const surfaceRadarDay = getSeriePathByObsTypeAndObsDepth(
			surfaceSeries,
			radar,
			day
		)
		const surfaceRadarPeriod = getSeriePathByObsTypeAndObsDepth(
			surfaceSeries,
			radar,
			period
		)
		const volumeSeries = getSeriePathByAttribute(allSeriesPath, volumePath)
		const volumeOpticDay = getSeriePathByObsTypeAndObsDepth(
			volumeSeries,
			optic,
			day
		)
		const volumeOpticPeriod = getSeriePathByObsTypeAndObsDepth(
			volumeSeries,
			optic,
			period
		)
		const volumeRadarDay = getSeriePathByObsTypeAndObsDepth(
			volumeSeries,
			radar,
			day
		)
		const volumeRadarPeriod = getSeriePathByObsTypeAndObsDepth(
			volumeSeries,
			radar,
			period
		)

		const referenceSeries = getSeriePathByAttribute(allSeriesPath, reference)
		const referenceSeriesRaw = await csv(referenceSeries).catch((err) => {})
		const volumeCSV = [
			await getDataFormalized(volumeOpticDay, "hm³"),
			await getDataFormalized(volumeRadarDay, "hm³"),
		]
		const firstDate = getFirstDateOfArrays(volumeCSV)
		const lastDate = getLastDateOfArrays(volumeCSV)
		const referenceSeriesFormalized =
			referenceSeriesRaw && formatValue(referenceSeriesRaw)
		const surfaceZSV =
			referenceSeriesFormalized &&
			extractField([referenceSeriesFormalized], "area")[0]
		const volumeZSV =
			referenceSeriesFormalized &&
			extractField([referenceSeriesFormalized], "volume")[0]
		const rateRef = volumeZSV && returnHighestValue([volumeZSV])
		const fillingRateZSV = rateRef && normalizeValue([volumeZSV], rateRef)[0]
		try {
			const fillingRateDayRaw = [
				await getDataFormalized(fillingRateOpticDay, "%"),
				await getDataFormalized(fillingRateRadarDay, "%"),
				fillingRateZSV || [],
			]
			const fillingRatePeriodRaw = [
				await getDataFormalized(fillingRateOpticPeriod, "%"),
				await getDataFormalized(fillingRateRadarPeriod, "%"),
				fillingRateZSV || [],
			]

			const surfaceDayRaw = [
				await getDataFormalized(surfaceOpticDay, "ha"),
				await getDataFormalized(surfaceRadarDay, "ha"),
				surfaceZSV || [],
			]
			const surfacePeriodRaw = [
				await getDataFormalized(surfaceOpticPeriod, "ha"),
				await getDataFormalized(surfaceRadarPeriod, "ha"),
				surfaceZSV || [],
			]
			const volumeDayRaw = [
				await getDataFormalized(volumeOpticDay, "hm³"),
				await getDataFormalized(volumeRadarDay, "hm³"),
				volumeZSV || [],
			]
			const volumePeriodRaw = [
				await getDataFormalized(volumeOpticPeriod, "hm³"),
				await getDataFormalized(volumeRadarPeriod, "hm³"),
				volumeZSV || [],
			]

			let fillingRateDayByYEar = []
			let fillingRatePeriodByYear = []
			if (
				fillingRateDayRaw[0].length > 0 &&
				fillingRatePeriodRaw[0].length > 0
			) {
				fillingRateDayByYEar = getDataByYear([fillingRateDayRaw])
				fillingRatePeriodByYear = getDataByYear([fillingRatePeriodRaw])
			}

			let surfaceDayByYear = []
			let surfacePeriodByYear = []
			if (surfaceDayRaw[0].length > 0 && surfacePeriodRaw[0].length > 0) {
				surfaceDayByYear = getDataByYear([surfaceDayRaw])
				surfacePeriodByYear = getDataByYear([surfacePeriodRaw])
			}

			let volumeDayByYear = []
			let volumePeriodByYear = []
			let volumeDayFull = []
			let volumePeriodFull = []

			if (volumeDayRaw[0].length > 0 && volumePeriodRaw[0].length > 0) {
				volumeDayByYear = getDataByYear([volumeDayRaw])
				volumeDayFull = fillEmptyDataOfDate([volumeDayRaw])
				volumePeriodByYear = getDataByYear([volumePeriodRaw])
				volumePeriodFull = fillEmptyDataOfDate([volumePeriodRaw])
			}

			const fillingRate = {
				[DurationTypes.DAY]: {
					day: fillingRateDayRaw,
					dayByYear: fillingRateDayByYEar[0],
				},
				[DurationTypes.PERIOD]: {
					period: fillingRatePeriodRaw,
					periodByYear: fillingRatePeriodByYear[0],
				},
			}
			const surface = {
				[DurationTypes.DAY]: {
					day: surfaceDayRaw,
					dayByYear: surfaceDayByYear[0],
				},
				[DurationTypes.PERIOD]: {
					period: surfacePeriodRaw,
					periodByYear: surfacePeriodByYear[0],
				},
			}

			const volume = {
				[DurationTypes.DAY]: {
					day: volumeDayRaw,
					dayByYear: volumeDayByYear[0],
					dayFull: volumeDayFull[0],
				},
				[DurationTypes.PERIOD]: {
					period: volumePeriodRaw,
					periodByYear: volumePeriodByYear[0],
					periodFull: volumePeriodFull[0],
				},
			}

			if (
				fillingRatePeriodRaw.length > 0 &&
				surfacePeriodRaw.length > 0 &&
				volumePeriodRaw.length > 0
			) {
				dispatch(addData({ id, fillingRate, surface, volume }))
				dispatch(addLakeChartOptions({ id }))
			}
		} catch (err) {
			console.log(err)
		}
	}, [dispatch, active])

	useEffect(() => {
		if (active.length > 0) {
			handleData()
		}
	}, [active])

	const handleCanvas = useCallback((cvas) => {
		setCanvas(cvas)
	}, [])

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

	const resetAllData = useCallback(() => {
		setLakeData([])
		setLakeDataWithReference([])
		setLakeDataByYear([])
		setFullDataOfVolume([])
		setTmpFillingRateReference([])
		setFillingRateReference([])
		setSurfaceReference([])
		setVolumeReference([])
	}, [])

	useEffect(() => {
		if (lastObsDepth !== obsDepth) {
			resetAllData()
		}
	}, [lastObsDepth, obsDepth])

	useEffect(() => {
		if (activeLakes.length === 0) return
		const isInfoclicked = Object.values(activeLakes)
			.filter((lake) => lake.showInfo === true)
			.map((lake) => lake.showInfo)[0]

		if (isInfoclicked) {
			setShowLakeInfo(true)
		} else {
			setShowLakeInfo(false)
		}

		if (Object.values(activeLakes).length > 0) {
			setIsOneLakeActive(true)
		}
	}, [activeLakes])

	useEffect(() => {
		if (dataType !== lastDataType) {
			setLakeData([])
			setLakeDataByYear([])
		}
		setLastDataType(dataType)
	}, [dataType, YEAR])

	const removeLakefromActiveLakes = useCallback(() => {
		const index = activeLakes
			.filter((lake) => lake.id === lakeIdToDesactivate)
			.map((lake) => lake.index)[0]

		setLakeDataWithReference([
			...lakeDataWithReference.slice(0, index),
			...lakeDataWithReference.slice(index + 1),
		])
		dispatch(desactiveLake({ lakeId: lakeIdToDesactivate }))
	}, [dispatch, activeLakes, lakeIdToDesactivate, lakeDataWithReference])

	useEffect(() => {
		if (!lakeIdToDesactivate) return
		removeLakefromActiveLakes()
	}, [lakeIdToDesactivate])

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
		const isAlreadyInSeriePath =
			JSON.stringify(seriePathTmp) === JSON.stringify(seriePath)
		if (isAlreadyInSeriePath) return
		setSeriePath(seriePathTmp)
	}, [dataType, obsDepth, REFERENCE, activeLakes])

	const handleDateOfDataReference = useCallback(() => {
		const dataRefDateFiltered = []
		lakeData.forEach((lake) => {
			const firstDate = getFirstDateOfArrays(lake)
			const lastDate = getLastDateOfArrays(lake)
			dataRefDateFiltered.push(
				lake
					.at(-1)
					.filter((data) => data.date >= firstDate && data.date <= lastDate)
			)
		})
		return dataRefDateFiltered
	}, [lakeData])

	useEffect(() => {
		if (lakeData.length === 0) return
		const dateFiltered = handleDateOfDataReference()
		setDataReference(dateFiltered)
	}, [lakeData])

	useEffect(() => {
		if (lakeDataWithReference.length === 0) return
		const dataByYearIsAlreadyInStore =
			dataLakes[activeLakes.at(-1).id][dataType]?.[obsDepth]?.byYear
		if (YEAR && dataByYearIsAlreadyInStore) return
		const dataByYear = getDataByYear(lakeDataWithReference)
		const isNotInLakeDataByYear =
			JSON.stringify(dataByYear) !== JSON.stringify(lakeDataByYear)
		if (isNotInLakeDataByYear) {
			setLakeDataByYear(dataByYear)
		}
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
			const surfaceValues = extractField(dataReference, "area")
			setSurfaceReference(surfaceValues)
		}
		if (dataType === DataTypes.VOLUME || dataType === DataTypes.FILLING_RATE) {
			const volumeValues = extractField(dataReference, "volume")
			setVolumeReference(volumeValues)
			setTmpFillingRateReference(volumeValues)
		}
	}, [dataReference, dataType])

	useEffect(() => {
		if (!tmpFillingRateReference.length) return
		const rateRef = returnHighestValue(tmpFillingRateReference)
		const values = normalizeValue(tmpFillingRateReference, rateRef)
		setFillingRateReference(values)
	}, [tmpFillingRateReference])

	const addDataReference = useCallback(
		(arr) => {
			const arrTmp = []
			arr.forEach((lake, index) => {
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
			return arrTmp
		},
		[fillingRateReference, volumeReference, surfaceReference, dataType]
	)

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
		if (
			dataType === DataTypes.SURFACE &&
			lakeData[0][2] &&
			surfaceReference[0]?.length === 0
		)
			return

		const data = addDataReference(lakeData)

		const isDataWithReferenceDefineOrDifferent =
			(data[0].at(-1).length === 0 &&
				JSON.stringify(data[0][1]) !==
					JSON.stringify(lakeDataWithReference[0]?.[1])) ||
			JSON.stringify(data[0].at(-1)) !==
				JSON.stringify(lakeDataWithReference[0]?.at(-1))

		if (isDataWithReferenceDefineOrDifferent) {
			setLakeDataWithReference(data)
		}
	}, [lakeData, surfaceReference, volumeReference, fillingRateReference])

	const handleFetchData = useCallback(async () => {
		const dataRaw = await fetchData()
		const data = await formatCSVValue(dataRaw, unit)
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
		if (seriePath.length === 0) return
		handleFetchData()
	}, [fetchData, handleFetchData])

	useEffect(() => {
		const isDataIsNotDefine =
			lakeDataWithReference.length === 0 &&
			lakeDataWithReference.length !== lakeDataByYear.length
		const isVolumeDataIsNotDefine =
			dataType === DataTypes.VOLUME &&
			lakeDataWithReference.length !== fullDataOfVolume.length
		const isDataByYearIsNotDifferent =
			JSON.stringify(lakeDataByYear) === JSON.stringify(lastLakeDataByYear)

		if (isDataIsNotDefine) return
		if (isVolumeDataIsNotDefine) return
		if (isDataByYearIsNotDifferent) return

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
		setLastLakeDataByYear(lakeDataByYear)
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
		// handleSetNoDataLake,
		handleCanvas,
		canvas,
	}
}
