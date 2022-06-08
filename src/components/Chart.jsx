import { useEffect, useState, useContext } from "react"
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
import { config } from "../config"

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

export const Chart = ({ chartData, id }) => {
  const [label, setLabel] = useState("")
  const [unit, setUnit] = useState("")
  const [borderColor, setBorderColor] = useState("")
  const [backgroundColor, setBackgroundColor] = useState("")

  useEffect(() => {
    if (id) {
      config.dataType.map(obj => {
        console.log(obj[id])
      })
    }

    if (id) {
      config.dataType.map(el => {
        if (el[id]) {
          setLabel(el[id].label)
          setUnit(el[id].unit)
          setBorderColor(el[id].borderColor)
          setBackgroundColor(el[id].backgroundColor)
        }
      })
    }
  }, [id])

  const handleValue = value => {
    if (unit === "hm³") {
      return (1 * value) / 1_000_000
    } else if (unit === "hm²") {
      return (1 * value) / 1_000
    } else if (unit === "%") {
      return value
    }
  }
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || ""

            const labelStartWith = label
              .slice(0, label.indexOf(" "))
              .toLowerCase()

            const labelWithoutExtension = label
              .split(" ")
              .slice(0, -1)
              .join(" ")

            if (context.parsed.y !== null) {
              if (labelStartWith === "filling")
                return `${labelWithoutExtension} : ${context.parsed.y.toFixed(
                  3
                )} %`
              else if (labelStartWith === "surface")
                return `${labelWithoutExtension} : ${context.parsed.y.toFixed(
                  3
                )} hm²`
              else if (labelStartWith === "volume")
                return `${labelWithoutExtension} : ${context.parsed.y.toFixed(
                  3
                )} hm³`
            }
            return labelWithoutExtension
          },
        },
      },
      legend: {
        position: "top",
        labels: { font: { size: 14 } },
      },
      zoom: {
        pan: {
          enabled: true,
          modifierKey: "ctrl",
          // onPanStart: chart => {
          //   chart.event.changedPointers[0].target.style.cursor = "grab"
          // },
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          drag: {
            enabled: true,
            backgroundColor: "rgba(0,204,255,0.15)",
            borderColor: "rgba(0,204,255,1.00)",
            borderWidth: 1,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
        limits: {
          y: { min: 0, max: "original" },
        },
      },
    },
    title: { display: true, text: "My Chart" },
  }

  const data = {
    labels: chartData
      ?.filter(el => !isNaN(el.value) && el.date !== "" && el.value !== "0")
      .map(el => el.date),
    datasets: [
      {
        label: `${label} ${unit}`,
        data: chartData
          ?.filter(el => !isNaN(el.value) && el.date !== "" && el.value !== "0")
          .map(el => handleValue(el.value)),
        borderColor,
        backgroundColor,
      },
    ],
  }

  const style = {
    display: "flex",
    height: "100%",
    maxWidth: "100%",
  }

  return (
    <div style={{ ...style }}>
      <Line options={options} data={data} />
    </div>
  )
}
