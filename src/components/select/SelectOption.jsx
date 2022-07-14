import { PropTypes } from "prop-types"
import { styled, theme } from "@/stitches.config"

const StyledOption = styled("option", {
  fontFamily: "sans-serif",
  fontSize: theme.fontSizes.base,
  width: "100%",
})

export const SelectOption = ({ label, value }) => {
  return <StyledOption value={value}>{label}</StyledOption>
}

SelectOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}
