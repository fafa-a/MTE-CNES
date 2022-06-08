import { useContext, useEffect, useState, useRef } from "react"
import { LayersControl, MapContainer, Polygon, TileLayer } from "react-leaflet"

import { MarkerLayer } from "../layers/MarkerLayer"
import { MarkerLayerWithTooltipCluster } from "../layers/MarkerLayerWithTooltipCluster"
import { Chart } from "../components/Chart"
import { PolygonLayer } from "../layers/PolygonLayer"
import { Checkbox } from "../components/Checkbox"

import { Andalousie } from "../data/geojson/Andalousie"
import { BurkinaFaso } from "../data/geojson/BurkinaFaso"
import { India } from "../data/geojson/India"
import { Occitanie } from "../data/geojson/Occitanie"
import { Tunisia } from "../data/geojson/Tunisia"

import { dsv } from "d3"
import { config } from "../config"

export const Map = () => {
  const [geoFilter, setGeoFilter] = useState(null)
  const getGeoFilter = () => geoFilter
  const [radiusFilter, setRadiusFilter] = useState(null)
  const getRadiusFilter = () => radiusFilter
  const dataGeojson = [Andalousie, BurkinaFaso, India, Occitanie, Tunisia]
  const [polygonClicked, setPolygonCliked] = useState(Boolean)
  const [chartData, setChartData] = useState([])
  const [pattern, setPattern] = useState("")
  const [id, setId] = useState("")
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_populated_places_simple.geojson"
  //     )
  //     const cities = await response.json()
  //     setAsyncCities(cities)
  //   }
  //   fetchData().catch(console.error)
  // }, [])

  const isPolygonClicked = bool => {
    setPolygonCliked(bool)
  }

  const getLakeData = async id => {
    if (!id || !pattern) return
    console.log(id, pattern)
    const data = await dsv(
      ";",
      `/src/data/series/${id}${config.delimitter}${pattern}${config.delimitter}MO1.csv`
    )
    setChartData(data)
  }
  useEffect(() => {
    getLakeData()
  }, [])

  const handleChange = el => {
    console.log(el.name)
    setPattern(el.name)
    setId(el.id)
  }

  return (
    <>
      <MapContainer center={[36.91, -3.54]} zoom={12} scrollWheelZoom={true}>
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
              <MarkerLayer
                data={data}
                setRadiusFilter={setRadiusFilter}
                getRadiusFilter={getRadiusFilter}
                getGeoFilter={getGeoFilter}
              />
              <PolygonLayer
                data={data}
                getLakeData={getLakeData}
                isPolygonClicked={isPolygonClicked}
              />

              <MarkerLayerWithTooltipCluster data={data} />
            </div>
          ))}
          {/* <RadiusFilteR
            radiusFilter={radiusFilter}
            setRadiusFilter={setRadiusFilter}
          />
          <ContinentsPolygonLayer
            data={continents}
            setGeoFilter={setGeoFilter}
            getGeoFilter={getGeoFilter}
          />
        */}
          {/* <FitBoundToDataControl /> */}
          {/* <ShowActiveFiltersControl
              getFilters={() => ({ geoFilter, radiusFilter })}
            /> */}
        </LayersControl>
      </MapContainer>
      <div style={{ display: "flex", height: "45vh" }}>
        <Chart chartData={chartData} id={id} />
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {config.dataType.map(datatype => {
            return Object.entries(datatype).map(el => {
              const id = el[0]
              const { label, pattern } = el[1]
              return (
                <Checkbox
                  key={id}
                  id={id}
                  label={label}
                  pattern={pattern}
                  handleChange={handleChange}
                />
              )
            })
          })}
        </div>
      </div>
    </>
  )
}
