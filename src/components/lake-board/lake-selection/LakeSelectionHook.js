import { desactiveLake } from "@stores/lakesSlice"
import { useDispatch } from "react-redux"

export const useLakeSelectionHook = id => {
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(desactiveLake({ lakeId: id }))
  })
  return {
    handleClick,
  }
}
export default useLakeSelectionHook
