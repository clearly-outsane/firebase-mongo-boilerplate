/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SignUpForm } from "../../styles/Form";
import { genres } from "../../constants";
import clsx from "clsx";

export default function GenreSelect({
  values,
  setFieldValue,
  error,
  helperText,
  setFieldTouched,
}) {
  const classes = SignUpForm();
  const [parsedGenres, setParsedGenres] = useState([""]);
  const [secondaryGenreValue, setSecondaryGenreValue] = useState(null);

  useEffect(() => {
    setFieldValue("secondaryGenre", "");
    setSecondaryGenreValue(null);
    values.primaryGenre in genres
      ? setParsedGenres(genres[values.primaryGenre])
      : setParsedGenres([""]);
    return () => {};
  }, [values.primaryGenre]);

  return (
    <Autocomplete
      id="country-select-demo"
      options={parsedGenres}
      className={clsx(classes.option)}
      value={secondaryGenreValue}
      onChange={(event, newInputValue) => {
        setSecondaryGenreValue(newInputValue);
      }}
      inputValue={values.secondaryGenre}
      onInputChange={(event, newInputValue) => {
        setFieldTouched("secondaryGenre", true, false);
        setFieldValue("secondaryGenre", newInputValue);
      }}
      autoHighlight
      size="small"
      getOptionLabel={(option) => option}
      renderOption={(option) => <React.Fragment>{option}</React.Fragment>}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Secondary Genre"
          variant="outlined"
          error={error}
          helperText={helperText}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
