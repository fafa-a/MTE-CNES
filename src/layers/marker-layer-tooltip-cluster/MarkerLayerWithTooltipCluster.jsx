import React from "react"
import { LayersControl, Marker, Tooltip, useMap } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { defaultIcon } from "../../icons/defaultIcon"
import { v4 as uuid } from "@lukeed/uuid"

/**
 * Component to diplay a marker cluster layer for world cities
 *
 * @component
 * @param {Object} data
 * @returns {LayersControl.Overlay}
 */
export const MarkerLayerWithTooltipCluster = ({ data }) => {
  const findCountryName = () => data.features[0].properties.COUNTRY
  const country = findCountryName()

  const leafletMap = useMap()
  const layer = data.features.map(feature => {
    const { DAM_NAME, ID_SWOT, LONG_DD, LAT_DD } = feature.properties
    return (
      <Marker
        key={uuid()}
        position={[LAT_DD, LONG_DD]}
        icon={defaultIcon}
        eventHandlers={{
          click: e => leafletMap.panTo(e.latlng),
        }}
      >
        <Tooltip>
          <h3>{DAM_NAME}</h3>
        </Tooltip>
      </Marker>
    )
  })

  return (
    <LayersControl.Overlay name={`${country} lakes clustered`}>
      <MarkerClusterGroup zoomToBoundsOnClick={false}>
        {layer}
      </MarkerClusterGroup>
    </LayersControl.Overlay>
  )
}
