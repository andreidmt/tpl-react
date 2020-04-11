const debug = require("debug")("mrs:PermissionRoute")

import React from "react"
import PropTypes from "prop-types"
import { pipe, map, reduce, is, isEmpty } from "@mutant-ws/m"
import { Route, Redirect } from "react-router-dom"

import { useAuth } from "./core/use-auth/auth.hook"

//
const isAllowedByRole = {
  guest: ({ id, token }) => !is(id) && !is(token),
  user: ({ id }) => is(id),
}

const PermissionRoute = ({
  redirectPath,
  component: Component,
  layout: Layout,
  roles,
  ...rest
}) => {
  const { id, token } = useAuth()

  const isAllowed = isEmpty(roles)
    ? true
    : pipe(
        map(item => isAllowedByRole[item]),
        reduce((acc, item) => acc || item({ id, token }), false)
      )(roles)

  // Layouts as children of Route makes URL params available in "match.params"
  // everywhere
  return (
    <Route
      {...rest}
      render={props =>
        isAllowed ? (
          is(Layout) ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              /* eslint-disable react/prop-types */
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

PermissionRoute.propTypes = {
  path: PropTypes.string,
  redirectPath: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  roles: PropTypes.arrayOf(PropTypes.string),
}

PermissionRoute.defaultProps = {
  path: null,
  redirectPath: "/",
  layout: null,
  roles: [],
}

export { PermissionRoute }
