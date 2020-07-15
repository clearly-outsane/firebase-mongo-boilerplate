import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../state/Store";
import { DashboardNavbarStyles } from "../styles/Dashboard";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { pages, routes } from "../constants";
import clsx from "clsx";
import { auth } from "../config/firebase";
import { actionTypes } from "../state/constants";
import "../styles/linkAnimation.css";

const DashboardNavbar = () => {
  const classes = DashboardNavbarStyles();
  const [state, dispatch] = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  useEffect(() => {
    console.log(state);
    if (!state.loading) {
      if (!state.firebaseUser || !state.user) {
        history.push(routes.login);
      }
    }
    return () => {};
  }, [state, state.loading]);

  const renderUser = () => {
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
        justify="flex-end"
        alignItems="center"
        direction="row"
      >
        <ButtonBase
          onClick={handleClick}
          classes={{ root: classes.avatarButton }}
        >
          {state.firebaseUser ? (
            <Avatar
              className={classes.userAvatar}
              alt="User Avatar"
              src={state.firebaseUser.photoURL}
            />
          ) : (
            state.loading && (
              <CircularProgress size={28} className={classes.fabProgress} />
            )
          )}
        </ButtonBase>

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

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={0}
          alignItems="center"
          classes={{ container: classes.GridContainer }}
          direction="row"
          justify="space-between"
        >
          <Grid container alignItems="center" item xs display="inline">
            <Link
              to={routes.landing}
              underline="none"
              component={RouterLink}
              color="inherit"
            >
              <Typography
                display="inline"
                variant="h5"
                gutterBottom
                align="left"
              >
                LOGO.
              </Typography>
            </Link>
          </Grid>

          <Grid container xs item justify="center">
            <Link
              to={routes.dashboard}
              underline="none"
              component={RouterLink}
              color="inherit"
            >
              <Typography variant="body1" gutterBottom display="inline">
                <div
                  className="animateHover"
                  style={{ display: "inline", paddingBottom: 4 }}
                >
                  Overview
                </div>
              </Typography>
            </Link>
            <Link
              to={routes.myReleases}
              underline="none"
              component={RouterLink}
              color="inherit"
            >
              <Typography
                className={clsx(classes.Links)}
                variant="body1"
                gutterBottom
                display="inline"
              >
                <div
                  className="animateHover"
                  style={{ display: "inline", paddingBottom: 4 }}
                >
                  My releases
                </div>
              </Typography>
            </Link>
          </Grid>
          <Grid container xs item>
            {renderUser()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DashboardNavbar;
