const debug = require("debug")("tpl-react:AppRouter")

import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { map, startsWith, pipe, first, split, join } from "@asd14/m"

import { GuestRoute } from "./route.guest"
import { AuthenticatedRoute } from "./route.authenticated"

const languageParameter = `/:language(${pipe(
  split(","),
  map([split(":"), first]),
  join("|")
)(process.env.LANGUAGES)})?`

const AppRouter = ({ routes, notFoundComponent }) => {
  return (
    <BrowserRouter>
      <Switch>
        {map(
          ({ name, path, component, isExact = false, isExclusive = false }) => {
            const AppRoute = startsWith("guest.", name)
              ? GuestRoute
              : AuthenticatedRoute

            return (
              <AppRoute
                key={path}
                path={`${languageParameter}${path}`}
                component={component}
                exact={isExact}
                isExclusive={isExclusive}
              />
            )
          },
          routes
        )}

        {
          // 404
        }
        <Route component={notFoundComponent} />
      </Switch>
    </BrowserRouter>
  )
}

AppRouter.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
      isExact: PropTypes.bool,
      isExclusive: PropTypes.bool,
    })
  ).isRequired,
  notFoundComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
    .isRequired,
}

AppRouter.defaultProps = {}

export { AppRouter }
