import { useAppHook } from "./AppHook"
import { Map } from "@components/map/Map"
import { Chart } from "@components/chart/Chart"
import { Form } from "@components/form/Form"
import { globalStyles, styled } from "@/stitches.config"
globalStyles()
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import { LakeBoard } from "./components/lake-board/LakeBoard"

const StyledContainer = styled("div", {
  display: "flex",
  height: "50vh",
  width: "100vw",
})

const App = () => {
  const { getLakeIdSwotName, compareLake, removeLakeActive, addLakeToCompare } =
    useAppHook()

  return (
    <>
      <StyledContainer>
        <LakeBoard />
        <Map
          getLakeIdSwotName={getLakeIdSwotName}
          removeLakeActive={removeLakeActive}
          addLakeToCompare={addLakeToCompare}
        />
      </StyledContainer>
      <StyledContainer>
        <Form />
        <Chart compareLake={compareLake} />
      </StyledContainer>
    </>
  )
}

export default App
