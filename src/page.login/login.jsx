const debug = require("debug")("ReactStarter:LoginPage")

import React from "react"
import { isEmpty } from "@mutant-ws/m"
import { useHistory } from "react-router-dom"

import { useQuery } from "/core.hooks/use-query"
import { useAuth } from "/core.hooks/use-auth/auth.hook"
import { pathByName } from "/core.libs/routes"

// Entry point from email with one-time-token to be exchanged for a JWT
const LoginPage = () => {
  const history = useHistory()
  const [{ token }] = useQuery()
  const { loginWithOTT } = useAuth()

  if (isEmpty(token)) {
    history.push(pathByName("guest.home"))
  } else {
    // Do not trigger any other actions before this.
    // It will go into infinite loop since this method is triggered before
    // rendering the App.
    loginWithOTT({ token })
      .then(() => {
        history.push(pathByName("users.profile"))
      })
      .catch(() => {
        history.push(pathByName("guest.home"))
      })
  }

  return <center>Loggin in ...</center>
}

export { LoginPage }
