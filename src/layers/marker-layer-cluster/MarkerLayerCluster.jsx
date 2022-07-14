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
  const { coordinates } = useMarkerLayerClusterHook(data)

  const layer = data.features.map((feature, index) => {
    // const { LONG_WW, LAT_WW } = feature.properties
    return (
      <Marker icon={noSizeIcon} key={uuid()} position={coordinates[index]} />
    )
  })
  return (
    <MarkerClusterGroup zoomToBoundsOnClick={false}>{layer}</MarkerClusterGroup>
  )
}

MarkerLayerCluster.propTypes = {
  data: PropTypes.object.isRequired,
}
