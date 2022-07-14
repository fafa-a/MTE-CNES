/* eslint-disable no-undef */
import { useDispatch } from "react-redux"

export default function useCheckboxHook({ storeAction, value }) {
  const [isChecked, setIsChecked] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsChecked(value)
  }, [value])

  const onChange = useCallback(() => {
    dispatch(storeAction())
  }, [dispatch, storeAction])

  return { isChecked, onChange }
}
