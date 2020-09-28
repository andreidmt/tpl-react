const debug = require("debug")("mutant:AuthReducers")

export const STORE_KEY = "GLOBAL.AUTH"

export const reducer = (
  state = {
    profile: sessionStorage.getItem("useJWTAuth.profile") ?? "user",
    data: {},
  },
  { type, profile, payload = {} }
) => {
  switch (type) {
    case `${STORE_KEY}.SWITCH_PROFILE`:
      sessionStorage.setItem("useJWTAuth.profile", profile)

      return {
        profile,
        data: state.data,
      }

    case `${STORE_KEY}.REGISTER_START`:
    case `${STORE_KEY}.LOGIN_REQUEST_START`:
    case `${STORE_KEY}.LOGIN_START`:
      return {
        profile: state.profile,
        data: {
          ...state.data,
          [profile]: {
            id: null,
            name: null,
            email: null,
            avatarURL: null,
            errors: {},
            isLoading: true,
          },
        },
      }

    case `${STORE_KEY}.REGISTER_END`:
    case `${STORE_KEY}.LOGIN_REQUEST_END`:
      return {
        profile: state.profile,
        data: {
          ...state.data,
          [profile]: {
            ...state.data[profile],
            isLoading: false,
          },
        },
      }

    case `${STORE_KEY}.LOGIN_END`:
      return {
        profile: state.profile,
        data: {
          ...state.data,
          [profile]: {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            avatarURL: payload.avatarURL,
            errors: {},
            isLoading: false,
          },
        },
      }

    case `${STORE_KEY}.REGISTER_ERROR`:
    case `${STORE_KEY}.LOGIN_REQUEST_ERROR`:
    case `${STORE_KEY}.LOGIN_ERROR`:
      return {
        profile: state.profile,
        data: {
          ...state.data,
          [profile]: {},
        },
      }

    case `${STORE_KEY}.LOGOUT`:
      return state

    // return {
    //   profile: state.profile,
    //   data: {
    //     ...state.data,
    //     [profile]: {},
    //   },
    // }

    default:
      return state
  }
}
