const debug = require("debug")("ReactStarter:AppRouter")

import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"

import { pathByName } from "/core.libs/routes"

import { HomePage } from "./page.home/home"
import { LoginPage } from "./page.login/login"
import { ProfilePage } from "./page.profile/profile"
import { NotFoundPage } from "./page.404/404"

import { GuestRoute } from "./route.guest"
import { UserRoute } from "./route.user"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <GuestRoute
          path={pathByName("guest.home")}
          component={HomePage}
          exact={true}
        />

        {
          // Only for un-authenticated users
        }
        <GuestRoute
          path={pathByName("auth.login")}
          component={LoginPage}
          isExclusive={true}
          hasLayout={false}
        />

        {
          // Only for authenticated users
        }
        <UserRoute path={pathByName("users.profile")} component={ProfilePage} />

        {
          // 404
        }
        <GuestRoute component={NotFoundPage} hasLayout={false} />
      </Switch>
    </BrowserRouter>
  )
}
