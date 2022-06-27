import useLakeSelectionHook from "./LakeSelectionHook"
import { styled, theme } from "@/stitches.config"

const StyledDiv = styled("div", {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  height: "35px",
  border: "1px solid #ccc",
  borderRadius: theme.borderRadius.sm,
  marginBottom: theme.space.xs,
})

const StyledButton = styled("button", {
  borderStyle: "none",
  cursor: "pointer",
  padding: "0",
})

const StyledParagraph = styled("p", {
  fontFamily: "sans-serif",
})

const StyledDivObservationTypes = styled("div", {
  height: "100%",
  display: "flex",
  flexDirection: "column",
})

const StyledDivContainerObsTypes = styled("div", {
  height: "50%",
  display: "flex",
  alignItems: "center",
})

const StyledSpanOpticColor = styled("span", {
  backgroundColor: "#00ff00",
  width: "10px",
  height: "10px",
  display: "inline-block",
})

const StyledSpanLabel = styled("span", {
  fontFamily: "sans-serif",
  marginLeft: theme.space.xs,
  fontSize: theme.fontSizes.sm,
})

const StyledSpanRadarColor = styled("span", {
  backgroundColor: "blue",
  width: "10px",
  height: "10px",
  display: "inline-block",
})

export const LakeSelection = ({ id, lakeName }) => {
  const { handleClick } = useLakeSelectionHook(id)
  return (
    <StyledDiv>
      <StyledButton onClick={handleClick}>
        <IconCarbonTrashCan size={20} />
      </StyledButton>
      <StyledDivObservationTypes>
        <StyledDivContainerObsTypes>
          <StyledSpanOpticColor />
          <StyledSpanLabel>optic</StyledSpanLabel>
        </StyledDivContainerObsTypes>
        <StyledDivContainerObsTypes>
          <StyledSpanRadarColor />
          <StyledSpanLabel>radar</StyledSpanLabel>
        </StyledDivContainerObsTypes>
      </StyledDivObservationTypes>
      <StyledParagraph>{lakeName}</StyledParagraph>
      <StyledButton>
        <IconCarbonInformation size={20} />
      </StyledButton>
      <StyledButton>
        <IconCarbonDownload size={20} />
      </StyledButton>
    </StyledDiv>
  )
}
