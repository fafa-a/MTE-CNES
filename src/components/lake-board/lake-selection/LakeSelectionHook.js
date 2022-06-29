import { desactiveLake, setCoordinatesLakeToCenter } from "@stores/lakesSlice"
import { useDispatch } from "react-redux"

export const useLakeSelectionHook = (id, coordinates) => {
  const dispatch = useDispatch()

  const handleClickDesactiveLake = useCallback(() => {
    dispatch(desactiveLake({ lakeId: id }))
  })

  const sendCoordinates = useCallback(() => {
    dispatch(setCoordinatesLakeToCenter({ coordinates }))
  }, [])

  return {
    handleClickDesactiveLake,
    sendCoordinates,
  }
}
export default useLakeSelectionHook
