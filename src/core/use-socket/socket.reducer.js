const debug = require("debug")("mrs:SocketReducers")

export const key = "GLOBAL.SOCKET"

export const selector = store => store[key]

export const reducer = (
  state = {
    socket: null,
    retries: 0,
    isConnecting: false,
    isConnected: false,
  },
  { type, payload: { socket = null } = {} }
) => {
  switch (type) {
    case "SOCKET.CONNECTING":
      return {
        ...state,
        retries: state.retries + 1,
        isConnecting: true,
        isConnected: false,
      }

    case "SOCKET.CONNECT":
      return {
        socket,
        retries: 0,
        isConnecting: false,
        isConnected: true,
      }

    case "SOCKET.DISCONNECT":
      return {
        socket: null,
        retries: 0,
        isConnecting: false,
        isConnected: false,
      }
    default:
      return state
  }
}
