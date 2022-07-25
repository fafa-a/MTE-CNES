import useRadioboxHook from "./RadioboxHook"
import { styled, theme } from "@/stitches.config"
import { PropTypes } from "prop-types"

const StyledLabel = styled("label", {
	fontFamily: "sans-serif",
	fontSize: theme.fontSizes.base,
	marginLeft: theme.space.sm,
})

export const Radiobox = ({ id, label, abbr, storeAction, value }) => {
	const { isChecked, onChange } = useRadioboxHook({
		storeAction,
		value,
	})
	return (
		<div>
			<input
				type="radio"
				id={id}
				onChange={onChange}
				value={abbr}
				checked={isChecked}
			/>
			<StyledLabel htmlFor={id}>{label}</StyledLabel>
		</div>
	)
}
Radiobox.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	abbr: PropTypes.string.isRequired,
	storeAction: PropTypes.func.isRequired,
	value: PropTypes.bool.isRequired,
}
