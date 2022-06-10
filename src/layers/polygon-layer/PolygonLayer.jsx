import usePolygonLayerHook from "./PolygonLayerHook"

import { LayerGroup, LayersControl, Polygon, Tooltip } from "react-leaflet"
import { v4 as uuid } from "@lukeed/uuid"

export const PolygonLayer = ({ data, getIdSwot }) => {
  const { centerPolygon, country } = usePolygonLayerHook({ data })

  const layer = data.features.map(feature => {
    const { ID_SWOT, DAM_NAME, LONG_WW, LAT_WW } = feature.properties
    const { coordinates } = feature.geometry
    const reversedMultiPolygons = coordinates[0].map(polygon =>
      polygon.map(p => [p[1], p[0]])
    )

    return (
      <Polygon
        key={uuid()}
        positions={reversedMultiPolygons}
        data-id={ID_SWOT}
        data-coordinates={[LAT_WW, LONG_WW]}
        eventHandlers={{
          click: el => {
            centerPolygon(el.target.options["data-coordinates"])
            // getIdSwot(el.target.options["data-id"])
          },
        }}
      >
        <Tooltip>
          <h3>{DAM_NAME}</h3>
        </Tooltip>
      </Polygon>
    )
  })
  return (
    <LayersControl.Overlay checked={true} name={`${country} lakes polygons`}>
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  )
}
