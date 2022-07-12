import {
  desactiveLake,
  setCoordinatesLakeToCenter,
  toggleLakeChartVisibility,
  setSelectedLake,
} from "@stores/lakesSlice"
import { useDispatch, useSelector } from "react-redux"

export const useLakeSelectionHook = (id, coordinates, index) => {
  const [bgOptic, setBgOptic] = useState({})
  const [bgRadar, setBgRadar] = useState({})
  const [bgReference, setBgReference] = useState({})
  const [year, setYear] = useState([])
  const [isVisible, setIsVisible] = useState(true)
  const [isSelected, setIsSelected] = useState(false)
  const dispatch = useDispatch()
  const chartOptions = useSelector(state => state.chart)
  const { dataType, OPTIC, RADAR, YEAR } = useSelector(state => state.form)

  const { activeLakes, data } = useSelector(state => state.lakes)

  useEffect(() => {
    setlakeIconsOptions()
  }, [])

  const setlakeIconsOptions = useCallback(() => {
    activeLakes
      .filter(lake => lake.id === id)
      .map(lake => {
        setIsVisible(lake.chartVisible)
        setIsSelected(lake.selected)
      })
  }, [activeLakes, id])

  useEffect(() => {
    if (!YEAR) {
      setBgOptic({
        backgroundColor:
          chartOptions[dataType].style.OPTIC[index].backgroundColor,
      })
      setBgRadar({
        backgroundColor:
          chartOptions[dataType].style.RADAR[index].backgroundColor,
      })
    }
  }, [dataType])

  useEffect(() => {
    if (!YEAR) return
  }, [index])

  useEffect(() => {
    console.log({ index, year })
  }, [year])

  useEffect(() => {
    if (!data[activeLakes[0].id]) return
    if (data[activeLakes[0].id][dataType].byYear[0]) {
      const yearData = Object.keys(
        data[activeLakes[0].id][dataType].byYear[0]
      ).map(year => `x${year}`)
      setYear(yearData)
    }
  }, [data])

  useEffect(() => {
    if (!year.length) return
    setBgOptic({
      backgroundColor:
        chartOptions.YEAR.style[year[index]].OPTIC.backgroundColor,
    })
    setBgRadar({
      backgroundColor:
        chartOptions.YEAR.style[year[index]].RADAR.backgroundColor,
    })
    setBgReference({
      backgroundColor:
        chartOptions.YEAR.style[year[index]].REFERENCE.backgroundColor,
    })
  }, [year])

  const handleClickDesactiveLake = useCallback(() => {
    dispatch(desactiveLake({ lakeId: id }))
  })

  const toggleSelectedLake = useCallback(() => {
    dispatch(setCoordinatesLakeToCenter({ lakeId: id, coordinates }))
    dispatch(setSelectedLake({ lakeId: id }))
  }, [id])

  const toggleChartVisibilty = useCallback(() => {
    dispatch(toggleLakeChartVisibility({ lakeId: id }))
  })

  return {
    toggleChartVisibilty,
    handleClickDesactiveLake,
    bgOptic,
    bgRadar,
    isVisible,
    toggleSelectedLake,
    isSelected,
    OPTIC,
    RADAR,
    year,
  }
}
export default useLakeSelectionHook
