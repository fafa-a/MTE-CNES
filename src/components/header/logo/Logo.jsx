import WhiteLogo from "@/images/SCO-Logo-Mono-White-RVB.png"
import BlackLogo from "@/images/SCO-Logo-Mono-Black-RVB.png"
import { styled } from "@stitches/react"

const SImg = styled("img", {
	height: "100%",
})

export const Logo = ({ colorTheme }) => {
	return colorTheme === "dark" ? (
		<SImg src={WhiteLogo} alt="logo" />
	) : (
		<SImg src={BlackLogo} alt="logo" />
	)
}
