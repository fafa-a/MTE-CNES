import useFormHook from "./FormHook"
import { Checkbox } from "@components/checkbox/Checkbox"
import { Button } from "@components/button/Button"
import { Select } from "@components/select/Select"
import { styled, theme } from "@/stitches.config"

const StyledContainer = styled("div", {
  backgroundColor: "#f1f1f1",
  borderRight: "1px solid #ccc",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: theme.space.sm,
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
            {observationTypesValues.map(
              ({ id, label, abbr, actionReducers }) => (
                <Checkbox
                  actionReducers={actionReducers}
                  key={id}
                  id={id}
                  label={label}
                  abbr={abbr}
                  storesKey={"observationTypes"}
                  handleChange={handleChange}
                />
              )
            )}
          </StyledFlexRowDiv>
        </StyledDiv>
        <StyledDiv>
          <StyledH3>Observation periods</StyledH3>
          <StyledFlexRowDiv>
            {durationValues.map(({ id, label, abbr, actionReducers }) => (
              <Checkbox
                actionReducers={actionReducers}
                key={id}
                id={id}
                label={label}
                abbr={abbr}
                storesKey={"observationDurations"}
                handleChange={handleChange}
              />
            ))}
          </StyledFlexRowDiv>
        </StyledDiv>
        <StyledDiv>
          <StyledH3>Attributes</StyledH3>
          <Select
            data={dataTypesValues}
            handleChange={handleChange}
            id={"attributes"}
          />
        </StyledDiv>
        <Button type={"reset"} value={"reset"} handleAction={handleReset} />
      </form>
    </StyledContainer>
  )
}
