import useCheckboxHook from "./CheckboxHook"
import { styled, theme } from "@/stitches.config"
import {
  setObservationDuration,
  setObservationTypes,
  setAttributes,
} from "../../stores/formSlice"
import { dispatch } from "d3"
const StyledLabel = styled("label", {
  fontFamily: "sans-serif",
  fontSize: theme.fontSizes.base,
  marginLeft: theme.space.sm,
})

export const Checkbox = props => {
  const { onChange } = useCheckboxHook(props)
  const { id, label, value } = props
  return (
    <div>
      <input type="checkbox" id={id} onChange={onChange} checked={value} />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </div>
  )
}
