const debug = require("debug")("mrs:useDeep")

import React from "react"
import isDeepEqual from "fast-deep-equal"
import { pick } from "ramda"

/**
 * Deep equality memoize function, callback and effect.
 *
 * Use same name as react hooks to benefit from "eslint-react-hooks"
 */

export const useMemo = (fn, deps) => {
  const ref = React.useRef(undefined)

  if (!isDeepEqual(deps, ref.current)) {
    ref.current = deps
  }

  return React.useMemo(fn, ref.current)
}

export const useCallback = (fn, deps) => {
  const ref = React.useRef(undefined)

  if (!isDeepEqual(deps, ref.current)) {
    ref.current = deps
  }

  return React.useCallback(fn, ref.current)
}

export const useEffect = (fn, deps) => {
  const ref = React.useRef(undefined)

  if (!isDeepEqual(deps, ref.current)) {
    ref.current = deps
  }

  return React.useEffect(fn, ref.current)
}

export const deepReactMemo = (source, changingProps) =>
  React.memo(source, (prev, next) =>
    isDeepEqual(pick(changingProps, prev), pick(changingProps, next))
  )
