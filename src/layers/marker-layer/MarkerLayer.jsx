import { LayersControl, LayerGroup, Marker } from "react-leaflet"
import { defaultIcon } from "../../icons/defaultIcon"
import { v4 as uuid } from "@lukeed/uuid"
import Card from "../../components/card/Card"

/**
 * Component to display the marker layer and tooltip for cities
 *
 * @component
 * @param {Object} data
 * @returns {LayersControl.Overlay}
 */
export const MarkerLayer = ({ data }) => {
  const findCountryName = () => data.features[0].properties.COUNTRY
  const country = findCountryName()

  const layer = data.features.map(feature => {
    const { ID_SWOT, LONG_WW, LAT_WW } = feature.properties
    return (
      <Marker
        key={uuid()}
        position={[LAT_WW, LONG_WW]}
        icon={defaultIcon}
        doFitToBounds={true}
      >
        <Card feature={feature} />
      </Marker>
    )
  })

  return (
    <LayersControl.Overlay name={`${country} lakes markers`}>
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  )
}
