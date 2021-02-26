const debug = require("debug")("asd14:Index")

import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { stringify } from "qs"
import { setup as setupHTTPProps } from "@asd14/fetch-browser"

import { store } from "./index.redux"
import { AppRouter } from "./index.router"

import "core.ui/index.css"

setupHTTPProps({
  baseURL: process.env.API_URL,
  stringifyQueryParams: source =>
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
  document.querySelector("#react-root")
)

// activate debug logging when in development
if (process.env.NODE_ENV !== "production") {
  localStorage.setItem("debug", "asd14:*,JustAList:*")
}
