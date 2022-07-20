import WhiteLogo from "@/images/SCO-Logo-Mono-White-RVB.png"
import { styled, theme } from "@/stitches.config"
const SDiv = styled("div", {
	"heigth": "5vh",
	"width": "100%",
	"display": "flex",
	//	"justifyContent": "space-around",
	"color": theme.colors.white,

	"& img": {
		width: "30%",
		height: "100%",
		objectFit: "contain",
	},

	"& h1": {
		fontFamily: "montserrat",
		margin: 0,
	},
})

export const Title = () => {
	return (
		<SDiv>
			<img src={WhiteLogo} alt="logo" />
			<h1>Stock Water</h1>
		</SDiv>
	)
}
