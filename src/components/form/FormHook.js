import { config } from "../../config"

export default function useFormHook() {
  const formValues = Object.entries(config.dataTypes).map(
    ([dataType, properties]) => {
      const { label, filePath } = properties
      return {
        id: dataType,
        filePath,
        label,
        active: false,
      }
    }
  )
  return { formValues }
}
