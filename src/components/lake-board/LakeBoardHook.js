import { useSelector } from "react-redux"
import { clearActiveLakes } from "../../stores/lakesSlice"
import { useDispatch } from "react-redux"
import { useCallback, useEffect, useState } from "react"
export default function useLakeBoardHook() {
	const [dataSelection, setDataSelection] = useState([])
	const { activeLakes, data, activeYears } = useSelector((state) => state.lakes)
	const { YEAR, VOLUME } = useSelector((state) => state.form)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!activeLakes.length) {
			setDataSelection([])
			return
		}
		if (!YEAR) {
			setDataSelection(activeLakes)
		}
		if (YEAR) {
			setDataSelection(Object.values(activeYears))
		}
	}, [YEAR, activeLakes, activeYears, data])

	const clearSelection = useCallback(() => {
		if (!YEAR) {
			dispatch(clearActiveLakes())
		}
	}, [dispatch])

	return {
		dataSelection,
		clearSelection,
		VOLUME,
	}
}
