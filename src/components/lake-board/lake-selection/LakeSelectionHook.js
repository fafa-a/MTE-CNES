import {
  desactiveLake,
  setCoordinatesLakeToCenter,
  toggleLakeChartVisibility,
} from "@stores/lakesSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

export const useLakeSelectionHook = (id, coordinates, index) => {
  const [bgOptic, setBgOptic] = useState({})
  const [bgRadar, setBgRadar] = useState({})
  const [isVisible, setIsVisible] = useState(true)
  const dispatch = useDispatch()
  const chartOptions = useSelector(state => state.chart)
  const { dataType } = useSelector(state => state.form)

  const { activeLakes } = useSelector(state => state.lakes)

  useEffect(() => {
    activeLakes
      .filter(lake => lake.id === id)
      .map(lake => {
        setIsVisible(lake.chartVisible)
      })
  }, [activeLakes])

  useEffect(() => {
    setBgOptic({
      backgroundColor:
        chartOptions[dataType].style.OPTIC[index].backgroundColor,
    })
    setBgRadar({
      backgroundColor:
        chartOptions[dataType].style.RADAR[index].backgroundColor,
    })
  }, [dataType])

  const handleClickDesactiveLake = useCallback(() => {
    dispatch(desactiveLake({ lakeId: id }))
  })

  const sendCoordinates = useCallback(() => {
    dispatch(setCoordinatesLakeToCenter({ coordinates }))
  }, [coordinates])

  const toggleChartVisibilty = useCallback(() => {
    dispatch(toggleLakeChartVisibility({ lakeId: id }))
  })

  return {
    toggleChartVisibilty,
    handleClickDesactiveLake,
    sendCoordinates,
    bgOptic,
    bgRadar,
    isVisible,
  }
}
export default useLakeSelectionHook
