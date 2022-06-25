export default function useButtonPlusMinusHook({
  id,
  name,
  getLakeIdName,
  removeLakeActive,
}) {
  const clickMinus = useCallback(() => {
    removeLakeActive(id)
  }, [])

  const clickPlus = useCallback(() => {
    getLakeIdName(id, name)
  }, [])

  return {
    clickMinus,
    clickPlus,
  }
}
