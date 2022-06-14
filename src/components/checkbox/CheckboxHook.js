export default function useCheckboxHook({ handleChange, id }) {
  const onChange = useCallback(() => {
    handleChange(id)
  }, [handleChange, id])

  return { onChange }
}
