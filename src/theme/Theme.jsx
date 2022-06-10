import { ThemeProvider } from "styled-components"

const theme = {
  fontSize: {
    xs: "0.8rem",
    sm: "1rem",
    md: "1.2rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  space: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
    xl: "4rem",
    xxl: "8rem",
  },
  borderRadius: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
    xl: "4rem",
    xxl: "50%",
  },
}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme
