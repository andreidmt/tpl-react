/* eslint-disable new-cap */

const debug = require("debug")("mrs:useAuth")

import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GET, POST, PATCH, set as setHTTPProps } from "../http.lib"

import { selector } from "./auth.reducer"

export const useAuth = () => {
  const dispatch = useDispatch()
  const { id, token, name, avatarURL } = useSelector(selector)

  // all request send JWT
  useEffect(() => setHTTPProps({ headers: { Authorization: token } }), [token])

  return {
    id,
    token,
    name,
    avatarURL,

    /**
     * Create user with email address, send one-time-login token
     */
    register: useCallback(
      data => {
        dispatch({
          type: "REGISTER.START",
        })

        return POST("/register", {
          body: data,
        })
          .then(result => {
            dispatch({
              type: "REGISTER.END",
            })

            return result
          })
          .catch(error => {
            dispatch({
              type: "REGISTER.ERROR",
            })

            throw error
          })
      },
      [dispatch]
    ),

    /**
     * Request one-time-login token be sent to email
     */
    requestOTT: useCallback(
      ({ email }) => {
        dispatch({
          type: "LOGIN.REQUEST-START",
        })

        return PATCH("/request-login", {
          body: { email },
        })
          .then(result => {
            dispatch({
              type: "LOGIN.REQUEST-END",
            })

            return result
          })
          .catch(error => {
            dispatch({
              type: "LOGIN.REQUEST-ERROR",
              payload: error.message,
            })

            throw error
          })
      },
      [dispatch]
    ),

    /**
     * Remove local storage data, tell server to logout (delete token etc.)
     */
    logout: useCallback(() => {
      dispatch({
        type: "LOGOUT",
      })

      return PATCH("/logout")
    }, [dispatch]),

    /**
     * Login using token from localStorage
     */
    loginWithJWT: useCallback(
      () =>
        GET("/me")
          .then(result => {
            dispatch({
              type: "LOGIN.END",
              payload: {
                ...result,
                token,
              },
            })
          })
          .catch(error => {
            debug("me error", { error, token })

            if (error.status === 404) {
              dispatch({
                type: "LOGOUT",
              })
            }
          }),
      [dispatch, token]
    ),

    /**
     * Exchange one-time-login token for a JWT and user data
     */
    loginWithOTT: useCallback(
      ({ token: ott }) =>
        PATCH("/login", {
          body: { token: ott },
        })
          .then(result => {
            dispatch({
              type: "LOGIN.END",
              payload: result,
            })

            return result
          })
          .catch(error => {
            dispatch({
              type: "LOGIN.ERROR",
              payload: error.message,
            })

            throw error
          }),
      [dispatch]
    ),
  }
}
