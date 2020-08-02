const debug = require("debug")("ReactStarter:useAuth")

import { useSelector, useDispatch } from "react-redux"
import { get, is } from "@mutant-ws/m"
import { GET, POST, PATCH, set as setupFetch } from "@mutant-ws/fetch-browser"

import { useCallback } from "/core.hooks/use-deep"
import { errorMessagesByField } from "/core.libs/routes"

import { STORE_KEY } from "./auth.reducer"

export const useAuth = (profile = "default") => {
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem(`useJWTAuth.${profile}.accessToken`)
  const { id, name, email, avatarURL, isLoading } = useSelector(
    get([STORE_KEY], {})
  )
  const isAuthenticated = is(accessToken) && is(id)
  const canAuthenticate = is(accessToken) && !is(id)

  //
  // Fetch and store user data using local persisted JWT
  //
  if (canAuthenticate && !isAuthenticated && !isLoading) {
    dispatch({
      type: `${STORE_KEY}.LOGIN_START`,
    })

    GET("/auth/me", {
      headers: { Authorization: accessToken },
    })
      .then(result => {
        // all future requests attach user token
        setupFetch({
          headers: { Authorization: accessToken },
        })

        // update redux state with user data
        dispatch({
          type: `${STORE_KEY}.LOGIN_END`,
          payload: result,
        })
      })
      .catch(error => {
        localStorage.removeItem(`useJWTAuth.${profile}.accessToken`)

        dispatch({
          type: `${STORE_KEY}.LOGIN_ERROR`,
          payload: errorMessagesByField(error),
        })
      })
  }

  return {
    id,
    accessToken,
    name,
    avatarURL,
    email,
    isAuthenticated,
    isAuthenticating: isLoading,
    canAuthenticate,

    /**
     * Create user with email address and send one-time-login token
     */
    register: useCallback(
      data => {
        dispatch({
          type: `${STORE_KEY}.REGISTER_START`,
        })

        return POST("/auth/register", {
          body: data,
        })
          .then(result => {
            dispatch({
              type: `${STORE_KEY}.REGISTER_END`,
              payload: result,
            })

            return result
          })
          .catch(error => {
            dispatch({
              type: `${STORE_KEY}.REGISTER_ERROR`,
              payload: errorMessagesByField(error),
            })

            throw error
          })
      },
      [dispatch]
    ),

    /**
     * Request one-time-login token be sent to email
     */
    loginWithEmail: useCallback(
      source => {
        dispatch({
          type: `${STORE_KEY}.LOGIN_REQUEST_START`,
        })

        return PATCH("/auth/request", {
          body: { email: source },
        })
          .then(result => {
            dispatch({
              type: `${STORE_KEY}.LOGIN_REQUEST_END`,
            })

            return result
          })
          .catch(error => {
            dispatch({
              type: `${STORE_KEY}.LOGIN_REQUEST_ERROR`,
              payload: errorMessagesByField(error),
            })

            throw error
          })
      },
      [dispatch]
    ),

    /**
     * Exchange one-time-login token with a JWT and user data
     */
    loginWithOneTimeToken: useCallback(
      ({ token: ott }) =>
        PATCH("/auth/login", {
          body: { token: ott },
        })
          .then(result => {
            // persist JWT for hard refresh or new tabs
            localStorage.setItem(
              `useJWTAuth.${profile}.accessToken`,
              result.accessToken
            )

            // all future requests attach user token
            setupFetch({
              headers: { Authorization: result.accessToken },
            })

            dispatch({
              type: `${STORE_KEY}.LOGIN_END`,
              payload: result,
            })

            return result
          })
          .catch(error => {
            localStorage.removeItem(`useJWTAuth.${profile}.accessToken`)

            dispatch({
              type: `${STORE_KEY}.LOGIN_ERROR`,
              payload: errorMessagesByField(error),
            })

            throw error
          }),
      [dispatch, profile]
    ),

    /**
     * Remove local storage data, tell server to logout (delete token etc.)
     */
    logout: useCallback(() => {
      // clear local storage JWT from being used next time
      localStorage.removeItem(`useJWTAuth.${profile}.accessToken`)

      // clear redux state
      dispatch({
        type: `${STORE_KEY}.LOGOUT`,
      })

      // API call to invalidate JWT
      return PATCH("/auth/logout", {
        headers: { Authorization: accessToken },
      })
    }, [dispatch, profile, accessToken]),
  }
}
