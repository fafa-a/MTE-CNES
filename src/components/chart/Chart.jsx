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
import { Line, Scatter } from "react-chartjs-2"
import zoomPlugin from "chartjs-plugin-zoom"
import { styled } from "@stitches/react"
import "chartjs-adapter-date-fns"

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

export const Chart = props => {
  const { data, options, charType } = useChartHook(props)

  return (
    <StyledDiv>
      {charType === "LINE" && <Line options={options} data={data} />}
      {charType === "SCATTER" && <Scatter options={options} data={data} />}
    </StyledDiv>
  )
}
//
