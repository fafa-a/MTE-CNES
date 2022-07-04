import usePolygonLayerHook from "./PolygonLayerHook"
import { LayerGroup, Polygon, Tooltip } from "react-leaflet"
import { v4 as uuid } from "@lukeed/uuid"
import { useState, useEffect } from "react"

export const PolygonLayer = ({ data, handleChange, removeLakeActive }) => {
  const [layer, setLayer] = useState(null)
  const { centerPolygon, id, getLakeIdName, color } = usePolygonLayerHook({
    data,
    handleChange,
    removeLakeActive,
  })

  useEffect(() => {
    setLayer(
      data.features.map(feature => {
        const { ID_SWOT, DAM_NAME, LONG_WW, LAT_WW } = feature.properties
        const { coordinates } = feature.geometry
        const reversedMultiPolygons = coordinates[0].map(polygon =>
          polygon.map(p => [p[1], p[0]])
        )

        return (
          <Polygon
            key={uuid()}
            positions={reversedMultiPolygons}
            data-coordinates={[LAT_WW, LONG_WW]}
            color={ID_SWOT === id ? color : "blue"}
            eventHandlers={{
              click: el => {
                const coordinates = el.target.options["data-coordinates"]
                centerPolygon(coordinates)
                getLakeIdName(ID_SWOT, DAM_NAME, coordinates)
              },
            }}
          >
            <Tooltip>
              <h3>{DAM_NAME}</h3>
            </Tooltip>
          </Polygon>
        )
      })
    )
  }, [id, color])

  return <LayerGroup>{layer}</LayerGroup>
}
