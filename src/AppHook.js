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
  const [observationType, setObservationType] = useState([])
  const [duration, setDuration] = useState("")
  const [idSwot, setIdSwot] = useState(null)
  const [lakeName, setLakeName] = useState(null)

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (observationType && duration && idSwot && attribute) {
      handleFileURL(attribute)
    }
  }, [attribute, observationType, duration, idSwot])

  useEffect(() => {
    if (!idSwot) return
    if (
      attribute.length === 0 &&
      observationType.length === 0 &&
      duration === ""
    ) {
      setAttribute(["filling_rate_raw"])
      setChartAttribute("fillingRate")
      setObservationType(["MO", "MR"])
      setDuration("2")
    }
    handleFileURL(attribute)
  }, [idSwot])

  useEffect(() => {
    for (const url of fileURL) {
      handleChartData(url)
    }
    handleButtonReset()
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
        setObservationType([...observationType, abbr])
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
    const urlArrTmp = []
    for (const obs of observationType) {
      const url = `${config.baseDir}${idSwot}/${idSwot}${config.delimitter}${attr}${config.delimitter}${obs}${duration}.csv`
      urlArrTmp.push(url)
    }
    setFileURL(urlArrTmp)
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
      chartAttribute,
    })
  }, [chartData])

  const handleButtonReset = useCallback(type => {
    if (type === "reset") {
      console.log("reset")
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
