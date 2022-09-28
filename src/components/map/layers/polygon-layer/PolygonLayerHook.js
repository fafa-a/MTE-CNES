import { useMap, useMapEvents } from "react-leaflet"
import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addLake } from "@/stores/stateLakeSlice"
import { updateModeVolume } from "../../../../stores/dataSlice"
import { DataTypes, DurationTypes, ModeTypes } from "../../../../config"

export default function usePolygonLayerHook() {
	const [color, setColor] = useState("blue")
	const [zoomLevel, setZoomLevel] = useState(null)
	const [coordId, setCoordId] = useState({
		id: "",
		coord: [],
	})
	const [obsDepth, setObsDepth] = useState(null)
	const { VOLUME, DAY, PERIOD } = useSelector((state) => state.form)
	const { active, loaded } = useSelector((state) => state.stateLake)
	const { information } = useSelector((state) => state.information)
	const { lakesChartOptions } = useSelector((state) => state)
	const map = useMap()
	const dispatch = useDispatch()
	const mapEvents = useMapEvents({
		zoomend: () => {
			setZoomLevel(mapEvents.getZoom())
		},
	})

	const resizeMap = useCallback(() => {
		const container = document.getElementsByClassName("leaflet-container")
		if (container) {
			map.invalidateSize(true)
			container[0].style.height = "45%"
		}
	}, [map])

	const centerPolygon = useCallback(() => {
		// map.flyTo(coordId.coord)
		map.setView(coordId.coord, 11)
	}, [coordId.coord])

	useEffect(() => {
		if (active.length >= 2) return
		if (active.length === 1) {
			resizeMap()
		}
	}, [active.length])

	useEffect(() => {
		if (!coordId.id) return
		const container = document.getElementsByClassName("leaflet-container")
		if ((container[0].style.height = "45%")) {
			setColor("#CDF0EA")
			centerPolygon()
		}
	}, [coordId.id])

	useEffect(() => {
		if (DAY) {
			setObsDepth(DurationTypes.DAY)
		}
		if (PERIOD) {
			setObsDepth(DurationTypes.PERIOD)
		}
	}, [DAY, PERIOD])

	const centerSelectedPolygon = useCallback(() => {
		if (
			Object.entries(lakesChartOptions)
				.map(([id, { selected }]) => {
					return { id, selected }
				})
				.filter(({ selected }) => selected).length === 0
		)
			return

		const { lakeId } = Object.entries(lakesChartOptions)
			.map(([id, { selected }]) => {
				return { lakeId: id, selected }
			})
			.filter(({ selected }) => selected)[0]

		const { id, lakeCoord } = information[lakeId]
		setCoordId({
			id,
			coord: lakeCoord,
		})
	}, [lakesChartOptions])

	useEffect(() => {
		centerSelectedPolygon()
	}, [centerSelectedPolygon])

	const activeLake = useCallback(
		(id, coordWW) => {
			if (!active.includes(id) && loaded.includes(id)) {
				dispatch(updateModeVolume({ id }))
			}
			if (loaded.includes(id)) return
			setCoordId({
				id,
				coord: coordWW,
			})
			dispatch(addLake({ id }))
		},
		[dispatch, active, loaded]
	)

	// useEffect(() => {
	// 	if (!VOLUME) return
	// 	if (VOLUME && dataLakes[coordId.id]?.[DataTypes.VOLUME]) {
	// 		dispatch(updateTotalVolume({ lakeId: coordId.id, obsDepth }))
	// 	}
	// }, [dispatch, dataLakes[coordId.id]])

	return {
		activeLake,
		centerPolygon,
		id: coordId.id,
		color,
		zoomLevel,
	}
}
