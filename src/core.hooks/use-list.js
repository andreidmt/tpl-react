const debug = require("debug")("ReactStarter:useList")

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

/**
 * Redux list hook
 *
 * @param {Object} list        Redux List object
 * @param {Object} socketProps WebSocket configuration
 *
 * @returns {Object}
 */
export const useList = list => {
  const dispatch = useDispatch()

  useEffect(() => {
    list.set({ dispatch })
  }, [list, dispatch])

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
