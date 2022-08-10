import { useEffect, useCallback, useState } from "react"
import {
	updateLakeIdToDesactivate,
	setCoordinatesLakeToCenter,
	toggleLakeChartVisibility,
	setSelectedLake,
	toggleYearsChartVisibility,
	toggleYearSelection,
	toggleLakeShowInfo,
} from "@stores/lakesSlice"
import { saveAs } from "file-saver"
import { useDispatch, useSelector } from "react-redux"
import JSZip from "jszip"
import { DurationTypes } from "../../../config"

export const useLakeSelectionHook = ({ id, coordinates, index, name }) => {
	const [bgOptic, setBgOptic] = useState({})
	const [bgRadar, setBgRadar] = useState({})
	const [bgReference, setBgReference] = useState({})
	const [year, setYear] = useState([])
	const [isVisible, setIsVisible] = useState(true)
	const [isSelected, setIsSelected] = useState(false)
	const [obsDepth, setObsDepth] = useState(DurationTypes.PERIOD)
	const dispatch = useDispatch()
	const chartOptions = useSelector((state) => state.chart)
	const { dataType, OPTIC, RADAR, YEAR, REFERENCE, VOLUME, DAY, PERIOD } =
		useSelector((state) => state.form)

	const { activeLakes, dataLakes, activeYears } = useSelector(
		(state) => state.lakes
	)
	const setlakeIconsOptions = useCallback(() => {
		if (!YEAR) {
			activeLakes
				.filter((lake) => lake.id === id)
				.map((lake) => {
					setIsVisible(lake.chartVisible)
					setIsSelected(lake.selected)
				})
		}
		if (YEAR) {
			Object.values(activeYears).map((year) => {
				if (year.id === id) {
					setIsVisible(year.chartVisible)
					setIsSelected(year.selected)
				}
			})
		}
	}, [YEAR, activeLakes, activeYears, id])
	useEffect(() => {
		if (DAY) {
			setObsDepth(DurationTypes.DAY)
		}
		if (PERIOD) {
			setObsDepth(DurationTypes.PERIOD)
		}
	}, [DAY, PERIOD])
	useEffect(() => {
		setlakeIconsOptions()
	}, [setlakeIconsOptions])

	useEffect(() => {
		if (YEAR) return
		setBgOptic({
			backgroundColor:
				chartOptions[dataType].style.OPTIC[index].backgroundColor,
		})
		setBgRadar({
			backgroundColor:
				chartOptions[dataType].style.RADAR[index].backgroundColor,
		})
		setBgReference({
			backgroundColor:
				chartOptions[dataType].style.REFERENCE[index].backgroundColor,
		})
	}, [YEAR, chartOptions, dataType, index])

	useEffect(() => {
		if (!YEAR) return
		if (!Object.keys(dataLakes).length) return
		const yearData = Object.keys(activeYears).map((year) => `x${year}`)
		setYear(yearData)
	}, [YEAR, activeYears, dataLakes])

	useEffect(() => {
		if (!year.length) return
		setBgOptic({
			backgroundColor:
				chartOptions.YEAR.style[year[index]].OPTIC.backgroundColor,
		})
		setBgRadar({
			backgroundColor:
				chartOptions.YEAR.style[year[index]].RADAR.backgroundColor,
		})
		setBgReference({
			backgroundColor:
				chartOptions.YEAR.style[year[index]].REFERENCE.backgroundColor,
		})
	}, [year, index, chartOptions.YEAR.style])

	const handleClickDesactiveLake = useCallback(() => {
		dispatch(updateLakeIdToDesactivate({ lakeId: id }))
	}, [dispatch, id])

	const toggleSelectedLake = useCallback(() => {
		if (!YEAR) {
			dispatch(setCoordinatesLakeToCenter({ lakeId: id, coordinates }))
			dispatch(setSelectedLake({ lakeId: id }))
		}
		if (YEAR) {
			dispatch(toggleYearSelection({ yearId: id }))
		}
	}, [YEAR, coordinates, dispatch, id])

	const toggleChartVisibilty = useCallback(() => {
		if (!YEAR) {
			dispatch(toggleLakeChartVisibility({ lakeId: id }))
		}

		if (YEAR) {
			dispatch(toggleYearsChartVisibility({ yearId: id }))
		}
	}, [YEAR, dispatch, id])

	const toggleInfo = useCallback(() => {
		dispatch(toggleLakeShowInfo({ lakeId: id }))
	}, [dispatch, id])

	const handleDownloadFile = useCallback(async () => {
		const zip = new JSZip()
		for (const path of dataLakes[id][dataType][obsDepth].seriePath) {
			const fileName = path.split("/").pop().split(".")[0]
			const res = await fetch(path)
			const blob = await res.blob()
			zip.file(`${fileName}.csv`, blob)
		}
		zip.generateAsync({ type: "blob" }).then((content) => {
			saveAs(content, `${name}_${dataType.toLowerCase()}.zip`)
		})
	}, [dataLakes, id, dataType])

	return {
		toggleChartVisibilty,
		handleClickDesactiveLake,
		handleDownloadFile,
		bgOptic,
		bgRadar,
		isVisible,
		toggleSelectedLake,
		isSelected,
		OPTIC,
		RADAR,
		REFERENCE,
		bgReference,
		YEAR,
		activeLakes,
		toggleInfo,
		VOLUME,
		dataLakes,
		dataType,
		obsDepth,
	}
}
