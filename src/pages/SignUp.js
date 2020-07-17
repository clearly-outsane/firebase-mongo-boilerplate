import React, { Component, useEffect, useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { Context } from "../state/Store";
import LandingNavbar from "../components/LandingNavbar";
import Step1 from "../components/SignUpForm/Step1";
import Step2 from "../components/SignUpForm/Step2";
import SocialSignInLastStep from "../components/SignUpForm/SocialSignInLastStep";
import LoginForm from "../components/LoginForm";
import { LeftPaneFormStyles } from "../styles/Form";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { pages, routes, countries } from "../constants";
import { Formik } from "formik";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { signInWithGoogle, signInWithFacebook } from "../state/api/User";

import {
  validationSchemaForLogin,
  validationSchemaForSignUp,
  loginValues,
  signUpValues,
  oneLastStep,
  oneLastStepSchema,
} from "../constants/form";
import { createNotification, dismissNotificationById } from "../utils/Messages";

import SelectInput from "@material-ui/core/Select/SelectInput";
import { actionTypes } from "../state/constants";

export const SignUp = ({ location }) => {
  const isLogin = location.pathname === routes.login;
  const isSignUp = location.pathname === routes.signUp;
  const maxSteps = 2;
  const classes = LeftPaneFormStyles();

  const [state, dispatch] = useContext(Context);
  const [step, setStep] = useState(1);
  const [countryValue, setCountryValue] = React.useState(countries[0]);
  const [notifId, setNotifId] = useState(null);

  const nextStep = () => {
    if (step < maxSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderLoginForm = () => {
    return (
      <Formik
        validationSchema={validationSchemaForLogin}
        initialValues={loginValues}
        render={(props) => <LoginForm {...props} />}
      />
    );
  };

  const renderSignUpForm = (props) => {
    switch (step) {
      default:
      case 1:
        return <Step1 nextStep={nextStep} step={step} {...props} />;

      case 2:
        return (
          <Step2
            prevStep={prevStep}
            countryValue={countryValue}
            setCountryValue={setCountryValue}
            step={step}
            {...props}
          />
        );
    }
  };

  useEffect(() => {
    // Warn the user to finish sign up if their mongo user isn't created yet
    // Also check if a notifId already exists before creating a new notification
    if (state.firebaseUser && !state.user && !state.loading) {
      const nId =
        notifId ||
        createNotification(state, dispatch, {
          isDismissible: true,
          message: <div>Complete the sign up form to gain full access</div>,
          type: "warning",
        });

      setNotifId(nId);
    }
    return () => {
      // cleanup - remove any notif if component unmounts
      notifId
        ? dismissNotificationById(dispatch, notifId)
        : console.log("no notifs", notifId);
    };
  }, [state.user, state.firebaseUser, notifId]);

  useEffect(() => {
    setStep(1); //Done so that sign up form resets and we won't have issues when switching from login form
  }, []);

  return (
    <div className={classes.root}>
      <RenderMessages />
      {state.user ? <Redirect to={routes.dashboard} /> : null}
      <LandingNavbar theme="dark" page={pages.SignUp} />
      <Grid
        container
        spacing={0}
        classes={{ container: classes.GridContainer }}
      >
        <Grid item xs={12} sm={6} classes={{ root: classes.coloredPane }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={clsx(classes.LeftContentGridContainer)}
          >
            <Grid item>
              <Typography
                variant="h2"
                gutterBottom
                classes={{ root: classes.whiteTextContainer }}
              >
                You make the Tune.
                <br /> We make it GO.
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                align="center"
                variant="h6"
                classes={{ root: classes.subtitleText }}
              >
                No matter what stage you're at in your career, We got your back.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.formContainer}>
            {state.firebaseUser && !state.loading ? null : (
              <>
                <Grid container spacing={0} justify="center">
                  <IconButton
                    onClick={() => {
                      dispatch({
                        type: actionTypes.SET_LOADING,
                        payload: true,
                      });
                      dispatch({
                        type: actionTypes.LOGIN_USER,
                        payload: { type: "google" },
                      });
                    }}
                  >
                    <FcGoogle />
                  </IconButton>
                  <IconButton
                    classes={{ root: classes.fbButton }}
                    onClick={signInWithFacebook}
                  >
                    <GrFacebook />
                  </IconButton>
                </Grid>

                <div className="separator">Or</div>
              </>
            )}
            {isLogin && (state.loading || !state.firebaseUser)
              ? renderLoginForm()
              : null}
            {isSignUp && (state.loading || !state.firebaseUser) ? (
              <Formik
                validateOnMount
                validationSchema={validationSchemaForSignUp[step - 1]}
                initialValues={signUpValues}
              >
                {(props) => renderSignUpForm(props)}
              </Formik>
            ) : null}
            {state.firebaseUser && !state.user && !state.loading ? (
              <Formik
                validateOnMount
                validationSchema={oneLastStepSchema}
                initialValues={oneLastStep}
              >
                {(props) => (
                  <SocialSignInLastStep
                    countryValue={countryValue}
                    setCountryValue={setCountryValue}
                    {...props}
                  />
                )}
              </Formik>
            ) : null}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
