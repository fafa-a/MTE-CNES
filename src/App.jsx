import React from "react"
import "leaflet/dist/leaflet.css"
import "./App.css"
import "antd/dist/antd.variable.min.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import { Map } from "./components/map/Map"
import { Chart } from "./components/chart/Chart"
import { Form } from "./components/form/Form"

const App = () => {
  return (
    <>
      <Map />
      <Form />
      <Chart />
    </>
  )
}

export default App
