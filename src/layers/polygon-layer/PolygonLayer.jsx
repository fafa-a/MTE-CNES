import usePolygonLayerHook from "./PolygonLayerHook"
import { LayerGroup, Polygon, Tooltip } from "react-leaflet"
import { v4 as uuid } from "@lukeed/uuid"
import { useState, useEffect } from "react"
import { PropTypes } from "prop-types"

export const PolygonLayer = ({ data }) => {
  const [layer, setLayer] = useState(null)
  const { id, activeLake, color, zoomLevel } = usePolygonLayerHook({
		data,
	})

	useEffect(() => {
		setLayer(
			data.features.map((feature) => {
				const {
					ID_SWOT,
					DAM_NAME,
					LONG_WW,
					LAT_WW,
					MAIN_USE,
					COUNTRY,
					LAT_DD,
					LONG_DD,
					NEAR_CITY,
				} = feature.properties
				const { coordinates } = feature.geometry
				const reversedMultiPolygons = coordinates[0].map((polygon) =>
					polygon.map((p) => [p[1], p[0]])
				)

				return (
					<Polygon
						key={uuid()}
						positions={reversedMultiPolygons}
						color={ID_SWOT === id ? color : "blue"}
						// eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
						eventHandlers={{
							click: () => {
								activeLake(
									ID_SWOT,
									DAM_NAME,
									[LAT_WW, LONG_WW],
									MAIN_USE,
									COUNTRY,
									NEAR_CITY,
									[LAT_DD, LONG_DD]
								)
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

	return <LayerGroup>{zoomLevel > 8 ? layer : null}</LayerGroup>
}
PolygonLayer.propTypes = {
  data: PropTypes.object.isRequired,
}