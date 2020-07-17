import React, { useEffect, useContext, useState } from 'react'
import firebase from 'firebase/app'
import { CircularProgress } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import clsx from 'clsx'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { PrimaryButton } from '../styles/theme'
import { ExternalForm } from '../styles/Form'
import Paper from '@material-ui/core/Paper'
import { routes } from '../constants'
import { createNotification } from '../utils/Messages'
import { Context } from '../state/Store'

const LinkSignIn = ({ match, history }) => {
  const [verify, setVerify] = useState(false)
  const [savedEmail, setEmail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        email = match.params.email
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        // email = window.prompt("Please provide your email for confirmation");
        console.log(
          'Sign up from another computer/email not found locally',
          email
        )
      }
      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then(function (result) {
          console.log('isNewUser', result.additionalUserInfo.isNewUser)
          result.additionalUserInfo.isNewUser && setVerify(true)
          setEmail(email)
          /**
           * Recreate the user once password has been provided
           * Delete the user so that if they never finish the sign up flow
           * they can later be invited again and a user account
           * be created fresh
           *
           */
          var user = firebase.auth().currentUser

          user
            .delete()
            .then(function () {
              // User deleted.
              setLoading(false)
            })
            .catch(function (error) {
              console.log(error)
              // An error happened.
            })
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn')

          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch(function (error) {
          setLoading(false)
          console.log(error)
          createNotification(state, dispatch, {
            type: 'error',
            autoHide: true,
            message: error.message
              ? error.message
              : 'Oops! Something went wrong.'
          })
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        })
    }
    return () => {}
  }, [])

  const RenderForm = () => {
    return verify ? (
      <Formik
        validateOnMount
        validationSchema={Yup.object({
          password: Yup.string()
            .min(8, 'Password must contain at least 8 characters')
            .required('Password is required'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match'
          )
        })}
        initialValues={{ password: '', passwordConfirmation: '' }}
      >
        {(props) => <SetPassForm {...props} />}
      </Formik>
    ) : null
  }

  const SetPassForm = ({
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
    setFieldValue
  }) => {
    const classes = ExternalForm()
    const [showPassword, setShowPassword] = React.useState(false)

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
      event.preventDefault()
    }

    useEffect(() => {
      console.log(values)
      return () => {}
    }, [values])

    const change = (name, e) => {
      e.persist()
      handleChange(e)
      setFieldTouched(name, true, false)
    }

    const onFormSubmit = (e) => {
      e.preventDefault()
      firebase
        .auth()
        .createUserWithEmailAndPassword(savedEmail, values.password)
        .then((data) => {
          data.user
            .sendEmailVerification()
            .then(() => {
              console.log('Email verification sent')
            })
            .catch((e) => {
              console.log(e)
            })
          console.log('User created')
          history.push(routes.signUp)
        })
        .catch(function (error) {
          // Handle Errors here.

          console.log(error)
          var errorCode = error.code
          var errorMessage = error.message
          // ...
        })

      console.log('Submitted!', values)

      // submit form api call
    }
    return (
      <Container maxWidth='sm'>
        <form onSubmit={onFormSubmit}>
          <Grid
            container
            spacing={0}
            direction='row'
            alignItems='center'
            justify='center'
            style={{ minHeight: '100vh' }}
          >
            <Grid item xs>
              <Paper elevation={3}>
                <Grid
                  container
                  spacing={0}
                  direction='column'
                  className={classes.innerContainer}
                >
                  <Grid item xs>
                    <Typography
                      variant='h5'
                      align='left'
                      gutterBottom
                      className={clsx(classes.formHeader)}
                    >
                      Set password for {savedEmail}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography
                      variant='subtitle2'
                      align='left'
                      className={clsx(classes.subtitleForm)}
                    >
                      You have been invited to join Asset Distro. Set a password
                      to create your account. Invite links are valid only
                      one-time.
                    </Typography>
                  </Grid>

                  <Grid item xs className={clsx(classes.formFieldTopMargin)}>
                    <FormControl
                      required
                      className={clsx(classes.margin, classes.formField)}
                      variant='outlined'
                      fullWidth
                    >
                      <InputLabel htmlFor='outlined-adornment-password'>
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={change.bind(null, 'password')}
                        error={touched.password && Boolean(errors.password)}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                      <FormHelperText error id='my-helper-text'>
                        {touched.password && errors.password
                          ? errors.password
                          : ''}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs className={clsx(classes.formFieldTopMargin)}>
                    <FormControl
                      required
                      className={clsx(classes.margin, classes.formField)}
                      variant='outlined'
                      fullWidth
                    >
                      <InputLabel htmlFor='outlined-adornment-password'>
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        id='passwordConfirmation'
                        type={showPassword ? 'text' : 'password'}
                        value={values.passwordConfirmation}
                        onChange={change.bind(null, 'passwordConfirmation')}
                        error={
                          touched.passwordConfirmation &&
                          Boolean(errors.passwordConfirmation)
                        }
                        labelWidth={70}
                      />
                      <FormHelperText error id='my-helper-text'>
                        {touched.passwordConfirmation &&
                        errors.passwordConfirmation
                          ? errors.passwordConfirmation
                          : ''}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid
                    container
                    direction='row'
                    item
                    classes={{ root: classes.LoginButton }}
                  >
                    <Grid
                      container
                      alignItems='center'
                      item
                      xs
                      justify='flex-start'
                    />
                    <Grid container item xs justify='flex-end'>
                      <PrimaryButton
                        color='primary'
                        disableElevation
                        variant='contained'
                        size='large'
                        type='submit'
                        disabled={!isValid}
                      >
                        Create account
                      </PrimaryButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }

  return <div>{loading ? <CircularProgress /> : RenderForm()}</div>
}

export default LinkSignIn
