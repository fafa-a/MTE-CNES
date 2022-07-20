import { Form } from "@components/form/Form"
import { LakeBoard } from "@components/lake-board/LakeBoard"
import { Title } from "@components/header/Title"
import { styled, theme } from "@/stitches.config"

const SDiv = styled("div", {
	heigth: "100vh",
	width: "14vw",
	display: "flex",
	flexDirection: "column",
	backgroundColor: theme.colors.darkViolet,
	padding: theme.space.sm,
})

export const Dashboard = () => {
	return (
		<SDiv>
			<Title />
			<LakeBoard />
			<Form />
		</SDiv>
	)
}
