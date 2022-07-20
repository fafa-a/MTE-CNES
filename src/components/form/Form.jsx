import useFormHook from "./FormHook"
import { Checkbox } from "@components/checkbox/Checkbox"
import { Button } from "@components/button/Button"
import { Select } from "@components/select/Select"
import { SelectOption } from "@components/select/SelectOption"
import { styled, theme } from "@/stitches.config"
import { DataTypes, ChartTypes } from "../../config"

import {
  cleanForm,
  toggleOptic,
  toggleRadar,
  toggleDay,
  togglePeriod,
  setChartType,
  setAttributeValue,
  toggleReference,
  toggleYear,
} from "../../stores/formSlice"

const StyledContainer = styled("div", {
	color: theme.colors.white,
	display: "flex",
	flexDirection: "column",
	height: "50%",
	padding: theme.space.sm,
	minWidth: "100%",
	maxWidth: "100%",
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
const StyledButton = styled("button", {
	fontFamily: "sans-serif",
	textTransform: "capitalize",
	marginTop: theme.space.sm,
	cursor: "pointer",
})
export const Form = () => {
  const {
    chartTypesValues,
    dataTypesValues,
    observationTypesValues,
    durationValues,
    form,
    compareTypesValues,
    downloadChartImage,
  } = useFormHook()
  return (
    <StyledContainer>
      <form action="">
        <StyledDiv>
          <StyledH3>Observation types</StyledH3>
          <StyledFlexRowDiv>
            <Checkbox
              storeAction={toggleOptic}
              id={observationTypesValues.OPTIC.abbr}
              label={observationTypesValues.OPTIC.label}
              abbr={observationTypesValues.OPTIC.abbr}
              value={form.OPTIC}
            />
            <Checkbox
              storeAction={toggleRadar}
              id={observationTypesValues.RADAR.abbr}
              label={observationTypesValues.RADAR.label}
              abbr={observationTypesValues.RADAR.abbr}
              value={form.RADAR}
            />
            <Checkbox
              storeAction={toggleReference}
              id={compareTypesValues.REFERENCE.label}
              label={compareTypesValues.REFERENCE.label}
              abbr={compareTypesValues.REFERENCE.label}
              value={form.REFERENCE}
            />
          </StyledFlexRowDiv>
        </StyledDiv>
        <StyledDiv>
          <StyledH3>Observation periods</StyledH3>
          <StyledFlexRowDiv>
            <Checkbox
              storeAction={toggleDay}
              id={durationValues.DAY.abbr}
              label={durationValues.DAY.label}
              abbr={durationValues.DAY.abbr}
              value={form.DAY}
            />
            <Checkbox
              storeAction={togglePeriod}
              id={durationValues.PERIOD.abbr}
              label={durationValues.PERIOD.label}
              abbr={durationValues.PERIOD.abbr}
              value={form.PERIOD}
            />
            <Checkbox
              storeAction={toggleYear}
              id={compareTypesValues.YEAR.label}
              label={compareTypesValues.YEAR.label}
              abbr={compareTypesValues.YEAR.label}
              value={form.YEAR}
            />
          </StyledFlexRowDiv>
        </StyledDiv>
        <StyledDiv>
          <StyledH3>Attributes</StyledH3>
          <Select setAttributeValue={setAttributeValue} value={form.dataType}>
            <SelectOption
              value={DataTypes.FILLING_RATE}
              label={dataTypesValues.FILLING_RATE.label}
            />
            <SelectOption
              value={DataTypes.SURFACE}
              label={dataTypesValues.SURFACE.label}
            />
            <SelectOption
              value={DataTypes.VOLUME}
              label={dataTypesValues.VOLUME.label}
            />
          </Select>
        </StyledDiv>
        <StyledDiv>
          <StyledH3>Chart types</StyledH3>
          <Select setAttributeValue={setChartType} value={form.chartType}>
            <SelectOption
              value={ChartTypes.LINE}
              label={chartTypesValues.LINE.label}
            />
            <SelectOption
              value={ChartTypes.SCATTER}
              label={chartTypesValues.SCATTER.label}
            />
          </Select>
        </StyledDiv>
        <Button type="reset" value="clear form" cleanForm={cleanForm} />
        <StyledButton onClick={downloadChartImage}>
          Download chart image
        </StyledButton>
      </form>
    </StyledContainer>
  )
}
