const debug = require("debug")("asd14:useDeep")

import {
  useEffect as useReactEffect,
  useCallback as useReactCallback,
  useMemo as useReactMemo,
  useRef,
  memo as reactMemo,
} from "react"
import { pluck, keys, map, get, isEmpty, isDeepEqual } from "@asd14/m"

const debugDiff = (previous, next) => {
  debug({
    prev: previous,
    next,
    diff: map((item, index) => {
      return isDeepEqual(item, get(index)(previous))
    })(next),
  })
}

/**
 * Deep equality memoize function, callback and effect.
 * Use same name as react hooks to benefit from "eslint-react-hooks"
 */

export const useMemo = (function_, deps, isDebug = false) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const reference = useRef()

  // store current dependencies in ref only if they change
  if (!isDeepEqual(deps, reference.current)) {
    isDebug && debugDiff(reference.current, deps)

    reference.current = deps
  }

  return useReactMemo(function_, reference.current)
}

export const useCallback = (function_, deps, isDebug = false) => {
  const reference = useRef()

  if (!isDeepEqual(deps, reference.current)) {
    isDebug && debugDiff(reference.current, deps)

    reference.current = deps
  }

  return useReactCallback(function_, reference.current)
}

export const useEffect = (function_, deps, isDebug) => {
  const reference = useRef()

  if (!isDeepEqual(deps, reference.current)) {
    isDebug && debugDiff(reference.current, deps)

    reference.current = deps
  }

  return useReactEffect(function_, reference.current)
}

export const deepReactMemo = (source, properties) => {
  const changingProperties = isEmpty(properties)
    ? keys(source.propTypes)
    : properties

  return reactMemo(source, (previous, next) => {
    return isDeepEqual(
      pluck(changingProperties, previous),
      pluck(changingProperties, next)
    )
  })
}
