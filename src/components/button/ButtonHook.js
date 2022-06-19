import { useDispatch } from "react-redux"
import { cleanForm } from "@stores/formSlice"

export default function useButtonHook({ type }) {
  const dispatch = useDispatch()

  const onClick = useCallback(() => {
    dispatch({
      type: `${cleanForm}`,
    })
  })

  return { onClick }
}
