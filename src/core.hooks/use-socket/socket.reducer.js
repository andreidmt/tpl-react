const debug = require("debug")("asd14:useSocketReducer")

export const STORE_KEY = "GLOBAL.SOCKET"

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
    case `${STORE_KEY}.CONNECTING`:
      return {
        ...state,
        retries: state.retries + 1,
        isConnecting: true,
        isConnected: false,
      }

    case `${STORE_KEY}.CONNECT`:
      return {
        socket,
        retries: 0,
        isConnecting: false,
        isConnected: true,
      }

    case `${STORE_KEY}.DISCONNECT`:
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
