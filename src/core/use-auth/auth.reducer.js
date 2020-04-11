const debug = require("debug")("mrs:AuthReducers")

export const key = "GLOBAL.AUTH"

export const selector = store => store[key]

export const reducer = (
  state = {
    id: null,
    name: null,
    email: null,
    avatarURL: null,
    token: localStorage.getItem("auth.token"),
    errors: {},
    isLoading: false,
  },
  { type, payload = {} }
) => {
  switch (type) {
    case "REGISTER.START":
    case "LOGIN.REQUEST-START":
    case "LOGIN.START":
      return {
        ...state,
        isLoading: true,
      }

    case "REGISTER.END":
    case "LOGIN.REQUEST-END":
      return {
        ...state,
        isLoading: false,
      }

    case "LOGIN.END":
      localStorage.setItem("auth.token", payload.token)

      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        token: payload.token,
        avatarURL: payload.avatarURL,
        errors: {},
        isLoading: false,
      }

    case "REGISTER.ERROR":
    case "LOGIN.REQUEST-ERROR":
    case "LOGIN.ERROR":
      localStorage.removeItem("auth__token")

      return {
        id: null,
        name: null,
        email: null,
        token: null,
        avatarURL: null,
        errors: payload,
        isLoading: false,
      }
    case "LOGOUT":
      localStorage.clear()

      return {
        id: null,
        name: null,
        email: null,
        token: null,
        avatarURL: null,
        errors: {},
        isLoading: false,
      }
    default:
      return state
  }
}
