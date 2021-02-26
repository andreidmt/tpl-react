/* eslint-disable unicorn/no-object-as-default-parameter */

const debug = require("debug")("asd14:useFocus")

import { useSelector, useDispatch } from "react-redux"
import { is, isMatch } from "@asd14/m"

import { setLayer as setKeyboardLayer } from "core.libs/keyboard"
import { useCallback } from "core.hooks/use-deep"

export const BASE_LAYER = "base"

export const STORE_KEY = "GLOBAL.FOCUS"

export const reducer = (
  state = {
    id: undefined,
    layer: BASE_LAYER,
    status: "read",
  },
  { type, payload = {} }
) => {
  switch (type) {
    case `${STORE_KEY}.SET`:
      return {
        ...state,
        ...payload,
      }

    default:
      return state
  }
}

/**
 * Pinpoint user's location
 *
 * @param {string} id     Resource ID (Card, Metric, Feedback etc)
 * @param {string} layer  Keyboard layer/app region that has keyboard control
 * @param {string} status Action being performed ("view" or "edit")
 *
 * @returns {[Object, Function]}
 */
export const useFocus = () => {
  const dispatch = useDispatch()
  const { id, layer, status } = useSelector(state => state[STORE_KEY])

  return [
    { id, layer, status },

    useCallback(
      (nextState = {}) => {
        if (is(nextState.layer) && layer !== nextState.layer) {
          setKeyboardLayer(nextState.layer)
        }

        if (!isMatch(nextState, { id, layer, status })) {
          dispatch({
            type: `${STORE_KEY}.SET`,
            payload: nextState,
          })
        }
      },
      [id, layer, status, dispatch]
    ),
  ]
}
