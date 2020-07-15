import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4A2A75",
      faded: "#4E7A94",
    },
    secondary: {
      main: "#E74482",
      faded: "#F7FFF7",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      //   '"Segoe UI"',
      '"Lato"',
      "Roboto",
      //   "Arial",
      //   "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h2: {
      fontSize: "4.5rem",
      fontWeight: 700,
    },
    h4: { fontSize: "2rem" },
    h5: {
      fontSize: "1.3rem",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "1.1rem",
    },
  },
});

export const WhiteOutlinedButton = withStyles((theme) => ({
  root: {
    boxShadow: "none",
    color: "white",
    borderColor: "white",
    "&:hover": {
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
    },
  },
}))(Button);

export const PrimaryButton = withStyles((theme) => ({
  root: {
    boxShadow: "none",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(78, 122, 148, 0.7)",
      color: "#FFF",
    },
  },
}))(Button);

const UploadSong = withStyles((theme) => ({
  root: {
    boxShadow: "none",
    color: "white",
    backgroundColor: "transparent",
    "&:hover": {
      // backgroundColor: "rgba(89, 138, 142, 0.7)",
    },
    height: 132,
    width: 132,
    fontWeight: 700,
    fontSize: "1.4rem",
    textTransform: "none",
  },
}))(Button);

export const DashButtons = { UploadSong };
