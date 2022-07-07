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
} from "../../stores/formSlice"

const StyledContainer = styled("div", {
  backgroundColor: "#f1f1f1",
  borderRight: "1px solid #ccc",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: theme.space.sm,
  minWidth: "13vw",
  maxWidth: "13vw",
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

export const Form = () => {
  const {
    chartTypesValues,
    dataTypesValues,
    observationTypesValues,
    durationValues,
    form,
    compareTypesValues,
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
      </form>
    </StyledContainer>
  )
}
