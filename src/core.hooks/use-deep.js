const debug = require("debug")("ReactStarter:useDeep")

import {
  useEffect as useReactEffect,
  useCallback as useReactCallback,
  useMemo as useReactMemo,
  useRef,
  memo as reactMemo,
} from "react"
import { map, get, isEmpty } from "@mutant-ws/m"
import { pick, keys } from "ramda"
import isDeepEqual from "fast-deep-equal"

const debugDiff = (prev, next) => {
  debug({
    prev,
    next,
    diff: map((item, index) => {
      return isDeepEqual(item, get(index)(prev))
    })(next),
  })
}

/**
 * Deep equality memoize function, callback and effect.
 * Use same name as react hooks to benefit from "eslint-react-hooks"
 */

export const useMemo = (fn, deps, isDebug = false) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef()

  // store current dependencies in ref only if they change
  if (!isDeepEqual(deps, ref.current)) {
    isDebug && debugDiff(ref.current, deps)

    ref.current = deps
  }

  return useReactMemo(fn, ref.current)
}

export const useCallback = (fn, deps, isDebug = false) => {
  const ref = useRef()

  if (!isDeepEqual(deps, ref.current)) {
    isDebug && debugDiff(ref.current, deps)

    ref.current = deps
  }

  return useReactCallback(fn, ref.current)
}

export const useEffect = (fn, deps, isDebug) => {
  const ref = useRef()

  if (!isDeepEqual(deps, ref.current)) {
    isDebug && debugDiff(ref.current, deps)

    ref.current = deps
  }

  return useReactEffect(fn, ref.current)
}

export const deepReactMemo = (source, props) => {
  const changingProps = isEmpty(props) ? keys(source.propTypes) : props

  return reactMemo(source, (prev, next) =>
    isDeepEqual(pick(changingProps, prev), pick(changingProps, next))
  )
}
