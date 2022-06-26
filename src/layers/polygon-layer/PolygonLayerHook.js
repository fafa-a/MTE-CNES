import { useMap } from "react-leaflet"

export default function usePolygonLayerHook({ handleChange }) {
  const map = useMap()
  const centerPolygon = useCallback((...coord) => {
    map.setView(coord[0], coord[1])
  })

  const getLakeIdName = useCallback((id, name) => {
    const obj = {
      id,
      name,
    }
    handleChange(obj)
  })

  return {
    map,
    centerPolygon,
    getLakeIdName,
  }
}
