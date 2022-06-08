import L from "leaflet"
import React, { useState } from "react"
import { LayersControl, LayerGroup, Marker, Popup } from "react-leaflet"
import { defaultIcon } from "../icons/defaultIcon"
import { Button, Card, InputNumber, Space } from "antd"
import { FilterOutlined } from "@ant-design/icons"
import booleanPointInPolygon from "@turf/boolean-point-in-polygon"

const DEFAULT_RADIUS = 3000

/**
 * Component to display the city name, the country name, and the city's population and filtered by radius
 *
 * @component
 * @param {Array} feature
 * @param {Function} setRadiusFilter
 * @returns {React.ReactElement}
 */
const PopupStatistics = ({ feature, setRadiusFilter }) => {
  const [radius, setRadius] = useState(DEFAULT_RADIUS)
  const { DAM_NAME, COUNTRY } = feature.properties

  return (
    <>
      <Card type="inner" title="Name" style={{ marginTop: 16 }}>
        <b>{`${DAM_NAME}, ${COUNTRY}`}</b>
      </Card>
      {/* <Card type="inner" title="Population" style={{ marginTop: 16 }}>
        <b>{`${pop_max}`}</b>
      </Card>
      <Card type="inner" title="Radius Filter" style={{ marginTop: 16 }}>
        <Space>
          <InputNumber
            defaultValue={DEFAULT_RADIUS}
            min={0}
            onChange={e => setRadius(e)}
          ></InputNumber>
          <Button
            type="primary"
            shape="round"
            icon={<FilterOutlined />}
            onClick={() =>
              setRadiusFilter(prevState => {
                let newFilter
                if (prevState) {
                  if (radius === 0) {
                    newFilter = prevState
                  } else {
                    const samefeature = prevState.feature === feature
                    const sameRadius = prevState.radius === radius
                    if (!samefeature || !sameRadius) {
                      newFilter = { feature, radius }
                    }
                  }
                } else if (radius !== 0) {
                  newFilter = { feature, radius }
                }
                return newFilter
              })
            }
          >
            Filter by km
          </Button>
        </Space>
      </Card> */}
    </>
  )
}

/**
 * Component to display the marker layer and tooltip for cities
 *
 * @component
 * @param {Object} data
 * @param {Function} setRadiusFilter
 * @param {Function} getRadiusFilter
 * @param {Function} getGeoFilter
 * @returns {LayersControl.Overlay}
 */
export const MarkerLayer = ({
  data,
  setRadiusFilter,
  getRadiusFilter,
  getGeoFilter,
}) => {
  const geoFilter = getGeoFilter()
  const radiusFilter = getRadiusFilter()
  let centerPoint
  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry
    centerPoint = L.latLng(coordinates[1], coordinates[0])
  }

  const findCountryName = () => data.features[0].properties.COUNTRY
  const country = findCountryName()
  
  const layer = data.features
    .filter(currentFeature => {
      let filterByRadius
      let filterByGeo

      if (centerPoint) {
        const { coordinates } = currentFeature.geometry
        const currentPoint = L.latLng(coordinates[1], coordinates[0])
        filterByRadius =
          centerPoint.distanceTo(currentPoint) / 1000 < radiusFilter.radius
      }

      if (geoFilter) {
        filterByGeo = booleanPointInPolygon(currentFeature, geoFilter)
      }

      let doFilter = true
      if (geoFilter && radiusFilter) {
        doFilter = filterByGeo && filterByRadius
      } else if (geoFilter && !radiusFilter) {
        doFilter = filterByGeo
      } else if (radiusFilter && !geoFilter) {
        doFilter = filterByRadius
      }
      return doFilter
    })
    .map(feature => {
      const { ID_SWOT, LONG_DD, LAT_DD } = feature.properties
      return (
        <Marker
          key={ID_SWOT}
          position={[LAT_DD, LONG_DD]}
          icon={defaultIcon}
          doFitToBounds={true}
        >
          <Popup>
            <PopupStatistics
              feature={feature}
              setRadiusFilter={setRadiusFilter}
            />
          </Popup>
        </Marker>
      )
    })
  return (
    <LayersControl.Overlay name={`${country} lakes markers`}>
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  )
}
