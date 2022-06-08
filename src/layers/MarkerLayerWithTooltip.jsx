import React from "react"
import {
  LayersControl,
  LayerGroup,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet"
import { mountainIcon } from "../icons/mountainIcon"

/**
 * Component to diplay a marker layer and tooltip for mountain peaks
 *
 * @component
 * @param {object} data
 * @returns {LayersControl.Overlay}
 */
export const MarkerLayerWithTooltip = ({ data }) => {
  const leafletMap = useMap()
  const layer = data.features.map(feature => {
    const { coordinates } = feature.geometry
    const { name, elevation, continent } = feature.properties
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={mountainIcon}
        eventHandlers={{
          click: e => leafletMap.panTo(e.latlng),
        }}
      >
        <Tooltip>
          <h3>Mt.{name}</h3>
          <p>
            Continent: <b>{continent}</b>
          </p>
          <p>
            Elevation: <b>{elevation} m</b>
          </p>
        </Tooltip>
      </Marker>
    )
  })
  return (
    <LayersControl.Overlay name="Highest points">
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  )
}
