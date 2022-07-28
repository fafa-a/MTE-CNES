import { useDispatch } from "react-redux"
import { useCallback } from "react"
export default function useSelectHook(setAttributesValue) {
	const dispatch = useDispatch()

	const onChange = useCallback(
		(e) => {
			dispatch(setAttributesValue({ value: e.target.value }))
		},
		[dispatch, setAttributesValue]
	)

	return { onChange }
}
