import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addChartData } from "@stores/chartSlice"
import {
  AppConfig,
  SeriePathUtils,
  ObservationTypes,
  DurationTypes,
} from "@/config"

export function useAppHook() {
  const [lakeId, setLakeId] = useState(null)
  const [seriePath, setSeriePath] = useState([])
  const form = useSelector(state => state.form)
  const lakes = useSelector(state => state.lakes)
  const chart = useSelector(state => state.chart)

  const { OPTIC, RADAR, DAY, PERIOD, dataType } = form
  const { getSeriePath } = SeriePathUtils

  const getIdSwot = idSwot => {
    setLakeId(idSwot)
  }

  const getSeriePathByDay = () => {
    const arrTmp = []
    if (OPTIC && DAY) {
      const path = handleSeriePath(
        dataType,
        ObservationTypes.OPTIC,
        DurationTypes.DAY
      )
      arrTmp.push(path)
    }

    if (RADAR && DAY) {
      const path = handleSeriePath(
        dataType,
        ObservationTypes.RADAR,
        DurationTypes.DAY
      )
      arrTmp.push(path)
    }

    return arrTmp
  }

  const getSeriePathByPeriod = () => {
    const arrTmp = []
    if (OPTIC && PERIOD) {
      const path = handleSeriePath(
        dataType,
        ObservationTypes.OPTIC,
        DurationTypes.PERIOD
      )
      arrTmp.push(path)
    }

    if (RADAR && PERIOD) {
      const path = handleSeriePath(
        dataType,
        ObservationTypes.RADAR,
        DurationTypes.PERIOD
      )
      arrTmp.push(path)
    }

    return arrTmp
  }

  useEffect(() => {
    if (!lakeId) return
    const seriePathByday = getSeriePathByDay()
    const seriePathByPeriod = getSeriePathByPeriod()
    setSeriePath([...seriePathByday, ...seriePathByPeriod])
    setLakeId(null)
  }, [lakeId, OPTIC, RADAR, DAY, PERIOD])

  const handleSeriePath = (dataType, obs, duration) => {
    const path = getSeriePath(
      lakeId,
      AppConfig.attributes[dataType].filePath,
      AppConfig.observationTypes[obs].abbr,
      AppConfig.duration[duration].abbr
    )
    return path
  }

  return { getIdSwot }
}
