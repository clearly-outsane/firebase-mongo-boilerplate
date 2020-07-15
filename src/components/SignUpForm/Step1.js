import React, { useContext, useEffect } from "react";
import { Context } from "../../state/Store";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { SignUpForm } from "../../styles/Form";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { PrimaryButton } from "../../styles/theme";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import "../../styles/formStyles.css";
import { Step } from "@material-ui/core";

const LoginForm = ({
  values,
  errors,
  touched,
  handleSubmit,
  handleChange,
  isValid,
  setFieldTouched,
  nextStep,
  step,
  validateForm,
}) => {
  const classes = SignUpForm();

  useEffect(() => {
    // This will be called everytime `step` changes:
    validateForm();
    return () => {};
  }, [step]);

  //Global state:
  const [state, dispatch] = useContext(Context);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const onFormSubmit = (e) => {
    console.log(values);

    e.preventDefault();

    nextStep();

    //submit form api call
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={0} justify="center">
        <form noValidate autoComplete="on" className={classes.form}>
          <TextField
            id="firstName"
            required
            label="First Name"
            variant="outlined"
            className={clsx(classes.halfFormField, classes.fieldSpace)}
            onChange={change.bind(null, "firstName")}
            value={values.firstName}
            error={touched.lastName && Boolean(errors.firstName)}
            helperText={
              touched.lastName && errors.firstName ? errors.firstName : ""
            }
          />
          <TextField
            id="lastName"
            required
            label="Last Name"
            variant="outlined"
            className={clsx(classes.halfFormField)}
            onChange={change.bind(null, "lastName")}
            value={values.lastName}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={
              touched.lastName && errors.lastName ? errors.lastName : ""
            }
          />
          <TextField
            id="businessName"
            fullWidth
            label="Business Name"
            variant="outlined"
            className={clsx(classes.formField)}
            onChange={change.bind(null, "businessName")}
            value={values.businessName}
          />
          <TextField
            id="email"
            required
            fullWidth
            label="Email"
            variant="outlined"
            className={clsx(classes.formField)}
            onChange={change.bind(null, "email")}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            helperText={touched.email && errors.email ? errors.email : ""}
          />
          <FormControl
            required
            className={clsx(classes.margin, classes.formField)}
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>

            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={change.bind(null, "password")}
              error={touched.password && Boolean(errors.password)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <FormHelperText error id="my-helper-text">
              {touched.password && errors.password ? errors.password : ""}
            </FormHelperText>
          </FormControl>
          <Grid container spacing={0} justify="flex-end" alignItems="center">
            <Typography
              variant="subtitle1"
              className={clsx(classes.stepperText, classes.SignUpButton)}
            >
              Step 1/2
            </Typography>

            <PrimaryButton
              color="primary"
              disableElevation
              variant="contained"
              classes={{ root: classes.SignUpButton }}
              size="large"
              onClick={onFormSubmit}
              disabled={!isValid}
            >
              Next
            </PrimaryButton>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default LoginForm;
