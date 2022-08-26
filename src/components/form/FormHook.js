/* eslint-disable no-undef */
import { AppConfig } from "@/config"
import { useSelector, useDispatch } from "react-redux"
import { saveAs } from "file-saver"
import { useCallback } from "react"
import { handleResetZoom } from "../../stores/chartSlice"
export default function useFormHook({ canvas }) {
	const form = useSelector((state) => state.form)
	const { activeLakes } = useSelector((state) => state.lakes)

	const dispatch = useDispatch()
	const filenameLakes = activeLakes.map((lake) => lake.name).join("_")
	const dataTypesValues = AppConfig.attributes
	const observationTypesValues = AppConfig.observationTypes
	const durationValues = AppConfig.duration
	const chartTypesValues = AppConfig.chartTypes
	const modeTypesValues = AppConfig.modeTypes

	const downloadChartImage = useCallback((e) => {
		e.preventDefault()
		const dataURL = canvas.toDataURL("image/png")
		if (dataURL) {
			try {
				saveAs(
					dataURL,
					`${filenameLakes}_${form.dataType.toLowerCase()}_chart.png`
				)
			} catch (error) {
				console.error(error)
			}
		}
	}, [])

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
