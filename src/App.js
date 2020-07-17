import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Store from './state/Store'
import {
  Landing,
  SignUp,
  Dashboard,
  ResetPassword,
  LinkSignIn
} from '../src/pages'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './styles/theme'
import { routes } from './constants'
import RenderMessages from './utils/Messages'

const App = () => {
  return (
    <Router>
      <Store.Store>
        <ThemeProvider theme={theme}>
          <RenderMessages />
          <Switch>
            <Route exact path={routes.landing} component={Landing} />
            <Route exact path={routes.signUp} component={SignUp} />
            <Route exact path={routes.login} component={SignUp} />
            <Route path={routes.dashboard} component={Dashboard} />
            <Route path={routes.forgotPassword} component={ResetPassword} />
            <Route path={routes.linkActionHandler} component={LinkSignIn} />
          </Switch>
        </ThemeProvider>
      </Store.Store>
    </Router>
  )
}

export default App
