import { Radio } from "antd"
import { useState } from "react"

export const RadioInput = () => {
  const [value, setValue] = useState(1)

  const onChange = e => {
    console.log("radio checked", e.target.value)
    setValue(e.target.value)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3>Observations type</h3>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>Radar</Radio>
        <Radio value={2}>Optic</Radio>
      </Radio.Group>
    </div>
  )
}
