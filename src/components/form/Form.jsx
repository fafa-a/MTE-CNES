import useFormHook from "./FormHook"
import { Checkbox } from "../checkbox/Checkbox"
import { Button } from "../button/Button"
import { styled, theme } from "../../../stitches.config"

const StyledContainer = styled("div", {
  backgroundColor: "#f1f1f1",
  borderRight: "1px solid #ccc",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: "0.5rem",
  width: "15%",
})
const StyledDiv = styled("div", {
  marginBottom: theme.space.base,
})

const StyledFlexRowDiv = styled("div", {
  display: "flex",
  justifyContent: "space-around",
})

const StyledH3 = styled("h3", {
  fontFamily: "sans-serif",
  marginBottom: theme.space.sm,
})

export const Form = ({ handleChange, handleReset }) => {
  const { dataTypesValues, observationTypesValues, durationValues } =
    useFormHook()
  return (
    <StyledContainer>
      <form action="">
        <StyledDiv>
          <StyledH3>Observation types</StyledH3>
          <StyledFlexRowDiv>
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
          </StyledFlexRowDiv>
        </StyledDiv>
        <StyledDiv>
          <StyledH3>Observation periods</StyledH3>
          <StyledFlexRowDiv>
            {durationValues.map(({ id, label, value }) => (
              <Checkbox
                key={id}
                id={id}
                label={label}
                value={value}
                handleChange={handleChange}
              />
            ))}
          </StyledFlexRowDiv>
        </StyledDiv>
        <StyledDiv>
          <StyledH3>Attributes</StyledH3>
          {dataTypesValues.map(({ id, label, value, filePath }) => (
            <Checkbox
              key={id}
              id={id}
              label={label}
              value={value}
              filePath={filePath}
              handleChange={handleChange}
            />
          ))}
        </StyledDiv>
        <Button type={"reset"} value={"reset"} handleAction={handleReset} />
      </form>
    </StyledContainer>
  )
}
