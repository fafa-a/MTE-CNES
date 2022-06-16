export default function useButtonHook({ type, handleAction }) {
  const onClick = useCallback(() => {
    handleAction(type)
  }, [handleAction, type])
  return { onClick }
}
