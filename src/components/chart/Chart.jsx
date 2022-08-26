import useChartHook from "./ChartHook"
import { useRef } from "react"
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
import { useEffect } from "react"

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
		beforeDraw: (chart) => {
			const ctx = chart.canvas.getContext("2d")
			ctx.save()
			ctx.globalCompositeOperation = "destination-over"
			ctx.fillStyle = "#fff"
			ctx.fillRect(0, 0, chart.width, chart.height)
			ctx.restore()
		},
	}
)

const StyledDiv = styled("div", {
	display: "flex",
	height: "55%",
	width: "100%",
	border: "1px solid #ccc",
})

export const Chart = ({ handleCanvas }) => {
	const { data, options, charType } = useChartHook()
	const chartRef = useRef()
	useEffect(() => {
		if (!chartRef.current) return
		const { canvas } = chartRef.current
		handleCanvas(canvas)
	}, [])

	return (
		<StyledDiv>
			{charType === "LINE" && (
				<Line options={options} data={data} ref={chartRef} />
			)}
			{charType === "SCATTER" && (
				<Scatter options={options} data={data} ref={chartRef} />
			)}
		</StyledDiv>
	)
}
//
