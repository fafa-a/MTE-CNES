/* eslint-disable no-undef */
import { AppConfig } from "@/config"
import { useSelector } from "react-redux"
import { saveAs } from "file-saver"



export default function useFormHook() {
	const form = useSelector((state) => state.form)
	const { activeLakes } = useSelector((state) => state.lakes)

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
			saveAs(
				img[0].toDataURL("image/png"),
				`${filenameLakes}_${form.dataType.toLowerCase()}_chart.png`
			)
		},
		[filenameLakes, form.dataType]
	)

	return {
		dataTypesValues,
		modeTypesValues,
		observationTypesValues,
		durationValues,
		form,
		chartTypesValues,
		downloadChartImage,
	}
}
