const debug = require("debug")("@asd14/tpl-react:RoutesLib")

import { compile } from "path-to-regexp"
import { stringify } from "qs"
import {
  join,
  reduce,
  pipe,
  split,
  last,
  get,
  when,
  is,
  isEmpty,
} from "@asd14/m"

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

const languages = join("|", ["en", "nl"])
const languageParameter = `:language(${languages})?`

const ROUTES = {
  "guest.home": `/${languageParameter}/`,
  "guest.about": `/${languageParameter}/about`,
  "guest.login": `/${languageParameter}/login`,
  "user.profile": `/${languageParameter}/me`,
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
 * @param {string} name Route name
 *
 * @throws {RouteNotFoundError} If route name not defined
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
 * @param {string} name
 * @param {Object} props
 * @param {Object} props.params
 * @param {Object} props.query
 * @param {string} props.anchor
 *
 * @throws {RouteNotFoundError}
 *
 * @returns {string}
 */
export const buildURLFromName = (name, { params, query, anchor }) => {
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

/**
 * @param {string} path
 * @param {Object} props
 * @param {Object} props.params
 * @param {Object} props.query
 * @param {string} props.anchor
 *
 * @returns {string}
 */
export const buildURLFromPath = (path, { params, query, anchor }) => {
  return pipe(
    source => compile(source)(params),
    when(
      () => is(query),
      source => `${source}?${stringify(query)}`
    ),
    when(
      () => is(anchor),
      source => `${source}#${anchor}`
    )
  )(path)
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
