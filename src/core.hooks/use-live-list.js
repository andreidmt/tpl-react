const debug = require("debug")("ReactStarter:useLiveList")

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { is } from "m.xyz"

import { useSocket } from "./use-socket"

/**
 * Mark lists that listen to real-time events to prevent double updates
 *
 * @type Object<string, boolean>
 */
const listsWithListener = {}

/**
 * Redux list hook
 *
 * @param {Object} list        Redux List object
 * @param {Object} socketProps WebSocket configuration
 *
 * @returns {Object}
 */
export const useLiveList = (
  list,
  { events: { prefix, shouldAcceptFn, onUpdate } } = {}
) => {
  // Get socket connection bound to loggedin user
  const { socket, isConnected } = useSocket()

  // List actions dispatch to Redux store
  const dispatch = useDispatch()

  useEffect(() => {
    list.set({ dispatch })
  }, [list, dispatch])

  useEffect(() => {
    if (is(prefix) && isConnected && listsWithListener[list.name] !== true) {
      // disable list updates when http requests end
      list.set({
        createHasDispatchEnd: false,
        updateHasDispatchEnd: false,
        removeHasDispatchEnd: false,
      })

      debug(`${list.name}: Listening for "${prefix}" events`)

      listsWithListener[list.name] = true

      const handleOnCreate = data => {
        if (!is(shouldAcceptFn) || shouldAcceptFn(data)) {
          debug(`${prefix}.create`)

          list.create(data, {
            isLocal: true,
          })
        }
      }

      const handleOnUpdate = data => {
        if (!is(shouldAcceptFn) || shouldAcceptFn(data)) {
          debug(`${prefix}.update`)

          list.update(data.id, data, {
            isLocal: true,
            onMerge: onUpdate,
          })
        }
      }

      const handleOnRemove = data => {
        if (!is(shouldAcceptFn) || shouldAcceptFn(data)) {
          debug(`${prefix}.remove`)

          list.remove(data.id, {
            isLocal: true,
          })
        }
      }

      socket.on(`${prefix}.create`, handleOnCreate)
      socket.on(`${prefix}.update`, handleOnUpdate)
      socket.on(`${prefix}.remove`, handleOnRemove)

      return () => {
        debug(`${list.name}: Removing handler for "${prefix}" events`)

        listsWithListener[list.name] = null

        socket.off(`${prefix}.create`, handleOnCreate)
        socket.off(`${prefix}.update`, handleOnUpdate)
        socket.off(`${prefix}.remove`, handleOnRemove)
      }
    }
  }, [list, prefix, socket, isConnected, shouldAcceptFn, onUpdate])

  return {
    selector: useSelector(list.selector),

    create: list.create,
    read: list.read,
    readOne: list.readOne,
    update: list.update,
    remove: list.remove,
    clear: list.clear,
  }
}
