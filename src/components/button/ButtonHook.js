import { useCallback } from "react"
import { useDispatch } from "react-redux"

export default function useButtonHook(cleanForm) {
	const dispatch = useDispatch()
	const onClick = useCallback(() => {
		dispatch(cleanForm())
	}, [dispatch, cleanForm])
	return { onClick }
}
