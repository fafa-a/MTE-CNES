import useMapHook from './MapHook'
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import { styled } from '@stitches/react'
import { MarkerLayerCluster } from './layers/marker-layer-cluster/MarkerLayerCluster'
import { PolygonLayer } from './layers/polygon-layer/PolygonLayer'
import { PropTypes } from 'prop-types'

const files = import.meta.glob('/src/data/geojson/*.geojson', { eager: true })
const dataGeojson = Object.entries(files).map(([, data]) => data)

const StyledMapContainer = styled(MapContainer, {
	width: '100%',
	height: '100%',
})
export const Map = () => {
	const { coordinates } = useMapHook({ dataGeojson })

	return (
		<StyledMapContainer center={coordinates} zoom={5.0} scrollWheelZoom={true}>
			<LayersControl position="topright">
				<LayersControl.BaseLayer checked name="OSM Streets">
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
						<PolygonLayer data={data} />
						<MarkerLayerCluster data={data} />
					</div>
				))}
			</LayersControl>
		</StyledMapContainer>
	)
}
Map.propTypes = {
	getLakeIdSwotName: PropTypes.func,
	removeLakeActive: PropTypes.func,
	isOneLakeActive: PropTypes.bool,
}
