const debug = require("debug")("ReactStarter:RoutesLib")

import { compile } from "path-to-regexp"
import { reduce, pipe, split, last, get, when, is, isEmpty } from "@mutant-ws/m"
import { stringify } from "qs"

/**
 * Custom Route Error
 *
 * @param {String} name Route name
 */
function RouteNotFoundError(name) {
  this.message = `"${name}" not found`
  this.name = "RouteNotFoundError"
}

RouteNotFoundError.prototype = new Error()

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
  (acc, [key, value]) => ({ ...acc, [key]: compile(value) }),
  {}
)(Object.entries(ROUTES))

/**
 * Get route path by name
 *
 * @param {string} name Route name
 *
 * @throws {RouteNotFoundError} If route name not defined
 *
 * @return {string}
 */
export const pathByName = name => {
  if (isEmpty(ROUTES[name])) {
    throw new RouteNotFoundError(name)
  }

  return ROUTES[name]
}

/**
 * Build the URL based on route name, params and query
 *
 * @param {String} name   Route name
 * @param {Object} params Route parameters
 * @param {Object} query  Query parameters
 *
 * @throws {RouteNotFoundError} If route name not defined
 *
 * @return {String}
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
  reduce((acc, item) => {
    const field = pipe(get("dataPath"), split("."), last)(item)

    return {
      ...acc,
      [field]: item.message,
    }
  }, {})
)
