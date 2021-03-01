const debug = require("debug")("asd14:GuestRoute")

import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

import { useAuth } from "@asd14/react-hooks"

import { GuestLayout } from "./layout.guest/guest"
import { BaseLayout } from "./layout.base/base"

/**
 * Route without authentication
 *
 * @param {string}     path         Route path
 * @param {string}     redirectPath Redirect if JWT present and isExclusive = true
 * @param {React.Node} component    What to render if all conditions met
 * @param {boolean}    isExclusive  Only allow page access if JWT missing
 * @param {boolean}    hasLayout    Use dedicated Guest layout
 *
 * @returns {ReactRouter.Route}
 **/
const GuestRoute = ({
  path,
  redirectPath,
  component: Component,
  isExclusive,
  hasLayout,
  ...rest
}) => {
  const { isAuthenticated, canAuthenticate } = useAuth()
  const shouldRender = !(isExclusive && (isAuthenticated || canAuthenticate))
  const Layout = hasLayout ? GuestLayout : BaseLayout

  return (
    <Route
      {...rest}
      path={path}
      render={properties =>
        shouldRender ? (
          <Layout>
            <Component {...properties} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              /* eslint-disable react/prop-types */
              state: { from: properties.location },
            }}
          />
        )
      }
    />
  )
}

GuestRoute.propTypes = {
  path: PropTypes.string,
  redirectPath: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  isExclusive: PropTypes.bool,
  hasLayout: PropTypes.bool,
}

GuestRoute.defaultProps = {
  path: undefined,
  redirectPath: "/",
  isExclusive: false,
  hasLayout: true,
}

export { GuestRoute }
