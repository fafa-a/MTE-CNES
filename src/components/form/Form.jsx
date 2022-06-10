import useFormHook from "./FormHook"
import { Checkbox } from "../checkbox/Checkbox"
import styled from "styled-components"

const StyledContainer = styled.div`
  background-color: #f5f5;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5rem;
  width: 15%;
`

export const Form = () => {
  const { formValues } = useFormHook()
  return (
    <StyledContainer>
      {formValues.map(({ id, label, value }) => (
        <Checkbox key={id} id={id} label={label} value={value} />
      ))}
    </StyledContainer>
  )
}
