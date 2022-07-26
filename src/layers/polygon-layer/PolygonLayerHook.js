import { useMap, useMapEvents } from "react-leaflet"
import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateActiveLakes } from "@/stores/lakesSlice"
import { addLakeInfo } from "../../stores/lakesSlice"

export default function usePolygonLayerHook() {
	const [id, setId] = useState(null)
	const [color, setColor] = useState("blue")
	const [coordinates, setCoordinates] = useState([])
	const [zoomLevel, setZoomLevel] = useState(null)
	const { coordinatesLakeToCenter, activeLakes } = useSelector(
		(state) => state.lakes
	)
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
	}, [coordinates, map])

	useEffect(() => {
		if (!id) return
		setColor("#CDF0EA")
		if (Object.values(activeLakes).length === 1) {
			resizeMap()
		}
		centerPolygon()
	}, [activeLakes, centerPolygon, id, resizeMap])

	const centerSelectedPolygon = useCallback(() => {
		const { lakeId, coordinates } = coordinatesLakeToCenter
		setCoordinates(coordinates)
		setId(lakeId)
	}, [coordinatesLakeToCenter])

	useEffect(() => {
		centerSelectedPolygon()
	}, [centerSelectedPolygon, coordinatesLakeToCenter])

	const activeLake = useCallback(
		(id, name, coordWW, mainUse, country, nearCity, coordDD) => {
			dispatch(
				updateActiveLakes({ lakeId: id, lakeName: name, lakeCoord: coordWW })
			)
			const info = {
				id,
				name,
				lakeCoord: coordWW,
				mainUse,
				country,
				nearCity,
				damCoord: coordDD,
			}
			dispatch(addLakeInfo({ lakeId: id, info }))

			setCoordinates(coordWW)
			setId(id)
		},
		[dispatch]
	)

	return {
		activeLake,
		centerPolygon,
		id,
		color,
		zoomLevel,
	}
}
