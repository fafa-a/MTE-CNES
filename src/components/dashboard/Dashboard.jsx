import { Form } from "@components/form/Form"
import { LakeBoard } from "@components/lake-board/LakeBoard"

import { styled } from "@/stitches.config"

const SDiv = styled("div", {
	heigth: "100vh",
	width: "13vw",
	display: "flex",
	flexDirection: "column",
})

export const Dashboard = () => {
	return (
		<SDiv>
			<LakeBoard />
			<Form />
		</SDiv>
	)
}
