import { useMap } from "react-leaflet"
import { useSelector } from "react-redux"

export default function usePolygonLayerHook({ handleChange }) {
  const [id, setId] = useState(null)
  const [color, setColor] = useState("blue")
  const [coordinates, setCoordinates] = useState([])
  const { coordinatesLakeToCenter } = useSelector(state => state.lakes)
  const map = useMap()

  useEffect(() => {
    if (!id) return
    setColor("white")
    centerPolygon()
  }, [id])

  useEffect(() => {
    centerSelectedPolygon()
  }, [coordinatesLakeToCenter])

  const centerSelectedPolygon = useCallback(() => {
    const { lakeId, coordinates } = coordinatesLakeToCenter
    setCoordinates(coordinates)
    setId(lakeId)
  })

  const centerPolygon = useCallback(() => {
    map.setView(coordinates, 12)
  }, [coordinates])

  const getLakeIdName = useCallback(
    (id, name, coord) => {
      setCoordinates(coord)
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
