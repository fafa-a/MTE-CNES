import { useState } from "react"
import { useMapEvents } from "react-leaflet"
export default function useMarkerLayerClusterHook(data) {
	const coordinates = data.features.map((feature) => {
		const { LONG_WW, LAT_WW } = feature.properties
		return [LAT_WW, LONG_WW]
	})
	const [zoomLevel, setZoomLevel] = useState(null)
	const mapEvents = useMapEvents({
		zoomend: () => {
			setZoomLevel(mapEvents.getZoom())
		},
	})

	return { coordinates, zoomLevel }
}
