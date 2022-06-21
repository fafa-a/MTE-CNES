import { useDispatch } from "react-redux"

export default function useSelectHook(setAttributesValue) {
  const dispatch = useDispatch()

  const onChange = useCallback(e => {
    dispatch(setAttributesValue({ value: e.target.value }))
  }, [])

  return { onChange }
}
