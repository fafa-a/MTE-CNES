import { useSelector } from "react-redux"

export default function useLakeBoardHook() {
  const [activeLakes, setActiveLakes] = useState([])
  const [prevActiveLakes, setPrevActiveLakes] = useState([])
  const lakes = useSelector(state => state.lakes)

  useEffect(() => {
    if (lakes.activeLakes !== activeLakes) {
      setActiveLakes(lakes.activeLakes)
    }
  }, [lakes])

  return {
    activeLakes,
  }
}
