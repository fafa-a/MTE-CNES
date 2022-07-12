import useLakeBoardHook from "./LakeBoardHook"
import { LakeSelection } from "./lake-selection/LakeSelection"
import { styled, theme } from "@/stitches.config"
import { v4 as uuid } from "@lukeed/uuid"

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
const StyledH3 = styled("h3", {
  fontFamily: "sans-serif",
  marginBottom: theme.space.sm,
})

export const LakeBoard = () => {
  const { dataSelection } = useLakeBoardHook()
  return (
    <StyledContainer>
      <StyledH3>Selected lakes</StyledH3>
      {dataSelection.map((lake, index) => (
        <LakeSelection
          key={uuid()}
          id={lake.id}
          lakeName={lake.name}
          year={lake.year}
          coordinates={lake.coordinates}
          index={index}
        />
      ))}
    </StyledContainer>
  )
}
