import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../state/Store'
import DashboardNavbar from '../components/DashboardNavbar'
import { DashboardStyles } from '../styles/Dashboard'
import Container from '@material-ui/core/Container'
import { DashButtons, PrimaryButton } from '../styles/theme'
import { routes } from '../constants'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import AddSongForm from '../components/AddSongForm'
import AlbumForm from '../components/AlbumForm'
import { actionTypes } from '../state/constants'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import SingleList from '../components/SingleList'
import { Formik } from 'formik'
import TextField from '@material-ui/core/TextField'
import * as Yup from 'yup'

import AlbumList from '../components/AlbumList'
import { CircularProgress } from '@material-ui/core'

const InviteUserForm = ({
  values,
  errors,
  touched,
  handleSubmit,
  handleChange,
  isValid,
  setFieldTouched,
  setFieldValue
}) => {
  const [state, dispatch] = useContext(Context)

  const onFormSubmit = (e) => {
    e.preventDefault()

    // validate and send invite
    dispatch({ type: actionTypes.SEND_INVITE_EMAIL, payload: values.email })
  }

  const change = (name, e) => {
    e.persist()
    handleChange(e)
    setFieldTouched(name, true, false)
  }
  return (
    <div style={{ padding: 12 }}>
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
          helperText={touched.email && errors.email ? errors.email : ''}
        />
        <Grid container justify='flex-end'>
          <PrimaryButton
            color='primary'
            size='small'
            disableElevation
            variant='contained'
            // classes={{ root: classes.LoginButton }}

            type='submit'
            disabled={!isValid}
            style={{ margin: 8 }}
          >
            Invite
          </PrimaryButton>
        </Grid>
      </form>
    </div>
  )
}

const Dashboard = ({ location }) => {
  const classes = DashboardStyles()
  const [state, dispatch] = useContext(Context)
  const [showButtons, setShowButtons] = useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [hover, setHover] = useState('')
  const [disable, setDisable] = useState(true)

  const isSong = location.pathname === routes.uploadSong
  const isAlbum = location.pathname === routes.uploadAlbum
  const myReleases = location.pathname === routes.myReleases
  const open = Boolean(anchorEl)
  const id = open ? 'invite-email-form' : undefined

  useEffect(() => {
    if (isSong || isAlbum || myReleases) setShowButtons(false)
    else setShowButtons(true)
    return () => {}
  }, [location])

  useEffect(() => {
    setHover('') // Rest any hover effects if page is changed
    return () => {}
  }, [location])

  useEffect(() => {
    if (state.firebaseUser) {
      state.firebaseUser.emailVerified ? setDisable(false) : setDisable(true)
    }
    return () => {}
  }, [state.firebaseUser])

  const renderDashboardButtons = () => {
    return (
      <>
        <Grid container>
          <Typography
            variant='h5'
            gutterBottom
            align='left'
            className={clsx(classes.dashSubtitle)}
          >
            Create a release
          </Typography>
        </Grid>
        <Grid container>
          <Link
            to={routes.uploadSong}
            underline='none'
            color='inherit'
            component={RouterLink}
          >
            <Paper
              elevation={hover === 'Single' ? 7 : 0}
              className={clsx(classes.dashButtons, classes.singleBackground)}
              onMouseOver={() => setHover('Single')}
              onMouseOut={() => setHover('')}
            >
              <div className={classes.overlay}>
                <DashButtons.UploadSong>Single</DashButtons.UploadSong>
              </div>
            </Paper>
          </Link>
          <Link
            to={routes.uploadAlbum}
            underline='none'
            color='inherit'
            component={RouterLink}
          >
            <Paper
              elevation={hover === 'Album' ? 7 : 0}
              className={clsx(classes.dashButtons, classes.albumBackground)}
              onMouseOver={() => setHover('Album')}
              onMouseOut={() => setHover('')}
            >
              <div className={classes.overlay}>
                <DashButtons.UploadSong>Album</DashButtons.UploadSong>
              </div>
            </Paper>
          </Link>
        </Grid>
        <Grid container>
          <Typography
            variant='h5'
            gutterBottom
            align='left'
            className={clsx(classes.dashSubtitle, classes.headerTopMargin)}
          >
            Invite
          </Typography>
        </Grid>
        <Grid container>
          <Paper
            elevation={hover === 'emailInvite' ? 7 : 0}
            className={clsx(classes.dashButtons, classes.colorBackground3)}
            onMouseOver={() => setHover('emailInvite')}
            onMouseOut={() => setHover('')}
          >
            <div className={classes.overlay}>
              <DashButtons.UploadSong
                onClick={(e) => setAnchorEl(e.currentTarget)}
                aria-describedby={id}
              >
                Invite by email
              </DashButtons.UploadSong>
            </div>
            <Popover
              elevation={0}
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={() => {
                setHover('')
                setAnchorEl(null)
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <Formik
                validateOnMount
                validationSchema={Yup.object({
                  email: Yup.string('Enter your email')
                    .email('Enter a valid email')
                    .required('Email is required')
                })}
                initialValues={{ email: '' }}
              >
                {(props) => <InviteUserForm {...props} />}
              </Formik>
            </Popover>
          </Paper>
        </Grid>
      </>
    )
  }
  const checkVerify = () => {
    if (!disable) {
      return (
        <>
          {showButtons ? renderDashboardButtons() : null}
          {isSong ? <AddSongForm /> : null}
          {isAlbum ? <AlbumForm /> : null}
          {myReleases ? (
            <>
              <SingleList />
              <AlbumList />
            </>
          ) : null}
        </>
      )
    } else {
      if (state.initialLoading) {
        return (
          <Grid container justify='center'>
            <CircularProgress size={36} />
          </Grid>
        )
      } else {
        return (
          <Typography variant='body1'>
            Verify your account to gain access. Click here to resend
            verification email.
          </Typography>
        )
      }
    }
  }

  return (
    <div className={classes.root}>
      <Container maxWidth='lg'>
        <DashboardNavbar />
        <div className={classes.ContentContainer}>{checkVerify()}</div>
      </Container>
    </div>
  )
}

export default Dashboard
