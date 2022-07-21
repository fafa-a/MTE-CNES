import { styled } from "@/stitches.config"
const SH1 = styled("h1", {
	color: "$text",
	fontSize: "2.5rem",
	fontFamily: "montserrat",
})

export const Title = () => {
	return <SH1>Stock Water</SH1>
}
