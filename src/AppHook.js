import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updateActiveLakes, addLake, desactiveLake } from "./stores/lakesSlice"

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

  const { OPTIC, RADAR, DAY, PERIOD, dataType, charType } = form
  const { getSeriePath } = SeriePathUtils
  const dispatch = useDispatch()

  const removeLakeActive = id => {
    dispatch(desactiveLake({ lakeId: id }))
  }

  const getSeriePathByDay = (id, name) => {
    const arrTmp = []
    if (OPTIC && DAY) {
      const path = handleSeriePath(
        id,
        name,
        dataType,
        ObservationTypes.OPTIC,
        DurationTypes.DAY
      )
      arrTmp.push(path)
    }

    if (RADAR && DAY) {
      const path = handleSeriePath(
        id,
        name,
        dataType,
        ObservationTypes.RADAR,
        DurationTypes.DAY
      )
      arrTmp.push(path)
    }

    return arrTmp
  }

  const getSeriePathByPeriod = (id, name) => {
    const arrTmp = []
    if (OPTIC && PERIOD) {
      const path = handleSeriePath(
        id,
        name,
        dataType,
        ObservationTypes.OPTIC,
        DurationTypes.PERIOD
      )
      arrTmp.push(path)
    }

    if (RADAR && PERIOD) {
      const path = handleSeriePath(
        id,
        name,
        dataType,
        ObservationTypes.RADAR,
        DurationTypes.PERIOD
      )
      arrTmp.push(path)
    }

    return arrTmp
  }

  useEffect(() => {
    if (lakes.activeLakes.length === 0) return
    const seriePathTmp = []
    lakes.activeLakes
      .map(lake => {
        return { id: lake.id, name: lake.name }
      })
      .forEach(lake => {
        const seriePathByday = getSeriePathByDay(lake.id, lake.name)
        const seriePathByPeriod = getSeriePathByPeriod(lake.id, lake.name)
        seriePathTmp.push([...seriePathByday, ...seriePathByPeriod])
      })
    setSeriePath(seriePathTmp)

    setPrevDatatype(dataType)
  }, [dataType, OPTIC, RADAR, DAY, PERIOD, charType, lakes.activeLakes])

  useEffect(() => {
    console.log({ lakes })
  }, [lakes])

  const handleSeriePath = (id, name, dataType, obs, duration) => {
    if (!id) return
    const lakeName = name.replace(/\s/g, "_")
    const path = getSeriePath(
      id,
      lakeName,
      AppConfig.attributes[dataType].filePath,
      AppConfig.observationTypes[obs].abbr,
      AppConfig.duration[duration].abbr
    )
    return path
  }

  const fetchData = useCallback(async () => {
    const arrTmp = []
    for (const lake of seriePath) {
      const dataTmp = []
      for (const path of lake) {
        const data = await csv(path)
        dataTmp.push(data)
      }
      arrTmp.push([dataTmp])
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
    if (!lakeData.length) return
    lakeData.forEach(([data], index) => {
      dispatch(
        addLake({
          lakeId: lakes.activeLakes[index].id,
          dataType,
          lakeData: data,
        })
      )
    })
  }, [lakeData])

  return { removeLakeActive }
}
