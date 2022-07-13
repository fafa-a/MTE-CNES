import { AppConfig } from "@/config"
import { useSelector } from "react-redux"
import { saveAs } from "file-saver"

export default function useFormHook() {
  const form = useSelector(state => state.form)
  const { activeLakes } = useSelector(state => state.lakes)

  const filenameLakes = activeLakes.map(lake => lake.name).join("_")
  const dataTypesValues = AppConfig.attributes
  const observationTypesValues = AppConfig.observationTypes
  const durationValues = AppConfig.duration
  const chartTypesValues = AppConfig.chartTypes
  const compareTypesValues = AppConfig.compareTypes

  const downloadChartImage = useCallback(e => {
    e.preventDefault()
    const img = document.getElementsByTagName("canvas")
    saveAs(
      img[1].toDataURL("image/png"),
      `${filenameLakes}_${form.dataType.toLowerCase()}_chart.png`
    )
  })

  return {
    dataTypesValues,
    compareTypesValues,
    observationTypesValues,
    durationValues,
    form,
    chartTypesValues,
    downloadChartImage,
  }
}
