/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SignUpForm } from "../../styles/Form";
import { languages } from "../../constants";
import clsx from "clsx";

export default function GenreSelect({
  values,
  setFieldValue,
  error,
  helperText,
  setFieldTouched,
}) {
  const classes = SignUpForm();
  const [lang, setLang] = useState(null);

  return (
    <Autocomplete
      id="country-select-demo"
      options={languages}
      className={clsx(classes.option)}
      value={lang}
      onChange={(event, newInputValue) => {
        setLang(newInputValue);
      }}
      inputValue={values.language}
      onInputChange={(event, newInputValue) => {
        setFieldTouched("language", true, false);
        setFieldValue("language", newInputValue);
      }}
      autoHighlight
      size="small"
      getOptionLabel={(option) => option.name}
      renderOption={(option) => <React.Fragment>{option.name}</React.Fragment>}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Language"
          variant="outlined"
          required
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
