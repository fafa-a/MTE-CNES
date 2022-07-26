import { useDispatch } from "react-redux"
import { useEffect, useCallback, useState } from "react"

export default function useRadioBoxhook({ storeAction, value }) {
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
