const debug = require("debug")("ReactStarter:useCommands")

import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  merge,
  sort,
  startsWith,
  removeWith,
  hasWith,
  replaceWith,
  when,
  map,
  reduce,
  pipe,
  filterWith,
} from "m.xyz"
import { append } from "ramda"

export const STORE_KEY = "GLOBAL.COMMANDS"

export const reducer = (state = [], { type, layer, commands }) => {
  switch (type) {
    case `${STORE_KEY}.ADD`:
      return when(
        hasWith({ layer }),
        replaceWith({ layer }, { layer, commands }),
        append({ layer, commands })
      )(state)

    case `${STORE_KEY}.REMOVE`:
      return removeWith({ layer }, state)

    default:
      return state
  }
}

export const useCommands = () => {
  const dispatch = useDispatch()
  const commands = useSelector(state => state[STORE_KEY])

  return [
    commands,
    [
      // add
      useCallback(
        ({ layer, commands: layerCommands }) =>
          dispatch({
            type: `${STORE_KEY}.ADD`,
            layer,
            commands: layerCommands,
          }),
        [dispatch]
      ),

      // remove
      useCallback(
        ({ layer }) =>
          dispatch({
            type: `${STORE_KEY}.REMOVE`,
            layer,
          }),
        [dispatch]
      ),
    ],
  ]
}

/**
 * Return commands assigned to layer and also parent layers
 *
 * @example
 * byLayer("base.work", [...])
 * // => [
 * //   {layer: "base", name: "login", ...},
 * //   {layer: "base.work", name: "profile", ...}
 * // ]
 *
 * @param {String}   layer    Layer name
 * @param {Object[]} commands Array of objects containing commands for each layer
 *
 * @returns {CommandsState} Array with commands
 */
export const byLayer = (layer, commands) =>
  pipe(
    filterWith({
      layer: source => startsWith(source, layer),
    }),
    sort((a, b) => a.layer.length < b.layer.length),
    reduce(
      (acc, item) => [
        ...acc,
        ...map(merge({ layer: item.layer }))(item.commands),
      ],
      []
    )
  )(commands)
