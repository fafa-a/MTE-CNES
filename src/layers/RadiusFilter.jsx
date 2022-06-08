import { Circle, LayersControl } from "react-leaflet"

/**
 * @param {Object} radiusFilter
 * @param {Function} setRadiusFilter
 * @returns
 */
export const RadiusFilteR = ({ radiusFilter, setRadiusFilter }) => {
  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry
    const layer = (
      <Circle
        center={[coordinates[1], coordinates[0]]}
        radius={radiusFilter.radius * 1000}
        eventHandlers={{
          dblclick: e => {
            e.originalEvent.view.L.DomEvent.stopPropagation(e)
            setRadiusFilter(null)
          },
        }}
        color={"gray"}
        weight={1}
        fillOpacity={0.4}
      />
    )

    return (
      <LayersControl.Overlay checked name="Radius Filter">
        {layer}
      </LayersControl.Overlay>
    )
  } else {
    return null
  }
}
