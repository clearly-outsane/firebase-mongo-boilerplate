/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { SignUpForm } from '../../styles/Form'
import { genres } from '../../constants'
import clsx from 'clsx'

export default function GenreSelect ({
  values,
  setFieldValue,
  error,
  helperText,
  setFieldTouched
}) {
  const classes = SignUpForm()
  const parsedGenres = Object.keys(genres)
  const [primaryGenreValue, setPrimaryGenreValue] = useState(null)

  return (
    <Autocomplete
      id='country-select-demo'
      options={parsedGenres}
      className={clsx(classes.option)}
      value={primaryGenreValue}
      onChange={(event, newInputValue) => {
        setPrimaryGenreValue(newInputValue)
      }}
      inputValue={values.primaryGenre}
      onInputChange={(event, newInputValue) => {
        setFieldTouched('primaryGenre', true, false)
        setFieldValue('primaryGenre', newInputValue)
      }}
      autoHighlight
      size='small'
      getOptionLabel={(option) => option}
      renderOption={(option) => <>{option}</>}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Primary Genre'
          variant='outlined'
          required
          error={error}
          helperText={helperText}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password' // disable autocomplete and autofill
          }}
        />
      )}
    />
  )
}
