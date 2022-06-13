import { config } from "./config"
import { useState } from "react"
import { useEffect } from "react"
import { useCallback } from "react"

const attributes = Object.keys(config.attributes)
const observationTypes = Object.keys(config.observationTypes)

export function useAppHook() {
  const [fileURL, setFileURL] = useState(null)
  const [attribute, setAttribute] = useState(null)
  const [observationType, setObservationType] = useState(null)
  const [idSwot, setIdSwot] = useState(null)

  useEffect(() => {
    if (attribute && observationType && idSwot) {
      handleFileURL()
    }
  }, [attribute, observationType, idSwot])

  useEffect(() => {
    console.log({ fileURL })
  }, [fileURL])

  const handleCheckboxChange = useCallback(
    id => {
      if (attributes.includes(id)) {
        const { filePath } = config.attributes[id]
        setAttribute(filePath)
      }
      if (observationTypes.includes(id)) {
        const { abbr } = config.observationTypes[id]
        setObservationType(abbr)
      }
    },
    [attribute, observationType]
  )

  const handleIdSwot = useCallback(
    id => {
      setIdSwot(id)
    },
    [idSwot]
  )

  const handleFileURL = useCallback(() => {
    setFileURL(
      `${config.baseDir}${idSwot}/${idSwot}${config.delimitter}${attribute}${config.delimitter}${observationType}*.csv`
    )
  }, [])

  return { handleCheckboxChange, handleIdSwot }
}
