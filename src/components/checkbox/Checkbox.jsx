import useCheckboxHook from "./CheckboxHook"
import { styled, theme } from "@/stitches.config"


const StyledLabel = styled("label", {
  fontFamily: "sans-serif",
  fontSize: theme.fontSizes.base,
  marginLeft: theme.space.sm,
})

export const Checkbox = props => {
  const { id, label, abbr, value } = props
  const { isChecked, onChange } = useCheckboxHook(props)
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        onChange={onChange}
        value={abbr}
        checked={isChecked}
      />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </div>
  )
}
