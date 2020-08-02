const debug = require("debug")("ReactStarter:useAuthReducer")

export const STORE_KEY = "GLOBAL.AUTH"

export const reducer = (
  state = {
    id: null,
    name: null,
    email: null,
    avatarURL: null,
    errors: {},
    isLoading: false,
  },
  { type, payload = {} }
) => {
  switch (type) {
    case `${STORE_KEY}.REGISTER_START`:
    case `${STORE_KEY}.LOGIN_REQUEST_START`:
    case `${STORE_KEY}.LOGIN_START`:
      return {
        ...state,
        isLoading: true,
      }

    case `${STORE_KEY}.REGISTER_END`:
    case `${STORE_KEY}.LOGIN_REQUEST_END`:
      return {
        ...state,
        isLoading: false,
      }

    case `${STORE_KEY}.LOGIN_END`:
      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        avatarURL: payload.avatarURL,
        errors: {},
        isLoading: false,
      }

    case `${STORE_KEY}.REGISTER_ERROR`:
    case `${STORE_KEY}.LOGIN_REQUEST_ERROR`:
    case `${STORE_KEY}.LOGIN_ERROR`:
      return {
        id: null,
        name: null,
        email: null,
        avatarURL: null,
        errors: payload,
        isLoading: false,
      }

    case `${STORE_KEY}.LOGOUT`:
      return state

    // return {
    //   id: null,
    //   name: null,
    //   email: null,
    //   avatarURL: null,
    //   errors: {},
    //   isLoading: false,
    // }
    default:
      return state
  }
}

export const selector = store => store[STORE_KEY]
