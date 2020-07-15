/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SignUpForm } from "../../styles/Form";
import clsx from "clsx";
import { Context } from "../../state/Store";
import { getSingles } from "../../state/api/Albums";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { theme } from "../../styles/theme";

function getStyles(name, personName) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SingleSelect({
  values,
  setFieldValue,
  error,
  helperText,
  setFieldTouched,
  index,
}) {
  const classes = SignUpForm();
  const [singles, setSingles] = useState([]);
  const [singlesValue, setSinglesValue] = useState([]);
  const [selectedSinglesValue, setSelectedSinglesValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (!!state.user && !!state.user.singles) {
      if (state.user.singles.length !== singles.length) {
        console.log("fetching singles");
        getSingles(state.user).then((s) => {
          console.log(s);
          setSingles(s);
          setLoading(false);
          setSinglesValue(s.map((single) => single.singleTitle));
        });
      }
      if (state.user.singles.length === 0) setLoading(false);
    }
    return () => {};
  }, [state.user]);

  useEffect(() => {
    if ((!!!state.user || !!!state.user.singles) && !state.initialLoading)
      setLoading(false);
    return () => {};
  }, [state.initialLoading]);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      size="small"
      className={classes.singleSelect}
    >
      <InputLabel id="demo-controlled-open-select-label">
        Select Singles
      </InputLabel>
      <Select
        label=" Select Singles"
        multiple
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        value={selectedSinglesValue}
        onChange={(event) => {
          setSelectedSinglesValue(event.target.value);
          setFieldValue("singles", event.target.value);
        }}
      >
        {loading ? (
          <Grid container justify="center">
            <CircularProgress size={24} />
          </Grid>
        ) : (
          singlesValue.map((single, index) => (
            <MenuItem
              key={single}
              value={singles[index]._id}
              style={getStyles(singlesValue, selectedSinglesValue)}
            >
              {single}
            </MenuItem>
          ))
        )}
      </Select>
      <FormHelperText>You may select multiple</FormHelperText>
    </FormControl>
  );
}
