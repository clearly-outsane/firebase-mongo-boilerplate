/* eslint-disable no-use-before-define */
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { SignUpForm } from '../../styles/Form'
import { countries } from '../../constants'
import clsx from 'clsx'

export default function CountrySelect ({
  values,
  setFieldValue,
  countryValue,
  setCountryValue,
  error,
  helperText
}) {
  const classes = SignUpForm()

  return (
    <Autocomplete
      id='country-select-demo'
      options={countries.slice(1)}
      className={clsx(classes.option)}
      classes={{ root: classes.countryFieldSpace }}
      value={countryValue}
      onChange={(event, newInputValue) => {
        setCountryValue(newInputValue)
      }}
      inputValue={values.country}
      onInputChange={(event, newInputValue) => {
        setFieldValue('country', newInputValue)
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <>
          {option.label + ' '} ({option.code})
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Country'
          variant='outlined'
          required
          error={error}
          helperText={helperText}
          className={clsx(classes.formField)}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password' // disable autocomplete and autofill
          }}
        />
      )}
    />
  )
}
