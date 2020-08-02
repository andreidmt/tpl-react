const debug = require("debug")("ReactStarter:useFocus")

import { useSelector, useDispatch } from "react-redux"
import { is } from "@mutant-ws/m"

import { setLayer as setKeyboardLayer } from "/core.libs/keyboard"
import { useCallback } from "/core.hooks/use-deep"

export const BASE_LAYER = "base"

export const STORE_KEY = "GLOBAL.FOCUS"

export const reducer = (
  state = { id: null, layer: BASE_LAYER, status: "read" },
  { type, payload = {} }
) => {
  switch (type) {
    case `${STORE_KEY}.SET`:
      return {
        id: is(payload.id) ? payload.id : state.id,
        layer: is(payload.layer) ? payload.layer : state.layer,
        status: is(payload.status) ? payload.status : state.status,
      }

    default:
      return state
  }
}

/**
 * Pinpoint user's location on the board
 *
 * @param {string} id     Resource ID (Card, Metric, Feedback etc)
 * @param {string} layer  Keyboard layer/app region that has keyboard control
 * @param {string} status Action being performed ("view" or "edit")
 *
 * @returns {[Object, Function]} Getter and setter
 */
export const useFocus = () => {
  const dispatch = useDispatch()
  const { id, layer, status } = useSelector(state => state[STORE_KEY])

  return [
    { id, layer, status },

    // TODO: Split into multiple methods: setLocal, sync
    useCallback(
      ({ id: nextFocusId, layer: nextFocusLayer, status: nextFocusStatus }) => {
        // setLocal
        if (is(nextFocusLayer) && layer !== nextFocusLayer) {
          setKeyboardLayer(nextFocusLayer)
        }

        if (is(nextFocusLayer) && !is(nextFocusId)) {
          return dispatch({
            type: `${STORE_KEY}.SET`,
            payload: {
              layer: nextFocusLayer,
            },
          })
        }

        const isIdChanged = is(nextFocusId) && id !== nextFocusId
        const isLayerChanged = is(nextFocusLayer) && layer !== nextFocusLayer
        const isStatusChanged =
          is(nextFocusStatus) && status !== nextFocusStatus

        // sync
        if (isIdChanged || isLayerChanged || isStatusChanged) {
          dispatch({
            type: `${STORE_KEY}.SET`,
            payload: {
              id: nextFocusId,
              layer: nextFocusLayer,
              status: nextFocusStatus,
            },
          })
        }
      },
      [id, layer, status, dispatch]
    ),
  ]
}
