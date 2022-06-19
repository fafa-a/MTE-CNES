import { useCallback } from "react"
import { useMap } from "react-leaflet"
import { useDispatch } from "react-redux"
import { addLake, addSelectionOfLakes } from "@stores/lakesSlice"

export default function usePolygonLayerHook({ data, handleChange }) {
  const map = useMap()
  const dispatch = useDispatch()
  const { COUNTRY } = data.features[0].properties
  const centerPolygon = useCallback((...coord) => {
    map.setView(coord[0], coord[1])
  })

  const getLakeInfo = useCallback(
    (ID_SWOT, DAM_NAME, LAT_WW, LONG_WW, MAIN_USE) => {
      dispatch({
        type: `${addLake}`,
        payload: {
          idSwot: ID_SWOT,
          isSelected: true,
          mainUse: MAIN_USE,
          name: DAM_NAME,
          position: [LAT_WW, LONG_WW],
        },
      })
    }
  )

  return {
    centerPolygon,
    country: COUNTRY,
    getLakeInfo,
  }
}
