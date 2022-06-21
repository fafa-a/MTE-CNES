import { useMap } from "react-leaflet"

export default function usePolygonLayerHook({ handleChange }) {
  const map = useMap()
  const centerPolygon = useCallback((...coord) => {
    map.setView(coord[0], coord[1])
  })

  const getLakeId = useCallback(id => {
    handleChange(id)
  })

  return {
    centerPolygon,
    getLakeId,
  }
}
