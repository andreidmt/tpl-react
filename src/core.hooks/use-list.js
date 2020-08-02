const debug = require("debug")("ReactStarter:useList")

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { is } from "@mutant-ws/m"

import { useSocket } from "/core.hooks/use-socket/socket.hook"

/**
 * Redux list hook
 *
 * @param {Object} list          Redux List object
 * @param {Object} opt.namespace Listen to events starting with
 *
 * @returns {Object}
 */
export const useList = (list, { namespace } = {}) => {
  // Socket connection bound to loggedin user
  const { socket, isConnected } = useSocket()

  // List actions dispatch to Redux store
  list.set({ dispatch: useDispatch() })

  //
  useEffect(() => {
    if (is(namespace) && isConnected) {
      // Disable list updates after API reqests finish since we're updating
      // via the socket
      list.set({ hasDispatchEnd: true })

      debug(`Listening for "${namespace}" events`)

      const onCreate = data => {
        debug(`${namespace}.create`)
        list.create(data, { isLocal: true })
      }

      const onUpdate = data => {
        debug(`${namespace}.update`)
        list.update(data.id, data, { isLocal: true })
      }

      const onRemove = ({ id }) => {
        debug(`${namespace}.remove`)
        list.remove(id, { isLocal: true })
      }

      socket.on(`${namespace}.create`, onCreate)
      socket.on(`${namespace}.update`, onUpdate)
      socket.on(`${namespace}.remove`, onRemove)

      return () => {
        debug(`Removing handler for "${namespace}" events`)

        socket.off(`${namespace}.create`, onCreate)
        socket.off(`${namespace}.update`, onUpdate)
        socket.off(`${namespace}.remove`, onRemove)
      }
    }
  }, [list, namespace, socket, isConnected])

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
