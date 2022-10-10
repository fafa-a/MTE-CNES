import usePolygonLayerHook from './PolygonLayerHook'
import { LayerGroup, Polygon, Tooltip } from 'react-leaflet'
import { v4 as uuid } from '@lukeed/uuid'
import { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'

export const PolygonLayer = ({ data }) => {
	const [layer, setLayer] = useState(null)
	const { id, activeLake, color, zoomLevel, active, loaded, updateLake } =
		usePolygonLayerHook({
			data,
		})

	useEffect(() => {
		setLayer(
			data.features.map(feature => {
				const { ID_DB, DAM_NAME, LONG_WW, LAT_WW } = feature.properties
				const { coordinates } = feature.geometry
				const reversedMultiPolygons = coordinates[0].map(polygon => [
					polygon[1],
					polygon[0],
				])

				return (
					<Polygon
						key={uuid()}
						positions={reversedMultiPolygons}
						color={
							ID_DB === id
								? color
								: ID_DB === 477 ||
								  ID_DB === 187 ||
								  ID_DB === 345 ||
								  ID_DB === 35
								? '#87A2FB'
								: 'blue'
						}
						// eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
						eventHandlers={{
							click: () => {
								if (!loaded.includes(ID_DB.toString())) {
									activeLake(ID_DB, [LAT_WW, LONG_WW])
								}
								if (
									!active.includes(ID_DB.toString()) &&
									loaded.includes(ID_DB.toString())
								) {
									updateLake(ID_DB)
								}
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
	}, [id, color, active, loaded])

	return <LayerGroup>{zoomLevel > 8 ? layer : null}</LayerGroup>
}
PolygonLayer.propTypes = {
	data: PropTypes.object.isRequired,
}
