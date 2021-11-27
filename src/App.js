import PropTypes from 'prop-types'
import React from "react"

import { Switch, useHistory, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"
import PrivateRoute from "./routes/middleware/PrivateRoute"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

// Import Firebase Configuration file

import fakeBackend from "./helpers/AuthType/fakeBackend"

import Amplify, { Auth, Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
Amplify.Logger.LOG_LEVEL = 'DEBUG';
// Activating fake backend
fakeBackend()

const App = props => {
  function getLayout() {
    let layoutCls = VerticalLayout

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
            />
          ))}

          {userRoutes.map((route, idx) => (
            <PrivateRoute
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
