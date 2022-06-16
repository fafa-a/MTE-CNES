export default function useSelectHook(handleChange) {
  const onChange = useCallback(
    e => {
      handleChange(e.target.value)
    },
    [handleChange]
  )

  return { onChange }
}
