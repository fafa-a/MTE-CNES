/* eslint-disable no-undef */
import useLakeBoardHook from "./LakeBoardHook"
import { LakeSelection } from "./lake-selection/LakeSelection"
import { styled, theme } from "@/stitches.config"
import { v4 as uuid } from "@lukeed/uuid"

const Container = styled("div", {
	color: "$text",
	display: "flex",
	flexDirection: "column",
	height: "45%",
	padding: theme.space.sm,
	minWidth: "100%",
	maxWidth: "100%",
	overflow: "auto",
})
const H3 = styled("h3", {
	fontFamily: "arial",
	marginBottom: theme.space.sm,
})

export const LakeBoard = () => {
	const { dataSelection } = useLakeBoardHook()
	return (
		<Container>
			<H3>Selected lakes</H3>

			{dataSelection.map((item, index) => (
				<LakeSelection
					key={uuid()}
					id={item.id}
					name={item.name}
					coordinates={item.coordinates}
					index={index}
				/>
			))}
		</Container>
	)
}
