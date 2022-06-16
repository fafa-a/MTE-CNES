import { config } from "./config"
import { useState } from "react"
import { useEffect } from "react"
import { useCallback } from "react"

import { dsv } from "d3"

const attributes = Object.keys(config.attributes)

const observationTypes = Object.keys(config.observationTypes)
const durations = Object.keys(config.duration)

export function useAppHook() {
  const [fileURL, setFileURL] = useState([])
  const [attribute, setAttribute] = useState([])
  const [chartAttribute, setChartAttribute] = useState(null)
  const [observationType, setObservationType] = useState(null)
  const [duration, setDuration] = useState(null)
  const [idSwot, setIdSwot] = useState(null)
  const [lakeName, setLakeName] = useState(null)

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (observationType && duration && idSwot && attribute) {
      handleFileURL(attribute)
    }
  }, [attribute, observationType, duration, idSwot])

  useEffect(() => {
    for (const url of fileURL) {
      handleChartData(url)
    }
  }, [fileURL])

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

  const handleIdName = useCallback(
    (id, name) => {
      setIdSwot(id)
      setLakeName(name)
    },
    [idSwot]
  )

  const handleFileURL = attr => {
    const url = `${config.baseDir}${idSwot}/${idSwot}${config.delimitter}${attr}${config.delimitter}${observationType}${duration}.csv`
    if (!fileURL.includes(url)) {
      setFileURL([...fileURL, url])
    }
  }

  const handleChartData = async url => {
    const data = await dsv(";", url)

    const isDataInChartdata = chartData.some(item => {
      if (JSON.stringify(item) === JSON.stringify(data)) {
        return true
      }
    })

    if (!isDataInChartdata) {
      setChartData([...chartData, data])
    }
  }
  useEffect(() => {
    console.log({
      chartData,
      fileURL,
      attribute,
      observationType,
      duration,
    })
  }, [chartData, fileURL, attribute, observationType, duration])
  const handleButtonReset = useCallback(type => {
    console.log("app hook", type)
    if (type === "reset") {
      setAttribute([])
      setFileURL([])
      setChartAttribute(null)
      setObservationType(null)
      setDuration(null)
      setIdSwot(null)
      setLakeName(null)
      setChartData([])
    }
  })

  return {
    handleCheckboxChange,
    handleIdName,
    handleButtonReset,
    chartData,
    chartAttribute,
    lakeName,
  }
}
