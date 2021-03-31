const debug = require("debug")("tpl-react:GuestRoute")

import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "@asd14/react-hooks"
import { read } from "@asd14/m"

import { buildURLFromPath } from "core.libs/routes"

import { GuestLayout } from "layout.guest/guest"

const GuestRoute = ({
  path,
  redirectPath,
  component: Component,
  computedMatch,
  isExclusive,
  ...rest
}) => {
  const { isAuthenticated, canAuthenticate } = useAuth()
  const isAllowed = !(isExclusive && (isAuthenticated || canAuthenticate))

  const languageParameter = read(
    ["params", "language"],
    undefined,
    computedMatch
  )

  debug({
    computedMatch,
    rest,
    languageParameter,
    path,
  })

  return (
    <Route
      {...rest}
      path={path}
      render={props => {
        if (languageParameter === "en") {
          const urlWithoutLanguage = buildURLFromPath(path, {
            language: undefined,
          })

          return (
            <Redirect
              to={{
                pathname: urlWithoutLanguage,
              }}
            />
          )
        }

        if (isAllowed) {
          return (
            <GuestLayout>
              <Component {...props} />
            </GuestLayout>
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

GuestRoute.propTypes = {
  path: PropTypes.string,
  redirectPath: PropTypes.string,
  computedMatch: PropTypes.shape({
    params: PropTypes.shape({
      language: PropTypes.string,
    }),
  }).isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  isExclusive: PropTypes.bool,
}

GuestRoute.defaultProps = {
  path: undefined,
  redirectPath: "/",
  isExclusive: false,
}

export { GuestRoute }
