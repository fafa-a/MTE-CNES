import styled from "styled-components"
import { Popup } from "react-leaflet"

const StyledParagraph = styled.p(
  ({ theme }) => `
  font-size: ${theme.fontSize.sm};
  `
)

const StyledPopup = styled(Popup)(
  ({ theme }) => `
  .leaflet-popup-content-wrapper{
    border-radius: ${theme.borderRadius.sm};
  }
  .leaflet-popup-content p{
    margin:0;
  }
`
)

export default function Card({ feature }) {
  const { DAM_NAME, COUNTRY } = feature.properties
  return (
    <StyledPopup>
      <StyledParagraph>{`${DAM_NAME}, ${COUNTRY}`}</StyledParagraph>
    </StyledPopup>
  )
}
