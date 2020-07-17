import { makeStyles } from '@material-ui/core/styles'
import backgroundImage from '../assets/imgs/single.jpg'
import backgroundImage2 from '../assets/imgs/album.jpg'
import backgroundImage3 from '../assets/imgs/confettiColor.jpg'

// DO NOT REMOVE! We need these imports for styles to take effect
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import TableRow from '@material-ui/core/TableRow'

export const DashboardStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  ContentContainer: {
    marginTop: 124
  },
  dashButtons: {
    marginRight: 24,
    height: 132,
    width: 132
  },
  singleBackground: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom'
  },
  albumBackground: {
    backgroundImage: `url(${backgroundImage2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom'
  },
  colorBackground3: {
    backgroundImage: `url(${backgroundImage3})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom'
  },
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    borderRadius: 4,
    color: 'white'
  },
  dashSubtitle: { fontWeight: 700, fontSize: '1.5rem', marginBottom: 24 },
  headerTopMargin: { marginTop: 64 }
}))

export const DashboardNavbarStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  GridContainer: {
    marginTop: 24,
    marginBottom: 24
  },
  Links: {
    marginLeft: 18
  },
  avatarButton: {
    marginLeft: 12,
    color: 'white'
  },
  userAvatar: {
    height: 32,
    width: 32
  }
}))

export const DashboardFormStyles = makeStyles((theme) => ({
  form: {
    width: '100%'
  },
  formFieldTopMargin: {
    marginTop: 24
  },
  halfFormField: {
    width: 'calc(50% - 12px)'
  },
  fieldRightMargin: {
    marginRight: 24
  },
  countryFieldSpace: {
    marginRight: 12
  },
  formHeading: { marginBottom: 24 },
  uploadImage: { display: 'none' },
  uploadImageButton: { color: 'white' },
  uploadHelperText: { color: 'red', fontSize: '0.8rem', marginTop: 4 }
}))

export const SingleCardStyles = makeStyles((theme) => ({
  marginTop: { marginTop: 8 },
  paperContainer: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: 180,
    width: 180
  },
  contentText: { color: 'white' },
  containerSpacing: { margin: 12 },
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.35)',
    borderRadius: 4,
    color: 'white'
  },
  cardContainer: { padding: 12 },
  longText: {
    width: 156,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}))

export const AlbumStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: theme.palette.primary.faded
  },
  coloredRow: {
    backgroundColor: theme.palette.action.hover
  },
  imgContainer: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: 64,
    width: 64
  },
  whiteCellText: { color: 'white' },
  leftMargin: { marginLeft: 8 },
  longText: {
    width: 'fit-content',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  containerSpacing: { marginBottom: 8 },
  paginationRoot: { flexShrink: 0, flexGrow: 1, width: '100%' }
}))
