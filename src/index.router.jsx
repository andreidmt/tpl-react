const debug = require("debug")("asd14:AppRouter")

import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"

import { getPath } from "core.libs/routes"

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
          path={getPath("guest.home")}
          component={HomePage}
          exact={true}
        />

        {
          // Only for un-authenticated users
        }
        <GuestRoute
          path={getPath("auth.login")}
          component={LoginPage}
          isExclusive={true}
          hasLayout={false}
        />

        {
          // Only for authenticated users
        }
        <UserRoute path={getPath("users.profile")} component={ProfilePage} />

        {
          // 404
        }
        <GuestRoute component={NotFoundPage} hasLayout={false} />
      </Switch>
    </BrowserRouter>
  )
}
