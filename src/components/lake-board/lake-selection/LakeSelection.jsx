/* eslint-disable react/jsx-no-undef */
import { useLakeSelectionHook } from "./LakeSelectionHook"
import { styled, theme } from "@/stitches.config"
import ReactTooltip from "react-tooltip"
import { PropTypes } from "prop-types"

const StyledDiv = styled("div", {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	width: "100%",
	height: "40px",
	border: "1px solid #ccc",
	borderRadius: theme.borderRadius.sm,
	marginBottom: theme.space.xs,
	padding: theme.space.xs,
})

const StyledContainerButton = styled("div", {
	width: "30%",
	height: "100%",
	display: "flex",
	justifyContent: "space-evenly",
	alignItems: "center",
})

const StyledButton = styled("button", {
	"borderStyle": "none",
	"cursor": "pointer",
	"height": "60%",
	"padding": "0",
	"display": "grid",
	"placeItems": "center",
	"width": "20px",
	"backgroundColor": "transparent",
	"color": "$iconColor",

	"&:hover": {
		color: "$iconHoverColor",
	},
})

const StyledContainerP = styled("div", {
	width: "50%",
	maxWidth: "50%",
	maxHeigth: "100%",
})

const StyledParagraph = styled("p", {
	cursor: "pointer",
	fontFamily: "sans-serif",
	paddingLeft: theme.space.sm,
	width: "100%",
	height: "100%",
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis",
})

const StyledDivObservationTypes = styled("div", {
	height: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-evenly",
	width: "20%",
	// paddingLeft: theme.space.sm,
})

const StyledDivContainerObsTypes = styled("div", {
	height: "33%",
	display: "flex",
	alignItems: "center",
})

const StyledSpanObsColor = styled("span", {
  width: "8px",
  height: "8px",
  display: "inline-block",
})

const StyledSpanLabel = styled("span", {
	fontFamily: "sans-serif",
	marginLeft: theme.space.xs,
	fontSize: theme.fontSizes.xs,
})

const StyledReactTooltip = styled(ReactTooltip, {
	fontFamily: "sans-serif",
	fontSize: `${theme.fontSizes.xs}!important`,
	marginTop: "0 !important",
	padding: "4px 8px !important",
	zIndex: "1111 !important",
})

const backgroundBorderColored = {
	borderColor: "$borderSelectedColor",
	backgroundColor: "$backgroundSelectedColor",
}

const increaseWidth = {
  width: "70%",
  maxWidth: "70%",
}

const fontBold = { fontWeight: "bold" }

const decreaseWidth = {
  width: "10%",
}

export const LakeSelection = ({ id, name, coordinates, index }) => {
  const {
		toggleChartVisibilty,
		handleClickDesactiveLake,
		handleDownloadFile,
		bgOptic,
		bgRadar,
		bgReference,
		isVisible,
		toggleSelectedLake,
		isSelected,
		OPTIC,
		RADAR,
		REFERENCE,
		YEAR,
		activeLakes,
		toggleInfo,
	} = useLakeSelectionHook({ id, name, coordinates, index })

	return (
		<StyledDiv css={isSelected && backgroundBorderColored}>
			<StyledDivObservationTypes>
				{OPTIC && (
					<StyledDivContainerObsTypes>
						<StyledSpanObsColor style={bgOptic} />
						<StyledSpanLabel>optic</StyledSpanLabel>
					</StyledDivContainerObsTypes>
				)}
				{RADAR && (
					<StyledDivContainerObsTypes>
						<StyledSpanObsColor style={bgRadar} />
						<StyledSpanLabel>radar</StyledSpanLabel>
					</StyledDivContainerObsTypes>
				)}
				{REFERENCE && (
					<StyledDivContainerObsTypes>
						<StyledSpanObsColor style={bgReference} />
						<StyledSpanLabel>ref</StyledSpanLabel>
					</StyledDivContainerObsTypes>
				)}
			</StyledDivObservationTypes>
			<StyledContainerP
				onClick={toggleSelectedLake}
				css={YEAR && increaseWidth}
			>
				<StyledParagraph css={isSelected && fontBold}>
					{YEAR && `${name} ${activeLakes.at(-1).name}`}
					{!YEAR && name}
				</StyledParagraph>
			</StyledContainerP>
			<StyledContainerButton css={YEAR && decreaseWidth}>
				{!isVisible && (
					<>
						<StyledButton
							data-tip
							data-for="visible"
							onClick={toggleChartVisibilty}
						>
							<IconCarbonView fontSize={14} />
						</StyledButton>
						<StyledReactTooltip id="visible" place="top" effect="solid">
							<span>Visible</span>
						</StyledReactTooltip>
					</>
				)}
				{isVisible && (
					<>
						<StyledButton
							data-tip
							data-for="hide"
							onClick={toggleChartVisibilty}
						>
							<IconCarbonViewOff fontSize={14} />
						</StyledButton>
						<StyledReactTooltip id="hide" place="top" effect="solid">
							<span>Hide chart</span>
						</StyledReactTooltip>
					</>
				)}
				{!YEAR && (
					<>
						<StyledButton
							data-tip
							data-for="remove"
							onClick={handleClickDesactiveLake}
						>
							<IconCarbonCloseOutline fontSize={14} />
						</StyledButton>
						<StyledReactTooltip
							id="remove"
							place="top"
							effect="solid"
							type="warning"
						>
							<span>Remove</span>
						</StyledReactTooltip>
						<StyledButton data-tip data-for="info" onClick={toggleInfo}>
							<IconCarbonInformation fontSize={14} />
						</StyledButton>
						<StyledReactTooltip id="info" place="top" effect="solid">
							<span>Info</span>
						</StyledReactTooltip>
						<StyledButton
							data-tip
							data-for="download"
							onClick={handleDownloadFile}
						>
							<IconCarbonDownload fontSize={14} />
						</StyledButton>
						<StyledReactTooltip id="download" place="top" effect="solid">
							<span>Download CSV</span>
						</StyledReactTooltip>
					</>
				)}
			</StyledContainerButton>
		</StyledDiv>
	)
}

LakeSelection.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  coordinates: PropTypes.array,
  index: PropTypes.number.isRequired,
}
