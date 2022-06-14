import { useCallback } from "react"
import { useMap } from "react-leaflet"

export default function usePolygonLayerHook({ data, handleChange }) {
  const { COUNTRY } = data.features[0].properties
  const map = useMap()
  const centerPolygon = useCallback((...coord) => {
    map.setView(coord[0], coord[1])
  })

  const getIdName = useCallback(
    (id, name) => {
      handleChange(id, name)
    },
    [handleChange]
  )

  return {
    centerPolygon,
    country: COUNTRY,
    getIdName,
  }
}
