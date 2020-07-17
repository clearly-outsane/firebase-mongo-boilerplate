import React, { useEffect, useContext } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { PrimaryButton } from '../styles/theme'
import { SignUpForm } from '../styles/Form'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import clsx from 'clsx'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { pages, routes } from '../constants'

import { Context } from '../state/Store'
import { actionTypes } from '../state/constants'

const LoginForm = ({
  values,
  errors,
  touched,
  handleSubmit,
  handleChange,
  isValid,
  setFieldTouched
}) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [submit, setSubmit] = React.useState(false)
  const [state, dispatch] = useContext(Context)
  const classes = SignUpForm()

  const onFormSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: actionTypes.SET_LOADING, payload: true })
    setSubmit(true)
    console.log('Submitted!', values)

    dispatch({
      type: actionTypes.LOGIN_USER,
      body: { email: values.email, password: values.password },
      payload: { type: 'email' }
    })
    // submit form api call
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const change = (name, e) => {
    if (submit) setSubmit(false)
    e.persist()
    handleChange(e)
    setFieldTouched(name, true, false)
  }

  useEffect(() => {
    console.log(values)
    return () => {}
  }, [])

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <TextField
          id='email'
          name='email'
          fullWidth
          required
          label='Email'
          variant='outlined'
          error={touched.email && Boolean(errors.email)}
          onChange={change.bind(null, 'email')}
          value={values.email}
          helperText={
            (submit || touched.email) && errors.email ? errors.email : ''
          }
        />

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
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          <FormHelperText error id='my-helper-text'>
            {(submit || touched.password) && errors.password
              ? errors.password
              : ''}
          </FormHelperText>
        </FormControl>
        <Grid container direction='row'>
          <Grid item xs container justify='flex-start'>
            <Link
              to={routes.forgotPassword}
              underline='none'
              color='inherit'
              component={RouterLink}
            >
              <Typography
                variant='subtitle2'
                align='left'
                className={clsx(classes.forgotPassword)}
              >
                Forgot password?
              </Typography>
            </Link>
          </Grid>
          <Grid
            item
            xs
            container
            spacing={0}
            justify='flex-end'
            alignItems='center'
          >
            <PrimaryButton
              color='primary'
              disableElevation
              variant='contained'
              classes={{ root: classes.LoginButton }}
              size='large'
              type='submit'
              disabled={!isValid}
            >
              Login
            </PrimaryButton>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default LoginForm
