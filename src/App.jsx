import { useAppHook } from "./AppHook"
import { Map } from "@components/map/Map"
import { Chart } from "@components/chart/Chart"
import { Dashboard } from "@components/dashboard/Dashboard"
import { LakeCard } from "@components/lake-card/LakeCard"
import { globalStyles, styled } from "@/stitches.config"
globalStyles()
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

const SAppContainer = styled("div", {
	display: "flex",
	width: "100ww",
	height: "100vh",
})
const SMapChartContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	width: "87vw",
})


const App = () => {
	const { showLakeInfo } = useAppHook()
	// eslint-disable-next-line no-undef
	useEffect(() => {
		console.log(showLakeInfo)
	}, [showLakeInfo])

	return (
		<>
			{showLakeInfo && <LakeCard />}
			<SAppContainer>
				<Dashboard />
				<SMapChartContainer>
					<Map />
					<Chart />
				</SMapChartContainer>
			</SAppContainer>
		</>
	)
}

export default App
