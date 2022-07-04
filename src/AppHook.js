import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { activeLake, addLake, desactiveLake } from "./stores/lakesSlice"

import {
  AppConfig,
  SeriePathUtils,
  ObservationTypes,
  DurationTypes,
} from "./config"
import { csv } from "d3"

export function useAppHook() {
  const [lakeInfo, setLakeInfo] = useState({
    id: "",
    name: "",
    coord: [],
  })
  const [seriePath, setSeriePath] = useState([])
  const [lakeData, setLakeData] = useState([])
  const [prevDatatype, setPrevDatatype] = useState(null)
  const form = useSelector(state => state.form)
  const lakes = useSelector(state => state.lakes)

  const { OPTIC, RADAR, DAY, PERIOD, dataType } = form
  const { getSeriePath } = SeriePathUtils
  const dispatch = useDispatch()

  const getLakeIdSwotName = ({ id, name, coord }) => {
    setLakeInfo({
      id,
      name,
      coord,
    })
  }

  const removeLakeActive = id => {
    dispatch(desactiveLake({ lakeId: id }))
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
    if (!lakeInfo.id) return
    if (lakes.loadedLakes.includes(lakeInfo.id)) {
      dispatch(
        activeLake({
          lakeId: lakeInfo.id,
          lakeName: lakeInfo.name,
          lakeCoord: lakeInfo.coord,
        })
      )
    }
    if (!lakes.loadedLakes.includes(lakeInfo.id) && prevDatatype !== dataType) {
      const seriePathByday = getSeriePathByDay()
      const seriePathByPeriod = getSeriePathByPeriod()
      setSeriePath([...seriePathByday, ...seriePathByPeriod])
    }

    const seriePathByday = getSeriePathByDay()
    const seriePathByPeriod = getSeriePathByPeriod()
    setSeriePath([...seriePathByday, ...seriePathByPeriod])

    setPrevDatatype(dataType)
  }, [dataType, OPTIC, RADAR, DAY, PERIOD, lakeInfo.id])

  const handleSeriePath = (dataType, obs, duration) => {
    const lakeName = lakeInfo.name.replace(/\s/g, "_")
    const path = getSeriePath(
      lakeInfo.id,
      lakeName,
      AppConfig.attributes[dataType].filePath,
      AppConfig.observationTypes[obs].abbr,
      AppConfig.duration[duration].abbr
    )
    return path
  }

  const fetchData = useCallback(async () => {
    const arrTmp = []
    for (const path of seriePath) {
      const data = await csv(path)
      arrTmp.push(data)
    }
    return arrTmp
  }, [seriePath])

  const handleFetchData = useCallback(async () => {
    const data = await fetchData()
    setLakeData(data)
  }, [fetchData])

  useEffect(() => {
    handleFetchData()
  }, [fetchData])

  useEffect(() => {
    if (!lakeInfo.id) return
    dispatch(
      addLake({
        lakeId: lakeInfo.id,
        dataType,
        lakeData,
        lakeName: lakeInfo.name,
        lakeCoord: lakeInfo.coord,
      })
    )
  }, [lakeData])

  return { getLakeIdSwotName, removeLakeActive }
}
