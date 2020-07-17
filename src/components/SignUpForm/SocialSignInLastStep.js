import React, { useContext, useEffect } from 'react'
import { Context } from '../../state/Store'
import { actionTypes } from '../../state/constants'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { SignUpForm } from '../../styles/Form'
import clsx from 'clsx'
import { PrimaryButton } from '../../styles/theme'
import Typography from '@material-ui/core/Typography'
import CountrySelect from './countrySelect'
import '../../styles/formStyles.css'

const SocialSignInLastStep = ({
  countryValue,
  setCountryValue,
  values,
  errors,
  touched,
  handleSubmit,
  handleChange,
  isValid,
  setFieldTouched,
  setFieldValue,

  validateForm
}) => {
  const classes = SignUpForm()
  // Global state:
  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    validateForm()
    return () => {}
  }, [])

  const change = (name, e) => {
    e.persist()
    handleChange(e)
    setFieldTouched(name, true, false)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()

    if (!isValid) {
      return console.log('Some errors exist', errors)
    }

    dispatch({
      type: actionTypes.CREATE_USER,
      payload: {
        body: {
          ...values,
          email: state.firebaseUser.email,
          uid: state.firebaseUser.uid
        }
      }
    })

    console.log('Submitted!')

    // submit form api call
  }

  return (
    <div className={classes.container}>
      <Typography
        variant='h5'
        gutterBottom
        align='left'
        className={classes.oneLastStep}
      >
        Just one last step
      </Typography>
      <Grid container spacing={0} justify='center'>
        <form
          noValidate
          autoComplete='on'
          className={classes.form}
          onSubmit={onFormSubmit}
        >
          <TextField
            id='firstName'
            required
            label='First Name'
            variant='outlined'
            className={clsx(classes.halfFormField, classes.fieldSpace)}
            onChange={change.bind(null, 'firstName')}
            value={values.firstName}
            error={touched.lastName && Boolean(errors.firstName)}
            helperText={
              touched.lastName && errors.firstName ? errors.firstName : ''
            }
          />
          <TextField
            id='lastName'
            required
            label='Last Name'
            variant='outlined'
            className={clsx(classes.halfFormField)}
            onChange={change.bind(null, 'lastName')}
            value={values.lastName}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={
              touched.lastName && errors.lastName ? errors.lastName : ''
            }
          />
          <TextField
            id='businessName'
            fullWidth
            label='Business Name'
            variant='outlined'
            className={clsx(classes.formField)}
            onChange={change.bind(null, 'businessName')}
            value={values.businessName}
          />
          <TextField
            id='address'
            fullWidth
            required
            label='Address'
            variant='outlined'
            className={clsx(classes.formField)}
            onChange={change.bind(null, 'address')}
            value={values.address}
            error={touched.address && Boolean(errors.address)}
            helperText={touched.address && errors.address ? errors.address : ''}
          />
          <Grid
            container
            justify='space-between'
            alignItems='center'
            direction='row'
          >
            <Grid item xs>
              <CountrySelect
                values={values}
                countryValue={countryValue}
                setCountryValue={setCountryValue}
                setFieldValue={setFieldValue}
                error={touched.country && Boolean(errors.country)}
                helperText={
                  touched.country && errors.country ? errors.country : ''
                }
              />
            </Grid>
            <Grid item xs>
              <TextField
                id='state'
                required
                label='State'
                variant='outlined'
                value={values.state}
                className={clsx(
                  classes.formField,
                  classes.halfFullWidthFormField
                )}
                fullWidth
                onChange={change.bind(null, 'state')}
                error={touched.state && Boolean(errors.state)}
                helperText={touched.state && errors.state ? errors.state : ''}
              />
            </Grid>
          </Grid>
          <TextField
            id='zipCode'
            required
            label='Zip code'
            value={values.zipCode}
            variant='outlined'
            className={clsx(
              classes.halfFormField,
              classes.formField,
              classes.fieldSpace
            )}
            onChange={change.bind(null, 'zipCode')}
            error={touched.zipCode && Boolean(errors.zipCode)}
            helperText={touched.zipCode && errors.zipCode ? errors.zipCode : ''}
          />
          <TextField
            id='phoneNumber'
            value={values.phoneNumber}
            required
            type='number'
            label='Phone Number'
            variant='outlined'
            className={clsx(classes.halfFormField, classes.formField)}
            onChange={change.bind(null, 'phoneNumber')}
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            helperText={
              touched.phoneNumber && errors.phoneNumber
                ? errors.phoneNumber
                : ''
            }
            onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
          />
          <Grid container spacing={0} justify='flex-end' alignItems='center'>
            <PrimaryButton
              color='primary'
              disableElevation
              variant='contained'
              classes={{ root: classes.SignUpButton }}
              size='large'
              type='submit'
              disabled={!isValid}
            >
              Finish
            </PrimaryButton>
          </Grid>
        </form>
      </Grid>
    </div>
  )
}

export default SocialSignInLastStep
