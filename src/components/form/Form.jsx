import useFormHook from "./FormHook"
import { Checkbox } from "../checkbox/Checkbox"
import { styled, theme } from "../../../stitches.config"

const StyledContainer = styled("div", {
  backgroundColor: "#f5f5",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: "0.5rem",
  width: "15%",
})
const StyledDiv = styled("div", {
  marginBottom: theme.space.base,
})

const StyledObsCheckboxDiv = styled("div", {
  display: "flex",
  justifyContent: "space-around",
})

const StyledH3 = styled("h3", {
  fontFamily: "sans-serif",
  marginBottom: theme.space.sm,
})

export const Form = ({ handleChange }) => {
  const { dataTypesValues, observationTypesValues } = useFormHook()
  return (
    <StyledContainer>
      <StyledDiv>
        <StyledH3>Observation types</StyledH3>
        <StyledObsCheckboxDiv>
          {observationTypesValues.map(({ id, label, value, abbr }) => (
            <Checkbox
              key={id}
              id={id}
              label={label}
              value={value}
              abbr={abbr}
              handleChange={handleChange}
            />
          ))}
        </StyledObsCheckboxDiv>
      </StyledDiv>
      <StyledDiv>
        <StyledH3>Attributes</StyledH3>
        {dataTypesValues.map(({ id, label, value }) => (
          <Checkbox
            key={id}
            id={id}
            label={label}
            value={value}
            handleChange={handleChange}
          />
        ))}
      </StyledDiv>
    </StyledContainer>
  )
}
