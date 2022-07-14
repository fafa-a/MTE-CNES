import usePolygonLayerHook from "./PolygonLayerHook"
import { LayerGroup, Polygon, Tooltip } from "react-leaflet"
import { v4 as uuid } from "@lukeed/uuid"
import { useState, useEffect } from "react"
import { PropTypes } from "prop-types"

export const PolygonLayer = ({ data }) => {
  const [layer, setLayer] = useState(null)
  const { id, activeLake, color } = usePolygonLayerHook({
    data,
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
            color={ID_SWOT === id ? color : "blue"}
            eventHandlers={{
              click: () => {
                activeLake(ID_SWOT, DAM_NAME, [LAT_WW, LONG_WW])
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
  }, [id, color, data.features, activeLake])

  return <LayerGroup>{layer}</LayerGroup>
}
PolygonLayer.propTypes = {
  data: PropTypes.object.isRequired,
}