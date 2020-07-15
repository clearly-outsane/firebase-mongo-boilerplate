import React, { Component, useContext, useState } from "react";
import { NavbarStyles } from "../styles/Landing";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { WhiteOutlinedButton, PrimaryButton } from "../styles/theme";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import { pages, routes } from "../constants";
import { Context } from "../state/Store";
import ButtonBase from "@material-ui/core/ButtonBase";
import { IconButton } from "@material-ui/core";
import { actionTypes } from "../state/constants";
import { auth } from "../config/firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../styles/linkAnimation.css";

export const LandingNavbar = ({ theme = "light", page = pages.Landing }) => {
  const [state, dispatch] = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = NavbarStyles();
  const linkColor = theme === "light" ? classes.Links : classes.whiteLinks;
  const lightColor = theme === "light" ? null : classes.whiteTheme;

  const invertOutlinedButton = (text) => {
    return theme === "light" ? (
      <WhiteOutlinedButton variant="outlined" size="small">
        {text}
      </WhiteOutlinedButton>
    ) : (
      <Button size="small" variant="outlined">
        {text}
      </Button>
    );
  };

  const renderUser = () => {
    const profileText = theme === "light" ? classes.whiteTheme : null;

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <Grid
        container
        spacing={0}
        alignItems="center"
        classes={{ container: classes.userProfile }}
        direction="row"
      >
        {state.firebaseUser && !state.loading ? (
          <Grid item>
            <Typography variant="body1" classes={{ root: profileText }}>
              Welcome {state.firebaseUser.displayName}
            </Typography>
          </Grid>
        ) : null}
        <Grid item xs>
          {state.firebaseUser && !state.loading ? (
            <ButtonBase
              onClick={handleClick}
              classes={{ root: classes.avatarButton }}
            >
              <Avatar
                className={classes.userAvatar}
                alt="Remy Sharp"
                src={state.firebaseUser.photoURL}
              />
            </ButtonBase>
          ) : (
            state.loading && (
              <CircularProgress size={28} className={classes.fabProgress} />
            )
          )}
        </Grid>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem
            onClick={() => {
              dispatch({ type: actionTypes.SET_LOADING, payload: true });
              handleClose();
              auth.signOut();
              dispatch({ type: actionTypes.LOGOUT_USER });
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Grid>
    );
  };

  const renderButtons = () => {
    return (
      <>
        {
          <Link
            to={routes.login}
            underline="none"
            color="inherit"
            component={RouterLink}
          >
            {invertOutlinedButton("Login")}
          </Link>
        }
        <Link
          to={routes.signUp}
          underline="none"
          color="inherit"
          component={RouterLink}
        >
          <PrimaryButton
            color="primary"
            disableElevation
            variant="contained"
            classes={{ root: classes.SignUpButton }}
            size="small"
          >
            Sign up
          </PrimaryButton>
        </Link>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={0}
          classes={{ container: classes.GridContainer }}
          direction="row"
        >
          <Grid container alignContent="center" item xs>
            <Grid item xs display="inline">
              <Typography
                display="inline"
                variant="h5"
                gutterBottom
                align="left"
                classes={{ root: lightColor }}
              >
                LOGO.
              </Typography>
            </Grid>
            <Grid item classes={{ root: classes.LeftLinks }}>
              <Link
                to={routes.landing}
                underline="none"
                color={page === pages.Landing ? "primary" : "inherit"}
                component={RouterLink}
              >
                <Typography
                  variant="body1"
                  gutterBottom
                  display="inline"
                  classes={{ root: linkColor }}
                >
                  <div
                    className="animateHover"
                    style={{ display: "inline", paddingBottom: 4 }}
                  >
                    Home
                  </div>
                </Typography>
              </Link>
              <Typography
                variant="body1"
                gutterBottom
                display="inline"
                classes={{ root: linkColor }}
              >
                About
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                display="inline"
                classes={{ root: linkColor }}
              >
                Contact
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="flex-end" alignContent="center" item xs>
            <Grid item classes={{ root: classes.ColouredPane }}>
              {state.loading || state.firebaseUser
                ? renderUser()
                : renderButtons()}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LandingNavbar;
