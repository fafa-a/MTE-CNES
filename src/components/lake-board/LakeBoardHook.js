import { useSelector } from "react-redux"

export default function useLakeBoardHook() {
  const activeLakes = useSelector(state => state.lakes.activeLakes)

  return {
    activeLakes,
  }
}
