import { Marker } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { v4 as uuid } from "@lukeed/uuid"
import { noSizeIcon } from "../../icons/transparentIcon"

/**
 * Component to diplay a marker cluster layer for world cities
 *
 * @component
 * @param {Object} data
 * @returns {LayersControl.Overlay}
 */
export const MarkerLayerCluster = ({ data }) => {
  const layer = data.features.map(feature => {
    const { LONG_WW, LAT_WW } = feature.properties
    return (
      <Marker icon={noSizeIcon} key={uuid()} position={[LAT_WW, LONG_WW]} />
    )
  })

  return (
    <MarkerClusterGroup zoomToBoundsOnClick={false}>{layer}</MarkerClusterGroup>
  )
}
