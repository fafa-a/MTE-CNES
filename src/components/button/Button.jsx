import useButtonHook from "./ButtonHook"
import { styled } from "@stitches/react"
const StyledButton = styled("button", {
  fontFamily: "sans-serif",
})

export const Button = ({ type, value, handleAction }) => {
  const { onClick } = useButtonHook({ type, handleAction })

  return (
    <StyledButton type={type} value={value} onClick={onClick}>
      {value}
    </StyledButton>
  )
}
