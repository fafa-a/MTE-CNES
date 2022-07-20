import { Form } from "@components/form/Form"
import { LakeBoard } from "@components/lake-board/LakeBoard"

import { styled, theme } from "@/stitches.config"

const SDiv = styled("div", {
	heigth: "100vh",
	width: "14vw",
	display: "flex",
	flexDirection: "column",
	backgroundColor: theme.colors.darkViolet,
})

export const Dashboard = () => {
	return (
		<SDiv>
			<LakeBoard />
			<Form />
		</SDiv>
	)
}
