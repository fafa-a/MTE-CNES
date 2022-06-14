import useChartHook from "./ChartHook"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import zoomPlugin from "chartjs-plugin-zoom"
import { styled } from "@stitches/react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
)
const StyledDiv = styled("div", {
  display: "flex",
  height: "100%",
  width: "100%",
})
export const Chart = ({ chartData, chartAttribute }) => {
  const { data, options } = useChartHook(chartData, chartAttribute)

    return (
    <StyledDiv>
      <Line options={options} data={data} />
    </StyledDiv>
  )
}
