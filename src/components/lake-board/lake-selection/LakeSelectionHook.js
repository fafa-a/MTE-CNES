/* eslint-disable no-undef */
import {
  desactiveLake,
  setCoordinatesLakeToCenter,
  toggleLakeChartVisibility,
  setSelectedLake,
  toggleYearsChartVisibility,
  toggleYearSelection,
} from "@stores/lakesSlice"
import { saveAs } from "file-saver"
import { useDispatch, useSelector } from "react-redux"

export const useLakeSelectionHook = ({ id, coordinates, index }) => {
  const [bgOptic, setBgOptic] = useState({})
  const [bgRadar, setBgRadar] = useState({})
  const [bgReference, setBgReference] = useState({})
  const [year, setYear] = useState([])
  const [isVisible, setIsVisible] = useState(true)
  const [isSelected, setIsSelected] = useState(false)
  const dispatch = useDispatch()
  const chartOptions = useSelector(state => state.chart)
  const { dataType, OPTIC, RADAR, YEAR, REFERENCE } = useSelector(
    state => state.form
  )

  const { activeLakes, data, activeYears } = useSelector(state => state.lakes)
  const setlakeIconsOptions = useCallback(() => {
    if (!YEAR) {
      activeLakes
        .filter(lake => lake.id === id)
        .map(lake => {
          setIsVisible(lake.chartVisible)
          setIsSelected(lake.selected)
        })
    }
    if (YEAR) {
      Object.values(activeYears).map(year => {
        if (year.id === id) {
          setIsVisible(year.chartVisible)
          setIsSelected(year.selected)
        }
      })
    }
  }, [YEAR, activeLakes, activeYears, id])

  useEffect(() => {
    setlakeIconsOptions()
  }, [setlakeIconsOptions])

  useEffect(() => {
    if (YEAR) return
    setBgOptic({
      backgroundColor:
        chartOptions[dataType].style.OPTIC[index].backgroundColor,
    })
    setBgRadar({
      backgroundColor:
        chartOptions[dataType].style.RADAR[index].backgroundColor,
    })
    setBgReference({
      backgroundColor:
        chartOptions[dataType].style.REFERENCE[index].backgroundColor,
    })
  }, [YEAR, chartOptions, dataType, index])

  useEffect(() => {
    if (!YEAR) return
    if (!data[activeLakes[0].id]) return
    if (data[activeLakes[0].id][dataType].byYear[0]) {
      const yearData = Object.keys(activeYears).map(year => `x${year}`)
      setYear(yearData)
    }
  }, [YEAR, activeLakes, activeYears, data, dataType])

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
  }, [year, index, chartOptions.YEAR.style])

  const handleClickDesactiveLake = useCallback(() => {
    dispatch(desactiveLake({ lakeId: id }))
  }, [dispatch, id])

  const toggleSelectedLake = useCallback(() => {
    if (!YEAR) {
      dispatch(setCoordinatesLakeToCenter({ lakeId: id, coordinates }))
      dispatch(setSelectedLake({ lakeId: id }))
    }
    if (YEAR) {
      dispatch(toggleYearSelection({ yearId: id }))
    }
  }, [YEAR, coordinates, dispatch, id])

  const toggleChartVisibilty = useCallback(() => {
    if (!YEAR) {
      dispatch(toggleLakeChartVisibility({ lakeId: id }))
    }
    if (YEAR) {
      dispatch(toggleYearsChartVisibility({ yearId: id }))
    }
  }, [YEAR, dispatch, id])

  const handleDownloadFile = useCallback(() => {
    for (const path of data[id][dataType].seriePath) {
      const fileName = path.split("/").pop().split(".")[0]
      saveAs(path, fileName)
    }
  }, [data, id, dataType])

  return {
    toggleChartVisibilty,
    handleClickDesactiveLake,
    handleDownloadFile,
    bgOptic,
    bgRadar,
    isVisible,
    toggleSelectedLake,
    isSelected,
    OPTIC,
    RADAR,
    REFERENCE,
    bgReference,
    YEAR,
    activeLakes,
  }
}
