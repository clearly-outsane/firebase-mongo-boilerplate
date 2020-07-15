import React, { useState, useContext, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { ExternalForm } from "../styles/Form";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { PrimaryButton } from "../styles/theme";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { routes } from "../constants";
import { sendResetPassEmail } from "../state/api/User";
import { Context } from "../state/Store";

const ResetPassword = () => {
  return (
    <Formik
      validateOnMount
      validationSchema={Yup.object({
        email: Yup.string("Enter your email")
          .email("Enter a valid email")
          .required("Email is required"),
      })}
      initialValues={{ email: "" }}
    >
      {(props) => <RenderForm {...props} />}
    </Formik>
  );
};

const RenderForm = ({
  values,
  errors,
  touched,
  handleSubmit,
  handleChange,
  isValid,
  setFieldTouched,
  setFieldValue,
}) => {
  const classes = ExternalForm();
  const [state, dispatch] = useContext(Context);

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    sendResetPassEmail(state, dispatch, values.email);

    console.log("Submitted!", values);

    //submit form api call
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <form onSubmit={onFormSubmit}>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs>
              <Paper elevation={3}>
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  className={classes.innerContainer}
                >
                  <Grid item xs>
                    <Typography
                      variant="h5"
                      align="left"
                      gutterBottom
                      className={clsx(classes.formHeader)}
                    >
                      Verify your email
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography
                      variant="subtitle2"
                      align="left"
                      className={clsx(classes.subtitleForm)}
                    >
                      If your email is in our records we will email you a
                      password reset link
                    </Typography>
                  </Grid>

                  <Grid item xs className={clsx(classes.formFieldTopMargin)}>
                    <TextField
                      id="email"
                      name="email"
                      fullWidth
                      required
                      label="Email"
                      variant="outlined"
                      error={touched.email && Boolean(errors.email)}
                      onChange={change.bind(null, "email")}
                      helperText={
                        touched.email && errors.email ? errors.email : ""
                      }
                      value={values.email}
                    />
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    item
                    classes={{ root: classes.LoginButton }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      item
                      xs
                      justify="flex-start"
                    >
                      <Link
                        to={routes.login}
                        underline="none"
                        color="inherit"
                        component={RouterLink}
                        className={clsx(classes.Links)}
                      >
                        <Typography variant="subtitle2" align="left">
                          Back to login
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid container item xs justify="flex-end">
                      <PrimaryButton
                        color="primary"
                        disableElevation
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={!isValid}
                      >
                        Send email
                      </PrimaryButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default ResetPassword;
