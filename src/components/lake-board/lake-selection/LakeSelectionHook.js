import { desactiveLake, setCoordinatesLakeToCenter } from "@stores/lakesSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

export const useLakeSelectionHook = (id, coordinates, indexColor) => {
  const [bgOptic, setBgOptic] = useState({})
  const [bgRadar, setBgRadar] = useState({})
  const dispatch = useDispatch()
  const chartOptions = useSelector(state => state.chart)
  const { dataType } = useSelector(state => state.form)

  useEffect(() => {
    setBgOptic({
      backgroundColor:
        chartOptions[dataType].style.OPTIC[indexColor].backgroundColor,
    })
    setBgRadar({
      backgroundColor:
        chartOptions[dataType].style.RADAR[indexColor].backgroundColor,
    })
  }, [dataType])

  const handleClickDesactiveLake = useCallback(() => {
    dispatch(desactiveLake({ lakeId: id }))
  })

  const sendCoordinates = useCallback(() => {
    dispatch(setCoordinatesLakeToCenter({ coordinates }))
  }, [coordinates])

  return {
    handleClickDesactiveLake,
    sendCoordinates,
    bgOptic,
    bgRadar,
  }
}
export default useLakeSelectionHook
