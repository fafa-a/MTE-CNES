import { setAttributes } from "@stores/formSlice"
import { useDispatch, useSelector } from "react-redux"

export default function useSelectHook({ handleChange }) {
  const dispatch = useDispatch()

  const { value } = useSelector(state => state.form.attributes)

  const onChange = useCallback(
    e => {
      dispatch({
        type: `${setAttributes}`,
        payload: {
          value: e.target.value,
        },
      })
      handleChange(e.target.value)
    },
    [handleChange]
  )

  return { onChange, value }
}
