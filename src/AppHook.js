import { config } from "./config"
import { useState } from "react"
import { useEffect } from "react"
import { useCallback } from "react"
import { dsv } from "d3"

const attributes = Object.keys(config.attributes)
const observationTypes = Object.keys(config.observationTypes)
const durations = Object.keys(config.duration)

export function useAppHook() {
  const [fileURL, setFileURL] = useState(null)
  const [attribute, setAttribute] = useState(null)
  const [chartAttribute, setChartAttribute] = useState(null)
  const [observationType, setObservationType] = useState(null)
  const [duration, setDuration] = useState(null)
  const [idSwot, setIdSwot] = useState(null)
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (attribute && observationType && duration && idSwot) {
      handleFileURL()
    }
  }, [attribute, observationType, duration, idSwot])

  useEffect(() => {
    if (fileURL) {
      handleChartData()
    }
  }, [fileURL])

  useEffect(() => {
    console.log(chartData)
  }, [chartData])

  const handleCheckboxChange = useCallback(
    id => {
      if (attributes.includes(id)) {
        const { filePath } = config.attributes[id]
        setAttribute(filePath)
        setChartAttribute(id)
      }
      if (observationTypes.includes(id)) {
        const { abbr } = config.observationTypes[id]
        setObservationType(abbr)
      }
      if (durations.includes(id)) {
        const { abbr } = config.duration[id]
        setDuration(abbr)
      }
    },
    [attribute, observationType, duration]
  )

  const handleIdSwot = useCallback(
    id => {
      setIdSwot(id)
    },
    [idSwot]
  )

  const handleFileURL = () => {
    setFileURL(
      `${config.baseDir}${idSwot}/${observationType}${duration}/${idSwot}${config.delimitter}${attribute}${config.delimitter}${observationType}${duration}.csv`
    )
  }

  const handleChartData = async () => {
    const data = await dsv(";", fileURL)
    setChartData([...chartData, data])
  }

  return { handleCheckboxChange, handleIdSwot, chartData, chartAttribute }
}
