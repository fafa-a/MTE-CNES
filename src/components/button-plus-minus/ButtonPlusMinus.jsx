import useButtonPlusMinusHook from "./ButtonPlusMinusHook"
import { styled, theme } from "@/stitches.config"

const StyledDiv = styled("div", {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  fontFamily: "sans-serif",
  maxWidth: "350px",
})

const StyledP = styled("p", {})

const StyledButton = styled("button", {
  cursor: "pointer",
  marginLeft: "10px",
  backgroundColor: "white",
  border: "1px solid #222",
  borderRadius: theme.borderRadius.xs,
  "&:hover": {
    backgroundColor: "#d1d1d1",
  },
})

export const ButtonPlusMinus = ({
  id,
  name,
  removeLakeActive,
  addLakeToCompare,
  coordinates,
}) => {
  const { clickPlus, clickMinus } = useButtonPlusMinusHook({
    addLakeToCompare,
    id,
    name,
    removeLakeActive,
    coordinates,
  })

  return (
    <StyledDiv>
      <StyledP>Add {name} to the graph</StyledP>
      <StyledButton onClick={clickPlus}>
        <IconCarbonAddAlt size={20} />
      </StyledButton>
    </StyledDiv>
  )
}
