import { useIconThemeHook } from "./IconThemeHook"
import { styled, theme } from "@/stitches.config"
import { CarbonMoon, CarbonSun } from "../../carbon-icons"
const Button = styled("button", {
	"backgroundColor": "$background",
	"color": "$text",
	"cursor": "pointer",
	"borderColor": "$iconColor",
	"borderRadius": theme.borderRadius.xs,

	"&:hover": {
		borderColor: "$iconHoverColor",
	},
})

export const IconTheme = ({ toggleTheme, colorTheme }) => {
	const { handleTheme } = useIconThemeHook(toggleTheme)
	return (
		<div>
			<Button onClick={handleTheme}>
				{colorTheme === "light" ? (
					<CarbonMoon fontSize={24} />
				) : (
					<CarbonSun fontSize={24} color={theme.colors.sun} />
				)}
			</Button>
		</div>
	)
}
