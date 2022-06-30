import useLakeSelectionHook from "./LakeSelectionHook"
import { styled, theme } from "@/stitches.config"
import ReactTooltip from "react-tooltip"

const StyledDiv = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "35px",
  border: "1px solid #ccc",
  borderRadius: theme.borderRadius.sm,
  marginBottom: theme.space.xs,
})

const StyledContainerButton = styled("div", {
  width: "30%",
  height: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
})

const StyledButton = styled("button", {
  borderStyle: "none",
  cursor: "pointer",
  height: "60%",
  padding: "0",
  display: "grid",
  placeItems: "center",
  width: "20px",

  "&:hover": {
    backgroundColor: "lightgray",
  },
})

const StyledContainerP = styled("div", {
  width: "50%",
  maxWidth: "50%",
  maxHeigth: "100%",
  display: "flex",
  justifyContent: "flex-end",
})

const StyledParagraph = styled("p", {
  cursor: "pointer",
  fontFamily: "sans-serif",
  paddingLeft: theme.space.sm,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
})

const StyledDivObservationTypes = styled("div", {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  width: "20%",
  marginLeft: theme.space.xs,
})

const StyledDivContainerObsTypes = styled("div", {
  height: "50%",
  display: "flex",
  alignItems: "center",
})

const StyledSpanOpticColor = styled("span", {
  width: "10px",
  height: "10px",
  display: "inline-block",
})

const StyledSpanLabel = styled("span", {
  fontFamily: "sans-serif",
  marginLeft: theme.space.xs,
  fontSize: theme.fontSizes.xs,
})

const StyledSpanRadarColor = styled("span", {
  width: "10px",
  height: "10px",
  display: "inline-block",
})

const StyledReactTooltip = styled(ReactTooltip, {
  fontFamily: "sans-serif",
  fontSize: `${theme.fontSizes.xs}!important`,
  marginTop: "0 !important",
  padding: "4px 8px !important",
  zIndex: "1111 !important",
})

export const LakeSelection = ({
  id,
  lakeName,
  coordinates,
  centerMapOnLake,
  indexColor,
}) => {
  const { handleClickDesactiveLake, sendCoordinates, bgOptic, bgRadar } =
    useLakeSelectionHook(id, coordinates, indexColor)
  return (
    <StyledDiv>
      <StyledDivObservationTypes>
        <StyledDivContainerObsTypes>
          <StyledSpanOpticColor style={{ ...bgOptic }} />
          <StyledSpanLabel>optic</StyledSpanLabel>
        </StyledDivContainerObsTypes>
        <StyledDivContainerObsTypes>
          <StyledSpanRadarColor style={{ ...bgRadar }} />
          <StyledSpanLabel>radar</StyledSpanLabel>
        </StyledDivContainerObsTypes>
      </StyledDivObservationTypes>
      <StyledContainerP onClick={sendCoordinates}>
        <StyledParagraph>{lakeName}</StyledParagraph>
      </StyledContainerP>
      <StyledContainerButton>
        <StyledButton
          data-tip
          data-for="delete"
          onClick={handleClickDesactiveLake}
        >
          <IconCarbonTrashCan fontSize={14} />
        </StyledButton>
        <StyledReactTooltip
          id="delete"
          place="top"
          effect="solid"
          type="warning"
        >
          <span>Delete</span>
        </StyledReactTooltip>
        <StyledButton data-tip data-for="info">
          <IconCarbonInformation fontSize={14} />
        </StyledButton>
        <StyledReactTooltip id="info" place="top" effect="solid">
          <span>Info</span>
        </StyledReactTooltip>
        <StyledButton data-tip data-for="download">
          <IconCarbonDownload fontSize={14} />
        </StyledButton>
        <StyledReactTooltip id="download" place="top" effect="solid">
          <span>Download CSV</span>
        </StyledReactTooltip>
      </StyledContainerButton>
    </StyledDiv>
  )
}
