import { useRef, useState, useEffect } from "react"
import { useMap } from "react-leaflet"
import { LayerGroup, LayersControl, Polygon, Tooltip } from "react-leaflet"

export const PolygonLayer = ({ data, getLakeData, isPolygonClicked }) => {
  const [click, setClick] = useState(false)
  const { COUNTRY } = data.features[0].properties
  const map = useMap()

  useEffect(() => {
    isPolygonClicked(click)
  }, [click])

  const handleClick = () => {
    setClick(!click)
  }

const centerPolygon = (...coord) => {
  map.setView(coord[0], coord[1])
}

const layer = data.features.map(feature => {
  const { ID_SWOT, DAM_NAME, LONG_DD, LAT_DD } = feature.properties
  const { coordinates } = feature.geometry
  const reversedMultiPolygons = coordinates[0].map(polygon =>
    polygon.map(p => [p[1], p[0]])
  )

  return (
    <Polygon
      key={ID_SWOT}
      positions={reversedMultiPolygons}
      data-id={ID_SWOT}
      data-coordinates={[LAT_DD, LONG_DD]}
      eventHandlers={{
        click: el => {
          getLakeData(el.target.options["data-id"])
          handleClick()
          centerPolygon(el.target.options["data-coordinates"])
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
    <LayersControl.Overlay checked={true} name={`${COUNTRY} lakes polygons`}>
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  )
}
