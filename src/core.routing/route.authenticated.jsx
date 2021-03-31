const debug = require("debug")("tpl-react:AuthenticatedRoute")

import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "@asd14/react-hooks"

import { UserLayout } from "layout.user/user"

const AuthenticatedRoute = ({
  path,
  redirectPath,
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, isAuthenticating, canAuthenticate } = useAuth()

  return isAuthenticating || (canAuthenticate && !isAuthenticated) ? (
    <center>Authenticating ...</center>
  ) : (
    <Route
      {...rest}
      path={path}
      render={props => {
        if (isAuthenticated) {
          return (
            <UserLayout>
              <Component {...props} />
            </UserLayout>
          )
        }

        return (
          <Redirect
            to={{
              pathname: redirectPath,
              /* eslint-disable react/prop-types */
              state: { from: props.location },
            }}
          />
        )
      }}
    />
  )
}

AuthenticatedRoute.propTypes = {
  path: PropTypes.string,
  redirectPath: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
}

AuthenticatedRoute.defaultProps = {
  path: undefined,
  redirectPath: "/",
}

export { AuthenticatedRoute }
