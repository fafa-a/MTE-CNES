import { useMap, useMapEvents } from "react-leaflet"
import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateActiveLakes, updateTotalVolume } from "@/stores/lakesSlice"
import { DataTypes, DurationTypes } from "../../config"

export default function usePolygonLayerHook() {
	const [color, setColor] = useState("blue")
	const [zoomLevel, setZoomLevel] = useState(null)
	const [coordId, setCoordId] = useState({
		id: "",
		coord: [],
	})
	const [obsDepth, setObsDepth] = useState(null)
	const { coordinatesLakeToCenter, activeLakes, dataLakes, loadedLakes } =
		useSelector((state) => state.lakes)
	const { VOLUME, DAY, PERIOD } = useSelector((state) => state.form)
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
		if (Object.values(activeLakes).length >= 2) return
		if (Object.values(activeLakes).length === 1) {
			resizeMap()
		}
	}, [Object.values(activeLakes).length])

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
		const { lakeId, coordinates } = coordinatesLakeToCenter
		setCoordId({
			id: lakeId,
			coord: coordinates,
		})
	}, [coordinatesLakeToCenter])

	useEffect(() => {
		centerSelectedPolygon()
	}, [centerSelectedPolygon, coordinatesLakeToCenter])

	const activeLake = useCallback(
		(id, name, coordWW, mainUse, country, nearCity, coordDD) => {
			if (activeLakes.map((lake) => lake.id).includes(id)) return
			setCoordId({
				id,
				coord: coordWW,
			})
			const info = {
				id,
				name,
				lakeCoord: coordWW,
				mainUse,
				country,
				nearCity,
				damCoord: coordDD,
			}
			dispatch(
				updateActiveLakes({
					info,
				})
			)
			if (VOLUME && dataLakes[coordId.id]?.[DataTypes.VOLUME]) {
				dispatch(updateTotalVolume({ lakeId: coordId.id, obsDepth }))
			}
		},
		[dispatch, dataLakes[coordId.id], activeLakes]
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
