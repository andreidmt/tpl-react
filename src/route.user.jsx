const debug = require("debug")("asd14:UserRoute")

import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

import { useAuth } from "@asd14/react-hooks"

import { BaseLayout } from "./layout.base/base"
import { UserLayout } from "./layout.user/user"

/**
 * Route with authentication
 *
 * Tip: Use Route to check authentication, Layout or Page components for
 * authorization
 *
 * @param {string}     path         Route path
 * @param {string}     redirectPath Redirect if JWT is not present and
 * @param {string}     profile      Switch to profile if route accessed
 * @param {React.Node} component    What to render
 * @param {boolean}    hasLayout    Will not use dedicated User layout
 *
 * @returns {ReactRouter.Route}
 **/
const UserRoute = ({
  path,
  redirectPath,
  component: Component,
  hasLayout,
  ...rest
}) => {
  const { isAuthenticated, isAuthenticating, canAuthenticate } = useAuth()
  const Layout = hasLayout ? UserLayout : BaseLayout

  return isAuthenticating || (canAuthenticate && !isAuthenticated) ? (
    <center>Authenticating ...</center>
  ) : (
    <Route
      {...rest}
      path={path}
      render={properties => {
        if (isAuthenticated) {
          return (
            <Layout>
              <Component {...properties} />
            </Layout>
          )
        }

        return (
          <Redirect
            to={{
              pathname: redirectPath,
              /* eslint-disable react/prop-types */
              state: { from: properties.location },
            }}
          />
        )
      }}
    />
  )
}

UserRoute.propTypes = {
  path: PropTypes.string,
  redirectPath: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  hasLayout: PropTypes.bool,
}

UserRoute.defaultProps = {
  path: undefined,
  redirectPath: "/",
  hasLayout: true,
}

export { UserRoute }
