import { Logo } from "./logo/Logo"
import { Title } from "./title/Title"
import { SearchBar } from "./search-bar/SearchBar"
import { IconTheme } from "./icon-theme/IconTheme"
import { styled, theme } from "@/stitches.config"
const SDiv = styled("div", {
	height: "8vh",
	width: "100vw",
	backgroundColor: "$background",
	display: "flex",
	alignItems: "center",
	padding: theme.space.sm,
})
const SLogoSpan = styled("span", {
	height: "100%",
	width: "14vw",
})
const SContainer = styled("div", {
	height: "100%",
	width: "86vw",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	paddingRight: theme.space.sm,
})

export const Header = ({ toggleTheme, theme }) => {
	return (
		<SDiv>
			<SLogoSpan>
				<Logo />
			</SLogoSpan>
			<SContainer>
				<SearchBar />
				<Title />
				<IconTheme toggleTheme={toggleTheme} colorTheme={theme} />
			</SContainer>
		</SDiv>
	)
}
