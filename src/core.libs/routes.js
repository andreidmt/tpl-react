const debug = require("debug")("asd14:RoutesLib")

import { compile } from "path-to-regexp"
import { reduce, pipe, split, last, get, when, is, isEmpty } from "@asd14/m"
import { stringify } from "qs"

/**
 * Custom Route Error
 *
 * @param   {string}    name Route name
 *
 * @returns {undefined}
 */
function RouteNotFoundError(name) {
  this.message = `"${name}" not found`
  this.name = "RouteNotFoundError"
}

RouteNotFoundError.prototype = new Error("Route not found")

const ROUTES = {
  "guest.home": "/",
  "auth.login": "/login",
  "users.profile": "/me",
}

/**
 * Pass routes path through pathToRegexp lib (the same lib that React Router 4
 * uses to build the routes internally)
 *
 * @type {Object<string, Object>}
 */
const ROUTES_COMPILED = reduce(
  (accumulator, [key, value]) => ({ ...accumulator, [key]: compile(value) }),
  {}
)(Object.entries(ROUTES))

/**
 * Get route path by name
 *
 * @param   {string}             name Route name
 *
 * @throws  {RouteNotFoundError}      If route name not defined
 *
 * @returns {string}
 */
export const getPath = name => {
  if (isEmpty(ROUTES[name])) {
    throw new RouteNotFoundError(name)
  }

  return ROUTES[name]
}

/**
 * Build the URL based on route name, params and query
 *
 * @param   {string}             name         Route name
 * @param   {Object}             props
 * @param   {Object}             props.params Route parameters
 * @param   {Object}             props.query  Query parameters
 * @param   {string}             props.anchor
 *
 * @throws  {RouteNotFoundError}              If route name not defined
 *
 * @returns {string}
 */
export const buildURL = (name, { params, query, anchor }) => {
  if (isEmpty(ROUTES[name])) {
    throw new RouteNotFoundError(name)
  }

  return pipe(
    get(name),
    route => route(params),
    when(
      () => is(query),
      path => `${path}?${stringify(query)}`
    ),
    when(
      () => is(anchor),
      path => `${path}#${anchor}`
    )
  )(ROUTES_COMPILED)
}

// Parse ajv error structure into key/value object
export const errorMessagesByField = pipe(
  get(["body", "details", "fieldErrors"], []),
  reduce((accumulator, item) => {
    const field = pipe(get("dataPath"), split("."), last)(item)

    return {
      ...accumulator,
      [field]: item.message,
    }
  }, {})
)
