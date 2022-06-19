import useButtonHook from "./ButtonHook"
import { styled } from "@stitches/react"
const StyledButton = styled("button", {
  fontFamily: "sans-serif",
})

export const Button = ({ type, value }) => {
  const { onClick } = useButtonHook({ type })

  return (
    <StyledButton type={type} value={value} onClick={onClick}>
      {value}
    </StyledButton>
  )
}
