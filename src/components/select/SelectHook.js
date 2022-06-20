import { setAttributes } from "@stores/formSlice"
import { useDispatch, useSelector } from "react-redux"
import { config } from "@/config"

export default function useSelectHook() {
  const dispatch = useDispatch()

  const { value } = useSelector(state => state.form.attributes)

  const onChange = useCallback(e => {
    const arrID = Object.entries(config.attributes).map(
      ([attributes, properties]) => {
        const { filePath } = properties
        if (filePath === e.target.value) {
          return attributes
        }
      }
    )
    const id = arrID.filter(item => item !== undefined)

    dispatch({
      type: `${setAttributes}`,
      payload: {
        value: e.target.value,
        idConfig: id,
      },
    })
  }, [])

  return { onChange, value }
}
