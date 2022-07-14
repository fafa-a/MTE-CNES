/* eslint-disable no-undef */
import { useMap } from "react-leaflet"
import { useSelector, useDispatch } from "react-redux"
import { updateActiveLakes } from "@/stores/lakesSlice"

export default function usePolygonLayerHook() {
  const [id, setId] = useState(null)
  const [color, setColor] = useState("blue")
  const [coordinates, setCoordinates] = useState([])
  const { coordinatesLakeToCenter } = useSelector(state => state.lakes)
  const map = useMap()
  const dispatch = useDispatch()

  const centerPolygon = useCallback(() => {
    map.setView(coordinates, 12)
  }, [coordinates, map])

  useEffect(() => {
    if (!id) return
    setColor("#CDF0EA")
    centerPolygon()
  }, [centerPolygon, id])

  const centerSelectedPolygon = useCallback(() => {
    const { lakeId, coordinates } = coordinatesLakeToCenter
    setCoordinates(coordinates)
    setId(lakeId)
  }, [coordinatesLakeToCenter])

  useEffect(() => {
    centerSelectedPolygon()
  }, [centerSelectedPolygon, coordinatesLakeToCenter])

  const activeLake = useCallback(
    (id, name, coord) => {
      dispatch(
        updateActiveLakes({ lakeId: id, lakeName: name, lakeCoord: coord })
      )
      setCoordinates(coord)
      setId(id)
    },
    [dispatch]
  )

  return {
    activeLake,
    centerPolygon,
    id,
    color,
  }
}
