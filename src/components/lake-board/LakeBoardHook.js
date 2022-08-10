import { useSelector } from "react-redux"
import { clearActiveLakes, clearActiveYears } from "../../stores/lakesSlice"
import { useDispatch } from "react-redux"
import { useCallback, useEffect, useState } from "react"
import { DurationTypes } from "../../config"
export default function useLakeBoardHook() {
	const [dataSelection, setDataSelection] = useState([])
	const [obsDepth, setObsDepth] = useState()
	const { activeLakes, data, activeYears, dataLakes, yearsVisible } =
		useSelector((state) => state.lakes)
	const { YEAR, VOLUME, dataType, DAY, PERIOD } = useSelector(
		(state) => state.form
	)
	const dispatch = useDispatch()

	useEffect(() => {
		if (DAY) {
			setObsDepth(DurationTypes.DAY)
		}
		if (PERIOD) {
			setObsDepth(DurationTypes.PERIOD)
		}
	}, [DAY, PERIOD])

	useEffect(() => {
		if (!activeLakes.length) {
			setDataSelection([])
			return
		}
		if (!YEAR && dataLakes[activeLakes.at(-1).id]?.[dataType]?.[obsDepth]) {
			setDataSelection(activeLakes)
		}
		if (YEAR) {
			setDataSelection(Object.values(activeYears))
		}
		if (!yearsVisible) {
			setDataSelection([])
		}
	}, [YEAR, activeLakes, activeYears, data, dataLakes, yearsVisible])

	const clearSelection = useCallback(() => {
		if (!YEAR) {
			dispatch(clearActiveLakes())
		}
		if (YEAR) {
			dispatch(clearActiveYears())
		}
	}, [dispatch, YEAR])

	return {
		dataSelection,
		clearSelection,
		VOLUME,
	}
}
