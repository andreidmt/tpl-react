const debug = require("debug")("mrs:AppRouter")

import React from "react"
import { is } from "@mutant-ws/m"
import { BrowserRouter, Switch } from "react-router-dom"

import { useAuth } from "./core/use-auth/auth.hook"
import { pathByName } from "./core/routes.lib"

import { BaseLayout } from "./layout.base/base"
import { GuestLayout } from "./layout.guest/guest"
import { UserLayout } from "./layout.user/user"

import { HomePage } from "./page.home/home"
import { LoginPage } from "./page.login/login"
import { ProfilePage } from "./page.profile/profile"
import { NotFoundPage } from "./page.404/404"

import { PermissionRoute } from "./index.permission-route"

export const AppRouter = () => {
  const { id, token, loginWithLocalJWT } = useAuth()

  // True on hard refresh (token is persisted in localStorage, id in redux)
  const shouldLoadUserData = is(token) && !is(id)

  // Do not trigger any other actions before this.
  // It will go into infinite loop since this comes before rendering the App.
  shouldLoadUserData && loginWithLocalJWT()

  // dont render anything until user data is loaded
  return shouldLoadUserData ? (
    <center>Loading ...</center>
  ) : (
    <BrowserRouter>
      <Switch>
        <PermissionRoute
          path={pathByName("guest.home")}
          component={HomePage}
          layout={GuestLayout}
          exact={true}
        />

        {/* Only for un-authenticated users */}
        <PermissionRoute
          path={pathByName("auth.login")}
          component={LoginPage}
          layout={BaseLayout}
          roles={["guest"]}
        />

        {/* Only for authenticated users */}
        <PermissionRoute
          path={pathByName("users.profile")}
          component={ProfilePage}
          layout={UserLayout}
          roles={["user"]}
        />

        {/* Nothing matched */}
        <PermissionRoute component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}
