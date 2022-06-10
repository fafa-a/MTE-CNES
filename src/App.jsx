import AppHook from "./AppHook"
import { Map } from "./components/map/Map"
import { Chart } from "./components/chart/Chart"
import { Form } from "./components/form/Form"
import "./styles/reset.css"
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

import Theme from "./theme/Theme"
import styled from "styled-components"

const StyledContainer = styled.div`
  display: flex;
  height: 45vh;
  width: 100vw;
`

const App = () => {
  return (
    <Theme>
      <Map />
      <StyledContainer>
        <Form />
        {/*
      <Chart /> */}
      </StyledContainer>
    </Theme>
  )
}

export default App
