import { useAppHook } from "./AppHook"
import { Map } from "@components/map/Map"
import { Chart } from "@components/chart/Chart"
import { Form } from "@components/form/Form"
import { globalStyles, styled } from "@/stitches.config"
globalStyles()
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"



const StyledContainer = styled("div", {
  display: "flex",
  height: "50vh",
  width: "100vw",
})

const App = () => {
  const { getIdSwot } = useAppHook()
  return (
    <>
      <Map getIdSwot={getIdSwot} />
      <StyledContainer>
        <Form />
        {/* <Chart obsTypes={obsTypes} /> */}
      </StyledContainer>
    </>
  )
}

export default App
