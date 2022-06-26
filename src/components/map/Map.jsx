import { LayersControl, MapContainer, TileLayer } from "react-leaflet"
import { styled } from "@stitches/react"
import { MarkerLayerCluster } from "@layers/marker-layer-cluster/MarkerLayerCluster"
import { PolygonLayer } from "@layers/polygon-layer/PolygonLayer"

const files = import.meta.globEager("/src/data/geojson/*.geojson")
const dataGeojson = Object.entries(files).map(([, data]) => data)

const StyledMapContainer = styled(MapContainer, {
  width: "100vw",
  height: "50vh",
})

export const Map = ({
  getLakeIdSwotName,
  removeLakeActive,
  addLakeToCompare,
}) => {
  return (
    <StyledMapContainer
      center={[36.91, -3.54]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="OSM Strets">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="ESRI World Imagery">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          />
        </LayersControl.BaseLayer>
        {dataGeojson.map((data, index) => (
          <div key={index.toString()}>
            <PolygonLayer
              data={data}
              handleChange={getLakeIdSwotName}
              removeLakeActive={removeLakeActive}
              addLakeToCompare={addLakeToCompare}
            />
            <MarkerLayerCluster data={data} />
          </div>
        ))}
      </LayersControl>
    </StyledMapContainer>
  )
}
