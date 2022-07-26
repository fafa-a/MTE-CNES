import { styled } from "@/stitches.config"
import { CarbonSearch } from "../../carbon-icons"
const SDiv = styled("div", {
	height: "100%",
	width: "14vw",
	display: "flex",
	alignItems: "center",
})

export const SearchBar = () => {
	return (
		<SDiv>
			<CarbonSearch fontSize={24} color={"$text"} />
			<input type="text" placeholder="Search" />
		</SDiv>
	)
}
