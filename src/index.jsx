const debug = require("debug")("mrs:Index")

import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"

import { store } from "./index.redux"
import { AppRouter } from "./index.router"

import { stringify } from "qs"
import { set as setHTTPProps } from "./core/http.lib"

import "./index.css"

setHTTPProps({
  // Prefix request urls with API_URL
  baseURL: process.env.API_URL,

  /**
   * Transform query object into string with `qs`
   *
   * @param {Object} source Request query object
   *
   * @returns {String} String appended to the URL
   */
  queryStringifyFn: source =>
    stringify(source, {
      allowDots: true,
      encode: false,
      arrayFormat: "brackets",
      strictNullHandling: true,
    }),
})

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("react-root")
)

// activate debug logging when in development
if (process.env.NODE_ENV !== "production") {
  window.localStorage.setItem("debug", "mrs:*", "ReduxList:*")
}
