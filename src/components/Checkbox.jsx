import { useState, useRef } from "react"

export const Checkbox = ({ id, label, pattern, handleChange, value }) => {
  const [checked, setChecked] = useState(false)
  const ref = useRef()

  const onChange = () => {
    setChecked(!checked)
    if (!checked) {
      handleChange(ref.current)
    }
  }

  return (
    <div>
      <input
        ref={ref}
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
