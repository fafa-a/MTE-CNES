import { styled, theme } from "@/stitches.config"
import { useSelector } from "react-redux"

const StyledOption = styled("option", {
  fontFamily: "sans-serif",
  fontSize: theme.fontSizes.base,
})

export const Option = ({ label, value }) => {
  const form = useSelector(state => state.form)
  return (
    <StyledOption value={value} selected={form.attributes.includes(value)}>
      {label}
    </StyledOption>
  )
}
