const debug = require("debug")("ReactStarter:useSocket")

import io from "socket.io-client"
import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { is, get, isEmpty } from "@mutant-ws/m"

import { useAuth } from "/core.hooks/use-auth/auth.hook"

import { STORE_KEY } from "./socket.reducer"

/**
 * Real-time socket connection
 *
 * - one connection per user
 * - pass JWT token from useAuth for server side authorization
 * - socket server address in SOCKET_URL env var
 *
 * @returns {Object}
 */
export const useSocket = () => {
  const dispatch = useDispatch()
  const { token } = useAuth()
  const { socket, retries, isConnecting, isConnected } = useSelector(
    get([STORE_KEY], {})
  )

  const handleConnect = useCallback(
    ({ room }) => {
      if (isEmpty(process.env.SOCKET_URL)) {
        return debug(
          ".connect: Cannot connect without valid server URL in process.env.SOCKET_URL.",
          `Received "${JSON.stringify(process.env.SOCKET_URL)}"`
        )
      }

      if (isEmpty(token)) {
        return debug(
          ".connect: Cannot connect without valid auth token.",
          `Received "${JSON.stringify(token)}"`
        )
      }

      if (isEmpty(room)) {
        return debug(
          ".connect: Cannot connect without valid room.",
          `Received "${JSON.stringify(room)}"`
        )
      }

      if (!is(socket) && !isConnecting) {
        dispatch({
          type: "SOCKET.CONNECTING",
        })

        const newSocket = io(process.env.SOCKET_URL, {
          transports: ["websocket"],

          // optional, depends on how your backed is set up
          query: {
            room,
            authorization: token,
          },
        })

        newSocket.on("connect", () => {
          debug(`Successfull connection to room "${room}"`)

          dispatch({
            type: "SOCKET.CONNECT",
            payload: {
              socket: newSocket,
            },
          })
        })

        newSocket.on("disconnect", () => {
          debug(`Disconnected from room "${room}"`)

          dispatch({
            type: "SOCKET.DISCONNECT",
          })
        })

        return socket
      }

      return socket
    },
    [socket, token, isConnecting, dispatch]
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
