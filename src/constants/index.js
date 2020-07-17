const pages = {
  Landing: 'Landing',
  SignUp: 'Sign Up',
  Login: 'Login',
  Dashboard: 'Dashboard'
}

const routes = {
  landing: '/',
  signUp: '/SignUp',
  dashboard: '/Dashboard',
  login: '/Login',
  uploadSong: '/Dashboard/Song',
  uploadAlbum: '/Dashboard/Album',
  forgotPassword: '/Forgot',
  myReleases: '/Dashboard/MyReleases',
  linkActionHandler: '/finishSignUp/:email'
}

export { default as countries } from './countries'
export { default as genres } from './genres'
export { default as languages } from './languages'
export { pages, routes }
