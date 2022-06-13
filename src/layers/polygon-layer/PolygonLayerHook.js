import { useCallback } from "react"
import { useMap } from "react-leaflet"

export default function usePolygonLayerHook({ data, handleChange }) {
  const { COUNTRY } = data.features[0].properties
  const map = useMap()
  const centerPolygon = useCallback((...coord) => {
    map.setView(coord[0], coord[1])
  })

  const getIdSwot = useCallback(
    id => {
      handleChange(id)
    },
    [handleChange]
  )

  return {
    centerPolygon,
    country: COUNTRY,
    getIdSwot,
  }
}
