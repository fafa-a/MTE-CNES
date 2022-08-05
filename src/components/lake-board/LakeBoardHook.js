import { useSelector } from "react-redux"
import { clearActiveLakes } from "../../stores/lakesSlice"
import { useDispatch } from "react-redux"
import { useCallback, useEffect, useState } from "react"
export default function useLakeBoardHook() {
	const [dataSelection, setDataSelection] = useState([])
	const { activeLakes, data, activeYears, dataLakes } = useSelector(
		(state) => state.lakes
	)
	const { YEAR, VOLUME, dataType } = useSelector((state) => state.form)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!activeLakes.length) {
			setDataSelection([])
			return
		}
		if (!YEAR && dataLakes[activeLakes.at(-1).id]?.[dataType]) {
			setDataSelection(activeLakes)
		}
		if (YEAR) {
			setDataSelection(Object.values(activeYears))
		}
	}, [YEAR, activeLakes, activeYears, data, dataLakes])

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
