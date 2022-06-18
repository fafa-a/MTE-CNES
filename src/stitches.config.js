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
    fontSizes: {
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

  body: {
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
})
