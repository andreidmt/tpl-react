import {
  pipe,
  reduce,
  startsWith,
  when,
  same,
  trim,
  is,
  isEmpty,
  isObject,
} from "@mutant-ws/m"

/**
 * Custom Error thrown when fetch resolves with a status !== 20*
 *
 * @param {String}        message    Response error message
 * @param {String}        opt.url    Request URL
 * @param {Number}        opt.status Response status
 * @param {String|Object} opt.body   Response body
 */
function RequestError(message, { url, status, body }) {
  this.message = `${status} Server error: ${message}`
  this.name = "RequestError"
  this.body = body
  this.status = status
  this.url = url
  this.stack = new Error().stack
}

RequestError.prototype = new Error()

/**
 * Library options
 */
const props = {
  baseURL: "",
  headers: {},
  queryStringifyFn: null,
  fetchFn: window.fetch,
}

/**
 * `fetch` wrapper
 *
 * @param  {String} url         API endpoint
 * @param  {String} opt.method  HTTP Method
 * @param  {Object} opt.headers HTTP Headers
 * @param  {Object} opt.body    HTTP Body
 * @param  {Object} opt.query   Query params
 *
 * @return {Promise}            Resolves with response object if code is 20*.
 *                              Reject all other response codes.
 */
const request = (
  url,
  { method, body = {}, headers = {}, query = {}, isFile = false } = {}
) => {
  const reqContent = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...props.headers,
      ...headers,
    },
  }

  // Avoid "HEAD or GET Request cannot have a body"
  if (method !== "GET") {
    reqContent.body = isFile ? body : JSON.stringify(body)
  }

  const reqURL = pipe(
    when(
      isEmpty,
      same(url),
      source => `${url}?${props.queryStringifyFn(source)}`
    ),
    trim("/"),
    source => `${props.baseURL}/${source}`
  )(query)

  return props
    .fetchFn(reqURL, reqContent)
    .then(response => {
      const isJSON = startsWith(
        "application/json",
        response.headers.get("Content-Type")
      )

      return Promise.all([response, isJSON ? response.json() : response.text()])
    })
    .then(([response, data]) => {
      /*
       * The Promise returned from fetch() won't reject on HTTP error status
       * even if the response is an HTTP 404 or 500. Instead, it will resolve
       * normally, and it will only reject on network failure or if anything
       * prevented the request from completing.
       */
      if (response.ok) {
        return data
      }

      throw new RequestError(response.statusText, {
        status: response.status,
        body: data,
        url: reqURL,
      })
    })
}

export const set = ({ baseURL, headers, queryStringifyFn }) => {
  if (is(queryStringifyFn)) {
    if (typeof queryStringifyFn === "function") {
      props.queryStringifyFn = queryStringifyFn
    } else {
      throw new TypeError(
        `mutant-fetch: "queryStringifyFn" should be of type function, received ${JSON.stringify(
          queryStringifyFn
        )}`
      )
    }
  }

  if (is(headers)) {
    if (isObject(headers)) {
      props.headers = { ...props.headers, ...headers }
    } else {
      throw new TypeError(
        `mutant-fetch: "headers" should be of type object, received ${JSON.stringify(
          headers
        )}`
      )
    }
  }

  if (is(baseURL)) {
    if (typeof baseURL === "string") {
      props.baseURL = trim("/")(baseURL)
    } else {
      throw new TypeError(
        `mutant-fetch: "baseURL" should be of type string, received ${JSON.stringify(
          baseURL
        )}`
      )
    }
  }
}

export const FILE = (url, { body = {}, headers } = {}) => {
  const form = new FormData()

  return request(url, {
    method: "POST",
    body: pipe(
      Object.entries,
      reduce((acc, [key, value]) => {
        acc.append(key, value)

        return acc
      }, form)
    )(body),
    headers: {
      ...headers,

      // remove content-type header or browser boundery wont get set
      "Content-Type": null,
    },
    isFile: true,
  })
}

export const GET = (url, { query, headers } = {}) =>
  request(url, { method: "GET", query, headers })

export const POST = (url, { body, query, headers } = {}) =>
  request(url, { method: "POST", body, query, headers })

export const PATCH = (url, { body, query, headers } = {}) =>
  request(url, { method: "PATCH", body, query, headers })

export const DELETE = (url, { body, query, headers } = {}) =>
  request(url, { method: "DELETE", body, query, headers })
