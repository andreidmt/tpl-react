const debug = require("debug")("asd14:useSocket")

import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { is, isEmpty } from "@asd14/m"
import io from "socket.io-client"

import { useAuth } from "./use-auth/auth.hook"

const initialState = {
  socket: null,
  retries: 0,
  isConnecting: false,
  isConnected: false,
}

export const STORE_KEY = "GLOBAL.SOCKET"

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case `${STORE_KEY}.CONNECTING`:
      debug(`${STORE_KEY}.CONNECTING`)

      return {
        ...state,
        retries: state.retries + 1,
        isConnecting: true,
        isConnected: false,
      }

    case `${STORE_KEY}.CONNECT`:
      debug(`${STORE_KEY}.CONNECT`)

      return {
        socket: payload.socket,
        retries: 0,
        isConnecting: false,
        isConnected: true,
      }

    case `${STORE_KEY}.DISCONNECT`:
      debug(`${STORE_KEY}.DISCONNECT`)

      return initialState
    default:
      return state
  }
}

/**
 * WebSocket connection hook. Persistent in Redux store to allow only one
 * connection per user.
 *
 * @return {[data, methods]}
 */
export const useSocket = () => {
  const dispatch = useDispatch()
  const { accessToken } = useAuth()
  const { socket, retries, isConnecting, isConnected } = useSelector(
    store => store[STORE_KEY]
  )

  const handleConnect = useCallback(
    ({ room }) => {
      if (isEmpty(accessToken)) {
        return debug(
          ".connect: Cannot connect without valid auth token.",
          `Received "${accessToken}"`
        )
      }

      if (isEmpty(room)) {
        return debug(
          ".connect: Cannot connect without valid room.",
          `Received "${room}"`
        )
      }

      if (!is(socket) && !isConnecting) {
        dispatch({
          type: `${STORE_KEY}.CONNECTING`,
        })

        const newSocket = io(process.env.SOCKET_URL, {
          transports: ["websocket"],
          query: {
            room,
            authorization: accessToken,
          },
        })

        newSocket.on("connect", () => {
          debug(`Successfull connection to room "${room}"`)

          dispatch({
            type: `${STORE_KEY}.CONNECT`,
            payload: { socket: newSocket },
          })
        })

        newSocket.on("disconnect", () => {
          debug(`Disconnected from room "${room}"`)

          dispatch({
            type: `${STORE_KEY}.DISCONNECT`,
          })
        })
      }
    },
    [socket, accessToken, isConnecting, dispatch]
  )

  const handleDisconnect = useCallback(() => {
    if (is(socket)) {
      socket.disconnect()
    }
  }, [socket])

  return {
    socket,
    retries,
    isConnecting,
    isConnected,

    connect: handleConnect,
    disconnect: handleDisconnect,
  }
}
