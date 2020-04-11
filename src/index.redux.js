const debug = require("debug")("mrs:Redux")

import { createStore, combineReducers } from "redux"

import * as stateSocket from "./core/use-socket/socket.reducer"
import * as stateAuth from "./core/use-auth/auth.reducer"

export const store = createStore(
  combineReducers({
    [stateSocket.key]: stateSocket.reducer,
    [stateAuth.key]: stateAuth.reducer,
  }),

  // Enable Firefox Redux extension
  process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)
