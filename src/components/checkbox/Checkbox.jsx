import useCheckboxHook from "./CheckboxHook"

export const Checkbox = props => {
  const { onChange } = useCheckboxHook(props)
  const { id, label, pattern, value } = props
  return (
    <div>
      <input
        type="checkbox"
        name={pattern}
        id={id}
        checked={value}
        onChange={onChange}
      />
      <label style={{ marginLeft: 5 }} htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
