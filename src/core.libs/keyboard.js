const debug = require("debug")("ReactStarter:LibKeyboard")

import { has, is, isEmpty } from "@mutant-ws/m"
import { concat, split, path, pipe, when, map, reduce } from "ramda"

/**
 * Similar to programmable mechanical keyboards, keys can do different things
 * based on the current active layer.
 */

/**
 * Layered Keyboard state
 *
 * @typedef {Object} KeyboardState
 *
 * @property {String}             selectedLayer
 * @property {KeyboardShortcut[]} shortcuts
 */

/**
 * Shortcut internals
 *
 * @typedef {Object} KeyboardShortcut
 *
 * @property {String}   name
 * @property {String}   description
 * @property {Number}   weight
 * @property {Object[]} params
 * @property {Function} onFinish
 */

/** @type {KeyboardState} */
const state = {
  selectedLayer: "base",
  shortcuts: {},
}

/**
 * Find shortcut by key and layer. If does not exist, look also in "base" layer
 *
 * @returns {Object}
 */
const findShortcut = ({ layer, key }) => shortcuts => {
  const shortcut = path([layer, key])(shortcuts)

  return isEmpty(shortcut) ? path(["base", key])(shortcuts) : shortcut
}

/**
 * The same action can be attached to multiple keys by using a comma separated
 * value as key. Split the key and assing the handler to each key individualy.
 *
 * @example
 * addShortcuts({
 *   shortcuts: {
 *     // run the same function when pressing either "a" or "b" key
 *     "a,b": () => {}
 *
 *     // after expand
 *     "a": () => {},
 *     "b": () => {}
 *   }
 * })
 *
 * @return {KeyboardShortcut[]}
 */
const expandKeysByComma = pipe(
  Object.entries,
  reduce(
    (acc, [key, value]) =>
      pipe(
        split(","),
        map(source => [source, value]),
        concat(acc)
      )(key),
    []
  ),
  Object.fromEntries
)

/**
 * Watch keyDown events and run the handler designated to the pressed key and
 * current active layer.
 */
document.addEventListener(
  "keydown",
  event => {
    const isInput = has(event.target.tagName)(["INPUT", "TEXTAREA"])
    const isEditable = event.target.isContentEditable

    if (!isInput && !isEditable) {
      pipe(
        findShortcut({
          layer: state.selectedLayer,
          key: event.key,
        }),
        when(is, handler => handler.call(null, event))
      )(state.shortcuts)
    }
  },
  false
)

/**
 * Switch to different layer
 *
 * @param {String} source Layer name
 */
export const setLayer = source => {
  state.selectedLayer = source
}

/**
 * Remove shortcuts and layer
 */
export const removeShortcuts = ({ layer }) => {
  state.shortcuts = {
    ...state.shortcuts,
    [layer]: undefined,
  }
}

/**
 * Add/update layer shortcuts
 */
export const addShortcuts = ({ layer, shortcuts }) => {
  if (isEmpty(shortcuts)) {
    throw new Error(
      `useKeyboard: expected non empty array in "shortcuts" key, got "${JSON.stringify(
        shortcuts
      )}"`
    )
  }

  state.shortcuts = {
    ...state.shortcuts,
    [layer]: expandKeysByComma(shortcuts),
  }
}
