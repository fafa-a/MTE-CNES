import { AppConfig } from "@/config"
import { useSelector } from "react-redux"
export default function useFormHook() {
  const form = useSelector(state => state.form)
  const dataTypesValues = AppConfig.attributes
  // .map(
  //   ([attributes, properties]) => {
  //     const { label, filePath } = properties
  //     return {
  //       id: attributes,
  //       filePath,
  //       label,
  //       actionReducers: "attributes",
  //     }
  //   }
  // )

  const observationTypesValues = AppConfig.observationTypes
  // .map(
  //   ([observationTypes, properties]) => {
  //     const { abbr, label } = properties
  //     return {
  //       id: observationTypes,
  //       abbr,
  //       label,
  //       actionReducers: "observationTypes",
  //     }
  //   }
  // )

  const durationValues = AppConfig.duration
  // .map(
  //   ([duration, properties]) => {
  //     const { abbr, label } = properties
  //     return {
  //       id: duration,
  //       abbr,
  //       label,
  //       actionReducers: "duration",
  //     }
  //   }
  // )

  return {
    dataTypesValues,
    observationTypesValues,
    durationValues,
    form,
  }
}
