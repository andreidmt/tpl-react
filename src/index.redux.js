const debug = require("debug")("asd14:Redux")

import { createStore, combineReducers } from "redux"
import { useThemeRedux } from "@asd14/gruvbox-ui"
import {
  useSocketRedux,
  useAuthRedux,
  useFocusRedux,
  useCommandsRedux,
} from "@asd14/react-hooks"

import { TodosList } from "./page.home/data/list.todos"

const appReducer = combineReducers({
  [useSocketRedux.STORE_KEY]: useSocketRedux.reducer,
  [useAuthRedux.STORE_KEY]: useAuthRedux.reducer,
  [useFocusRedux.STORE_KEY]: useFocusRedux.reducer,
  [useCommandsRedux.STORE_KEY]: useCommandsRedux.reducer,
  [useThemeRedux.STORE_KEY]: useThemeRedux.reducer,

  [TodosList.name]: TodosList.reducer,
})

export const store = createStore(
  // Provide `appReducer` undefined as `state` param to force revert to default
  // state when logging out
  (state, action) =>
    appReducer(action.type === "LOGOUT" ? undefined : state, action),

  // Redux Devtools extension, for development and SSR aware
  process.env.NODE_ENV !== "production" &&
    window !== undefined &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)
