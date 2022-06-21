import useButtonHook from "./ButtonHook"
import { styled } from "@stitches/react"
const StyledButton = styled("button", {
  fontFamily: "sans-serif",
  textTransform: "capitalize",
})

export const Button = ({ type, value, cleanForm }) => {
  const { onClick } = useButtonHook(cleanForm)

  return (
    <StyledButton type={type} value={value} onClick={onClick}>
      {value}
    </StyledButton>
  )
}
