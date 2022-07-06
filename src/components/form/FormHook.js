import { AppConfig } from "@/config"
import { useSelector } from "react-redux"
export default function useFormHook() {
  const form = useSelector(state => state.form)

  const dataTypesValues = AppConfig.attributes
  const observationTypesValues = AppConfig.observationTypes
  const durationValues = AppConfig.duration
  const chartTypesValues = AppConfig.chartTypes
 const compareTypesValues = AppConfig.compareTypes
 return {
   dataTypesValues,
   compareTypesValues,
   observationTypesValues,
   durationValues,
   form,
   chartTypesValues,
 }
}
