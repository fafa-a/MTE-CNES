import { createStitches } from "@stitches/react"

export const {
	styled,
	css,
	keyframes,
	getCssText,
	globalCss,
	theme,
	createTheme,
	config,
} = createStitches({
	theme: {
		colors: {
			violet: "#312783",
			cyan: "#00AAFF",
			white: "#FFFFFF",
			climate: "#008777",
			water: "#0082C2",
			ocean: "#004D7E",
			air: "#8BB7E2",
			land: "#94C11F",
			health: "#009D45",
			costal: "#009679",
			food: "#E0E622",
			disaster: "#E9483F",
			grey: "#A2B5BB",
		},
		fontSizes: {
			xxs: "0.5rem",
			xs: "0.75rem",
			sm: "0.875rem",
			base: "1rem",
			lg: "1.125rem",
			xl: "1.25rem",
			xxl: "1.5rem",
		},
		space: {
			xs: "0.25rem",
			sm: "0.5rem",
			base: "1rem",
			lg: "2rem",
			xl: "4rem",
			xxl: "8rem",
		},
		borderRadius: {
			xs: "0.25rem",
			sm: "0.5rem",
			base: "1rem",
			lg: "2rem",
			xl: "4rem",
			xxl: "8rem",
		},
	},
})

export const globalStyles = globalCss({
	"*, *::before, *::after": {
		boxSizing: "border-box",
	},
	"*": {
		margin: "0",
	},
	"html, body": {
		height: "100%",
	},

	"body": {
		lineHeight: "1.5",
		webkitFontSmoothing: "antialiased",
	},
	"img, picture, video, canvas, svg": {
		display: "block",
		maxWidth: "100%",
	},

	"input, button, textarea, select": {
		font: "inherit",
	},
	"p, h1, h2, h3, h4, h5, h6": {
		overflowWrap: "break-word",
	},
	"#root, #__next": {
		isolation: "isolate",
	},
	"@font-face": [
		{
			fontFamily: "montserrat",
			src: "url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;700&display=swap')",
		},
		{
			fontFamily: "arial",
			fontStyle: "normal",
			fontWeight: "700",
			src: "url('./fonts/arial/arial_bold.woff,)",
		},
		{
			fontFamily: "arial",
			fontStyle: "italic",
			fontWeight: "700",
			src: "url('./fonts/arial/arial_bold_italic.woff,)",
		},
		{
			fontFamily: "arial",
			fontStyle: "italic",
			fontWeight: "normal",
			src: "url('./fonts/arial/arial_italic.woff,)",
		},
		{
			fontFamily: "arial",
			fontStyle: "normal",
			fontWeight: "normal",
			src: "url('./fonts/arial/arial.woff,)",
		},
	],
})
