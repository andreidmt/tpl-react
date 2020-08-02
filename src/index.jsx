const debug = require("debug")("ReactStarter:Index")

import React from "react"
import { hot } from "react-hot-loader"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { stringify } from "qs"
import { set as setHTTPProps } from "@mutant-ws/fetch-browser"

import { store } from "./index.redux"
import { AppRouter } from "./index.router"

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

// React hot reloading
const App = hot(module)(() => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
))

render(<App />, document.getElementById("react-root"))

// Parcel hot reloading
if (module.hot) {
  module.hot.accept()
}

// activate debug logging when in development
if (process.env.NODE_ENV !== "production") {
  window.localStorage.setItem("debug", "ReactStarter:*", "ReduxList:*")
}
