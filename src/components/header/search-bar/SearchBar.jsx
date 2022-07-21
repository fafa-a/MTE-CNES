/* eslint-disable react/jsx-no-undef */
import { styled } from "@/stitches.config"

const SDiv = styled("div", {
	height: "100%",
	width: "14vw",
	display: "flex",
	alignItems: "center",
})

export const SearchBar = () => {
	return (
		<SDiv>
			<IconCarbonSearch fontSize={24} color={"$text"} />
			<input type="text" placeholder="Search" />
		</SDiv>
	)
}
