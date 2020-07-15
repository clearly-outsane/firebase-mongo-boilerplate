import React, { useContext } from "react";
import { ReactComponent as SingleSvg } from "../assets/svgs/singleCard.svg";
import LandingNavbar from "../components/LandingNavbar";
import { LandingStyles } from "../styles/Landing";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { PrimaryButton } from "../styles/theme";
import { Link } from "react-router-dom";
import clsx from "clsx";

export const Landing = () => {
  const classes = LandingStyles();

  return (
    <div className={classes.root}>
      <LandingNavbar />
      <Grid
        container
        spacing={0}
        classes={{ container: classes.GridContainer }}
      >
        <Grid item xs={12} sm={6}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            classes={{ container: classes.leftGridContainer }}
          >
            <Grid item className={clsx(classes.TextContainer)}>
              <Typography
                variant="h2"
                gutterBottom
                align="center"
                className={classes.HeadingText}
              >
                Release your music to the world.
              </Typography>
            </Grid>
            <Grid item className={clsx(classes.TextContainer)}>
              <Typography
                variant="subtitle1"
                align="center"
                classes={{ root: classes.SmallerTextContainer }}
              >
                Tap into all major music platforms in a click. See where your
                fans are, where your money’s coming from, get every penny you
                deserve
              </Typography>
            </Grid>

            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={clsx(classes.LargeSignUpButtonContainer)}
            >
              <Link to="/SignUp" style={{ textDecoration: "none" }}>
                <PrimaryButton
                  color="primary"
                  disableElevation
                  variant="contained"
                  classes={{ root: classes.LargeSignUpButton }}
                  size="large"
                >
                  Get started
                </PrimaryButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} classes={{ root: classes.coloredPane }}>
          <div className={classes.imageContainer}>
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{ height: "100vh" }}
            >
              <SingleSvg />
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
