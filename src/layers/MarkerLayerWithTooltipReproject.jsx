import React from "react"
import {
  LayersControl,
  LayerGroup,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet"
import { defaultIcon } from "../icons/defaultIcon"
import proj4 from "proj4"

const ITM = "EPSG:2157"
const WGS = "EPSG:4326"

proj4.defs(
  ITM,
  "+proj=tmerc +lat_0=53.5 +lon_0=-8 +k=0.99982 +x_0=600000 +y_0=750000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
)
proj4.defs(WGS, "+proj=longlat +datum=WGS84 +no_defs")

/**
 * Component to diplay a marker layer and tooltip for Irish cities with a reprojection
 *
 * @component
 * @param {Object} data
 * @returns {LayersControl.Overlay}
 */
export const MarkerLayerWithTooltipReproject = ({ data }) => {
  const leafletMap = useMap()
  const layer = data.features.map(feature => {
    const { coordinates } = feature.geometry
    const { name } = feature.properties
    const reprojectedCoordinates = proj4(ITM, WGS, coordinates)
    return (
      <Marker
        key={String(coordinates)}
        position={[reprojectedCoordinates[1], reprojectedCoordinates[0]]}
        icon={defaultIcon}
        eventHandlers={{
          click: e => leafletMap.panTo(e.latlng),
        }}
      >
        <Tooltip>
          <h3>{name}</h3>
        </Tooltip>
      </Marker>
    )
  })

  return (
    <LayersControl.Overlay name="Irish cities reprojected">
      <LayerGroup zoomToBoundsOnClick={false}>{layer}</LayerGroup>
    </LayersControl.Overlay>
  )
}
