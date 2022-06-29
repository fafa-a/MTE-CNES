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

export const LakeBoard = () => {
  const { activeLakes } = useLakeBoardHook()
  return (
    <StyledContainer>
      <h3>Selected lakes</h3>
      {activeLakes.map(lake => (
        <LakeSelection
          key={uuid()}
          id={lake.id}
          lakeName={lake.name}
          coordinates={lake.coordinates}
        />
      ))}
    </StyledContainer>
  )
}
