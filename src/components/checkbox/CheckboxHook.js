import { useDispatch } from "react-redux"
import { setObservationDuration, setObservationTypes } from "@stores/formSlice"
import { useSelector } from "react-redux"

export default function useCheckboxHook({ id, actionReducers, storesKey }) {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(null)
  const { active } = useSelector(state => state.form[storesKey][id])

  useEffect(() => {
    setIsChecked(active)
  }, [active])

  let actionType = ""
  switch (actionReducers) {
    case "observationTypes":
      actionType = setObservationTypes
      break
    case "duration":
      actionType = setObservationDuration
      break
    default:
      break
  }

  const onChange = useCallback(e => {
    dispatch({
      type: `${actionType}`,
      payload: {
        id,
        active: e.target.checked,
      },
    })
  })

  return { isChecked, onChange, actionReducers }
}
