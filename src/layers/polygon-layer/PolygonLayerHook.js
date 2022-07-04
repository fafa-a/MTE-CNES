import { useMap } from "react-leaflet"
import { useSelector } from "react-redux"

export default function usePolygonLayerHook({ handleChange }) {
  const [id, setId] = useState(null)
  const [color, setColor] = useState("blue")
  const map = useMap()
  const { coordinatesLakeToCenter } = useSelector(state => state.lakes)

  useEffect(() => {
    if (id) setColor("white")
  }, [id])

  useEffect(() => {
    if (!coordinatesLakeToCenter.lakeId) return
    const { lakeId, coordinates } = coordinatesLakeToCenter
    setId(lakeId)
    // map.flyTo(coordinates, 12)
    map.setView(coordinates)
  }, [coordinatesLakeToCenter])

  const centerPolygon = useCallback((...coord) => {
    map.setView(coord[0], coord[1])
  })

  const getLakeIdName = useCallback(
    (id, name, coord) => {
      setId(id)
      const obj = {
        id,
        name,
        coord,
      }
      handleChange(obj)
    },
    [handleChange]
  )

  return {
    centerPolygon,
    getLakeIdName,
    id,
    color,
  }
}
