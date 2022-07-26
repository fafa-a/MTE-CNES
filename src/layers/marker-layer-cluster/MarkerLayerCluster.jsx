import { useEffect } from "react"
import { Marker } from "react-leaflet"
import { v4 as uuid } from "@lukeed/uuid"
import { noSizeIcon } from "@/icons/transparentIcon"
import useMarkerLayerClusterHook from "./MarkerLayerClusterHook"
import MarkerClusterGroup from "react-leaflet-markercluster"
import PropTypes from "prop-types"
/**
 * Component to diplay a marker cluster layer for world cities
 *
 * @component
 * @param {Object} data
 * @returns {LayersControl.Overlay}
 */

export const MarkerLayerCluster = ({ data }) => {
	const { coordinates, zoomLevel } = useMarkerLayerClusterHook(data)
	const [layer, setLayer] = useState(null)
	useEffect(() => {
		setLayer(
			data.features.map((_, index) => {
				return (
					<Marker
						icon={noSizeIcon}
						key={uuid()}
						position={coordinates[index]}
					/>
				)
			})
		)
	}, [coordinates, data.features])

	return zoomLevel <= 8 ? (
		<MarkerClusterGroup zoomToBoundsOnClick={false}>{layer}</MarkerClusterGroup>
	) : null
}

MarkerLayerCluster.propTypes = {
	data: PropTypes.object.isRequired,
}
