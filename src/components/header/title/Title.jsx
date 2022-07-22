import { styled } from "@/stitches.config"
const H1 = styled("h1", {
	color: "$text",
	fontSize: "2.5rem",
	fontFamily: "montserrat",
})

export const Title = () => {
	return <H1>Stock Water</H1>
}
