const debug = require("debug")("asd14:useSocketReducer")

const defaultState = {
  socket: undefined,
  retries: 0,
  isConnecting: false,
  isConnected: false,
}

export const STORE_KEY = "GLOBAL.SOCKET"

export const reducer = (
  state = defaultState,
  { type, payload: { socket } = {} }
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
      return defaultState

    default:
      return state
  }
}
