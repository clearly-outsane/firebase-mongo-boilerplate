import { makeStyles } from '@material-ui/core/styles'
import coloredPane from '../assets/svgs/Coloredpane.svg'

// DO NOT REMOVE! We need these imports for styles to take effect
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export const LeftPaneFormStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },

  GridContainer: {
    height: '100vh'
  },
  LeftContentGridContainer: {
    height: '100%'
  },
  coloredPane: {
    // backgroundColor: "rgb(29, 185, 84,0.12)",
    backgroundImage: `url(${coloredPane})`,

    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  whiteTextContainer: {
    color: 'white',
    width: '60%',
    marginLeft: 164
  },
  subtitleText: {
    color: 'white',
    marginRight: 148,
    marginLeft: 148,
    marginTop: 24,
    width: '55%'
  },
  formContainer: {
    marginTop: 140,
    marginLeft: 120,
    marginRight: 120
  },
  fbButton: {
    color: '#3b5998'
  }
}))

export const SignUpForm = makeStyles((theme) => ({
  form: {
    width: '100%'
  },
  formField: {
    marginTop: 24
  },
  halfFormField: {
    width: 'calc(50% - 12px)'
  },
  halfFullWidthFormField: {
    width: 'calc(100% - 12px)',
    marginLeft: 12
  },
  fieldSpace: {
    marginRight: 24
  },
  countryFieldSpace: {
    marginRight: 12
  },
  SignUpButton: {
    textTransform: 'none',
    marginTop: 24
  },
  stepperText: {
    marginRight: 24,
    color: 'rgba(0,0,0,0.5)'
  },
  backButton: {
    marginRight: 18
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18
    }
  },
  oneLastStep: {
    marginBottom: 24,
    fontSize: '1.5rem',
    fontWeight: 600
  },
  forgotPassword: { color: 'red', marginTop: 4 },
  LoginButton: { marginTop: 12 }
}))

export const LoginForm = makeStyles((theme) => ({
  form: {
    width: '100%'
  },
  formField: {
    marginTop: 24
  },
  halfFormField: {
    width: 'calc(50% - 12px)'
  },

  fieldSpace: {
    marginRight: 24
  },
  countryFieldSpace: {
    marginRight: 12
  },
  SignUpButton: {
    textTransform: 'none',
    marginTop: 24
  }
}))

export const ExternalForm = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  form: {
    width: '100%'
  },
  innerContainer: { padding: 24 },
  formFieldTopMargin: {
    marginTop: 24
  },
  container: { height: 240, width: '100%' },
  LoginButton: { marginTop: 24 },
  formHeader: { fontWeight: 700 },
  Links: {
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'underline'
    }
  }
}))
