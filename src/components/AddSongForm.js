import React, { useState, useEffect, useContext } from "react";
import { Context } from "../state/Store";
import { Formik, FieldArray, Field, getIn } from "formik";
import TextField from "@material-ui/core/TextField";
import { addSong, addSongSchema } from "../constants/form";
import Typography from "@material-ui/core/Typography";
import { DashboardFormStyles } from "../styles/Dashboard";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { MdClose } from "react-icons/md";
import { BsPlusSquare } from "react-icons/bs";
import { IconContext } from "react-icons";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import GenreSelect from "../components/SelectComponents/genreSelect";
import SecondaryGenreSelect from "../components/SelectComponents/genreSelectSecondary";
import LanguageSelect from "../components/SelectComponents/languageSelect";
import { PrimaryButton } from "../styles/theme";
import ImageIcon from "@material-ui/icons/Image";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { actionTypes } from "../state/constants";
import * as musicMetadata from "music-metadata-browser";
import { createNotification } from "../utils/Messages";
import { useHistory } from "react-router-dom";
import { routes } from "../constants";

const AddSongForm = () => {
  const classes = DashboardFormStyles();
  return (
    <Formik
      validateOnMount
      validationSchema={addSongSchema}
      initialValues={addSong}
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
  const [state, dispatch] = useContext(Context);
  const classes = DashboardFormStyles();
  const history = useHistory();
  var newDate = new Date();
  newDate.setDate(newDate.getDate() + 2);

  useEffect(() => {
    console.log(values, errors);
    return () => {};
  }, [values, errors]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    //Check music file for specifications
    musicMetadata.parseBlob(values.file).then((metadata) => {
      if (metadata.format.bitrate >= 320000) {
        console.log("bitrate check passed");
        if (metadata.format.sampleRate >= 44100) {
          console.log("sampling rate check passed");
          if (metadata.format.numberOfChannels === 2) {
            //Send form data if all specifications pass
            let formData = new FormData();
            for (var key in values) {
              if (
                key !== "img" &&
                key !== "file" &&
                key !== "musicVideoUrl" &&
                key !== "releaseDateAndTime"
              )
                formData.append(key, values[key]);
            }
            formData.append("cover_art", values.img);
            formData.append("music_file", values.file);
            formData.append("videoUrl", values.musicVideoUrl);
            formData.append("releaseDate", values.releaseDateAndTime);
            dispatch({
              type: actionTypes.SUBMIT_SINGLES,
              payload: {
                body: formData,
                cb: redirectOnSubmit,
              },
            });
            console.log("Submitted!", values, state.waitSinglesSubmit);
          } else {
            createNotification(state, dispatch, {
              type: "error",
              autoHide: true,
              message: "Music file must be stereo i.e have 2 channels",
            });
          }
        } else {
          createNotification(state, dispatch, {
            type: "error",
            autoHide: true,
            message: "Music file must have a minimum sampling rate of 44.1kHz",
          });
        }
      } else {
        createNotification(state, dispatch, {
          type: "error",
          autoHide: true,
          message: "Music file must have a minimum bitrate of 320kB/s",
        });
      }
    });
    const redirectOnSubmit = () => {
      history.push(routes.myReleases);
    };
  };

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        align="left"
        className={clsx(classes.formHeading)}
      >
        Add your single
      </Typography>
      <Grid container justify="center" alignContent="center">
        <form onSubmit={onFormSubmit} className={clsx(classes.form)}>
          <Typography
            variant="subtitle1"
            align="left"
            className={clsx(classes.formHeading)}
          >
            Identifiers
          </Typography>
          <Grid container direction="row">
            <Grid item xs className={clsx(classes.fieldRightMargin)}>
              <TextField
                id="singleTitle"
                fullWidth
                required
                size="small"
                label="Single Title"
                variant="outlined"
                error={touched.singleTitle && Boolean(errors.singleTitle)}
                onChange={change.bind(null, "singleTitle")}
                value={values.singleTitle}
                helperText={
                  touched.singleTitle && errors.singleTitle
                    ? errors.singleTitle
                    : ""
                }
              />
            </Grid>
            <Grid item xs className={clsx(classes.fieldRightMargin)}>
              <TextField
                id="upcCode"
                fullWidth
                type="number"
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                size="small"
                label="UPC Code"
                variant="outlined"
                error={touched.upcCode && Boolean(errors.upcCode)}
                onChange={change.bind(null, "upcCode")}
                value={values.upcCode}
                helperText={
                  touched.upcCode && errors.upcCode
                    ? errors.upcCode
                    : "If left blank one will be autogenerated"
                }
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="isrcCode"
                fullWidth
                size="small"
                label="ISRC Code"
                variant="outlined"
                error={touched.isrcCode && Boolean(errors.isrcCode)}
                onChange={change.bind(null, "isrcCode")}
                value={values.isrcCode}
                helperText={
                  touched.isrcCode && errors.isrcCode
                    ? errors.isrcCode
                    : "If left blank one will be autogenerated"
                }
              />
            </Grid>
          </Grid>
          <Grid container direction="column">
            <FieldArray name="artists">
              {({ push, remove }) => (
                <div>
                  {values.artists.map((artist, index) => {
                    const name = `artists[${index}]`;

                    return (
                      <div key={index}>
                        <Grid
                          container
                          direction="row"
                          item
                          className={clsx(
                            classes.halfFormField,
                            classes.formFieldTopMargin
                          )}
                          alignItems="center"
                        >
                          <Grid item xs>
                            <TextField
                              id={name}
                              fullWidth
                              required
                              size="small"
                              value={artist}
                              label="Main Artist(s)"
                              variant="outlined"
                              onChange={change.bind(null, name)}
                              error={
                                touched.artists && name === "artists[0]"
                                  ? Boolean(errors.artists)
                                  : false
                              }
                              helperText={
                                typeof touched.artists !== "undefined" &&
                                name === "artists[0]"
                                  ? errors.artists
                                    ? errors.artists
                                    : ""
                                  : null
                              }
                            />
                          </Grid>
                          <Grid item>
                            {index === 0 ? (
                              <IconButton
                                onClick={() => push("")}
                                aria-label="delete"
                              >
                                <BsPlusSquare />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => remove(index)}
                                aria-label="delete"
                              >
                                <IconContext.Provider
                                  value={{
                                    color: "red",
                                  }}
                                >
                                  <div>
                                    <MdClose />
                                  </div>
                                </IconContext.Provider>
                              </IconButton>
                            )}
                          </Grid>
                        </Grid>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>
          </Grid>
          <Typography
            variant="subtitle1"
            align="left"
            className={clsx(classes.formHeading, classes.formFieldTopMargin)}
          >
            Release
          </Typography>
          <Grid
            container
            direction="row"
            className={classes.formFieldTopMargin}
          >
            <Grid
              item
              className={clsx(classes.halfFormField, classes.fieldRightMargin)}
            >
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker
                  id="releaseDateAndTime"
                  clearable
                  size="small"
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Release Date and Time"
                  value={values.releaseDateAndTime}
                  InputAdornmentProps={{ position: "end" }}
                  onChange={(value) =>
                    setFieldValue("releaseDateAndTime", value.format())
                  }
                  minDate={new Date()}
                  fullWidth
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid
              item
              container
              justify="space-around"
              className={clsx(classes.halfFormField)}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={values.worldwide}
                    onChange={handleChange}
                    id="worldwide"
                    color="primary"
                  />
                }
                label="Wordwide Release"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={values.previousRelease}
                    onChange={handleChange}
                    id="previousRelease"
                    color="primary"
                  />
                }
                label="Previously Released"
              />
            </Grid>
          </Grid>
          <Typography
            variant="subtitle1"
            align="left"
            className={clsx(classes.formHeading, classes.formFieldTopMargin)}
          >
            Label and genre
          </Typography>
          <Grid
            container
            direction="row"
            className={classes.formFieldTopMargin}
          >
            <Grid item xs className={clsx(classes.fieldRightMargin)}>
              <TextField
                id="labelName"
                fullWidth
                required
                size="small"
                label="Label"
                variant="outlined"
                error={touched.labelName && Boolean(errors.labelName)}
                onChange={change.bind(null, "labelName")}
                value={values.labelName}
                helperText={
                  touched.labelName && errors.labelName ? errors.labelName : ""
                }
              />
            </Grid>
            <Grid item xs className={clsx(classes.fieldRightMargin)}>
              <GenreSelect
                values={values}
                setFieldValue={setFieldValue}
                error={touched.primaryGenre && Boolean(errors.primaryGenre)}
                helperText={
                  touched.primaryGenre && errors.primaryGenre
                    ? errors.primaryGenre
                    : ""
                }
                setFieldTouched={setFieldTouched}
              />
            </Grid>
            <Grid item xs>
              <SecondaryGenreSelect
                values={values}
                setFieldValue={setFieldValue}
                error={touched.secondaryGenre && Boolean(errors.secondaryGenre)}
                helperText={
                  touched.secondaryGenre && errors.secondaryGenre
                    ? errors.secondaryGenre
                    : ""
                }
                setFieldTouched={setFieldTouched}
              />
            </Grid>
          </Grid>
          <Typography
            variant="subtitle1"
            align="left"
            className={clsx(classes.formHeading, classes.formFieldTopMargin)}
          >
            Content details
          </Typography>
          <Grid
            container
            direction="row"
            className={classes.formFieldTopMargin}
            justify="space-around"
          >
            <Grid item className={clsx(classes.fieldRightMargin)}>
              <FormControlLabel
                control={
                  <Switch
                    checked={values.explicit}
                    onChange={handleChange}
                    id="explicit"
                    color="primary"
                  />
                }
                label="Explicit"
              />
            </Grid>
            <Grid item xs className={clsx(classes.fieldRightMargin)}>
              <LanguageSelect
                values={values}
                setFieldValue={setFieldValue}
                error={touched.language && Boolean(errors.language)}
                helperText={
                  touched.language && errors.language ? errors.language : ""
                }
                setFieldTouched={setFieldTouched}
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="recordingLocation"
                fullWidth
                required
                size="small"
                label="Recording Location"
                variant="outlined"
                error={
                  touched.recordingLocation && Boolean(errors.recordingLocation)
                }
                onChange={change.bind(null, "recordingLocation")}
                value={values.recordingLocation}
                helperText={
                  touched.recordingLocation && errors.recordingLocation
                    ? errors.recordingLocation
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            className={classes.formFieldTopMargin}
          >
            <Grid item className={clsx(classes.fieldRightMargin)}>
              <Grid container alignItems="center" direction="column">
                <Grid item>
                  <input
                    accept="image/jpg,image/jpeg,image/png"
                    className={classes.uploadImage}
                    id="uploadCoverArt"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("img", event.currentTarget.files[0]);
                    }}
                  />
                  <label htmlFor="uploadCoverArt">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.uploadImageButton}
                      startIcon={<ImageIcon />}
                      component="span"
                    >
                      {!!values.img && "name" in values.img
                        ? values.img.name
                        : "Upload Cover Art"}
                    </Button>
                  </label>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    align="left"
                    className={clsx(classes.uploadHelperText)}
                  >
                    {!!values.img && errors.img ? errors.img : ""}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={clsx(classes.fieldRightMargin)}>
              <Grid container alignItems="center" direction="column">
                <Grid item>
                  <input
                    accept=".mp3,.wav"
                    className={classes.uploadImage}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.uploadImageButton}
                      startIcon={<MusicNoteIcon />}
                      component="span"
                    >
                      {!!values.file && "name" in values.file
                        ? values.file.name
                        : "Upload Song File"}
                    </Button>
                  </label>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    align="left"
                    className={clsx(classes.uploadHelperText)}
                  >
                    {!!values.file && errors.file ? errors.file : ""}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <TextField
                id="musicVideoUrl"
                fullWidth
                size="small"
                label="Music video URL"
                variant="outlined"
                error={touched.musicVideoUrl && Boolean(errors.musicVideoUrl)}
                onChange={change.bind(null, "musicVideoUrl")}
                value={values.musicVideoUrl}
                helperText={
                  touched.musicVideoUrl && errors.musicVideoUrl
                    ? errors.musicVideoUrl
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={0} justify="flex-end" alignItems="center">
            <PrimaryButton
              color="primary"
              disableElevation
              variant="contained"
              classes={{ root: classes.formFieldTopMargin }}
              size="large"
              type="submit"
              disabled={!isValid}
            >
              {state.waitSinglesSubmit ? (
                <CircularProgress
                  color="secondary"
                  size={28}
                  className={classes.fabProgress}
                />
              ) : (
                "Submit"
              )}
            </PrimaryButton>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default AddSongForm;
