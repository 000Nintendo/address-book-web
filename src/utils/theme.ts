// import { createTheme, createStyles} from "@material-ui/core/styles";
// // eslint-disable-next-line no-restricted-imports
// import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

import { createTheme } from "@mui/material";

export const primary = "#5CE1E6";
const primaryLight = "#d9fffc";
const primaryDark = "#45A29E";
const secondary = "#1F2833";
const secondaryDark = "#037F84";
const secondaryLight = "#C5C6C7";
const secondaryContrastText = primaryDark;
const success = "#3EB095";
// const hint = "#727A8C";
const warning = "#FFB917";
const backgroundColor = "#f8f8f8";
const white = "#fff";
const grey100 = "#f9fbfc";
export const grey500 = "#9e9e9e";
const textSecondary = "#838f86";

const theme = createTheme({
  spacing: 10,
  typography: {
    fontFamily: [
      "BlinkMacSystemFont",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Droid Sans",
      "Helvetica Neue",
      "Helvetica",
      "sans-serif",
    ].join(","),
    caption: {
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: primary,
      light: primaryLight,
      dark: primaryDark,
      contrastText: white,
    },
    secondary: {
      main: secondary,
      light: secondaryLight,
      dark: secondaryDark,
      contrastText: secondaryContrastText,
    },
    grey: {
      100: grey100,
      200: textSecondary,
      500: grey500,
    },
    success: {
      main: success,
      dark: success,
      contrastText: white,
    },
    text: {
      secondary: textSecondary,
    },
    warning: {
      contrastText: white,
      main: warning,
    },
    background: {
      default: backgroundColor,
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
