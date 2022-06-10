import { useCallback } from "react"
import { useMap } from "react-leaflet"

export default function usePolygonLayerHook({ data }) {
  const { COUNTRY } = data.features[0].properties

  const map = useMap()
  const centerPolygon = useCallback((...coord) => {
    map.setView(coord[0], coord[1])
  })

  return {
    centerPolygon,
    country: COUNTRY,
  }
}
