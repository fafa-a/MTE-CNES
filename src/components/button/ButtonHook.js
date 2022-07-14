/* eslint-disable no-undef */
import { useDispatch } from "react-redux"

export default function useButtonHook(cleanForm) {
  const dispatch = useDispatch()

  const onClick = useCallback(() => {
    dispatch(cleanForm())
  }, [dispatch, cleanForm])

  return { onClick }
}
