import { useDispatch } from "react-redux"
import { useEffect, useState, useCallback } from "react"

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
