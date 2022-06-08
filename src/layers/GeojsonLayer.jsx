import { GeoJSON, LayerGroup, LayersControl, Tooltip } from "react-leaflet"

export const GeojsonLayer = ({ data }) => {
  const layer = data.features.map(feature => {
    const { ID_SWOT, DAM_NAME } = feature.properties

    return (
      <GeoJSON
        key={ID_SWOT}
        data={data}
        style={feature => {
          return {
            color: "red",
            weight: 0.5,
            fillOpacity: 0.4,
          }
        }}
      >
        <Tooltip>
          <h3>{DAM_NAME}</h3>
        </Tooltip>
      </GeoJSON>
    )
  })
  return (
    <LayersControl.Overlay name="Andalusia lakes geojson">
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  )
}
