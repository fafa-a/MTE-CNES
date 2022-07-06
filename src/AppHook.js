import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updateActiveLakes, addLake, desactiveLake } from "./stores/lakesSlice"

import {
  AppConfig,
  SeriePathUtils,
  ObservationTypes,
  DurationTypes,
  DataTypes,
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
  const [dataReference, setDataReference] = useState([])
  const [lakeDataWithReference, setLakeDataWithReference] = useState([])
  const [tmpFillingRateReference, setTmpFillingRateReference] = useState([])
  const [fillingRateReference, setFillingRateReference] = useState([])
  const [surfaceReference, setSurfaceReference] = useState([])
  const [volumeReference, setVolumeReference] = useState([])
  const [prevDatatype, setPrevDatatype] = useState(null)
  const form = useSelector(state => state.form)
  const lakes = useSelector(state => state.lakes)

  const { OPTIC, RADAR, DAY, PERIOD, dataType, charType } = form
  const { getSeriePath, getTimeseriesPath } = SeriePathUtils
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
    const seriePathString = JSON.stringify(seriePath)
    lakes.activeLakes
      .map(lake => {
        return { id: lake.id, name: lake.name }
      })
      .forEach(lake => {
        const seriePathByday = getSeriePathByDay(lake.id, lake.name)
        const seriePathByPeriod = getSeriePathByPeriod(lake.id, lake.name)
        const referencePath = getTimeseriesPath(lake.id, "andalousie")
        seriePathTmp.push([
          ...seriePathByday,
          ...seriePathByPeriod,
          referencePath,
        ])
      })
    if (seriePathString !== JSON.stringify(seriePathTmp)) {
      setSeriePath(seriePathTmp)
    }
    setPrevDatatype(dataType)
  }, [dataType, OPTIC, RADAR, DAY, PERIOD, charType, lakes.activeLakes])

  useEffect(() => {
    if (!lakeData?.length) return
    lakeData.forEach((lake, index) => {
      setDataReference(
        lake[0]
          .at(-1)
          .filter(
            data =>
              data.hour === "00:00:00" &&
              data.date >= "2018-01-01" &&
              data.date <= "2021-01-01"
          )
      )
    })
  }, [lakeData])

  useEffect(() => {
    console.log({ form })
  }, [form])

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

  useEffect(() => {
    if (!dataReference.length) return

    const surfaceRef = dataReference.map(data => {
      return {
        date: data.date,
        value: data.area,
      }
    })

    const volumeRef = dataReference.map(data => {
      return {
        date: data.date,
        value: data.volume,
      }
    })

    const fillingRateRef = dataReference.map(data => {
      return {
        date: data.date,
        value: data.level,
      }
    })

    setSurfaceReference(surfaceRef)
    setVolumeReference(volumeRef)
    setTmpFillingRateReference(fillingRateRef)
  }, [dataReference])

  const calculateFillingRate = useCallback(() => {
    const rateRef =
      tmpFillingRateReference
        .map(data => Number(data.value))
        .reduce((acc, curr) => acc + curr) / tmpFillingRateReference.length
    return rateRef
  })

  useEffect(() => {
    if (!tmpFillingRateReference.length) return
    const rateRef = calculateFillingRate()
    const fillingRateValues = tmpFillingRateReference.map(data => {
      return {
        date: data.date,
        value: (data.value / rateRef) * 100,
      }
    })

    setFillingRateReference(fillingRateValues)
  }, [tmpFillingRateReference])

  useEffect(() => {
    if (!lakeData.length) return
    if (dataType === DataTypes.FILLING_RATE && !fillingRateReference.length)
      return
    lakeData.forEach((lake, index) => {
      if (dataType === DataTypes.FILLING_RATE) {
        setLakeDataWithReference([
          ...lakeDataWithReference,
          [lake[0][0], lake[0][1], fillingRateReference],
        ])
      }
      if (dataType === DataTypes.SURFACE) {
        setLakeDataWithReference([[lake[0][0], lake[0][1], surfaceReference]])
      }
      if (dataType === DataTypes.VOLUME) {
        setLakeDataWithReference([[lake[0][0], lake[0][1], volumeReference]])
      }
    })
  }, [surfaceReference, volumeReference, fillingRateReference])

  const handleFetchData = useCallback(async () => {
    const data = await fetchData()
    setLakeData(data)
  }, [fetchData])

  useEffect(() => {
    handleFetchData()
  }, [fetchData])

  useEffect(() => {
    if (!lakeData) return
    console.log({ lakeDataWithReference })

    lakeDataWithReference.forEach((lake, index) => {
      if (!lake[2].length) return
      dispatch(
        addLake({
          lakeId: lakes.activeLakes[index].id,
          dataType,
          lakeData: lake,
        })
      )
    })
  }, [lakeDataWithReference])

  return { removeLakeActive }
}
