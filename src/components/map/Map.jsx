import useMapHook from "./MapHook"
import { LayersControl, MapContainer, TileLayer } from "react-leaflet"
import styled from "styled-components"
import { MarkerLayer } from "../../layers/marker-layer/MarkerLayer"
import { MarkerLayerWithTooltipCluster } from "../../layers/marker-layer-tooltip-cluster/MarkerLayerWithTooltipCluster"
import { PolygonLayer } from "../../layers/polygon-layer/PolygonLayer"

import { Andalousie } from "../../data/geojson/Andalousie"
import { BurkinaFaso } from "../../data/geojson/BurkinaFaso"
import { India } from "../../data/geojson/India"
import { Occitanie } from "../../data/geojson/Occitanie"
import { Tunisia } from "../../data/geojson/Tunisia"
import anda from "../../data/geojson/andalousie_selected_max_extent_v12.geojson"

console.log(anda)

const dataGeojson = [Andalousie, BurkinaFaso, India, Occitanie, Tunisia]

const StyledMapContainer = styled(MapContainer)`
  width: 100vw;
  height: 55vh;
`

export const Map = () => {
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
            <MarkerLayer data={data} />
            <PolygonLayer data={data} />
            <MarkerLayerWithTooltipCluster data={data} />
          </div>
        ))}
      </LayersControl>
    </StyledMapContainer>
  )
}
