import { styled, theme } from "@/stitches.config"

const StyledOption = styled("option", {
  fontFamily: "sans-serif",
  fontSize: theme.fontSizes.base,
})

export const Option = ({ label, value, id }) => {
  return <StyledOption value={value}>{label}</StyledOption>
}
