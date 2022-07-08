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
  const [seriePath, setSeriePath] = useState([])
  const [lakeData, setLakeData] = useState([])
  const [dataReference, setDataReference] = useState([])
  const [lakeDataWithReference, setLakeDataWithReference] = useState([])
  const [tmpFillingRateReference, setTmpFillingRateReference] = useState([])
  const [fillingRateReference, setFillingRateReference] = useState([])
  const [surfaceReference, setSurfaceReference] = useState([])
  const [volumeReference, setVolumeReference] = useState([])
  const form = useSelector(state => state.form)
  const lakes = useSelector(state => state.lakes)

  const { OPTIC, RADAR, DAY, PERIOD, REFERENCE, dataType, charType } = form
  const { getSeriePath, getTimeseriesPath } = SeriePathUtils
  const dispatch = useDispatch()

  const removeLakeActive = id => {
    dispatch(desactiveLake({ lakeId: id }))
  }

  useEffect(() => {
    console.log({ lakes })
  }, [lakes])

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
        const referencePath = getTimeseriesPath(lake.id, "andalousie")
        seriePathTmp.push([
          ...seriePathByday,
          ...seriePathByPeriod,
          referencePath,
        ])
      })
    if (JSON.stringify(seriePathTmp) === JSON.stringify(seriePath)) return
    setSeriePath(seriePathTmp)
  }, [
    dataType,
    OPTIC,
    RADAR,
    DAY,
    PERIOD,
    charType,
    REFERENCE,
    lakes.activeLakes,
  ])

  useEffect(() => {
    if (!lakeData?.length) return
    const dataRefDateFiltered = []
    lakeData.forEach(lake => {
      dataRefDateFiltered.push(
        lake[0]
          .at(-1)
          .filter(
            data =>
              data.hour === "00:00:00" &&
              data.date >= "2018-01-01" &&
              data.date <= "2020-12-31"
          )
      )
    })
    setDataReference(dataRefDateFiltered)
  }, [lakeData])

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

  useEffect(() => {
    console.log({ seriePath })
  }, [seriePath])

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

    const surfaceRef = dataReference.map(lake => {
      return lake.map(data => {
        return {
          date: data.date,
          value: data.area,
        }
      })
    })

    const volumeRef = dataReference.map(lake => {
      return lake.map(data => {
        return {
          date: data.date,
          value: data.volume,
        }
      })
    })

    const fillingRateRef = dataReference.map(lake => {
      return lake.map(data => {
        return {
          date: data.date,
          value: data.level,
        }
      })
    })
    setSurfaceReference(surfaceRef)
    setVolumeReference(volumeRef)
    setTmpFillingRateReference(volumeRef)
  }, [dataReference])

  const calculateFillingRate = useCallback(() => {
    const rateRef = tmpFillingRateReference.map(days => {
      const max = days.reduce((acc, curr) => {
        return acc.value > curr.value ? acc : curr
      }, 0)
      return max.value
    })
    return rateRef
  })

  useEffect(() => {
    if (!tmpFillingRateReference.length) return
    const rateRef = calculateFillingRate()
    const fillingRateTmp = []
    tmpFillingRateReference.map((lake, index) => {
      fillingRateTmp.push(
        lake.map(data => {
          return {
            date: data.date,
            value: (data.value / rateRef[index]) * 100,
          }
        })
      )
    })
    setFillingRateReference(fillingRateTmp)
  }, [tmpFillingRateReference])

  useEffect(() => {
    if (!lakeData.length) return
    if (
      dataType === DataTypes.FILLING_RATE &&
      fillingRateReference.length !== lakeData.length
    )
      return
    const arrTmp = []
    lakeData.forEach((lake, index) => {
      let data = []

      if (!OPTIC || !RADAR) {
        data = [lake[0][0]]
      }

      if (OPTIC && RADAR) {
        data = [lake[0][0], lake[0][1]]
      }

      if (dataType === DataTypes.FILLING_RATE && REFERENCE) {
        data = [...data, fillingRateReference[index]]
      }
      if (dataType === DataTypes.SURFACE && REFERENCE) {
        data = [...data, surfaceReference[index]]
      }
      if (dataType === DataTypes.VOLUME && REFERENCE) {
        data = [...data, volumeReference[index]]
      }
      arrTmp.push(data)
    })
    setLakeDataWithReference(arrTmp)
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
    if (dataType === DataTypes.FILLING_RATE && !fillingRateReference.length)
      return
    lakeDataWithReference.forEach((data, index) => {
      dispatch(
        addLake({
          lakeId: lakes.activeLakes[index].id,
          dataType,
          lakeData: data,
        })
      )
    })
  }, [lakeDataWithReference])

  return { removeLakeActive }
}
