/* eslint-disable no-undef */
import useLakeBoardHook from "./LakeBoardHook"
import { LakeSelection } from "./lake-selection/LakeSelection"
import { styled, theme } from "@/stitches.config"
import { v4 as uuid } from "@lukeed/uuid"

const StyledContainer = styled("div", {
	color: "$text",
	display: "flex",
	flexDirection: "column",
	height: "45%",
	padding: theme.space.sm,
	minWidth: "100%",
	maxWidth: "100%",
})
const StyledH3 = styled("h3", {
	fontFamily: "arial",
	marginBottom: theme.space.sm,
})

export const LakeBoard = () => {
	const { dataSelection } = useLakeBoardHook()
	return (
		<StyledContainer>
			<StyledH3>Selected lakes</StyledH3>
			{dataSelection.map((item, index) => (
				<LakeSelection
					key={uuid()}
					id={item.id}
					name={item.name}
					coordinates={item.coordinates}
					index={index}
				/>
			))}
		</StyledContainer>
	)
}
