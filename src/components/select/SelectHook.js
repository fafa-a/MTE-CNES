import { setAttributes } from "@stores/formSlice"
import { useDispatch } from "react-redux"

export default function useSelectHook(handleChange) {
  const dispatch = useDispatch()

  const onChange = useCallback(
    e => {
      dispatch({
        type: `${setAttributes}`,
        payload: e.target.value,
      })
      handleChange(e.target.value)
    },
    [handleChange]
  )

  return { onChange }
}
