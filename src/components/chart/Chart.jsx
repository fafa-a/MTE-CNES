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
  zoomPlugin,
  {
    id: "customBackground",
    beforeDraw: chart => {
      const ctx = chart.canvas.getContext("2d")
      ctx.save()
      ctx.globalCompositeOperation = "destination-over"
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, chart.width, chart.height)
      ctx.restore()
    },
  }
)

const StyledDiv = styled("div", {
	display: "flex",
	height: "50%",
	width: "100%",
})

export const Chart = () => {
  const { data, options, charType } = useChartHook()

  return (
    <StyledDiv>
      {charType === "LINE" && <Line options={options} data={data} />}
      {charType === "SCATTER" && <Scatter options={options} data={data} />}
    </StyledDiv>
  )
}
//
