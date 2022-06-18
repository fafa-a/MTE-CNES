import { Popup } from "react-leaflet"
import { styled, theme } from "@/stitches.config"

const StyledParagraph = styled("p", {
  fontSize: theme.fontSizes.base,
})

const StyledPopup = styled(Popup, {
  [".leaflet-popup-content p"]: {
    margin: "0",
  },
})

export default function Card({ feature }) {
  const { DAM_NAME, COUNTRY } = feature.properties
  return (
    <StyledPopup>
      <StyledParagraph>{`${DAM_NAME}, ${COUNTRY}`}</StyledParagraph>
    </StyledPopup>
  )
}
