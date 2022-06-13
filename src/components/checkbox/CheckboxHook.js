import { useCallback } from "react"

export default function useCheckboxHook({ handleChange, id, abbr }) {
  const onChange = useCallback(() => {
    if (["optic", "radar"].includes(id)) {
      handleChange(abbr)
    }
    if (["fillingRate", "volume", "surface"].includes(id)) {
      handleChange(id)
    }
  }, [handleChange, id, abbr])

  return { onChange }
}
