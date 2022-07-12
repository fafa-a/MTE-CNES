import { useSelector } from "react-redux"

export default function useLakeBoardHook() {
  const [dataSelection, setDataSelection] = useState([])
  const { activeLakes, data } = useSelector(state => state.lakes)
  const { dataType, YEAR } = useSelector(state => state.form)

  useEffect(() => {
    if (!activeLakes.length) return
    if (!YEAR) {
      setDataSelection(activeLakes)
    }
    if (YEAR && data[activeLakes[0].id]) {
      if (data[activeLakes[0].id][dataType].byYear[0]) {
        const yearData = Object.keys(
          data[activeLakes[0].id][dataType].byYear[0]
        ).map(year => {
          return {
            id: activeLakes[0].id,
            name: activeLakes[0].name,
            year,
            coordinates: activeLakes[0].coordinates,
          }
        })
        setDataSelection(yearData)
      }
    }
  }, [YEAR, activeLakes, data])

  return {
    dataSelection,
  }
}
