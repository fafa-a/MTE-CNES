export default function useButtonPlusMinusHook({
  id,
  name,
  addLakeToCompare,
  removeLakeActive,
}) {
  const clickMinus = useCallback(() => {
    removeLakeActive(id)
  }, [])

  const clickPlus = useCallback(() => {
    const obj = { id, name, compare: true }
    addLakeToCompare(obj)
  }, [])

  return {
    clickMinus,
    clickPlus,
  }
}
