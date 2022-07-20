/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import { styled, theme } from "@/stitches.config.js"
import { toggleLakeShowInfo } from "../../stores/lakesSlice"
import { useSelector } from "react-redux"
import ReactTooltip from "react-tooltip"
import { useDispatch } from "react-redux"
const SDiv = styled("div", {
	"padding": "1.5rem",
	"backgroundColor": theme.colors.darkViolet,
	"position": "absolute",
	"top": "8.5vh",
	"left": "13vw",
	"zIndex": "1111",
	"border": "1px solid black",
	"borderRadius": theme.borderRadius.sm,
	"display": "flex",
	"flexDirection": "column",
	"fontFamily": "arial",

	"color": theme.colors.white,
	"& p > span": {
		fontWeight: "bold",
	},
})
const SButtonContainer = styled("div", {
	position: "absolute",
	top: "5px",
	right: "5px",
})
const SButton = styled("button", {
	"borderStyle": "none",
	"cursor": "pointer",
	"height": "60%",
	"padding": "0",
	"display": "grid",
	"placeItems": "center",
	"width": "20px",
	"backgroundColor": "transparent",
	"color": theme.colors.grey,

	"&:hover": {
		color: theme.colors.white,
	},
})

const SReactTooltip = styled(ReactTooltip, {
	fontFamily: "sans-serif",
	fontSize: `${theme.fontSizes.xs}!important`,
	marginTop: "0 !important",
	padding: "4px 8px !important",
	zIndex: "1111 !important",
})

const SH2 = styled("h2", {
	fontFamily: "montserrat",
	marginBottom: theme.space.base,
})

const SArticle = styled("article", {})
const SDivId = styled("div", {
	marginBottom: theme.space.sm,
})
const SDivCoord = styled("div", {
	li: {
		listStyle: "none",
	},
})
export const LakeCard = () => {
	const [lake, setLake] = useState({
		id: "",
		country: "",
		name: "",
		lakeCoord: [],
		mainUse: "",
		nearCity: "",
		damCoord: [],
	})
	const { activeLakes, dataLakes } = useSelector((state) => state.lakes)
	const dispatch = useDispatch()
	useEffect(() => {
		if (!Object.values(activeLakes)) return
		const idLakeShowInfo = Object.values(activeLakes)
			.filter((lake) => lake.showInfo === true)
			.map((lake) => lake.id)[0]
		if (!idLakeShowInfo) return
		const { info } = dataLakes[idLakeShowInfo]
		setLake(info)
	}, [activeLakes, dataLakes])

	const closeInfo = useCallback(() => {
		dispatch(toggleLakeShowInfo({ lakeId: lake.id }))
	}, [dispatch, lake.id])

	return (
		<SDiv>
			<SButtonContainer>
				<SButton data-tip data-for="close" onClick={closeInfo}>
					<IconCarbonClose fontSize={14} />
				</SButton>
				<SReactTooltip id="close" place="right" effect="solid">
					<span>Close</span>
				</SReactTooltip>
			</SButtonContainer>
			<SH2>
				{lake.name} {lake.country}
			</SH2>
			<SArticle>
				<SDivId>
					<p>
						<span> Id SWOT :</span> {lake.id}
					</p>
					<p>
						<span>Main use :</span> {lake.mainUse}
					</p>
					<p>
						<span>Near city :</span> {lake.nearCity}
					</p>
				</SDivId>
				<SDivCoord>
					<p>
						<span>Dam coordinates:</span>
					</p>
					<ul>
						<li>lat: {lake.damCoord[0]}</li>
						<li>long: {lake.damCoord[1]}</li>
					</ul>
					<p>
						<span>Lake coordinates:</span>
						<ul>
							<li>lat: {lake.lakeCoord[0]}</li>
							<li>long: {lake.lakeCoord[1]}</li>
						</ul>
					</p>
				</SDivCoord>
			</SArticle>
		</SDiv>
	)
}
