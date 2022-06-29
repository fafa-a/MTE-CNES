import { useMap } from "react-leaflet"
export default function useButtonPlusMinusHook({
  id,
  name,
  addLakeToCompare,
  removeLakeActive,
  coordinates,
}) {
  const map = useMap()

  const clickMinus = useCallback(() => {
    removeLakeActive(id)
  }, [])

  const clickPlus = useCallback(() => {
    const obj = { id, name, coord: coordinates, compare: true }
    addLakeToCompare(obj)
    map.closePopup()
  }, [])

  return {
    clickMinus,
    clickPlus,
  }
}
