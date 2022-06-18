import useSelectHook from "./SelectHook"
import { Option } from "./select-option/Option"
import { styled, theme } from "@/stitches.config"

const StyledSelect = styled("select", {
  fontFamily: "sans-serif",
  fontSize: theme.fontSizes.base,
})

const StyledOption = styled("option", {
  fontFamily: "sans-serif",
  fontSize: theme.fontSizes.base,
})
export const Select = ({ data, handleChange, id }) => {
  const { onChange, value } = useSelectHook({ handleChange })

  return (
    <StyledSelect id={id} onChange={onChange} value={value}>
      <StyledOption value="choice">Please choose an option</StyledOption>
      {data.map(({ id, label, filePath }) => (
        <Option key={id} id={id} value={filePath} label={label} />
      ))}
    </StyledSelect>
  )
}
