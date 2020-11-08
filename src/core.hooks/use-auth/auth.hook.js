const debug = require("debug")("asd14:AuthHook")

import { useSelector, useDispatch } from "react-redux"
import { get, is } from "@asd14/m"
import { GET, POST, PATCH, set as setupFetch } from "@asd14/fetch-browser"
import * as Sentry from "@sentry/browser"

import { useCallback } from "core.hooks/use-deep"
import { errorMessagesByField } from "core.libs/routes"

import { STORE_KEY } from "./auth.reducer"

const persistUser = ({ id, name, email, profile, accessToken } = {}) => {
  // persist JWT for hard refresh or new tabs
  localStorage.setItem(`useJWTAuth.${profile}.accessToken`, accessToken)

  // attach future client errors to user
  Sentry.configureScope(scope => {
    scope.setUser({ id, name, email })
  })

  // all future requests attach user token
  setupFetch({
    headers: { Authorization: accessToken },
  })
}

const forgetUser = ({ profile } = {}) => {
  // clear local storage JWT from being used next time
  localStorage.removeItem(`useJWTAuth.${profile}.accessToken`)
}

export const useAuth = () => {
  const dispatch = useDispatch()
  const profile = useSelector(get([STORE_KEY, "profile"], {}))
  const { id, name, email, avatarURL, isLoading } = useSelector(
    get([STORE_KEY, "data", profile], {})
  )

  const accessToken = localStorage.getItem(`useJWTAuth.${profile}.accessToken`)
  const isAuthenticated = is(accessToken) && is(id)
  const canAuthenticate = is(accessToken) && !is(id)

  //
  // Fetch and store user data using local persisted JWT
  //
  if (canAuthenticate && !isAuthenticated && !isLoading) {
    dispatch({
      type: `${STORE_KEY}.LOGIN_START`,
      profile,
    })

    GET("/auth/me", {
      headers: { Authorization: accessToken },
    })
      .then(result => {
        persistUser({
          id: result.id,
          name: result.name,
          email: result.email,
          accessToken,
          profile,
        })

        // update redux state with user data
        dispatch({
          type: `${STORE_KEY}.LOGIN_END`,
          profile,
          payload: result,
        })
      })
      .catch(error => {
        forgetUser({ profile })

        dispatch({
          type: `${STORE_KEY}.LOGIN_ERROR`,
          profile,
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
    profile,
    isAuthenticated,
    isAuthenticating: isLoading,
    canAuthenticate,

    switchProfile: useCallback(
      source => {
        dispatch({
          type: `${STORE_KEY}.SWITCH_PROFILE`,
          profile: source,
        })

        sessionStorage.setItem(`useJWTAuth.profile`, source)
      },
      [dispatch]
    ),

    persistUser: useCallback(
      source => {
        persistUser({
          ...source,
          profile,
        })

        dispatch({
          type: `${STORE_KEY}.LOGIN_END`,
          profile,
          payload: source,
        })
      },
      [profile, dispatch]
    ),

    /**
     * Create user with email address and send one-time-login token
     */
    register: useCallback(
      data => {
        dispatch({
          type: `${STORE_KEY}.REGISTER_START`,
          profile,
        })

        return POST("/auth/register", {
          body: data,
        })
          .then(result => {
            dispatch({
              type: `${STORE_KEY}.REGISTER_END`,
              profile,
              payload: result,
            })

            return result
          })
          .catch(error => {
            dispatch({
              type: `${STORE_KEY}.REGISTER_ERROR`,
              profile,
              payload: errorMessagesByField(error),
            })

            throw error
          })
      },
      [profile, dispatch]
    ),

    /**
     * Request one-time-login token be sent to email
     */
    loginWithEmail: useCallback(
      source => {
        dispatch({
          type: `${STORE_KEY}.LOGIN_REQUEST_START`,
          profile,
        })

        return PATCH("/auth/request", {
          body: { email: source },
        })
          .then(result => {
            dispatch({
              type: `${STORE_KEY}.LOGIN_REQUEST_END`,
              profile,
            })

            return result
          })
          .catch(error => {
            dispatch({
              type: `${STORE_KEY}.LOGIN_REQUEST_ERROR`,
              profile,
              payload: errorMessagesByField(error),
            })

            throw error
          })
      },
      [profile, dispatch]
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
            persistUser({
              id: result.id,
              name: result.name,
              email: result.email,
              accessToken: result.accessToken,
              profile,
            })

            dispatch({
              type: `${STORE_KEY}.LOGIN_END`,
              profile,
              payload: result,
            })

            return result
          })
          .catch(error => {
            forgetUser({ profile })

            dispatch({
              type: `${STORE_KEY}.LOGIN_ERROR`,
              profile,
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
      debug("LOGOUT", { profile })

      forgetUser({ profile })

      // clear redux state
      dispatch({
        type: `${STORE_KEY}.LOGOUT`,
        profile,
      })

      // invalidate JWT
      return PATCH("/auth/logout", {
        headers: { Authorization: accessToken },
      })
    }, [dispatch, profile, accessToken]),
  }
}
