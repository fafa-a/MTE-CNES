import useCheckboxHook from "./CheckboxHook"
import styled from "styled-components"

const StyledLabel = styled.label(
  ({ theme }) => `
  margin-left: ${theme.space.sm};
`
)

export const Checkbox = props => {
  const { onChange } = useCheckboxHook(props)
  const { id, label, value } = props
  return (
    <div>
      <input type="checkbox" id={id} checked={value} onChange={onChange} />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </div>
  )
}
