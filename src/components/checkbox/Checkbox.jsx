import useCheckboxHook from "./CheckboxHook"
import { styled, theme } from "@/stitches.config"
import { PropTypes } from "prop-types"

const StyledLabel = styled("label", {
  fontFamily: "sans-serif",
  fontSize: theme.fontSizes.base,
  marginLeft: theme.space.sm,
})

export const Checkbox = ({ id, label, abbr, storeAction, value }) => {
  const { isChecked, onChange } = useCheckboxHook({
    storeAction,
    value,
  })
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
Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  abbr: PropTypes.string.isRequired,
  storeAction: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
}