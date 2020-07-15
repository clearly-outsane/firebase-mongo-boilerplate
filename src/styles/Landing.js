import { makeStyles } from "@material-ui/core/styles";
import landingImage from "../assets/imgs/landingImageArt.jpg";

// DO NOT REMOVE! We need these imports for styles to take effect
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

export const LandingStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  GridContainer: {
    height: "100vh",
  },
  leftGridContainer: { height: "100%" },
  coloredPane: {
    // backgroundColor: theme.palette.primary.faded,
    // borderTopLeftRadius: 48,
    // borderBottomLeftRadius: 48,
    //For: Image in the center
    // backgroundImage: `url(${landingImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    // backgroundOrigin: "content-box",
    // padding: 124,
    backgroundImage: `url(${landingImage})`,
  },
  imageContainer: {
    backgroundColor: " rgba(0, 0, 0, 0.3)",
    width: "100%",
    height: "100%",
    color: "white",
  },
  TextContainer: { width: "60%" },
  SmallerTextContainer: {
    margin: 18,
  },
  HeadingText: {
    marginTop: 18,
  },
  LargeSignUpButton: {
    padding: "18px 24px",
    fontSize: "1.25rem",
    textTransform: "none",
    letterSpacing: "2px",
  },
  LargeSignUpButtonContainer: {
    marginTop: 36,
  },
}));

export const NavbarStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
  },
  GridContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  LeftLinks: {
    paddingRight: 64, // doesn't work for grids
  },
  ColouredPane: {
    right: 0,
  },

  SignUpButton: {
    marginLeft: 18,
  },
  Links: {
    marginLeft: 18,
  },
  whiteLinks: {
    marginLeft: 18,
    color: "white",
  },
  whiteTheme: {
    color: "white",
  },
  DarkButton: {
    color: "black",
    borderColor: "black",
  },
  userAvatar: {
    width: 28,
    height: 28,
  },
  avatarButton: {
    marginLeft: 12,
    color: "white",
  },
}));
