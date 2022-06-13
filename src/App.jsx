import { useAppHook } from "./AppHook"
import { Map } from "./components/map/Map"
import { Chart } from "./components/chart/Chart"
import { Form } from "./components/form/Form"
import { globalStyles, styled } from "../stitches.config"
globalStyles()
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

const StyledContainer = styled("div", {
  display: "flex",
  height: "45vh",
  width: "100vw",
})

const App = () => {
  const { handleCheckboxChange, handleIdSwot } = useAppHook()

  return (
    <>
      <Map handleChange={handleIdSwot} />
      <StyledContainer>
        <Form handleChange={handleCheckboxChange} />
        {/*
      <Chart /> */}
      </StyledContainer>
    </>
  )
}

export default App
