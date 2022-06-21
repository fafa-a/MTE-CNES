import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addChartData } from "@stores/chartSlice"
import { AppConfig, SeriePathUtils } from "@/config"
import { dsv } from "d3"

export function useAppHook() {
  const [lakeId, setLakeId] = useState(null)

  const form = useSelector(state => state.form)
  const lakes = useSelector(state => state.lakes)
  const chart = useSelector(state => state.chart)

  const { OPTIC, RADAR, DAY, PERIOD, dataType } = form
  const { getSeriePath } = SeriePathUtils

  const getIdSwot = idSwot => {
    setLakeId(idSwot)
  }
  useEffect(() => {
    console.log(AppConfig.attributes)
    const seriePath = getSeriePath(
      lakeId,
      AppConfig.attributes[dataType].filePath,
      AppConfig.observationTypes.OPTIC.abbr,
      AppConfig.duration.PERIOD.abbr
    )
    console.log(seriePath)
  }, [lakeId])

  // const dispatch = useDispatch()
  // const { idSwot, name } = lakes.lake

  // const activeObsTypeName = Object.entries(form.observationTypes)
  //   .filter(([, value]) => value.active)
  //   .map(([key]) => key)

  // const {
  //   observationTypes,
  //   observationDurations,
  //   attributes: { value: attr },
  // } = form

  // const { chartData } = chart.chart

  // useEffect(() => {
  //   if (idSwot !== "") {
  //     handleFileURL(attr)
  //   }
  // }, [idSwot])

  // useEffect(async () => {
  //   const data = await Promise.resolve(handleCSVData())
  //   const dataSorted = [...data].sort((a, b) => (a.length > b.length ? -1 : 1))

  //   if (JSON.stringify(data) !== JSON.stringify(dataSorted)) {
  //     setObsTypes(["radar", "optic"])
  //   }

  //   setDataCSV(dataSorted)
  //   if (!JSON.stringify(chartData).includes(JSON.stringify(dataSorted))) {
  //     setDataCSV(dataSorted)
  //   }
  // }, [fileURL])

  // useEffect(() => {
  //   if (dataCSV.length > 0) {
  //     dispatch({
  //       type: `${addChartData}`,
  //       payload: {
  //         chartData: dataCSV,
  //         lakeName: name,
  //         observationType: activeObsTypeName,
  //       },
  //     })
  //   }
  // }, [dataCSV])

  // const handleFileURL = attr => {
  //   const urlArrTmp = []
  //   const activeObsType = Object.entries(observationTypes).filter(
  //     ([, { active }]) => active
  //   )
  //   const activeObsDur = Object.entries(observationDurations).filter(
  //     ([, { active }]) => active
  //   )

  //   const duration = activeObsDur.map(([, { value }]) => value)

  //   for (let [, { value: obs }] of activeObsType) {
  //     const url = SeriePathUtils.getSeriePath(idSwot, attr, obs, duration)
  //     urlArrTmp.push(url)
  //   }

  //   setFileURL(urlArrTmp)
  // }

  // const handleCSVData = async () => {
  //   const data = []
  //   for (const url of fileURL) {
  //     const csv = await dsv(";", url)
  //     data.push(csv)
  //   }
  //   return data
  // }
  return { getIdSwot }
}
