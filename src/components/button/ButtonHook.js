export default function useButtonHook({
  type,
  handleAction,
  handleCheckboxValue,
}) {
  const onClick = useCallback(() => {
    handleAction(type)
    handleCheckboxValue(false)
  }, [handleAction, type])
  return { onClick }
}
