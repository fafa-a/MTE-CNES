import { useSelector } from "react-redux"

export default function useLakeBoardHook() {
  const [dataSelection, setDataSelection] = useState([])
  const { activeLakes, data, activeYears } = useSelector(state => state.lakes)
  const { dataType, YEAR } = useSelector(state => state.form)

  useEffect(() => {
    if (!activeLakes.length) return
    if (!YEAR) {
      setDataSelection(activeLakes)
    }
    if (YEAR) {
      setDataSelection(Object.values(activeYears))
    }
  }, [YEAR, activeLakes, data])

  useEffect(() => {
    console.log({ dataSelection })
  }, [dataSelection])

  return {
    dataSelection,
  }
}
