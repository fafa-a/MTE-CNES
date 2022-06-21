import { useDispatch } from "react-redux"

export default function useButtonHook(cleanForm) {
  const dispatch = useDispatch()

  const onClick = useCallback(() => {
    dispatch(cleanForm())
  })

  return { onClick }
}
