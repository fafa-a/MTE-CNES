import { config } from "../../config"

export default function useFormHook() {
  const dataTypesValues = Object.entries(config.attributes).map(
    ([attributes, properties]) => {
      const { label, filePath } = properties
      return {
        id: attributes,
        filePath,
        label,
        active: false,
      }
    }
  )

  const observationTypesValues = Object.entries(config.observationTypes).map(
    ([observationTypes, properties]) => {
      const { abbr, label } = properties
      return {
        id: observationTypes,
        abbr,
        label,
        active: false,
      }
    }
  )

  return { dataTypesValues, observationTypesValues }
}
