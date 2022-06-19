import { config } from "@/config"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addChartData } from "@stores/chartSlice"

import { dsv } from "d3"

//const attributes = Object.keys(config.attributes)
//const observationTypes = Object.keys(config.observationTypes)
//const durations = Object.keys(config.duration)

export function useAppHook() {
  const [fileURL, setFileURL] = useState([])
  const form = useSelector(state => state.form)
  const lakes = useSelector(state => state.lakes)
  const chart = useSelector(state => state.chart)
  const dispatch = useDispatch()
  const { idSwot, name } = lakes.lake

  const activeObsTypeName = Object.entries(form.observationTypes)
    .filter(([key, value]) => value.active)
    .map(([key, value]) => key)

  const {
    observationTypes,
    observationDurations,
    attributes: { value: attr },
  } = form

  useEffect(() => {
    if (idSwot !== "") {
      handleFileURL(attr)
    }
  }, [idSwot])

  useEffect(() => {
    for (const url of fileURL) {
      handleChartData(url)
    }
  }, [fileURL])

  const handleFileURL = attr => {
    const urlArrTmp = []
    const activeObsType = Object.entries(observationTypes).filter(
      ([, { active }]) => active
    )
    const activeObsDur = Object.entries(observationDurations).filter(
      ([, { active }]) => active
    )

    const duration = activeObsDur.map(([, { value }]) => value)

    for (let [, { value: obs }] of activeObsType) {
      const url = `${config.baseDir}${idSwot}/${idSwot}${config.delimitter}${attr}${config.delimitter}${obs}${duration}.csv`
      urlArrTmp.push(url)
    }

    setFileURL(urlArrTmp)
  }

  const handleChartData = async url => {
    const data = await dsv(";", url)

    dispatch({
      type: `${addChartData}`,
      payload: {
        chartData: data,
        lakeName: name,
        observationType: activeObsTypeName,
      },
    })
  }
}
