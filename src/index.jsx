// activate debug logging when in development
if (process.env.NODE_ENV !== "production") {
  const debug = require("debug")

  debug.enable("@asd14/*,tpl-react:*")
}

import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { stringify } from "qs"
import { Helmet } from "react-helmet"
import { setup as setupHTTPProps } from "@asd14/fetch-browser"

import { store } from "./index.redux"
import { AppRouter } from "./core.routing/router"

import { HomePage } from "./page.home/home"
import { AboutPage } from "./page.about/about"
import { LoginPage } from "./page.login/login"
import { ProfilePage } from "./page.profile/profile"
import { NotFoundPage } from "./page.404/404"

import "./index.css"

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
    <Helmet
      titleTemplate="%s | React, Redux, Webpack and friends"
      defaultTitle="React, Redux, Webpack and friends"
    />

    <AppRouter
      routes={[
        {
          name: "guest.home",
          path: "/",
          component: HomePage,
          isExact: true,
        },
        {
          name: "guest.about",
          path: "/about",
          component: AboutPage,
        },

        // Only for un-authenticated users
        {
          name: "guest.login",
          path: "/login",
          component: LoginPage,
          isExclusive: true,
        },

        // Only for authenticated users
        {
          name: "authenticated.profile",
          path: "/profile",
          component: ProfilePage,
        },
      ]}
      notFoundComponent={NotFoundPage}
    />
  </Provider>,
  document.querySelector("#react-root")
)
