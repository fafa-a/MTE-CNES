import WhiteLogo from "@/images/SCO-Logo-Mono-White-RVB.png"
import { styled } from "@stitches/react"

const SImg = styled("img", {
	height: "100%",
})

export const Logo = () => {
	return <SImg src={WhiteLogo} alt="logo" />
}
