import { useMap, useMapEvents } from "react-leaflet"
import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	updateActiveLakes,
	updateTotalVolume,
	addLakeInfo,
} from "@/stores/lakesSlice"
import { DataTypes, DurationTypes } from "../../config"

export default function usePolygonLayerHook() {
	const [id, setId] = useState(null)
	const [color, setColor] = useState("blue")
	const [coordinates, setCoordinates] = useState([])
	const [zoomLevel, setZoomLevel] = useState(null)
	const [obsDepth, setObsDepth] = useState(null)
	const { coordinatesLakeToCenter, activeLakes, dataLakes } = useSelector(
		(state) => state.lakes
	)
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
		map.flyTo(coordinates)
		map.setView(coordinates, 11)
	}, [coordinates])
	useEffect(() => {
		console.log("useEffect 01")
		if (Object.values(activeLakes).length === 1) {
			resizeMap()
		}
	}, [Object.values(activeLakes).length])
	useEffect(() => {
		if (!id) return
		console.log("useEffect 02")
		console.time("color&center")
		const container = document.getElementsByClassName("leaflet-container")
		if ((container[0].style.height = "45%")) {
			setColor("#CDF0EA")
			centerPolygon()
		}
		console.timeEnd("color&center")
	}, [id])

	useEffect(() => {
		console.log("useEffect 03")
		if (DAY) {
			setObsDepth(DurationTypes.DAY)
		}
		if (PERIOD) {
			setObsDepth(DurationTypes.PERIOD)
		}
	}, [DAY, PERIOD])

	const centerSelectedPolygon = useCallback(() => {
		const { lakeId, coordinates } = coordinatesLakeToCenter
		setId(lakeId)
		setCoordinates(coordinates)
	}, [coordinatesLakeToCenter])

	useEffect(() => {
		console.log("useEffect 04")
		centerSelectedPolygon()
	}, [centerSelectedPolygon, coordinatesLakeToCenter])

	const activeLake = useCallback(
		(id, name, coordWW, mainUse, country, nearCity, coordDD) => {
			console.time("active")
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

			setCoordinates(coordWW)
			setId(id)

			if (VOLUME && dataLakes[id]?.[DataTypes.VOLUME]) {
				dispatch(updateTotalVolume({ lakeId: id, obsDepth }))
			}
			console.timeEnd("active")
		},
		[dispatch, dataLakes]
	)
	return {
		activeLake,
		centerPolygon,
		id,
		color,
		zoomLevel,
	}
}
