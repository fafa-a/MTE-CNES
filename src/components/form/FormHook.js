/* eslint-disable no-undef */
import { AppConfig } from "@/config"
import { useSelector, useDispatch } from "react-redux"
import { saveAs } from "file-saver"
import { useCallback } from "react"
import { handleResetZoom } from "../../stores/chartSlice"
export default function useFormHook() {
	const form = useSelector((state) => state.form)
	const { activeLakes } = useSelector((state) => state.lakes)

	const dispatch = useDispatch()
	const filenameLakes = activeLakes.map((lake) => lake.name).join("_")
	const dataTypesValues = AppConfig.attributes
	const observationTypesValues = AppConfig.observationTypes
	const durationValues = AppConfig.duration
	const chartTypesValues = AppConfig.chartTypes
	const modeTypesValues = AppConfig.modeTypes

	const downloadChartImage = useCallback(
		(e) => {
			e.preventDefault()
			const img = document.getElementsByTagName("canvas")
			if (img[1]) {
				saveAs(
					img[1].toDataURL("image/png"),
					`${filenameLakes}_${form.dataType.toLowerCase()}_chart.png`
				)
			}
		},
		[filenameLakes, form.dataType]
	)

	const resetZoomChart = useCallback((e) => {
		e.preventDefault()
		dispatch(handleResetZoom({ zoom: true }))
	}, [])

	return {
		resetZoomChart,
		dataTypesValues,
		modeTypesValues,
		observationTypesValues,
		durationValues,
		form,
		chartTypesValues,
		downloadChartImage,
	}
}
