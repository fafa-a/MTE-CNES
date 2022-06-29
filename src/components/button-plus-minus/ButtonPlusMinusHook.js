export default function useButtonPlusMinusHook({
  id,
  name,
  addLakeToCompare,
  removeLakeActive,
  coordinates,
}) {
  const clickMinus = useCallback(() => {
    removeLakeActive(id)
  }, [])

  const clickPlus = useCallback(() => {
    const obj = { id, name, coord: coordinates, compare: true }
    addLakeToCompare(obj)
  }, [])

  return {
    clickMinus,
    clickPlus,
  }
}
