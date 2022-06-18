import { useDispatch } from "react-redux"
import { cleanForm } from "@stores/formSlice"

export default function useButtonHook({ type, handleAction }) {
  const dispatch = useDispatch()

  const onClick = useCallback(() => {
    dispatch({
      type: `${cleanForm}`,
    })
  }, [handleAction, type])

  return { onClick }
}
