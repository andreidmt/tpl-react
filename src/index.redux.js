const debug = require("debug")("asd14:Redux")

import { createStore, combineReducers } from "redux"

import {
  useSocketRedux,
  useAuthRedux,
  useFocusRedux,
  useThemeRedux,
  useCommandsRedux,
} from "@asd14/react-hooks"

import { TodosList } from "./page.home/data/list.todos"

const appReducer = combineReducers({
  [useSocketRedux.STORE_KEY]: useSocketRedux.reducer,
  [useAuthRedux.STORE_KEY]: useAuthRedux.reducer,
  [useFocusRedux.STORE_KEY]: useFocusRedux.reducer,
  [useThemeRedux.STORE_KEY]: useThemeRedux.reducer,
  [useCommandsRedux.STORE_KEY]: useCommandsRedux.reducer,

  [TodosList.name]: TodosList.reducer,
})

// Provide `appReducer` undefined as `state` param to force revert to default
// state when logging out
const rootReducer = (state, action) =>
  appReducer(action.type === "LOGOUT" ? undefined : state, action)

export const store = createStore(
  rootReducer,

  // Firefox redux extension
  process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)
