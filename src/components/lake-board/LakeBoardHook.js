import { useSelector } from "react-redux"

export default function useLakeBoardHook() {
  const [lakesActive, setLakesActive] = useState([])
  const activeLakes = useSelector(state => state.lakes.activeLakes)

  console.log("activeLakes", activeLakes)

  return {
    activeLakes,
  }
}
