import { useDispatch } from "react-redux"
import { setObservationDuration, setObservationTypes } from "@stores/formSlice"

export default function useCheckboxHook({
  handleChange,
  id,
  abbr,
  actionReducers,
}) {
  const dispatch = useDispatch()

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

  const onChange = e => {
    dispatch({
      type: `${actionType}`,
      payload: abbr,
    })

    handleChange(id)
  }

  return { onChange, actionReducers }
}
