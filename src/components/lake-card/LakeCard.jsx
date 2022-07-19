/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import { styled, theme } from "@/stitches.config.js"
import { toggleLakeShowInfo } from "../../stores/lakesSlice"
import { useSelector } from "react-redux"
import ReactTooltip from "react-tooltip"
import { useDispatch } from "react-redux"
const Sdiv = styled("div", {
	padding: "1rem",
	backgroundColor: "rgba(255, 255, 255)",
	position: "absolute",
	top: "0",
	left: "13vw",
zIndex: "1111",
	border: "1px solid black",
	borderRadius: theme.borderRadius.sm,
	display: "flex",
	flexDirection: "column",
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

	"&:hover": {
		backgroundColor: "lightgray",
	},
})

const SReactTooltip = styled(ReactTooltip, {
	fontFamily: "sans-serif",
	fontSize: `${theme.fontSizes.xs}!important`,
	marginTop: "0 !important",
	padding: "4px 8px !important",
	zIndex: "1111 !important",
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
		<Sdiv>
			<SButtonContainer>
				<SButton data-tip data-for="close" onClick={closeInfo}>
					<IconCarbonClose fontSize={14} />
				</SButton>
				<SReactTooltip id="close" place="right" effect="solid">
					<span>Close</span>
				</SReactTooltip>
			</SButtonContainer>
			<h2>
				{lake.name} {lake.country}
			</h2>
			<p> Id SWOT: {lake.id}</p>
			<p> Main use : {lake.mainUse}</p>
			<p> Near city : {lake.nearCity}</p>
			<p>
				Dam coordinates :
				<ul>
					<li>lat: {lake.damCoord[0]}</li>
					<li>long: {lake.damCoord[1]}</li>
				</ul>
			</p>
			<p>
				Lake coordinates :
				<ul>
					<li>lat: {lake.lakeCoord[0]}</li>
					<li>long: {lake.lakeCoord[1]}</li>
				</ul>
			</p>
		</Sdiv>
	)
}
